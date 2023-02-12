import Link from 'next/link'

import MyHead from '@/components/head'
import Greeting from '@/components/greeting'
import IntroHero from '@/components/introhero'

export default function Home() {
  return (
    <>
      <MyHead title="Hello Jeshwin" />
      <Greeting />
      <IntroHero
        reverse={true}
        title="Resume"
        description="Don\'t you think that regular paper resumes are too boring?
          I sure do! Why not check out my resume on my website!
          As a digital version of my resume, it is not only more readable but also adds more details that would be restricted by a paper format.
          Even still, you can download a PDF version of my resume here, too."
        href="/resume"
        from="primary"
        to="secondary"
      />
      <IntroHero
        reverse={false}
        title="Portfolio"
        description="I work on a lot of projects.
          In my free time, I like to start new personal projects that teach me new skills,
          such as web design, computer programming, embedded software and 3d modeling.
          You can find a portfolio of all my previous and current personal projects here."
        href="/projects"
        from="secondary"
        to="accent"
      />
      <IntroHero
        reverse={true}
        title="Blog"
        description="Some of my projects can get very large and can't be contained in just a portfolio entry.
          For those types of projects, I write blog posts about them!
          I love to write blogs about new projects I am working on,
          the status of previous projects, or just anything that I've found interesting.
          I hope to post here more regularly."
        href="/articles"
        from="accent"
        to="primary"
      />
      {/* <div className='flex flex-col p-4 xl:py-12 lg:px-40 xl:px-80 gap-4 w-auto'>
        <div className="h-auto p-8 basis-1/3 card bg-base-200 rounded-box">
          <div className='pb-3 mb-3 text-4xl font-bold border-b-2 border-base-content'>Portfolio</div>
          <div className='w-5/6 text-xl pb-4'>Check out all my projects</div>
          <div className='card-actions justify-end'>
            <Link href="/projects" className="btn lg:btn-lg btn-primary border-0 bg-gradient-to-br from-primary to-secondary hover:from-primary-focus hover:to-secondary-focus">Portfolio</Link>
          </div>
        </div>
        <div className="h-auto p-8 basis-1/3 card bg-base-200 rounded-box">
          <div className='pb-3 mb-3 text-4xl font-bold border-b-2 border-base-content'>Resume</div>
          <div className='w-5/6 text-xl pb-4'>Look at a copy of my resume</div>
          <div className='card-actions justify-end'>
            <Link href="/resume" className="btn lg:btn-lg btn-secondary border-0 bg-gradient-to-br from-secondary to-accent hover:from-secondary-focus hover:to-accent-focus">Resume</Link>
          </div>
        </div>
        <div className="h-auto p-8 basis-1/3 card bg-base-200 rounded-box">
          <div className='pb-3 mb-3 text-4xl font-bold border-b-2 border-base-content'>Blog</div>
          <div className='w-5/6 text-xl pb-4'>Read my weekly blog posts</div>
          <div className='card-actions justify-end'>
            <Link href="/articles" className="btn lg:btn-lg btn-accent border-0 bg-gradient-to-br from-accent to-primary hover:from-accent-focus hover:to-primary-focus">Blog</Link>
          </div>
        </div>
      </div> */}
    </>
  )
}
