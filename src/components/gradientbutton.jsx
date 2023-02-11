import Link from 'next/link'

export default function GradientButton({ left, right, href, text}) {
  return (
    <Link
      href={href}
      className={ `btn btn-${left} border-0 bg-gradient-to-r from-${left} to-${right} hover:from-${left}-focus hover:to-${right}-focus lg:btn-lg` }
    >
      {text}
    </Link>
  )
}