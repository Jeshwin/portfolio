import Link from 'next/link'
import Image from 'next/image'
import path from 'path'
import fs from 'fs'

import MyHead from '@/components/head'

// Credit: https://stackoverflow.com/a/2450976/7645633
function shuffle(array) {
  let currentIndex = array.length,  randomIndex;

  // While there remain elements to shuffle.
  while (currentIndex != 0) {

    // Pick a remaining element.
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;

    // And swap it with the current element.
    [array[currentIndex], array[randomIndex]] = [
      array[randomIndex], array[currentIndex]];
  }

  return array;
}

export const getStaticProps = async (context) => {
  const portfolioDirectory = path.join(process.cwd(), "public/assets")
  let portfolioFilenames = fs.readdirSync(portfolioDirectory)
  portfolioFilenames = shuffle(portfolioFilenames)
  return {
    props: {
      portfolioFilenames: portfolioFilenames,
    },
  }
}

export default function Greeting({ portfolioFilenames }) {
  return (
    <>
      <MyHead title="Portfolio" />
      <div id='top'></div>
      <div className="p-5 lg:px-48 2xl:px-96 lg:py-10 2xl:py-20">
        <h1 className="font-bold w-fit text-6xl lg:text-8xl mt-20 mb-6">Portfolio</h1>
        <time className="text-accent text-xl italic">Last Update Mar 23, 2023</time>
        <ul className="flex flex-wrap gap-4 mt-10">
          {portfolioFilenames.map((image) => (
            <li key={image} className="flex-auto relative cursor-pointer shadow-xl h-[500px]">
              <Link href={`/portfolio/${encodeURIComponent(image.split('.')[0].split("_")[0])}?date=${image.split('.')[0].split("_")[1]}&tags=${JSON.stringify(image.split('.')[0].split("_")[2].split(","))}&format=${image.split('.')[1]}#top`}>
                <Image className="rounded-lg object-cover align-middle w-full h-full" width={2160} height={2160} src={`/assets/${image}`} alt={image.split('.')[0]}/>
                <div className='
                  absolute w-full h-full top-0 left-0
                  transition-all ease-in-out duration-150
                  text-lg 2xl:text-2xl text-center text-transparent hover:text-base-content
                  flex items-center justify-center
                  rounded-lg bg-opacity-0 hover:bg-opacity-75 bg-base-300'>{image.split('.')[0].split("_")[0]}
                </div>
              </Link>
            </li>
          ))}
          <li className='content-[""] flex-grow-[999]'></li>
        </ul>
      </div>
    </>
  )
}
