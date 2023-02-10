import Link from 'next/link'
import Image from 'next/image'
import Astroholder from '../../public/astroholder.png'

export default function Greeting() {
  return (
    <>
      <main className='min-h-screen flex flex-col lg:flex-row justify-between items-center'>
          <div className="hero min-h-screen bg-primary">
            <div className="hero-content p-0 lg:p-1 flex-col-reverse lg:flex-row">
                <div className="mx-auto lg:mr-20 max-w-xs lg:max-w-7xl text-center text-neutral-content">
                  <h1 className="mb-5 text-xl md:text-3xl lg:text-5xl font-bold">Hello, I&apos;m Jeshwin Prince</h1>
                  <p className="mb-5 md:lext-lg lg:text-2xl">
                    I am a first-year Computer Engineering student at Santa Clara University.
                    I love programming, 3d printing, playing the guitar, and making art in Blender!
                    Check out my portfolio of all my projects here!
                  </p>
                  <Link href="/projects" className="btn btn-secondary 2xl:btn-lg 2xl:text-xl">Let&apos;s Go!</Link>
                </div>
                <div className="relative -mt-24 w-80 lg:w-[100rem] aspect-square">
                <Image 
                  src={Astroholder}
                  alt="placeholder image of an astronaut"
                  fill
                />
                </div>
            </div>
          </div>
      </main>
    </>
  )
}