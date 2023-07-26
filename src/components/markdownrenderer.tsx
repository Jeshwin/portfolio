import MarkdownIt from 'markdown-it'
import MarkdownItAttrs from 'markdown-it-attrs'
import { sanitize } from 'isomorphic-dompurify'

const md = new MarkdownIt()
md.use(MarkdownItAttrs)

export default function MarkdownRenderer ({ markdownText }) {
  // const html = md.render(markdownText)
  // const sanitizedHtml = sanitize(html)
  // return <div className="prose lg:prose-xl pb-12" dangerouslySetInnerHTML={{ __html: sanitizedHtml }} />;
  return <div className="prose lg:prose-xl pb-12" dangerouslySetInnerHTML={{ __html: markdownText }} />;
}