import Link from 'next/link'

export default function Greeting() {
  return (
    <>
      <main className='min-h-screen flex flex-row justify-between items-center'>
          <div className="hero min-h-screen bg-base-300">
            <div className="hero-content flex-row">
                <div className="max-w-lg lg:max-w-7xl text-center text-error-content">
                    <h1 className="font-mono mb-2 lg:mb-5 text-7xl lg:text-9xl font-bold">404</h1>
                    <p className="font-mono mb-5 text-lg lg:text-6xl">
                      Oops! Looks like this pages doesn&apos;t exist!
                      Sorry about that, you should go home. The button below should help you!
                    </p>
                    <Link href="/" className="btn btn-error lg:btn-lg text-error-content text-xl">Go Home</Link>
                </div>
            </div>
          </div>
      </main>
    </>
  )
}
