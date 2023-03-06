import Link from 'next/link'
import Image from 'next/image'
import path from 'path'
import fs from 'fs'

import MyHead from '@/components/head'

export const getStaticProps = async (context) => {
  const postDirectory = path.join(process.cwd(), "src/pages/articles")
  let postFilenames = fs.readdirSync(postDirectory)
  const postModules = await Promise.all(
    postFilenames.map(async (p) => import(`./articles/${p}`))
  );
  const postMetadata = postModules.map((m) => (m.meta ? m.meta : null))
  return {
    props: {
      postMetadata: postMetadata,
    },
  }
}

export default function Greeting({ postMetadata }) {
  return (
    <>
      <MyHead title="Jeshwin's Blog" />
      <div id='top'></div>
      <div className="p-5 lg:px-48 xl:px-96 lg:py-10 xl:py-20">
        <h1 className="font-bold w-fit text-6xl lg:text-8xl mt-20 mb-6">Articles</h1>
        <time className="text-accent text-xl italic">Last Update Feb 20, 2023</time>
        <ul className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 mt-10">
          {postMetadata.map(({ title, thumbnail, date, description }) => (
          <li key={title} className="card bg-base-200 shadow-xl">
            {thumbnail
              ? <figure><Image width={900} height={900} src={`/articles/${title}/thumbnail.jpg`} alt={title} /></figure>
              : <figure><Image width={900} height={900} src="/articles/thumbnail.jpg" alt={title} /></figure>
            }
            <div className="card-body">
              <h2 className="card-title text-4xl">{title}</h2>
              <p className='text-primary italic text-lg'>{date}</p>
              <p className='text-lg'>{description}</p>
              <div className="card-actions justify-end">
                <Link href={`/articles/${title}#top`} className="btn btn-primary">Read</Link>
              </div>
            </div>
          </li>))}
        </ul>
      </div>
    </>
  )
}
