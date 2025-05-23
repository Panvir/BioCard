
import './App.css'
import Create from './components/Create'
import Navbar from './components/Navbar'
import {BrowserRouter,Routes,Route} from "react-router-dom"
import Read from './components/Read'
import Update from './components/Update'

function App() {
  

  return (
    <div>
      {/* <button className='btn btn-primary'>Hello world</button> */}
      <BrowserRouter>
      <Navbar/>
      <Routes>
        <Route  path='/' element={<Create />}/>
        <Route  path='/all' element={<Read/>}/>
        <Route  path='/:id' element={<Update/>}/>
      </Routes>
      </BrowserRouter>
      
    </div>
  )
}

export default App
