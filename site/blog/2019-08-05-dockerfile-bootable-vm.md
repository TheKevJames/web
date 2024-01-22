title: Dockerfile to Bootable GCP-Optimized VM
tags: Technology
description: Scriptable creation of GCP custom VM images from Dockerfiles

This post is an experiment-turned-solution -- as per usual, my code is
available in my [experiments Github repository][thekevjames/experiments:gcp].

This experiment was motivated in part to help support work my team is doing at
Dialpad. [We're hiring][dialpad:careers]! More specifically, I'm hiring for my
team in [Vancouver][dialpad:careers:bc] and [Kitchener][dialpad:careers:kw]!

---

> tl;dr: turn an arbitrary Dockerfile into a bootable and fully GCP-compatible
custom VM image by going [here][thekevjames/experiments:gcp] and running
``make``.

### Why Would I Want to do That?

I recently came across [this fantastic post][iximiuz:post] from
[@iximiuz (Ivan Velichko)][iximiuz] which was a wonderful read -- it turns out
there's not a whole bunch of work required to convert a Docker image into a bootable Linux
disk; it pretty much comes down to installing a kernel, a bootloader, an init
manager, and then loading all that into a disk image. From there, the image is
bootable in QEMU or trivially convertible to other useful formats through, say,
VirtualBox.

Ivan's article has been floating around my head for a couple months now --
his post begun with a challenge I just couldn't ignore:

> _Well, I don't see any practical applications of the approach I'm going to describe..._

Well, I couldn't just let that stand! For a while, I couldn't think of any
useful application either, but recently the stars aligned and the perfect
problem was presented to me:

#### <s>Bragging About My Team</s> Problem Statement

At Dialpad, my team has built up a lot of very cool tooling to help out the
datascience team -- there are plenty of automated pipelines for transforming an
idea and a dataset into an optimized model running in our massively scalable
realtime system. But despite having automated and optimized a good chunk of
that, sometimes there's just no excuse for creating a VM with exactly the right
environment for your model and playing around with your code.

It turns out our datascience team spends some of their time spinning up GCP
instances for exactly this; problem is, even though there's a
[huge list of VM images to choose from][gcp:vms:list], the team still needs to
install all the tools they need on top of those images every single time. GCP
lets you create new VM images by [cloning instance boot disks][gcp:vms:clone],
but that doesn't help us avoid the initial build (which can sometimes take
hours! Libraries for Doing Science™ are no joke). Not to mention, we're
constantly building new models with different architectures, different
dependencies, different everything! We want our datascientists to spend their
time pushing the edges of AI research, not waiting for a `make install` to
complete.

Luckily, the folks at Google were kind enough to allow us to
[import disk images][gcp:vms:import] in addition to cloning them from pre-built
instances. That gives us a nice method for building these images automatically
without having to try to build and destroy a huge number of VMs just for
cloning purposes.

My first thought at this point was to check out [Packer][packer] -- the tools
that come out of the folks at Hashicorp are pretty darn fantastic and I've
found many of them to be invaluable in the past. Unfortunately, this isn't
quite the right tool for the job here: their [GCP image builder][packer:gcp]
only supports cloning instances and their [QEMU image builder][packer:qemu]
doesn't actually solve any of the problems we need it to -- namely, Ivan has
already taught us how to build bootable images, but making those images work on
GCP is a different problem entirely.

I guess that means it's time to roll up our sleeves and start hacking!

### The Actually Interesting Part of this Post

