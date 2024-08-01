import './App.css'
import { BrowserRouter as Router,Route, Routes } from 'react-router-dom'
import Home from './pages/Home'
import './bootstrap.min.css'

function App() {

  return (
    <>
    <h1 className='bg-success'>Hello</h1>
    <Router>
    <Routes>
      <Route path='/' element={<Home/>}/>
     </Routes>
    </Router>
     
    </>
  )
}

export default App

