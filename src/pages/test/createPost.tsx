import { useState } from 'react'
import dynamic from 'next/dynamic'

const QuillNoSSRWrapper = dynamic(import('react-quill'), { ssr: false })
import 'react-quill/dist/quill.snow.css'

export default function NewPost() {
  const [title, setTitle] = useState('')
  const [tags, setTags] = useState('')
  const [description, setDescription] = useState('')
  const [body, setBody] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()

    const data = {
      title,
      tags: tags.split(',').map((tag) => tag.trim()), // Convert comma-separated tags to an array
      description,
      body,
    }

    alert(JSON.stringify(data, null, 2)) // Display form data as an alert
  }

  return (
    <>
      <div id='top'></div>
      <form className="m-12 lg:mx-auto max-w-5xl grid grid-cols-1 gap-6 bag-base-100" onSubmit={handleSubmit}>
        <label className='block'>
          <span className="text-2xl" >Title</span>
          <input className="block w-full mt-3 rounded-lg border border-base-300 bg-base-200 focus:ring-0 focus:border-info" type="text" value={title} onChange={(e) => setTitle(e.target.value)} required />
        </label>
        <label className='block'>
          <span className="text-2xl" >Tags (comma separated)</span>
          <input className="block w-full mt-3 rounded-lg border border-base-300 bg-base-200 focus:ring-0 focus:border-info" type="text" value={tags} onChange={(e) => setTags(e.target.value)} required />
        </label>
        <label className='block'>
          <span className="text-2xl" >Description</span>
          <textarea className="block w-full mt-3 rounded-lg border border-base-300 bg-base-200 focus:ring-0 focus:border-info" value={description} onChange={(e) => setDescription(e.target.value)} required />
        </label>
        <label className='block'>
          <span className="text-2xl" >Body:</span>
          <QuillNoSSRWrapper className="mt-3 block w-full bg-slate-200" value={body} onChange={setBody} />
        </label>
        <button className="btn btn-primary lg:btn-md w-auto mx-auto" type="submit">Create Post</button>
      </form>
    </>
  )
}
