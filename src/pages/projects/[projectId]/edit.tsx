import { useEffect, useRef, useState } from "react"
import MyHead from "@/components/head"
import axios from "axios"
import "dotenv/config"
import { useRouter } from "next/router"
import { PutObjectCommand, S3Client } from "@aws-sdk/client-s3"
import { nanoid } from "nanoid"
import { MinusIcon, PlusIcon } from "@heroicons/react/24/solid"
import Image from "next/image"

function getFileExtension(filename) {
    const parts = filename.split(".")
    if (parts.length === 1 || parts[0] === "") {
        return ""
    }
    const extension = parts[parts.length - 1]
    return extension
}

export const getServerSideProps = () => {
    const bucketName = process.env.AWS_BUCKET_NAME
    const region = process.env.AWS_REGION
    const accessKeyId = process.env.AWS_ACCESS_KEY_ID
    const secretAccessKey = process.env.AWS_SECRET_ACCESS_KEY

    return {
        props: {
            accessKeyId,
            secretAccessKey,
            region,
            bucketName,
        },
    }
}

export default function UpdateProject({
    accessKeyId,
    secretAccessKey,
    region,
    bucketName,
}) {
    // Init State ///////////////////////////////////////////////////////////////
    const [title, setTitle] = useState("")
    const [description, setDescription] = useState("")
    const [tags, setTags] = useState("")
    const [newThumbnail, setNewThumbnail] = useState(null)
    const [links, setLinks] = useState([{ url: "", title: "", icon: "" }])
    const [prevGallery, setPrevGallery] = useState([
        { image: "", description: "" },
    ])
    const [newGallery, setNewGallery] = useState([
        { image: null, description: "" },
    ])
    const router = useRouter()
    const { projectId } = router.query
    /////////////////////////////////////////////////////////////////////////////

    // Get Previous Project Data ////////////////////////////////////////////////
    useEffect(() => {
        async function getData() {
            try {
                const response = await axios.get(
                    `/api/get/projects/${projectId}`
                )
                const projectData = response.data
                setTitle(projectData.title)
                let tagString = ""
                projectData.tags.map((tag) => {
                    tagString += "," + tag.title
                })
                setTags(tagString.substring(1))
                setDescription(projectData.description)
                setLinks(
                    projectData.links.map((link) => ({
                        url: link.url,
                        title: link.title,
                        icon: link.icon,
                    }))
                )
                setPrevGallery(
                    projectData.gallery.map((image) => ({
                        image: image.image,
                        description: image.description,
                    }))
                )
            } catch (e) {
                console.error(e)
                router.push(`/projects/${projectId}`)
            }
        }
        getData()
    }, [projectId, router])
    /////////////////////////////////////////////////////////////////////////////

    // Init AWS S3 Config ///////////////////////////////////////////////////////
    const s3 = new S3Client({
        region,
        credentials: {
            accessKeyId,
            secretAccessKey,
        },
    })
    /////////////////////////////////////////////////////////////////////////////

    // Handle New Thumbnail /////////////////////////////////////////////////////
    const handleThumbnailChange = (e) => {
        const file = e.target.files[0]
        setNewThumbnail(file)
    }
    /////////////////////////////////////////////////////////////////////////////

    // Handle Links /////////////////////////////////////////////////////////////
    const handleLinkUrlChange = (index, event) => {
        const { value } = event.target
        const updatedLinks = [...links]
        updatedLinks[index].url = value
        setLinks(updatedLinks)
    }

    const handleLinkTitleChange = (index, event) => {
        const { value } = event.target
        const updatedLinks = [...links]
        updatedLinks[index].title = value
        setLinks(updatedLinks)
    }

    const handleLinkIconChange = (index, event) => {
        const { value } = event.target
        const updatedLinks = [...links]
        updatedLinks[index].icon = value
        setLinks(updatedLinks)
    }

    const addLink = () => {
        setLinks([...links, { url: "", title: "", icon: "" }])
    }

    const removeLink = (index) => {
        const updatedLinks = links.filter((_, i) => i !== index)
        setLinks(updatedLinks)
    }
    /////////////////////////////////////////////////////////////////////////////

    // Handle Previous Gallery Images ///////////////////////////////////////////
    const handlePrevDescriptionChange = (index, event) => {
        const { value } = event.target
        const updatedPairs = [...prevGallery]
        updatedPairs[index].description = value
        setPrevGallery(updatedPairs)
    }

    const removePrevImagePair = (index) => {
        const updatedPairs = prevGallery.filter((_, i) => i !== index)
        setPrevGallery(updatedPairs)
    }
    /////////////////////////////////////////////////////////////////////////////

    // Handle New Gallery Images ////////////////////////////////////////////////
    const handleNewImageChange = (index, event) => {
        const file = event.target.files[0]
        if (file) {
            const updatedPairs = [...newGallery]
            updatedPairs[index].image = file
            setNewGallery(updatedPairs)
        }
    }

    const handleNewDescriptionChange = (index, event) => {
        const { value } = event.target
        const updatedPairs = [...newGallery]
        updatedPairs[index].description = value
        setNewGallery(updatedPairs)
    }

    const addNewImagePair = () => {
        setNewGallery([...newGallery, { image: null, description: "" }])
    }

    const removeNewImagePair = (index) => {
        const updatedPairs = newGallery.filter((_, i) => i !== index)
        setNewGallery(updatedPairs)
    }
    /////////////////////////////////////////////////////////////////////////////

    const handleSubmit = async (e) => {
        e.preventDefault()

        const projectData: any = {
            id: projectId,
            title,
            tags: tags.split(",").map((tag) => tag.trim()), // Convert comma-separated tags to an array
            description,
            links,
            thumbnail: null,
        }

        try {
            // Upload thumbnail to S3
            if (newThumbnail) {
                const thumbnailKey = `thumbnails/${nanoid()}.${getFileExtension(
                    newThumbnail.name
                )}`
                console.log(`ADDING NEW THUMBNAIL ${thumbnailKey}`)
                console.dir(newThumbnail)
                await s3.send(
                    new PutObjectCommand({
                        Bucket: bucketName,
                        Key: thumbnailKey,
                        Body: newThumbnail,
                    })
                )

                console.log("SUCCESSFUL NEW THUMBNAIL")
                projectData.thumbnail = `https://${bucketName}.s3.${region}.amazonaws.com/${thumbnailKey}`
            }

            // Upload gallery images to S3 (if any)
            const galleryUrls = prevGallery
            for (const [index, pair] of newGallery.entries()) {
                const galleryKey = `gallery/${nanoid()}.${getFileExtension(
                    pair.image.name
                )}`
                console.log(`ADDING NEW THUMBNAIL ${galleryKey}`)
                console.dir(pair.image)
                await s3.send(
                    new PutObjectCommand({
                        Bucket: bucketName,
                        Key: galleryKey,
                        Body: pair.image,
                    })
                )
                console.log("SUCCESSFUL NEW GALLERY IMAGE")

                galleryUrls.push({
                    image: `https://${bucketName}.s3.${region}.amazonaws.com/${galleryKey}`,
                    description: pair.description,
                })
            }

            // Add galleryUrls to the projectData
            projectData.gallery = galleryUrls

            console.log("SENDING NEW PROJECT DATA: \n")
            console.dir(projectData)

            // send POST request to store project in database
            await axios
                .post("/api/update/project", projectData)
                .then((res) => console.dir("RESPONSE\n\n", res))
                .catch((err) => console.error("PRINTING ERROR\n\n", err))
        } catch (error) {
            console.error(error)
        }
    }

    return (
        <>
            <MyHead title="Create Project" />
            <div id="top"></div>
            <form
                className="m-12 lg:mx-auto max-w-5xl grid grid-cols-1 gap-6 bag-base-100"
                onSubmit={handleSubmit}
            >
                <div className="text-5xl font-bold">Create Project</div>
                <label className="block">
                    <span className="text-2xl">Title</span>
                    <input
                        className="block w-full mt-3 input input-bordered bg-base-200"
                        type="text"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        required
                    />
                </label>
                <label className="block">
                    <span className="text-2xl">Tags (comma separated)</span>
                    <input
                        className="block w-full mt-3 input input-bordered bg-base-200"
                        type="text"
                        value={tags}
                        onChange={(e) => setTags(e.target.value)}
                        required
                    />
                </label>
                <label className="block">
                    <span className="text-2xl">Description</span>
                    <textarea
                        className="block w-full mt-3 textarea textarea-bordered bg-base-200"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        required
                    />
                </label>
                <label className="block">
                    <span className="text-2xl">Thumbnail</span>
                    <input
                        className="block mt-3 file-input file-input-primary w-full max-w-xl"
                        type="file"
                        onChange={handleThumbnailChange}
                        accept="image/*"
                    />
                </label>
                <span className="text-2xl mt-3">Links</span>
                {links.map((link, index) => (
                    <div
                        key={index}
                        className="flex flex-row items-center gap-6 mx-6"
                    >
                        <span className="text-xl min-w-max">
                            Link {index + 1}:
                        </span>
                        <span className="text-lg min-w-max">Url</span>
                        <input
                            className="block w-full mt-3 input input-bordered bg-base-200"
                            type="url"
                            value={link.url}
                            onChange={(e) => handleLinkUrlChange(index, e)}
                            required
                        />
                        <span className="text-lg min-w-max">Title</span>
                        <input
                            className="block w-full mt-3 input input-bordered bg-base-200"
                            type="text"
                            value={link.title}
                            onChange={(e) => handleLinkTitleChange(index, e)}
                            required
                        />
                        <span className="text-lg min-w-max">Icon</span>
                        <select
                            className="block w-auto mt-3 select select-bordered bg-base-200"
                            value={link.icon}
                            onChange={(e) => handleLinkIconChange(index, e)}
                            required
                        >
                            <option>None</option>
                            <option>GitHub</option>
                            <option>YouTube</option>
                            <option>3D</option>
                            <option>Demo</option>
                        </select>
                        <button
                            type="button"
                            onClick={() => removeLink(index)}
                            className="btn btn-square btn-error rounded-full"
                        >
                            <MinusIcon className="aspect-square w-8" />
                        </button>
                    </div>
                ))}
                <button
                    type="button"
                    onClick={addLink}
                    className="btn btn-info btn-square rounded-full justify-self-end mr-6"
                >
                    <PlusIcon className="aspect-square w-8" />
                </button>
                <span className="text-2xl">Previous Gallery</span>
                <div className="grid grid-cols-3 gap-4">
                    {prevGallery.map((pair, index) => (
                        <div
                            key={index}
                            className="block py-4 px-6 bg-base-200 rounded-2xl"
                        >
                            <Image
                                src={pair.image}
                                width={500}
                                height={500}
                                alt={pair.description}
                                className="w-full aspect-square rounded-t-2xl"
                            />
                            <span className="text-xl">Description</span>
                            <textarea
                                value={pair.description}
                                onChange={(e) =>
                                    handlePrevDescriptionChange(index, e)
                                }
                                className="block w-full mt-3 textarea textarea-bordered bg-base-300"
                                required
                            />
                            <button
                                type="button"
                                onClick={() => removePrevImagePair(index)}
                                className="btn lg:btn-md btn-error mt-3"
                            >
                                Remove
                            </button>
                        </div>
                    ))}
                </div>
                <span className="text-2xl">New Images</span>
                {newGallery.map((pair, index) => (
                    <div
                        key={index}
                        className="block py-4 px-6 bg-base-200 rounded-2xl"
                    >
                        <span className="text-xl">Image</span>
                        <input
                            className="block my-3 file-input file-input-primary w-full max-w-xl"
                            type="file"
                            accept="image/*"
                            onChange={(e) => handleNewImageChange(index, e)}
                            required
                        />
                        <span className="text-xl">Description</span>
                        <textarea
                            value={pair.description}
                            onChange={(e) =>
                                handleNewDescriptionChange(index, e)
                            }
                            className="block w-full mt-3 textarea textarea-bordered bg-base-300"
                            required
                        />
                        <button
                            type="button"
                            onClick={() => removeNewImagePair(index)}
                            className="btn lg:btn-md btn-error mt-3"
                        >
                            Remove
                        </button>
                    </div>
                ))}
                <button
                    type="button"
                    onClick={addNewImagePair}
                    className="btn lg:btn-md btn-info justify-self-end w-auto"
                >
                    Add Image
                </button>
                <button
                    className="btn btn-secondary lg:btn-md w-auto mx-auto"
                    type="submit"
                >
                    Update Project
                </button>
            </form>
        </>
    )
}
