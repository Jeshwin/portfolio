import Link from 'next/link'
import Image from 'next/image'
import Astroholder from '../../public/astroholder.png'

export default function Greeting() {
  return (
    <>
      <main className='min-h-screen flex flex-col lg:flex-row justify-between items-center'>
          <div className="hero min-h-screen bg-gradient-to-t from-base-100 to-base-200">
            <div className="hero-content gap-6 max-w-full w-auto p-0 lg:p-1 lg:px-20 2xl:px-40 flex-col-reverse lg:flex-row">
                <div className="mx-auto max-w-xs md:max-w-xl lg:max-w-2xl text-center text-base-content">
                  <h1 className="mb-5 text-xl md:text-3xl lg:text-5xl font-bold">Hello, I&apos;m <span className="font-bold bg-clip-text text-transparent bg-gradient-to-br from-primary to-secondary">Jeshwin Prince</span></h1>
                  <p className="mb-5 md:lext-lg lg:text-2xl">
                    I am a first-year Computer Engineering student at Santa Clara University.
                    I love programming, 3d printing, playing the guitar, and making art in Blender!
                    Check out my portfolio, resume, and blog here!
                  </p>
                  <Link href="/articles/resume#top" className="btn btn-primary lg:btn-lg lg:text-xl border-0 bg-gradient-to-br from-primary to-secondary hover:from-primary-focus hover:to-secondary-focus">Let&apos;s Go!</Link>
                </div>
                <div className="relative -mt-24 w-80 lg:w-[40rem] aspect-square">
                  <Image fill src={Astroholder} alt="placeholder image of an astronaut" />
                </div>
            </div>
          </div>
      </main>
    </>
  )
}