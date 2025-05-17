import Layout from "./components/Layout"
import Hero from "./components/Hero"
import Signup from "./components/Signup"
import Login from "./components/Login"
import History from "./components/History"
import Profile from "./components/Profile"
import { Routes, Route } from "react-router-dom"

function App() {

  return (
    <div>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Hero/>} />
          <Route path="/login" element={<Login/>} />
          <Route path="/signup" element={<Signup/>}/>
          <Route path="/history"  element={<History/>}/>
          <Route path="/profile"  element={<Profile/>}/>
        </Route>
      </Routes>
    </div>
  )
}

export default App
