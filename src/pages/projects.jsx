import Link from 'next/link'

export default function Greeting() {
  return (
    <>
      <main className='min-h-screen flex flex-row justify-between items-center'>
          <div className="hero min-h-screen bg-base-300">
            <div className="hero-content flex-row">
                <div className="max-w-2xl 2xl:max-w-7xl text-center text-base-content">
                    <h1 className="font-mono mb-5 text-5xl font-bold">My Portfolio</h1>
                    <p className="mb-5 text-xl lg:text-3xl">
                      Oops! Looks like this pages isn&apos;t done yet!
                      Check back later when it&apos;s ready!
                    </p>
                    <Link href="/" className="btn btn-accent btn-lg text-accent-content text-xl">Home</Link>
                </div>
            </div>
          </div>
      </main>
    </>
  )
}
