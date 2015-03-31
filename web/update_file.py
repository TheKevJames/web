import os
from shutil import move
from stat import S_IEXEC


def update(filename, key, value):
    tmpfile = filename + '.tmp'

    with open(filename, 'r') as read:
        with open(tmpfile, 'w') as write:
            for line in read:
                if line.startswith(key):
                    write.write(value + '\n')
                else:
                    write.write(line)

    move(tmpfile, filename)
    os.chmod(filename, os.stat(filename).st_mode | S_IEXEC)
