title: Kubernetes Multi-Cluster Lifecycle Management
tags: Technology
description: How to design, plan, and execute upgrades in multi-cluster k8s

I've been collaborating with some of the brilliant folks over at Google to help
come up with a shared understanding of what safe upgrade processes look like in
the world of Kubernetes -- with a focus on the idea of cluster management, eg.
one level of abstraction up the chain for safe rollouts of entities *within*
your clusters.

We're working towards a model of treating clusters entirely ephephemerally, in
true ["pets vs cattle"](https://devops.stackexchange.com/q/653) fashion. The
first step is a five-part blog series hosted on Google Cloud's Medium space: a
dive into terminology, thoughts on important considerations, and then some
hands-on guides for a manual process using GKE's "Multi-Cluster Ingress for
Anthos" product.

You can read all about it [here](https://bit.ly/gke-multicluster-lifecycle)!
