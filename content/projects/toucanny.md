---
title: "Toucanny"
description: "A unique username and avatar generator."
created_at: 2024-12-02T06:31:01.779Z
updated_at: 2024-12-02T06:31:01.779Z
thumbnail: /images/projects/toucanny/thumbnail.jpg
tags:
  - web
  - programming
  - website
links:
  - title: "Toucanny Website"
    url: "https://api.toucanny.net/"
  - title: "GitHub Repo"
    url: "https://github.com/Jeshwin/toucanny"
artifacts:
  - type: image
    url: /images/projects/toucanny/example-avatars.png
    alt: "Some example avatars generated using Toucanny"
---

While working on another one of my personal projects, CodeNest, I wanted a custom solution for generating a default username and avatar when a user signs up. Currently, we are using Auth0 to handle user login and signup, and they already create a default avatar using Gravatar, but I found it to be too boring, just the user's initials and a background color. So, I decided to make my own version, and add a username generator on top.

My objective for this project was to create a username and avatar generator that generates a unique username and avatar for each new user, with no chance for duplicates, and creates a memorable and interesting output, not just random characters and a bland image.