I'm going to mostly gloss over our starting point here; I highly recommend
reading the [original article][iximiuz:post] where all this gets explained. The
core of it is that we have some Dockerfile with a kernal and an init system:

    #!docker
    FROM debian:stretch

    RUN apt-get -qy update && \
        apt-get -qy install --no-install-recommends \
            linux-image-amd64 \
            systemd-sysv && \
        rm -rf /var/lib/apt/lists/*

We build that dockerfile into a tarball:

    #!bash
    docker build -t gcpimg .
    docker create --name=gcpcont gcpimg
    docker export -o disk.tar gcpcont
    docker rm gcpcont

And then we use that tarball to create a VM image with a filesystem and a
bootloader:

    #!bash
    dd if=/dev/zero of=/os/disk.img bs=$((2 * 1024**3)) count=1
    sfdisk /os/disk.img <<EOF
    label: dos
    label-id: 0x5d8b75fc
    device: disk.img
    unit: sectors

    disk.img1 : start=2048, size=4192248, type=83, bootable
    EOF

    losetup -o $((512 * 2048)) /dev/loop0 /os/disk.img
    mkfs.ext3 /dev/loop0

    mkdir -p /os/mnt
    mount -t auto /dev/loop0 /os/mnt/
    tar xf /os/disk.tar -C /os/mnt/

    apt-get update -qy
    apt-get install -qy extlinux
    extlinux --install /os/mnt/boot/
    cat > /os/mnt/boot/syslinux.cfg <<EOF
    DEFAULT linux
      SAY Booting kernel from SYSLINUX...
    LABEL linux
      KERNEL /vmlinuz
      APPEND ro root=/dev/sda1 initrd=/initrd.img
    EOF

    umount /os/mnt
    losetup -D

    dd if=/usr/lib/syslinux/mbr/mbr.bin of=/os/disk.img bs=440 count=1 conv=notrunc

Aside: if you're following along from OSX, you'll need to do all of the
building of this image within Docker -- if you're on Linux, you should be able
to run everything directly, but no one's stopping you from using Docker anyway!
Using a Docker image to build itself into a VM image may be a bit of a
brainteaser, but it gets the job done. If that's how you want to do things, I
recommend using your target image as the builder image (since it is, by
definition, guaranteed to have all the dependencies you'll need) and running
within the following context:

    #!bash
    docker run -it \
        -v $(pwd):/os:rw \
        --privileged \
        --cap-add SYS_ADMIN \
        --device /dev/loop0 \
        --device /dev/loop1 \
        gcpimg bash

At that point, the resulting `disk.img` file is immediately bootable in QEMU:

    #!bash
    qemu-system-x86_64 -drive file=disk.img,index=0,media=disk,format=raw

But that's not quite enough on its own to make the instance work the same as
other GCP image. Where do we go from here?

#### Installing GRUB so We Can Actually Boot Up

The first thing you're going to notice about trying to get this image working
on GCP is that it won't even boot. What gives? It has an MBR
([Master Boot Record][wk:mbr]) and a bootloader, so why does GCP boot up their
instances any differently than QEMU?

Turns out the answer to that is... well, I have no idea, but nestled away in
the [GCP importable images requirements][gcp:vms:reqs] is that your image must
use GRUB (in addition to some other requirements that we'd have to go out of
our way to break, so I'll ignore 'em here). So step one in making our image
GCP-useable: swap out Syslinux for GRUB.

    #!diff
    - apt-get install -qy extlinux
    - extlinux --install /os/mnt/boot/
    - cat > /os/mnt/boot/syslinux.cfg <<EOF
    - DEFAULT linux
    -   SAY Booting kernel from SYSLINUX...
    - LABEL linux
    -   KERNEL /vmlinuz
    -   APPEND ro root=/dev/sda1 initrd=/initrd.img
    - EOF

    - dd if=/usr/lib/syslinux/mbr/mbr.bin of=/os/disk.img bs=440 count=1 conv=notrunc

First off, we're going to need to update our Dockerfile: it's going to need the
`grub-pc-bin` and `grub2-common` packages. Note that you could also install
`grub-pc` directly, but that'll include a bunch of stuff we won't need here.

In our builder image, we're not going to need Syslinux anymore (duh!), but we
will need `multipath-tools` to give us access to `kpartx`, which will let us
deal better with partitions -- in the syslinux code above, we're only mounting
the first partition and blindly overwriting the pre-that-partition disk with
the syslinux MBR. For GRUB, though, we're going to need to actually mount both
the disk and the partition and handle them separately; no blind `dd` usage for
us.

    #!diff
    + apt-get install -qy multipath-tools

    - losetup -o $((512 * 2048)) /dev/loop0 /os/disk.img
    + losetup -P /dev/loop0 /os/disk.img
    + kpartx -va /dev/loop0
    + mknod /dev/loop0p1 b 259 0
    + losetup /dev/loop1 /dev/loop0p1

At this point, the `/dev/loop0` device will be set up as a loopback to our disk
and `/dev/loop1` will be pointing to our first (and only) partition. For here,
we can switch out our syslinux install for a GRUB one.

First off, we'll need to tell GRUB what the _current_ state of our disks look
like. We'll configure the boot disk as being `/dev/loop0` so the GRUB
installation works (but we'll update that later to the correct value for how
our disk will look post-install!):

    #!bash
    mkdir -p /os/mnt/boot/grub
    cat > /os/mnt/boot/grub/device.map <<EOF
    (hd0)   /dev/loop0
    EOF

We'll temporarily bind the devices seen by our builder image into the virtual
disk, so that our disk image can properly be aware of its own disks without
needing to boot into it:

    #!bash
    mount --bind /dev /os/mnt/dev

Next, we'll `chroot` into our disk and have GRUB write out its configuration --
but we'll store that configuration in the _builder image_ rather than the disk
so that we can run the GRUB installer without needing to be booted into that
disk:

    #!bash
    chroot /os/mnt grub-mkconfig -o /boot/grub/grub.cfg

Just one more cleanup before we're ready to install GRUB; here we're just
making sure that GRUB expects its disk to be located at `/dev/sda1` like any
reasonable system rather than being stuck thinking it needs to boot from a
loopback device (eg. our current configuration):

    #!bash
    sed -i 's/loop0p1/sda1/' /os/mnt/boot/grub/grub.cfg

At this point, we're all set up for running the GRUB installer:

    #!bash
    grub-install --no-floppy \
        --boot-directory=/os/mnt/boot \
        --modules="ext2 part_msdos" \
        /dev/loop0

Note the modules we've enabled here: the unfortunately named `ext2` module
enables support not just for `ext2` but also the `ext3` filesystem we're using
(and also `ext4`, if you're feeling frisky). `part_msdos` enables support for
DOS-style disk partitioning, which is what we configured way up above with
`sfdisk`.

Once GRUB is installed, we can have the virtual disk configure its own
`device.map` properly rather than pointing to the loopback device and
gracefully unmount our resources:

    #!bash
    chroot /os/mnt grub-mkdevicemap

    umount /os/mnt/dev
    umount /os/mnt
    dmsetup remove_all
    losetup -D

Our disk image is bootable again, this time through GRUB rather than Syslinux,
but there's just a few things we'll want to configure to help us out down the
line: configuring GRUB's output to be in the place/format GCP will expect it
and disabling the pointless 5s timer before GRUB boots:

    #!bash
    cp /os/mnt/usr/share/grub/default/grub /os/mnt/etc/default/grub
    sed -i 's/quiet/console=ttyS0,38400n8d/' /os/mnt/etc/default/grub
    sed -i 's/GRUB_TIMEOUT=5/GRUB_TIMEOUT=0/' /os/mnt/etc/default/grub

#### Adding All the Useful Features

At this point, our image would technically work in GCP, but it wouldn't be all
that useful -- it'd be a mostly-filled 2GB disk with a readonly filesystem
accessible only over a serial port and with no configured internet access (and
its system time would be wrong, too). I suppose there _might_ exist some case
where this is what we need, but I don't buy it. Let's go through and fix all
those things!

First off, let's update our base image with all the things we'll need later:

    #!docker
    # this must be supported by "gcloud compute images import"
    FROM debian:stretch

    # cloud-guest-utils: for automatically expanding the file system
    #     See github.com/andsens/bootstrap-vz/tree/master/bootstrapvz/plugins/expand_root
    # grub: the only bootloader which works on GCE
    # isc-dhcp-client: the only DHCP client which works on GCE
    #     Note: the docs suggest isc-dhcp-client is only a *recommendation*,
    #           but I've not been able to get anything else to work properly
    # linux-image-adm64: because we'll definitely need a kernel installed
    # openssh-server: any ssh server would do the trick
    # sudo: since ssh-as-root and user passwords will be disabled, this is
    #       pretty necessary.
    # systemd-sysv: I'm most familiar with systemd, but anything would work
    RUN apt-get -qy update && \
        apt-get -qy install --no-install-recommends \
            cloud-guest-utils \
            grub-pc-bin \
            grub2-common \
            isc-dhcp-client \
            linux-image-amd64 \
            openssh-server \
            sudo \
            systemd-sysv && \
        rm -rf /var/lib/apt/lists/*

    # isc-dhcp-client doesn't come with its own systemd unit
    COPY dhclient.service /etc/systemd/system/dhclient.service
    RUN systemctl enable dhclient

    # automatically expand the disk partition on boot to use the full disk
    COPY expand-root.service /etc/systemd/system/dhclient.service
    COPY expand-root /usr/local/sbin/expand-root
    RUN systemctl enable expand-root

Note that I'm referencing a few files there:
[dhclient.service][thekevjames/experiments:dhclient.service] is just a simple
systemd unit file for starting our DHCP client and
[expand-root][bootstrap-vz:expand-root] is copied from the most recent in the
chain of open-source projects Google used for creating their public VM images
(aside: this project is archived, does anyone know if there's a successor?).

We're going to want to make sure our root file system gets mounted with write
permissions (but keep in mind that from here on if you run your image in QEMU
for testing, any changes you make will be reflected in the `disk.img` file!):

    #!bash
    blkid | awk '/loop1/ {print "UUID="substr($2, 7, length($2)-7)"\011/\011ext3\011defaults\0111\0111"}' > /os/mnt/etc/fstab

We'll also want our instance to boot on its own as the root user rather than
hanging until we connect to the serial port and log in from there:

    #!bash
    cat > /os/mnt/etc/systemd/system/getty@.service.d/override.conf <<EOF
    [Service]
    ExecStart=
    ExecStart=-/sbin/agetty --noclear -a root %I $TERM
    EOF

Finally, Google provides some [configuration recommendations][gcp:vms:config]:
all of these are optional, but they're pretty much strictly a good idea in our
case:

    #!bash
    echo '127.0.0.1 localhost' > /os/mnt/etc/hosts
    echo 'ALL     ALL = (ALL) NOPASSWD: ALL' >> /os/mnt/etc/sudoers
    echo 'server metadata.google.internal iburst' > /os/mnt/etc/ntp.conf
    echo 'net.ipv6.conf.all.disable_ipv6 = 1' > /os/mnt/etc/sysctl.conf

    sed -i 's/^#\?PermitRootLogin .*$/PermitRootLogin no/' /etc/ssh/sshd_config
    sed -i 's/^#\?PasswordAuthentication .*$/PasswordAuthentication no/' /etc/ssh/sshd_config
    sed -i 's/^#\?HostbasedAuthentication .*$/HostbasedAuthentication no/' /etc/ssh/sshd_config
    sed -i 's/^#\?AllowTcpForwarding .*$/AllowTcpForwarding yes/' /etc/ssh/sshd_config
    sed -i 's/^#\?PermitTunnel .*$/PermitTunnel no/' /etc/ssh/sshd_config
    sed -i 's/^#\?X11Forwarding .*$/X11Forwarding no/' /etc/ssh/sshd_config
    sed -i 's/^#\?ClientAliveInterval .*$/ClientAliveInterval 420/' /etc/ssh/sshd_config

    cat > /os/mnt/etc/ssh/ssh_config <<EOF
    Host *
    Protocol 2
    ForwardAgent no
    ForwardX11 no
    HostbasedAuthentication no
    StrictHostKeyChecking no
    Ciphers aes128-ctr,aes192-ctr,aes256-ctr,arcfour256,arcfour128,aes128-cbc,3des-cbc
    Tunnel no

    # Google Compute Engine times out connections after 10 minutes of inactivity.
    # Keep alive ssh connections by sending a packet every 7 minutes.
    ServerAliveInterval 420
    EOF

#### Last Mile: Using the Image in GCP

At this point, our image will run in GCP with all the options and features of
any other GCP VM image. If we want to update our VM with any extra
dependencies, all we need to do is update our `Dockerfile` and re-run the
build.

To get our image loaded into GCP, we need to convert it to the expected format
and push it to Google Storage:

    #!bash
    qemu-img convert -O raw disk.img disk.raw
    gtar --format=oldgnu -Sczf disk.tar.gz disk.raw

    gsutil cp disk.tar.gz gs://my-image-bucket
    gcloud compute images create custom-unoptimized \
        --source-uri gs://my-image-bucket/disk.tar.gz

You may have noticed I refered to that image as "unoptimized" -- that's because
we've not yet attached all the final stuff that makes an image truly useful on
GCE, things like IAM integration and such. Fortunately, GCP actually has a
built-in import tool which can do this for us:

    #!bash
    gcloud compute images import custom-v$(date '+%Y%m%d') \
        --source-image custom-unoptimized \
        --os debian-9
    gcloud compute images delete custom-unoptimized

And that's it! We can now create instances from the ``custom`` versioned images
which work the same way any of the provided-by-Google base images do:

    #!bash
    gcloud compute instances create kevin-test \
         --machine-type n1-standard-1 \
         --zone=us-central1-a \
         --boot-disk-size=10GB \
         --image=custom-v20190729


[bootstrap-vz:expand-root]: https://github.com/andsens/bootstrap-vz/tree/master/bootstrapvz/plugins/expand_root/assets
[dialpad:careers]: https://www.dialpad.com/careers/
[dialpad:careers:bc]: https://www.dialpad.com/careers/apply/software-engineer---data/vancouver-canada
[dialpad:careers:kw]: https://www.dialpad.com/careers/apply/software-engineer---data/kitchener-ontario,-canada
[gcp:vms:clone]: https://cloud.google.com/compute/docs/images/create-delete-deprecate-private-images
[gcp:vms:config]: https://cloud.google.com/compute/docs/import/configuring-imported-images
[gcp:vms:import]: https://cloud.google.com/compute/docs/import/import-existing-image
[gcp:vms:list]: https://cloud.google.com/compute/docs/images#os-compute-support
[gcp:vms:reqs]: https://cloud.google.com/compute/docs/import/importing-virtual-disks#Limitations
[iximiuz]: https://github.com/iximiuz
[iximiuz:post]: https://iximiuz.com/en/posts/from-docker-container-to-bootable-linux-disk-image/
[packer]: https://www.packer.io/
[packer:gcp]: https://www.packer.io/docs/builders/googlecompute.html
[packer:qemu]: https://www.packer.io/docs/builders/qemu.html
[thekevjames/experiments:dhclient.service]: https://github.com/TheKevJames/experiments/blob/master/gcp-image-from-docker/builtin/dhclient.service
[thekevjames/experiments:gcp]: https://github.com/TheKevJames/experiments/tree/master/gcp-image-from-docker
[wk:mbr]: https://en.wikipedia.org/wiki/Master_boot_record
