---
title: "BridgeIDE: My Experience"
description: "My reflection on my undergraduate senior design project"
created_at: 2026-09-07T22:49:38Z
updated_at: 2026-09-03T16:54:27Z
tags:
    - project
    - experience
    - docker
---

# What was BridgeIDE?

## The Beginning

BridgeIDE started off as a personal project among friends. One day, my friend Ethan asked me if he wanted to work together on a project we could put on our resume and talk about with recruiters. A few days later, over lunch, I proposed three ideas. One was a website to slice and manage 3D prints, similar to [AstroPrint](https://www.astroprint.com/), because I was really interested in 3D printing at the time. I had another idea, but it was so lackluster I've forgotten. But the third project idea clicked almost instantly with us. It was a coding environment running on the browser, just like [VS Code Web](https://code.visualstudio.com/docs/remote/vscode-web) and [Replit](https://replit.com/) (before they went all-in on vibe coding slop). The key innovation we wanted to add that would make the app really stand out was real-time collaboration. Although this is a feature that already existed on Replit and can be added to local IDEs through extensions like [Live Share](https://visualstudio.microsoft.com/services/live-share/), we hoped that our project would help us understand how these features work, and show others that we could contribute to similarly complex features in the future. However, this first version of the project _wasn't_ BridgeIDE!

## CodeNest

We named this personal project [CodeNest](https://www.codenest.space/), because ~~ChatGPT came up with a good name~~ it's like a nest for your code. We started development during my sophomore year at SCU, and continued until summer of junior year. When we initially started the project. We treated this project as if it was for a class, working on our system design and frontend sketches in between studying for linear algebra and circuits. Figuring out the best way to run the code that users would write in CodeNest was the hardest problem we had to solve, but it was the most rewarding experience of the whole project. It taught me the importance of system design and planning before development.

In order to display the editor, file explorer, and terminal all on the same page, similar to VS Code's panel system and Replit's pane system, my work on CodeNest spawned a new project I called [react-layman](https://www.npmjs.com/package/react-layman). The goal of react-layman was to create a component library for tiling windows and tabs, supporting drag and drop, split views, and mpre.

I distinctly remember one day I was drawing out a system diagram for CodeNest using Kubernetes for my friends Ethan and Arnav, and we spent 20 minutes planning out how to package user-generated code into pods, programmatically scale and distribute workloads, and connect the user-facing website to the correct pod in real-time using WebSockets. I felt like I was prepping for an interview!

What made CodeNest so special to me wasn't just the uniqueness of the project, but the experience of working as a team to solve complex problems, design our solution, and actually implement it into the real world. It was an experience I'll never forgot. But how did CodeNest ultimately become BridgeIDE?

## Senior Design Project

In order to graduate from Santa Clara University, all students in the School of Engineering must complete a senior design capstone project and present it at the annual Senior Design Conference. While many students work on research projects already owned by faculty at SCU, my team and I decided to create our own proposal and connect with faculty that were interested in mentoring our project.

# How we Made it

# Presenting our Project

# Final Thoughts
