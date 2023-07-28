import { useEffect } from "react"
import { useRouter } from "next/router"
import { ThreeDotsFade } from "react-svg-spinners"

export default function NewPost() {
  const router = useRouter()

  useEffect(() => {
    localStorage.removeItem('jwtToken')
    router.push('/')
  })

  return (
    <ThreeDotsFade />
  )
}
