import Link from 'next/link'

export default function HomeCard({ color, title, description, link }) {
  return (
    <>
      <div className="h-auto p-8 basis-1/3 card bg-base-300 rounded-box">
        <div className='pb-3 mb-3 text-4xl font-bold border-b-2 border-base-content'>{title}</div>
        <div className='w-2/3 text-xl'>{description}</div>
        <div className='card-actions justify-end'>
          <Link href={link} className={ `btn btn-${color} mt-8 w-fit justify-end` }>{title}</Link>
        </div>
      </div>
    </>
  )
}