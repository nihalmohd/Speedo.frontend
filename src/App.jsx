import { useState } from 'react'
import { BrowserRouter as Router ,Route,Routes } from 'react-router-dom'
import './App.css'
import Login from './assets/Components/pages/Login'
import Home from './assets/Components/pages/Home'
import Modal from './assets/Components/Modal/Modal'
import Map from './assets/Components/pages/Map'
import UserProtectedRouter from './assets/Components/ProtectedRouter/Protectedrouter'


function App() {
  const [count, setCount] = useState(0)

  return (
     <Router>
      <Routes>
        <Route path='/' element={<Login/>}></Route>
        <Route path='/Home' element={<UserProtectedRouter><Home/></UserProtectedRouter>}></Route>
        <Route path='/Modal' element={<UserProtectedRouter><Modal/></UserProtectedRouter>}></Route>
        <Route path='/Map' element={<UserProtectedRouter><Map/></UserProtectedRouter>}></Route>
        {/* <Route path='/Mop' element={<ExcelDataProcessor/>}></Route> */}
      </Routes>
     </Router>
  )
}

export default App
