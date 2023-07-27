import { useEffect, useState } from "react"
import dynamic from "next/dynamic"
import MyHead from "@/components/head"
const QuillEditor = dynamic(import("@/components/quilleditor"), { ssr: false })
import axios from "axios"

export default function NewPost() {
  const [title, setTitle] = useState("")
  const [tags, setTags] = useState("")
  const [description, setDescription] = useState("")
  const [body, setBody] = useState("")

  const handleSubmit = async (e) => {
    e.preventDefault()

    const postData = {
      title,
      tags: tags.split(",").map((tag) => tag.trim()), // Convert comma-separated tags to an array
      description,
      body,
    }

    console.dir(JSON.stringify(postData, null, 2))

    await axios.post("/api/post/post", postData)
    .then((res) => console.dir("RESPONSE\n\n", res))
    .catch((err) => console.error("PRINTING ERROR\n\n", err))
  }

  return (
    <>
      <MyHead title="Create Post" />
      <div id="top"></div>
      <form className="m-12 lg:mx-auto max-w-5xl grid grid-cols-1 gap-6 bag-base-100" onSubmit={handleSubmit}>
        <div className="text-5xl font-bold">Create Post</div>
        <label className="block">
          <span className="text-2xl" >Title</span>
          <input className="block w-full mt-3 rounded-lg border border-base-300 bg-base-200 focus:ring-0 focus:border-info" type="text" value={title} onChange={(e) => setTitle(e.target.value)} required />
        </label>
        <label className="block">
          <span className="text-2xl" >Tags (comma separated)</span>
          <input className="block w-full mt-3 rounded-lg border border-base-300 bg-base-200 focus:ring-0 focus:border-info" type="text" value={tags} onChange={(e) => setTags(e.target.value)} required />
        </label>
        <label className="block">
          <span className="text-2xl" >Description</span>
          <textarea className="block w-full mt-3 rounded-lg border border-base-300 bg-base-200 focus:ring-0 focus:border-info" value={description} onChange={(e) => setDescription(e.target.value)} required />
        </label>
        <label className="block">
          <span className="text-2xl" >Body:</span>
          <QuillEditor
            value={body}
            onChange={setBody}
          />
        </label>
        <button className="btn btn-primary lg:btn-md w-auto mx-auto" type="submit">Create Post</button>
      </form>
    </>
  )
}
