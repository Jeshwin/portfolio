import MyHead from '@/components/head'
import Greeting from '@/components/greeting'
import HomeAbout from '@/components/homeabout'
import HomeCard from '@/components/homecards'

export default function Home() {
  return (
    <>
      <MyHead title="Hello Jeshwin" />
      <Greeting />
      <HomeAbout />
      <div className='flex flex-col lg:flex-row p-4 xl:py-12 xl:px-48 gap-4 w-auto'>
        <HomeCard
          color="primary"
          title="Portfolio"
          description="Check out all my projects"
          link="/projects"
        />
        <HomeCard
          color="secondary"
          title="Resume"
          description="Look at a copy of my resume"
          link="/resume"
        />
        <HomeCard 
          color="warning"
          title="Blog"
          description="Read my weekly blog posts"
          link="/articles"
        />
      </div>
    </>
  )
}
