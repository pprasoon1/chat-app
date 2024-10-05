import React, { useState } from 'react'
import { useAuthContext } from '../context/AuthContext'
import toast from 'react-hot-toast'

const useLogin = () => {
  const [loading, setLoading] = useState(false)   
  const { setAuthUser } = useAuthContext()

  const login = async (userName, password) => {
    const success = handleInputErrors({ userName, password })
    if (!success) return

    setLoading(true)  
    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userName, password })
      })

      const data = await res.json()
      if (!res.ok) {
        throw new Error(data.error || "Login failed. Please try again.")
      }

      localStorage.setItem("chat-user", JSON.stringify(data))
      setAuthUser(data)
      toast.success("Logged in successfully!")
      
    } catch (error) {
      toast.error(error.message)
    } finally {
      setLoading(false)
    }
  }

  return { loading, login }
}

export default useLogin

function handleInputErrors({ userName, password }) {
  if (!userName.trim() || !password.trim()) {
    toast.error("All fields are required")
    return false
  }
  return true
}
