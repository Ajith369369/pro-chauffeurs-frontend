import Footer from './components/Footer';
import Header from './components/Header';
import Home from './pages/Home';
import './App.css'
import { Route, Routes } from "react-router-dom";
import HirerDetails from './pages/HirerDetails';
import BookRide from './pages/BookRide';
import DriverList from './pages/DriverList';
import Services from "./components/Services";
import ClientRating from "./components/ClientRating";
import DriverCard from "./components/DriverCard";


function App() {

  return (
    <>
     <Routes>
     <Route path='/' element={<Home/>}/>
     <Route path='/about' element={<About/>}/>
     <Route path='/services' element={<Services/>}/>
     <Route path='/reasons' element={<Reasons/>}/>
     <Route path='/clientrating' element={<ClientRating/>}/>
     <Route path='/header' element={<Header/>}/>
     <Route path='/footer' element={<Footer/>}/>
     <Route path='/driverlist' element={<BookRide/>}/>
     <Route path='/driverlist' element={<DriverList/>}/>
     <Route path='/drivercard' element={<DriverCard/>}/>
     <Route path='/hirerdetails' element={<HirerDetails/>}/>
     <h1 className='bg-success'>Hello</h1>
     </Routes>
    </>
  )
}

export default App
