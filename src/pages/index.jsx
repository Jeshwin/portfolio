import Link from 'next/link'

import MyHead from '@/components/head'
import Greeting from '@/components/greeting'
import IntroHero from '@/components/introhero'

export default function Home() {
  return (
    <>
      <MyHead title="Jeshwin's Website" />
      <div id='top'></div>
      <Greeting />
      <IntroHero
        reverse={true}
        title="Resume"
        description="Don't you think that regular paper resumes are too boring?
          I sure do! Why not check out my resume on my website!
          As a digital version of my resume, it is not only more readable but also adds more details that would be restricted by a paper format.
          Even still, you can download a PDF version of my resume here, too."
        href="/articles/resume#top"
      />
      <IntroHero
        reverse={false}
        title="Portfolio"
        description="I work on a lot of projects.
          In my free time, I like to start new personal projects that teach me new skills,
          such as web design, computer programming, embedded software and 3d modeling.
          You can find a portfolio of all my previous and current personal projects here."
        href="/portfolio#top"
      />
      <IntroHero
        reverse={true}
        title="Demos"
        description="Tired of static screenshots and plain descriptions? Welcome to the demo section of my personal website!
        Here, I showcase interactive demos and simulations that bring my projects to life.
        Whether it's a web application, a game prototype, or an innovative user interface,
        these demos allow you to experience firsthand the functionality and creativity behind my work.
        I believe that seeing is believing, so explore the demos below and get a taste of what I can do.
        Don't worry, if you prefer a downloadable version, you can also find links to standalone executables or code repositories for each demo.
        Prepare to be amazed by the interactive wonders awaiting you in this section!"
        href="/demo#top"
      />
      <IntroHero
        reverse={false}
        title="Blog"
        description="Some of my projects can get very large and can't be contained in just a portfolio entry.
          For those types of projects, I write blog posts about them!
          I love to write blogs about new projects I am working on,
          the status of previous projects, or just anything that I've found interesting.
          I hope to post here more regularly."
        href="/articles#top"
      />
    </>
  )
}
