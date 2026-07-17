---
title: "My Experience with Flutter"
description: "My experience working with Flutter in my internship and my personal projects."
created_at: 2023-09-20T18:31:41.474Z
updated_at: 2023-09-20T18:31:41.474Z
tags:
  - flutter
  - mobile development
  - internship
---

I recently started an online internship at [EinNel Technologies](https://einnel.com/), a company in India which I had a connection to. So far, it has been a great learning experience, not only for expertise with certain programming tools, but also with working in an active team. I was assigned to the mobile development team, where we use Flutter to create our mobile apps.

I have had some previous experience Flutter, the mobile development framework, and Dart, the language Flutter uses. Funnily enough, it was also when I was working with a team in India! During my previous time working on a Flutter project, I didn't understand too much, and mostly helped around with maintaining our version control and selling our app to our church members.

Now, by working in a more professional capacity with Flutter, I've definitely learned a lot more. The hands-on experience working at EinNel has been a great boost to my career. But before I keep writing about my experience with Flutter, what even is it?

## What is Flutter and Dart?

[Flutter](https://flutter.dev/) is an open-source UI software development framework created by Google. It's designed to help developers build natively compiled applications for mobile, web, and desktop from a single codebase. Flutter allows developers to create beautiful and highly customizable user interfaces with ease. It achieves this through a rich set of pre-designed widgets that can be easily customized to match the desired look and feel of your app. Flutter has gained popularity for its fast-growing community, extensive documentation, and robust ecosystem of packages, making it a versatile choice for building cross-platform mobile applications.

[Dart](https://dart.dev/) is the programming language that powers Flutter. Developed by Google, Dart is a modern, object-oriented language known for its simplicity and efficiency. Dart's syntax is similar to Java or Kotlin, which are also used for mobile app development. Dart's concise syntax and strong type system make it relatively easy to learn and maintain, even for developers with varying levels of experience. It also boasts a well-structured package manager, [Pub](https://pub.dev/), which simplifies the process of adding third-party libraries to your Flutter project. With Dart as the foundation, Flutter provides a powerful and efficient environment for building cross-platform mobile apps, ensuring not only beautiful UIs but also excellent performance across different devices and platforms.

## What I worked on

At EInNel, my first project was to re-create their attendance app using Flutter. My boss split up the work into smaller steps and gave each of them to me as daily or weekly tasks. For example, one day I would work on just the login page, then the next day just the profile page. At first the tasks were straightforward, introducing me to the variety of widgets that Flutter uses to manage the app's front-end UI. Eventually I started to work on connecting the front-end I had made to the back-end infrastructure that EInNel used. Working on this part of the project was much harder for me because I had to deal with several APIs, all with different specifications. Figuring out whether to use a POST or a GET request was unclear to me at first, and even if I could figure it out, debugging any issues I faced would take a very long time and leave me frustrated. Even though the difficulty of my assignment increased, I am still continuing to learn and grow through my experience.

## Personal Project

While working on the front-end of the project at EinNel, I still wanted to learn more about the capabilities of Flutter. So, I decided to start on my own personal project that used Flutter. I wanted to create a [pomodoro timer](https://en.wikipedia.org/wiki/Pomodoro_Technique), which I have been using since high school to keep me focused and productive. If I could successfully make this app, I could use it to manage my time better, and maybe even help other people too!

### Highs

I started making the timer app by working on the front-end first, which was very fun. I discovered neumorphic design, which creates this 3d effect for buttons and other widgets. Although it has its issues with accessibility, I still wanted to try it out and see it in a real app. I also started to use Figma for app design, which was a tool I wasn't familiar with at first. I started to get the hang of it as I iterated upon my front-end design, and I hope to use it more extensively in my future projects.

### Lows

Things started getting more difficult when adding the back-end. I guess that back-end is not my strong suit! Instead of API calls to an external server. The problem arose when testing my app on a physical device. When testing a Flutter app, I usually start with running my app on a phone simulator, such as the iOS simulator provided on Mac computers with Xcode. Programs run differently on the simulator, so you can't do any performance or UX testing through a simulator. When I was happy with the results on the simulator, I tried to run my app on my iPhone. I encountered a bug where the timer would stop if the app wasn't running in the foreground, but would instead pause. I did some research on the issue and found that making a timer app in Flutter requires making platform-specific changes, meaning that timers work differently on Android and iOS. Because of this roadblock, I started to give up on this project. Recently, however, I changed my goals for this project and am willing to try it again, just with some slightly different functionality. I also want to write a longer blog post just about this app ~~if~~ when I finish it.

## Wrap Up

In general, I have had a very positive experience programming with Flutter. With support from my boss at EinNel, I am learning a lot about the framework through hands-on experience. Working on my personal project, the pomodoro timer, has also taught me not only more about Flutter, but also important concepts in mobile app development in general, such as testing, debugging, and specification.
