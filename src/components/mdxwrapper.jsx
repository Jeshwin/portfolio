import Image from 'next/image'

import MyHead from '@/components/head'

export default function MdxWrapper({ meta, children }) {
  return (
    <>
      <MyHead title={meta.title} />
      <div id='top'></div>
      <div className="p-5 lg:px-48 xl:px-96 lg:py-10 xl:py-20">
        <div className=' flex flex-auto gap-x-4 '>
          {meta.thumbnail
              ? <figure className='mt-20 mb-6 relative h-12 lg:h-20 aspect-square'><Image className='rounded-full' fill src={`/articles/${meta.title}/thumbnail.jpg`} alt={meta.title} /></figure>
              : <figure className='mt-20 mb-6 relative h-12 lg:h-20 aspect-square'><Image className='rounded-full' fill src="/articles/thumbnail.jpg" alt={meta.title} /></figure>
          }
          <h1 className="font-bold w-fit text-6xl lg:text-8xl mt-20 mb-6">{meta.title}</h1>
        </div>
        <time className="text-accent text-xl italic">{meta.date}</time>
        <div className="max-w-full prose lg:prose-xl dark:prose-invert mt-10">
          {children}
        </div>
      </div>
    </>
  )
}