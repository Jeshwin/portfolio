import { useState } from 'react'
import dynamic from 'next/dynamic'

const QuillNoSSRWrapper = dynamic(import('react-quill'), { ssr: false })
import 'react-quill/dist/quill.snow.css'

const NewPost = () => {
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
    <form onSubmit={handleSubmit}>
      <div>
        <label>Title:</label>
        <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} required />
      </div>
      <div>
        <label>Tags (comma-separated):</label>
        <input type="text" value={tags} onChange={(e) => setTags(e.target.value)} required />
      </div>
      <div>
        <label>Description:</label>
        <textarea value={description} onChange={(e) => setDescription(e.target.value)} required />
      </div>
      <div>
        <label>Body:</label>
        <QuillNoSSRWrapper value={body} onChange={setBody} />
      </div>
      <button type="submit">Create Post</button>
    </form>
  )
}

export default NewPost
