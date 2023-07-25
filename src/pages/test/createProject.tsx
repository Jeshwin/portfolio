import { useState } from 'react'

export default function NewProject() {
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [tags, setTags] = useState('')
  const [thumbnail, setThumbnail] = useState('')
  // const [galleryImages, setGalleryImages] = useState([])
  const [galleryImages, setGalleryImages] = useState([{ image: null, description: '' }])

  const handleImageChange = (index, event) => {
    const file = event.target.files[0]
    if (file) {
      const updatedPairs = [...galleryImages]
      updatedPairs[index].image = file.name
      setGalleryImages(updatedPairs)
    }
  }

  const handleDescriptionChange = (index, event) => {
    const { value } = event.target
    const updatedPairs = [...galleryImages]
    updatedPairs[index].description = value
    setGalleryImages(updatedPairs)
  }

  const addImagePair = () => {
    setGalleryImages([...galleryImages, { image: null, description: '' }])
  }

  const removeImagePair = (index) => {
    const updatedPairs = galleryImages.filter((_, i) => i !== index)
    setGalleryImages(updatedPairs)
  }

  const handleThumbnailChange = (e) => {
    const file = e.target.files[0]
    console.dir(file)
    setThumbnail(file.name)
  }

  // const handleGalleryChange = (e) => {
  //   const files = e.target.files
  //   const selectedImages = Array.from(files)
  //   setGalleryImages(selectedImages)
  // }

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
    <>
      <div id='top'></div>
      <form className="m-12 lg:mx-auto max-w-5xl grid grid-cols-1 gap-6 bag-base-100" onSubmit={handleSubmit}>
        <label className='block'>
          <span className="text-2xl" >Title</span>
            <input className="block w-full rounded-lg mt-3 bg-base-200 focus:ring-0 border border-base-300 focus:border-info" type="text" value={title} onChange={(e) => setTitle(e.target.value)} required />
        </label>
        <label className='block'>
          <span className="text-2xl" >Tags (comma separated)</span>
          <input className="block w-full rounded-lg mt-3 bg-base-200 focus:ring-0 border border-base-300 focus:border-info" type="text" value={tags} onChange={(e) => setTags(e.target.value)} required />
        </label>
        <label className='block'>
          <span className="text-2xl" >Description</span>
          <textarea className="block w-full rounded-lg mt-3 bg-base-200 focus:ring-0 border border-base-300 focus:border-info" value={description} onChange={(e) => setDescription(e.target.value)} required />
        </label>
        <label className='block'>
          <span className="text-2xl" >Thumbnail</span>
          <input className="block w-full rounded-lg border border-base-300 bg-base-200 mt-3 file:mr-5 file:py-2 file:px-4 file:rounded-lg file:border-0
            file:bg-primary file:text-primary-content hover:file:bg-primary-focus" type="file" onChange={handleThumbnailChange} accept="image/*" required />
        </label>
        {/* <label className='block'>
          <span className="text-2xl" >Gallery Images</span>
          <input className="block w-full rounded-lg border border-base-300 bg-base-200 mt-3 file:mr-5 file:py-2 file:px-4 file:rounded-lg file:border-0
            file:bg-primary file:text-primary-content hover:file:bg-primary-focus" type="file" onChange={handleGalleryChange} accept="image/*" multiple required />
        </label> */}
        <span className="text-2xl" >Gallery</span>
        {galleryImages.map((pair, index) => (
          <div key={index} className="block mb-4 mx-6">
            <span className="text-xl">Image</span>
            <input
              className="block w-full rounded-lg border border-base-300 bg-base-200 my-3 file:mr-5 file:py-2 file:px-4 file:rounded-lg file:border-0 file:bg-primary file:text-primary-content hover:file:bg-primary-focus"
              type="file"
              accept="image/*"
              onChange={(e) => handleImageChange(index, e)}
              required
            />
            <span className="text-xl">Description</span>
            <textarea
              value={pair.description}
              onChange={(e) => handleDescriptionChange(index, e)}
              className="block w-full rounded-lg mt-3 bg-base-200 focus:ring-0 border border-base-300 focus:border-info"
              required
            />
            <button
              type="button"
              onClick={() => removeImagePair(index)}
              className="btn lg:btn-md btn-error mt-3"
            >
              Remove
            </button>
          </div>
        ))}
        <button
          type="button"
          onClick={addImagePair}
          className="btn lg:btn-md btn-secondary justify-self-end w-auto"
        >
          Add Image Pair
        </button>
        <button className="btn btn-primary lg:btn-md w-auto mx-auto" type="submit">Create Post</button>
      </form>
    </>
  )
}
