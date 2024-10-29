import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Login from './Screens/Login'
import Signup from './Screens/Signup'
import Dashbord from './Screens/Dashboard'
// import Login from './Screens/Login'
// import Signup from './Screens/Signup'
// import Dashbord from './Screens/Dashboard'


const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/Signup" element={<Signup />} />
      <Route path="/Dashbord" element={<Dashbord />} />
    </Routes>
  )
}

export default App