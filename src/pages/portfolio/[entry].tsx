import { useRouter } from "next/router"
import Image from 'next/image'
import Link from "next/link"

import MyHead from '@/components/head'

export default function Entry() {
  const router = useRouter()
  const { entry, date, tags, format } = router.query

  let fullDate = new Date(date as string)
  let tagsData = tags ? JSON.parse(tags as string) : ["undefined"]
  let tagString = tagsData.toString()

  let filename = `${entry}_${date}_${tagString}.${format}`
  return (
    <>
      <MyHead title={entry} />
      <div id='top'></div>
      <div className="p-5 lg:px-48 2xl:px-96 lg:py-10 2xl:py-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
          <Link href={`/assets/${filename}`}>
            <Image className="rounded object-contain align-middle w-full h-full" width={1000} height={1000} src={`/assets/${filename}`} alt={entry as string}/>
          </Link>
          <div className="flex flex-col gap-2 flex-shrink">
            <div className="text-2xl xl:text-4xl text-primary pt-4 xl:pt-10">File name</div>
            <Link href={`/assets/${filename}`} className="text-lg xl:text-2xl text-primary pb-8 xl:pb-20">{entry}.{format}</Link>
            <div className="text-2xl xl:text-4xl text-secondary">Date</div>
            <div className="text-lg xl:text-2xl text-secondary pb-8 xl:pb-20">
              {fullDate.toDateString()}
            </div>
            <div className="text-2xl xl:text-4xl text-accent">Tags</div>
            <div className="flex flex-wrap gap-4">
              {tagsData.map((tag) => (
                <div key={tag} className="badge lg:badge-lg badge-accent">{tag}</div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  )
}