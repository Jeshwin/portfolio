import Link from 'next/link'
import Image from 'next/image'
import Astroholder from '../../public/astroholder.png'

import GradientButton from './gradientbutton'

export default function Greeting() {
  return (
    <>
      <main className='min-h-screen flex flex-col lg:flex-row justify-between items-center'>
          <div className="hero min-h-screen bg-gradient-to-t from-base-100 to-base-200">
            <div className="hero-content max-w-full w-auto p-0 lg:p-1 lg:px-40 xl:px-80 flex-col-reverse lg:flex-row">
                <div className="mx-auto lg:mr-20 max-w-xs lg:max-w-3xl text-center text-base-content">
                  <h1 className="mb-5 text-xl md:text-3xl lg:text-5xl font-bold">Hello, I&apos;m <span className="text-primary">Jeshwin Prince</span></h1>
                  <p className="mb-5 md:lext-lg lg:text-2xl">
                    I am a first-year Computer Engineering student at Santa Clara University.
                    I love programming, 3d printing, playing the guitar, and making art in Blender!
                    Check out my portfolio, resume, and blog here!
                  </p>
                  {/* <Link href="/about" className="btn btn-primary border-0 bg-gradient-to-r from-primary to-secondary hover:from-primary-focus hover:to-secondary-focus 2xl:btn-lg 2xl:text-xl">Let&apos;s Go!</Link> */}
                  <GradientButton href="/about" text="About Me" left="primary" right="secondary" /> 
                </div>
                <div className="relative -mt-24 w-80 lg:w-[40rem] aspect-square">
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