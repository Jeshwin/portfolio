import {useEffect, useState} from "react";
import dynamic from "next/dynamic";
import MyHead from "@/components/head";
const QuillEditor = dynamic(import("@/components/quilleditor"), {ssr: false});
import axios from "axios";
import {useRouter} from "next/router";
import {MinusIcon, PlusIcon} from "@heroicons/react/24/solid";

export default function NewPost() {
    const [title, setTitle] = useState("");
    const [tags, setTags] = useState([{title: ""}]);
    const [description, setDescription] = useState("");
    const [body, setBody] = useState("");

    const router = useRouter();

    useEffect(() => {
        const token = localStorage.getItem("jwtToken");
        async function validateToken(token) {
            try {
                const response = await axios.post("/api/validateJWT", {token});
                if (!response.data.isValid) router.push("/login");
            } catch (error) {
                console.error("JWT validation failed: ", error);
                router.push("/login");
            }
        }
        validateToken(token);
    });

    const handleTagChange = (index, event) => {
        const {value} = event.target;
        const updatedTags = [...tags];
        updatedTags[index].title = value;
        setTags(updatedTags);
    };

    const addTag = () => {
        setTags([...tags, {title: ""}]);
    };

    const removeTag = (index) => {
        const updatedTags = tags.filter((_, i) => i !== index);
        setTags(updatedTags);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const postData = {
            title,
            tags,
            description,
            body,
        };

        await axios
            .post("/api/post/post", postData)
            .then((res) => console.dir("RESPONSE\n\n", res))
            .catch((err) => console.error("PRINTING ERROR\n\n", err));
    };

    return (
        <>
            <MyHead title="Create Post" />
            <form
                className="m-12 lg:mx-auto max-w-5xl grid grid-cols-1 gap-6 bag-base-100"
                onSubmit={handleSubmit}
            >
                <div className="text-5xl font-bold">Create Post</div>
                <label className="block">
                    <span className="text-2xl">Title</span>
                    <input
                        className="block w-full mt-3 rounded-lg border border-base-300 bg-base-200 focus:ring-0 focus:border-info"
                        type="text"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        required
                    />
                </label>
                <label className="block">
                    <span className="text-2xl mt-3">Tags</span>
                    {tags.map((tag, index) => (
                        <div
                            key={index}
                            className="flex flex-row items-center gap-6 mx-6"
                        >
                            <span className="text-xl min-w-max">
                                Tag {index + 1}:
                            </span>
                            <input
                                className="block w-full mt-3 input input-bordered bg-base-200"
                                type="text"
                                value={tag.title}
                                onChange={(e) => handleTagChange(index, e)}
                                required
                            />
                            <button
                                type="button"
                                onClick={() => removeTag(index)}
                                className="btn btn-square btn-error rounded-full"
                            >
                                <MinusIcon className="aspect-square w-8" />
                            </button>
                        </div>
                    ))}
                    <button
                        type="button"
                        onClick={addTag}
                        className="btn btn-info btn-square rounded-full justify-self-end mr-6"
                    >
                        <PlusIcon className="aspect-square w-8" />
                    </button>
                </label>
                <label className="block">
                    <span className="text-2xl">Description</span>
                    <textarea
                        className="block w-full mt-3 rounded-lg border border-base-300 bg-base-200 focus:ring-0 focus:border-info"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        required
                    />
                </label>
                <label className="block">
                    <span className="text-2xl">Body:</span>
                    <QuillEditor value={body} onChange={setBody} />
                </label>
                <button
                    className="btn btn-primary lg:btn-md w-auto mx-auto"
                    type="submit"
                >
                    Create Post
                </button>
            </form>
        </>
    );
}
