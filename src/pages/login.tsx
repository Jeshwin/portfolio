import { useState } from "react"
import MyHead from "@/components/head"
import axios from "axios"
import { useRouter } from "next/router"

export default function Login() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [jwt, setJwt] = useState(null)

  const router = useRouter()

  const handleLogin = async (e) => {
    e.preventDefault()
    try{
        const response = await axios.post("/api/login", { email, password })
        const { token } = response.data
        localStorage.setItem('jwtToken', token)
        setJwt(token)
        router.push('/')
    } catch(e) {
        console.error('Login failed:', e)
    }
  }

  return (
    <>
      <MyHead title="Create Post" />
      <div id="top"></div>
      <form className="m-12 lg:mx-auto max-w-5xl grid grid-cols-1 gap-6 bag-base-100" onSubmit={handleLogin}>
        <div className="text-5xl font-bold">Admin Login</div>
        <label className="block">
          <span className="text-2xl" >Email</span>
          <input className="block w-full mt-3 rounded-lg border border-base-300 bg-base-200 focus:ring-0 focus:border-info" type="text" value={email} onChange={(e) => setEmail(e.target.value)} required />
        </label>
        <label className="block">
          <span className="text-2xl" >Password</span>
          <input className="block w-full mt-3 rounded-lg border border-base-300 bg-base-200 focus:ring-0 focus:border-info" type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
        </label>
        <button className="btn btn-primary lg:btn-md w-auto mx-auto" type="submit">Login</button>
      </form>
    </>
  )
}
