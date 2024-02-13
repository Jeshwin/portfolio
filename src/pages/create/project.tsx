import {useEffect, useState} from "react";
import {PlusIcon, MinusIcon} from "@heroicons/react/24/solid";
import {S3Client} from "@aws-sdk/client-s3";
import {PutObjectCommand} from "@aws-sdk/client-s3";
import MyHead from "@/components/head";
import {nanoid} from "nanoid";
import axios from "axios";
import "dotenv/config";
import {useRouter} from "next/router";

function getFileExtension(filename) {
    const parts = filename.split(".");
    if (parts.length === 1 || parts[0] === "") {
        return "";
    }
    const extension = parts[parts.length - 1];
    return extension;
}

export const getStaticProps = () => {
    const bucketName = process.env.AWS_BUCKET_NAME;
    const region = process.env.AWS_REGION;
    const accessKeyId = process.env.AWS_ACCESS_KEY_ID;
    const secretAccessKey = process.env.AWS_SECRET_ACCESS_KEY;

    return {
        props: {
            accessKeyId,
            secretAccessKey,
            region,
            bucketName,
        },
    };
};

export default function NewProject({
    accessKeyId,
    secretAccessKey,
    region,
    bucketName,
}) {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [tags, setTags] = useState("");
    const [thumbnail, setThumbnail] = useState(null);
    const [links, setLinks] = useState([{url: "", title: "", icon: ""}]);
    const [gallery, setGallery] = useState([{image: null, description: ""}]);

    const router = useRouter();

    useEffect(() => {
        const token = localStorage.getItem("jwtToken");
        async function validateToken(token) {
            try {
                const response = await axios.post("/api/validateJWT", {token});
                if (!response.data.isValid) router.push("/login#top");
            } catch (error) {
                console.error("JWT validation failed: ", error);
                router.push("/login#top");
            }
        }
        validateToken(token);
    });

    const s3 = new S3Client({
        region,
        credentials: {
            accessKeyId,
            secretAccessKey,
        },
    });

    const handleImageChange = (index, event) => {
        const file = event.target.files[0];
        if (file) {
            const updatedPairs = [...gallery];
            updatedPairs[index].image = file;
            setGallery(updatedPairs);
        }
    };

    const handleDescriptionChange = (index, event) => {
        const {value} = event.target;
        const updatedPairs = [...gallery];
        updatedPairs[index].description = value;
        setGallery(updatedPairs);
    };

    const addImagePair = () => {
        setGallery([...gallery, {image: null, description: ""}]);
    };

    const removeImagePair = (index) => {
        const updatedPairs = gallery.filter((_, i) => i !== index);
        setGallery(updatedPairs);
    };

    const handleLinkUrlChange = (index, event) => {
        const {value} = event.target;
        const updatedLinks = [...links];
        updatedLinks[index].url = value;
        setLinks(updatedLinks);
    };

    const handleLinkTitleChange = (index, event) => {
        const {value} = event.target;
        const updatedLinks = [...links];
        updatedLinks[index].title = value;
        setLinks(updatedLinks);
    };

    const handleLinkIconChange = (index, event) => {
        const {value} = event.target;
        const updatedLinks = [...links];
        updatedLinks[index].icon = value;
        setLinks(updatedLinks);
    };

    const addLink = () => {
        setLinks([...links, {url: "", title: "", icon: ""}]);
    };

    const removeLink = (index) => {
        const updatedLinks = links.filter((_, i) => i !== index);
        setLinks(updatedLinks);
    };

    const handleThumbnailChange = (e) => {
        const file = e.target.files[0];
        setThumbnail(file);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const projectData: any = {
            title,
            tags: tags.split(",").map((tag) => tag.trim()), // Convert comma-separated tags to an array
            description,
            links,
        };

        try {
            // Upload thumbnail to S3
            if (thumbnail) {
                const thumbnailKey = `thumbnails/${nanoid()}.${getFileExtension(
                    thumbnail.name
                )}`;
                await s3.send(
                    new PutObjectCommand({
                        Bucket: bucketName,
                        Key: thumbnailKey,
                        Body: thumbnail,
                    })
                );

                projectData.thumbnail = `https://${bucketName}.s3.${region}.amazonaws.com/${thumbnailKey}`;
            }

            // Upload gallery images to S3 (if any)
            const galleryUrls = [];
            for (const [index, pair] of gallery.entries()) {
                const galleryKey = `gallery/${nanoid()}.${getFileExtension(
                    pair.image.name
                )}`;
                await s3.send(
                    new PutObjectCommand({
                        Bucket: bucketName,
                        Key: galleryKey,
                        Body: pair.image,
                    })
                );

                galleryUrls.push({
                    image: `https://${bucketName}.s3.${region}.amazonaws.com/${galleryKey}`,
                    description: pair.description,
                });
            }

            // Add galleryUrls to the projectData
            projectData.gallery = galleryUrls;

            // send POST request to store project in database
            await axios
                .post("/api/post/project", projectData)
                .then((res) => console.dir("RESPONSE\n\n", res))
                .catch((err) => console.error("PRINTING ERROR\n\n", err));
        } catch (error) {
            console.error(error);
        }
    };

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
                        required
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
                <span className="text-2xl">Gallery</span>
                {gallery.map((pair, index) => (
                    <div
                        key={index}
                        className="block py-4 px-6 bg-base-200 rounded-2xl"
                    >
                        <span className="text-xl">Image</span>
                        <input
                            className="block my-3 file-input file-input-primary w-full max-w-xl"
                            type="file"
                            accept="image/*"
                            onChange={(e) => handleImageChange(index, e)}
                            required
                        />
                        <span className="text-xl">Description</span>
                        <textarea
                            value={pair.description}
                            onChange={(e) => handleDescriptionChange(index, e)}
                            className="block w-full mt-3 textarea textarea-bordered bg-base-300"
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
                <button
                    className="btn btn-secondary lg:btn-md w-auto mx-auto"
                    type="submit"
                >
                    Create Post
                </button>
            </form>
        </>
    );
}
