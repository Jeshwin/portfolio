import Link from 'next/link'
import Image from 'next/image'
import HeadshotHolder from '../../public/headshotholder.jpeg'

export default function HomeAbout() {
  return (
    <>
      <main className='min-h-screen flex flex-col lg:flex-row justify-between items-center'>
          <div className="hero min-h-screen bg-secondary">
            <div className="hero-content flex-col-reverse lg:flex-row-reverse">
                <div className="mx-auto lg:ml-20 mt-12 lg:mt-0 max-w-lg 2xl:max-w-7xl text-center text-neutral-content">
                    <h1 className="mb-5 text-2xl md:text-4xl lg:text-6xl font-bold">About Me</h1>
                    <p className="mb-5 md:text-lg lg:text-2xl">
                      I am a first-year Computer Engineering student at Santa Clara University.
                      I love programming, 3d printing, playing the guitar, and making art in Blender!
                      Check out my portfolio of all my projects here!
                    </p>
                    <Link href="/about" className="btn btn-primary 2xl:btn-lg 2xl:text-xl">About</Link>
                </div>
                <div className="relative w-60 lg:w-[120rem] aspect-square">
                <Image
                  className='rounded-full'
                  src={HeadshotHolder}
                  alt="Headshot of Jeshwin Prince"
                  fill
                />
                </div>
            </div>
          </div>
      </main>
    </>
  )
}