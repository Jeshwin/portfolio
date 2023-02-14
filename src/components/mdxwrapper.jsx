export default function MdxWrapper({ meta, children }) {
  return (
    <>
      <div id="top"></div>
      <div className="p-5 lg:px-48 xl:px-96 lg:py-10 xl:py-20">
        <h1 className="font-bold w-fit text-6xl lg:text-8xl mt-20 mb-6">{meta.title}</h1>
        <time className="text-accent text-xl italic">{meta.date}</time>
        <div className="max-w-full prose lg:prose-xl dark:prose-invert mt-10">
          {children}
        </div>
      </div>
    </>
  )
}