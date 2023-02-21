import '@/styles/globals.css'
import { useRouter } from 'next/router'
import { useEffect } from 'react'

import Layout from '../components/layout'

export default function App({ Component, pageProps }) {
  const router = useRouter()

  useEffect(() => {
    router.events.on('routeChangeComplete', () => {
      window.scroll(0,0)
      window.setTimeout(() => {
        document.getElementById("my-drawer").checked = false
      }, 10)
    })
  })

  return (
    <Layout>
      <Component {...pageProps} />
    </Layout>
  )
}
