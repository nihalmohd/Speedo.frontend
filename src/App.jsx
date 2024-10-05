import { useState } from 'react'
import { BrowserRouter as Router ,Route,Routes } from 'react-router-dom'
import './App.css'
import Login from './assets/Components/pages/Login'
import Home from './assets/Components/pages/Home'
import Modal from './assets/Components/Modal/Modal'
import Map from './assets/Components/pages/Map'
import Mapintergration from './assets/Components/pages/Mapintergration'


function App() {
  const [count, setCount] = useState(0)

  return (
     <Router>
      <Routes>
        <Route path='/' element={<Login/>}></Route>
        <Route path='/Home' element={<Home/>}></Route>
        <Route path='/Modal' element={<Modal/>}></Route>
        <Route path='/Map' element={<Map/>}></Route>
        <Route path='/Mop' element={<Mapintergration/>}></Route>
      </Routes>
     </Router>
  )
}

export default App
