---
title: "Making my Website"
description: "A short article about my experience making this website"
created_at: 2023-08-03T21:58:54.645Z
updated_at: 2023-08-04T00:05:45.331Z
tags:
  - website
  - javascript
  - project
---

# Why did I make my website?

During the summer of 2021, I first learned about [Node.js](https://nodejs.org/en). My first experience with JavaScript was learning basic HTML in middle school, adding code between script tags to make the text change when the mouse hovered over it and little things like that. Node changed my whole paradigm with JavaScript, allowing me to run JavaScript directly on my computer or even a cloud server. At the same time, I was introduced to JavaScript frameworks that I could use to make my own website fully in JavaScript. Therefore, for my summer I decided to try and make my own responsive website using this technology that I had recently learned about.

My first trial at a website used [Vue.js](https://vuejs.org/), a popular open source component framework, and [Express](https://expressjs.com/) for the back-end. While I was able to make a working website on my own computer, I ran into scaling issues trying to host my website, since it required two separate running instances of Node for the front and back ends. I had experimented with using [Docker](https://www.docker.com/) Compose for this, but I didn't have enough experience with hosting on the cloud to maintain my own server running Docker.

My next attempt the following summer had more success. Instead of using Vue, which lacked in developer support, I switched to using [React](https://react.dev/). the most popular JavaScript component framework created at Facebook. I was able to learn this entirely new framework relatively easily not only because of the greater access to resources on the Internet, but also because my previous experience with Vue gave me a more solid foundation with developing with JavaScript and Node. I wasn't able to host my website during that summer either, but this year that changed.

# How did I make my website?

As I started my first year at Santa Clara University, I discovered a new hosting platform called [Vercel](https://vercel.com/home). Their solutions offered an intuitive interface for hosting and maintaining my own website. I couldn't recommend them enough! Their website allowed me to easily access deployments in both preview and production environments, sync environment variables between my local system and the server, and even [manage my own PostgreSQL database](https://vercel.com/storage/postgres). Because I didn't have to worry about hosting, I could productively iterate on my website design and make much more progress than my previous attempts.

While I still used React components, I also used another Vercel technology in my website, [NextJS](https://nextjs.org/), a more robust framework that synergized with my production workflow. To make my website look nice, I used [TailwindCSS](https://tailwindcss.com/), a utility-class-based CSS framework, and [DaisyUI](https://daisyui.com/), a component framework that made my designs more consistent across web pages. I used [Prisma](https://www.prisma.io/) as an [ORM](https://en.wikipedia.org/wiki/Object%E2%80%93relational_mapping), or object-relational mapping, which allowed me to query my SQL database using JavaScript code. To store images for my portfolio entries, I used [AWS S3](https://aws.amazon.com/s3/), a file hosting service, which gave me experience working with cloud servers.

The most important technology I used when making this website was [TypeScript](https://www.typescriptlang.org/), a superset of JavaScript that incorporates static typing features in a dynamically typed language. In short, TypeScript makes my code more readable, maintainable, and debuggable. While TypeScript is still an emerging technology, I hope to be able to use it in future web projects.

# Main Challenges

The biggest challenge I faced when finishing this website was, well, finishing! Without a clear goal in mind, it's hard to know when to stop and create a finished project. I recognize that I tend to focus on extremely small features or aesthetic bugs that don't contribute to my main project rather than trying to get something that works as intended. By working on this project, especially over the final week, I learned how to meaningfully prioritize features within a project to boost my productivity.

I also faced some challenges stitching the back end and the front end through my APIs. NextJS combines support for front end and back end development through an API directory, but I also needed to ensure that my NextJS API endpoints, my SQL database, and my S3 files were all synchronized when a request was made. A lot of my time was spent just making sure that the images could be sent to the cloud at all! I struggled the most with this because I didn't have that much experience with the cloud, but after going over the documentation from Amazon and from Prisma, I was able to overcome these challenges and create a finished product.

# What I Learned

More-so that programming knowledge, I think this whole website making experience taught me how I should organize my projects going forward. My previous attempts at making a website failed because I didn't think about web hosting until it became too late to easily add features or check for bugs. Before starting a new project, I now plan on formulating a prototype of my front end and back end using online tools such as [Figma](https://www.figma.com/) or even just drawing out flow charts of my APIs. All in all, I am happy that I was able to finish my website and learn so much during the process!
