import MyHead from '@/components/head'
import Greeting from '@/components/greeting'
import HomeCard from '@/components/homecards'

export default function Home() {
  return (
    <>
      <MyHead title="Hello Jeshwin" />
      <Greeting />
      <div className='flex flex-col lg:flex-row p-4 xl:py-12 lg:px-40 xl:px-80 gap-4 w-auto'>
        <HomeCard
          color1="primary"
          color2="secondary"
          title="Portfolio"
          description="Check out all my projects"
          link="/projects"
        />
        <HomeCard
          color1="secondary"
          color2="accent"
          title="Resume"
          description="Look at a copy of my resume"
          link="/resume"
        />
        <HomeCard
          color1="accent"
          color2="primary"
          title="Blog"
          description="Read my weekly blog posts"
          link="/articles"
        />
      </div>
    </>
  )
}
