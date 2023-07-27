import ReactQuill, { Quill } from "react-quill"
import MarkdownShortcuts from 'quill-markdown-shortcuts'
import "react-quill/dist/quill.snow.css";
Quill.register('modules/markdownShortcuts', MarkdownShortcuts)

export default function QuillEditor({ value, onChange }) {
    const quillModules = {
        toolbar: [
          [{ "header": [1, 2, 3, false] }],
          ["bold", "italic", "underline", "strike", "code"],
          ["blockquote", "code-block"],
          [{ 'align': '' }, { 'align' : 'center' }, { 'align' : 'right' }, { 'align' : 'justify' }],
          [{"indent": "-1"}, {"indent": "+1"}],
          [{"list": "ordered"}, {"list": "bullet"}],
          ["link", "image", "video"],
          ["clean"]
        ],
        markdownShortcuts: {}
      }
    
      const quillFormats = [
        "header",
        "bold", "italic", "underline", "strike", "code",
        "blockquote", "code-block",
        "align",
        "indent",
        "list", "bullet",
        "link", "image", "video"
      ]

    return (
        <>
            <ReactQuill 
                className="mt-3 block w-full bg-base-200"
                value={value}
                onChange={onChange}
                modules={quillModules}
                formats={quillFormats}
            />
        </>
    )
}