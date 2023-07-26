import { useState } from 'react'
import { PlusIcon, MinusIcon } from '@heroicons/react/24/solid'
import { s3, region, bucketName } from '../../../awsConfig'
import { PutObjectCommand } from '@aws-sdk/client-s3'
import MyHead from '@/components/head'
import { nanoid } from 'nanoid'
import axios from 'axios'

/*
 * Function: getFileExtension
 * Author: OpenAI (adapted by [Jeshwin Prince])
 * Description: Extracts the file extension from a given filename.
 *              This function assumes that the last dot in the filename
 *              is used to separate the file extension.
 * Parameters:
 *   - filename (string): The name of the file including its extension.
 * Returns:
 *   - (string): The file extension or an empty string if no extension is found.
 */
function getFileExtension(filename) {
  // Split the filename by the dot (.)
  const parts = filename.split('.');
  
  // If there's no dot in the filename or it's the first character, there's no extension
  if (parts.length === 1 || parts[0] === "") {
    return "";
  }
  
  // The file extension is the last part after the last dot
  const extension = parts[parts.length - 1];
  
  return extension;
}


export default function NewProject() {
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [tags, setTags] = useState('')
  const [thumbnail, setThumbnail] = useState(null)
  const [links, setLinks] = useState([''])
  const [gallery, setGallery] = useState([{ image: null, description: '' }])

  ////////////////////////////////
  // IMPORTANT                  //
  // Sync region and bucketName //
  // with environment variables //
  ////////////////////////////////

  // const region = 'us-west-1'
  // const bucketName = 'jeshwin-portfolio-bucket'

  const handleImageChange = (index, event) => {
    const file = event.target.files[0]
    if (file) {
      const updatedPairs = [...gallery]
      updatedPairs[index].image = file
      setGallery(updatedPairs)
    }
  }

  const handleDescriptionChange = (index, event) => {
    const { value } = event.target
    const updatedPairs = [...gallery]
    updatedPairs[index].description = value
    setGallery(updatedPairs)
  }

  const addImagePair = () => {
    setGallery([...gallery, { image: null, description: '' }])
  }

  const removeImagePair = (index) => {
    const updatedPairs = gallery.filter((_, i) => i !== index)
    setGallery(updatedPairs)
  }

  const handleLinkChange = (index, event) => {
    const { value } = event.target
    const updatedLinks = [...links]
    updatedLinks[index] = value
    setLinks(updatedLinks)
  }

  const addLink = () => {
    setLinks([...links, ''])
  }

  const removeLink = (index) => {
    const updatedLinks = links.filter((_, i) => i !== index)
    setLinks(updatedLinks)
  }

  const handleThumbnailChange = (e) => {
    const file = e.target.files[0]
    setThumbnail(file)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    const projectData: any = {
      title,
      tags: tags.split(',').map((tag) => tag.trim()), // Convert comma-separated tags to an array
      description,
      links
    }

    try {
      // Upload thumbnail to S3
      if (thumbnail) {
        const thumbnailKey = `thumbnails/${nanoid()}.${getFileExtension(thumbnail.name)}`;
        await s3
          .send(
            new PutObjectCommand({
              Bucket: bucketName,
              Key: thumbnailKey,
              Body: thumbnail
          })
        )

        projectData.thumbnail = `https://${bucketName}.s3.${region}.amazonaws.com/${thumbnailKey}`;
      }

      // Upload gallery images to S3 (if any)
      const galleryUrls = [];
      for (const [index, pair] of gallery.entries()) {
        const galleryKey = `gallery/${nanoid()}.${getFileExtension(pair.image.name)}`;
        await s3
          .send(
            new PutObjectCommand({
              Bucket: bucketName,
              Key: galleryKey,
              Body: pair.image
            })
          )

        galleryUrls.push({ image: `https://${bucketName}.s3.${region}.amazonaws.com/${galleryKey}`, description: pair.description });
      }

      // Add galleryUrls to the projectData
      projectData.gallery = galleryUrls;

      // Display the projectData as an alert (for testing purposes)
      console.dir(JSON.stringify(projectData, null, 2))


      // send POST request to store project in database
      await axios.post('/api/post/project', projectData)
      .then((res) => console.dir("RESPONSE\n\n", res))
      .catch((err) => console.error("PRINTING ERROR\n\n", err))
    } catch (error) {
      alert('Error uploading images. Please try again.\n' + error);
    }
  }

  return (
    <>
      <MyHead title="Create Project" />
      <div id='top'></div>
      <form className="m-12 lg:mx-auto max-w-5xl grid grid-cols-1 gap-6 bag-base-100" onSubmit={handleSubmit}>
        <div className="text-5xl font-bold">Create Project</div>
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
        <span className="text-2xl mt-3" >Links</span>
        {links.map((link, index) => (
          <div key={index} className="flex flex-row items-center gap-6 mx-6">
            <span className="text-xl min-w-max">Link {index + 1}:</span>
            <input className="block w-full rounded-lg bg-base-200 focus:ring-0 border border-base-300 focus:border-info" type="text" value={link} onChange={(e) => handleLinkChange(index, e)} required />
            <button
              type="button"
              onClick={() => removeLink(index)}
              className="btn btn-square btn-error rounded-full"
            >
              <MinusIcon className='aspect-square w-8' />
            </button>
          </div>
        ))}
        <button
          type="button"
          onClick={addLink}
          className="btn btn-info btn-square rounded-full justify-self-end mr-6"
        >
          <PlusIcon className='aspect-square w-8'/>
        </button>
        <span className="text-2xl" >Gallery</span>
        {gallery.map((pair, index) => (
          <div key={index} className="block py-4 px-6 bg-base-200 rounded-2xl">
            <span className="text-xl">Image</span>
            <input
              className="block w-full rounded-lg bg-base-300 my-3 file:mr-5 file:py-2 file:px-4 file:rounded-lg file:border-0 file:bg-primary file:text-primary-content hover:file:bg-primary-focus"
              type="file"
              accept="image/*"
              onChange={(e) => handleImageChange(index, e)}
              required
            />
            <span className="text-xl">Description</span>
            <textarea
              value={pair.description}
              onChange={(e) => handleDescriptionChange(index, e)}
              className="block w-full rounded-lg mt-3 bg-base-300 focus:ring-0 border border-base-300 focus:border-info"
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
          className="btn lg:btn-md btn-info justify-self-end w-auto"
        >
          Add Image
        </button>
        <button className="btn btn-primary lg:btn-md w-auto mx-auto" type="submit">Create Post</button>
      </form>
    </>
  )
}
