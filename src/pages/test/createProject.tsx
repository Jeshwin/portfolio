import { useState } from 'react'

export default function NewProject() {
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [tags, setTags] = useState('')
  const [thumbnail, setThumbnail] = useState(null)
  const [galleryImages, setGalleryImages] = useState([])

  const handleThumbnailChange = (e) => {
    const file = e.target.files[0]
    console.dir(file)
    setThumbnail(file)
  }

  const handleGalleryChange = (e) => {
    const files = e.target.files
    const selectedImages = Array.from(files)
    setGalleryImages(selectedImages)
  }

  const handleSubmit = (e) => {
    e.preventDefault()

    console.dir(thumbnail)

    const data = {
        title,
        tags: tags.split(',').map((tag) => tag.trim()), // Convert comma-separated tags to an array
        description,
        thumbnail,
        galleryImages
      }

    alert(JSON.stringify(data, null, 2))
  }

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>Title:</label>
        <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} required />
      </div>
      <div>
        <label>Description:</label>
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
        />
      </div>
      <div>
        <label>Tags (comma-separated):</label>
        <input type="text" value={tags} onChange={(e) => setTags(e.target.value)} required />
      </div>
      <div>
        <label>Thumbnail:</label>
        <input type="file" onChange={handleThumbnailChange} accept="image/*" required />
      </div>
      <div>
        <label>Gallery Images:</label>
        <input type="file" onChange={handleGalleryChange} accept="image/*" multiple required />
      </div>
      <button type="submit">Create Project</button>
    </form>
  )
}
