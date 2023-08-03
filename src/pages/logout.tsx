import { useEffect } from "react"
import { useRouter } from "next/router"

export default function NewPost() {
  const router = useRouter()

  useEffect(() => {
    localStorage.removeItem('jwtToken')
    router.push('/')
  })

  return (
    <span className="loading loading-spinner loading-lg"></span>
  )
}
