# TheKev.in

This is where my personal website lives. Check it out [here!](http://thekev.in)

## Deploy

Since you only really need the `docker-compose.yml` file for deployment, you
can deploy with:

    wget https://raw.githubusercontent.com/TheKevJames/thekev.in/master/docker-compose.yml
    mkdir -p web  # docker-compose oddity
    docker-compose pull
    docker-compose up -d
