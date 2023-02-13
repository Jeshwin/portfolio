export default function MdxWrapper({ meta, children }) {
  return (
    <>
      <div className="p-5 lg:px-40 xl:px-80 lg:py-10 xl:py-20">
        <h1 className="font-bold w-fit text-6xl lg:text-8xl mt-20 mb-6">{meta.title}</h1>
        <time className="text-accent text-xl italic">{meta.date}</time>
        <div className="prose-lg lg:prose-xl mt-10">
          {children}
        </div>
      </div>
    </>
  )
}