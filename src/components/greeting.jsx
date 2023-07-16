import Link from 'next/link'
import Image from 'next/image'
import Astroholder from '../../public/astroholder.png'

export default function Greeting() {
  return (
    <>
      <main className='flex flex-col lg:flex-row justify-items-center'>
          <div className="hero h-screen mx-auto py-12 lg:py-24 bg-gradient-to-t from-base-100 to-base-200">
            <div className="hero-content gap-6 max-w-7xl p-0 lg:p-1 px-auto mx-10 flex-col">
              <div className="relative -mt-24 w-[24rem] lg:w-[42rem] aspect-square">
                <Image fill src={Astroholder} alt="placeholder image of an astronaut" />
              </div>
              <div className="mx-auto max-w-7xl text-center text-base-content">
                <h1 className="mb-5 text-xl md:text-3xl lg:text-5xl font-bold">Hello, I&apos;m <span className="font-bold bg-clip-text text-transparent bg-gradient-to-br from-primary to-secondary">Jeshwin Prince</span></h1>
                <p className="mb-5 md:lext-xl lg:text-3xl">
                  I am a first-year Computer Engineering student at Santa Clara University.
                  I love programming, 3d printing, playing the guitar, and making art in Blender!
                  Check out my resume, portfolio, project demos, and blog posts right here!
                </p>
                <Link href="/articles/resume#top" className="btn btn-primary lg:btn-lg lg:text-xl border-0 bg-gradient-to-br from-primary to-secondary hover:from-primary-focus hover:to-secondary-focus">Let&apos;s Go!</Link>
              </div>
            </div>
          </div>
      </main>
    </>
  )
}