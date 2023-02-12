import Link from 'next/link'

export default function IntroHero({ reverse, title, description, href, from, to }) {

  const reverseClass = reverse ? "lg:flex-row-reverse" : "lg:flex-row"

  const textColorClass = `mb-5 text-${from} text-xl md:text-3xl lg:text-5xl font-bold`

  const gradientButtonClass = `btn btn-${from} lg:btn-lg lg:text-xl border-0 bg-gradient-to-br from-${from} to-${to} hover:from-${from}-focus hover:to-${to}-focus`

  return (
    <>
      <main className='min-h-screen flex flex-col lg:flex-row justify-between items-center'>
          <div className="hero min-h-screen bg-base-100">
            <div className={ `hero-content gap-6 max-w-full w-auto p-0 lg:p-1 lg:px-20 xl:px-40 flex-col-reverse ${reverseClass}` }>
                <div className="mx-auto max-w-xs md:max-w-xl lg:max-w-2xl text-center text-base-content">
                  <h1 className={textColorClass}>{title}</h1>
                  <p className="mb-5 md:lext-lg lg:text-2xl">{description}</p>
                  <Link href={href} className={gradientButtonClass}>{title}</Link>
                </div>
                <svg className="-mt-24 w-80 lg:w-[40rem]" viewBox="0 0 80 80" fill="none" role="img" xmlns="http://www.w3.org/2000/svg">
                  <mask id="mask__bauhaus" maskUnits="userSpaceOnUse" x="0" y="0" width="80" height="80"><rect width="80" height="80" rx="160" fill="#FFFFFF"></rect></mask>
                  <g mask="url(#mask__bauhaus)">
                    <rect width="80" height="80" className='fill-primary'></rect>
                    <rect x="10" y="30" width="80" height="10" className='fill-secondary' transform="translate(6 -6) rotate(130 40 40)"></rect>
                    <circle cx="40" cy="40" className='fill-accent' r="16" transform="translate(12 12)"></circle>
                    <line x1="0" y1="40" x2="80" y2="40" stroke-width="2" className='stroke-neutral' transform="translate(0 0) rotate(260 40 40)"></line>
                  </g>
                </svg>
            </div>
          </div>
      </main>
    </>
  )
}