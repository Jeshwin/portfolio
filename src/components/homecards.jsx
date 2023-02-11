import Link from 'next/link'
import GradientButton from './gradientbutton'

export default function HomeCard({ color1, color2, title, description, link }) {
  return (
    <>
      <div className="h-auto p-8 basis-1/3 card bg-base-200 rounded-box">
        <div className='pb-3 mb-3 text-4xl font-bold border-b-2 border-base-content'>{title}</div>
        <div className='w-5/6 text-xl pb-4'>{description}</div>
        <div className='card-actions justify-end'>
          <GradientButton href={link} text={title} left={color1} right={color2} /> 
          {/* <Link href={link} className={ `btn btn-${color} mt-8 w-fit justify-end` }>{title}</Link> */}
        </div>
      </div>
    </>
  )
}