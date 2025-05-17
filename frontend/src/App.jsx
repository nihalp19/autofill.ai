import Layout from "./components/Layout"
import Hero from "./components/Hero"
import Signup from "./components/Signup"
import Login from "./components/Login"
import History from "./components/History"
import Profile from "./components/Profile"
import { Routes, Route } from "react-router-dom"
import { Toaster } from "react-hot-toast"
import { useAuthStore } from "./store/useAuthStore"
import { Navigate } from "react-router-dom"
import { useEffect } from "react"

function App() {

  const { user, checkAuth, isLoading } = useAuthStore()

  useEffect(() => {
    checkAuth()
  }, [checkAuth])


  if(!isLoading && user) return <div>...loading</div>

  return (
    <div>
      <Routes>
        <Route path="/login" element={!user ? <Login /> : <Navigate to={"/"} />} />
        <Route path="/signup" element={!user ? <Signup /> : <Navigate to={"/"} />} />


        <Route path="/" element={user ? <Layout /> : <Navigate to="/login" />}>
          <Route index element={<Hero />} />
          <Route path="history" element={<History />} />
          <Route path="profile" element={<Profile />} />
        </Route>
      </Routes>
      <Toaster />
    </div >
  )
}

export default App
