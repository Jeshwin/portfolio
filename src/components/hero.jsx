import Image from 'next/image'
import Astroholder from '../../public/astroholder.png'

export default function Hero() {
  return (
    <>
      <main className='min-h-screen flex flex-row justify-between items-center'>
          <div className="hero min-h-screen bg-cover bg-gradient-to-t from-neutral to-primary">
            <div className="hero-content flex-row">
                <div className="mr-20 max-w-lg 2xl:max-w-7xl text-center text-neutral-content">
                    <h1 className="mb-5 text-4xl 2xl:text-5xl font-bold">Hello, I&apos;m Jeshwin Prince</h1>
                    <p className="mb-5 2xl:text-2xl">
                      I am a first-year Computer Engineering student at Santa Clara University.
                      I love programming, 3d printing, playing the guitar, and making art in Blender!
                      Check out my portfolio of all my projects here!
                    </p>
                    <button className="btn btn-primary 2xl:btn-lg 2xl:text-xl">Let&apos;s Go!</button>
                </div>
                <div className="relative w-[28rem] 2xl:w-[120rem] aspect-square">
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