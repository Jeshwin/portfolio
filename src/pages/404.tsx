import Link from 'next/link'
import MyHead from '@/components/head'
import Image from 'next/image'
import FourOFour from '../../public/404.png'


export default function Greeting() {
  return (
    <>
      <MyHead title="Error 404" />
      <main className='min-h-screen flex flex-row justify-between items-center'>
          <div className="hero h-screen mx-auto py-12 lg:py-24 bg-gradient-to-t from-base-300 to-base-200">
            <div className="hero-content max-w-5xl mx-auto flex-col">
              <div className="relative -mt-24 w-[14rem] lg:w-[24rem] aspect-square">
                <Image fill src={FourOFour} alt="404 Astronaut" />
              </div>
                <div className="mx-auto max-x-5xl text-center text-error">
                    <p className="mb-5 text-lg lg:text-5xl">
                      Oops! Looks like this pages doesn&apos;t exist!
                      Sorry about that, you should go home. The button below should help you!
                    </p>
                    <Link href="/" className="btn btn-error btn-md text-error-content text-xl">Go Home</Link>
                </div>
            </div>
          </div>
      </main>
    </>
  )
}
