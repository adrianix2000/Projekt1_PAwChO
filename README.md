<center>

# Project 1


### University project for programming in cloud computing

</center>

The goal of the project was to create a simple application that, based on the client's IP address, would display information about their time zone and current time and then deploying it in Docker.

<center>

### The technologies that I used:

</center>

<p align="center">
  <img src="https://img.icons8.com/color/48/000000/javascript.png" alt="JavaScript" width="50" />
  <img src="https://img.icons8.com/fluent/48/000000/github.png" alt="GitHub" width="50" /> 
  <img src="https://img.icons8.com/color/48/000000/docker.png" alt="Docker" width="50" />
</p>

### How to deploy and run it in docker ?

In simplest way you can download source from my github and use default dockerfile to create image, using following command:

```bash
docker build -t timezonegetter .
```

Before running the image, you can ensure that it is available locally on your machine:

```bash
docker images --filter reference=timezonegetter
```








