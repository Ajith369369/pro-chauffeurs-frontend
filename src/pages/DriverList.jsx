import DriverCard from '../components/DriverCard'
import   '../pages/DriverList.css'
import { Button } from 'react-bootstrap'
function DriverList() {
  return (
    <>
    <div className='driverlist px-3 px-md-5 py-5'>
      <div className="container">
      <h1 className='text-light text-center  '>List Of Drivers</h1>
      <div className="row ">
        <div className="col-md-4 mt-5">
          <DriverCard/>
        </div>
        <div className="col-md-4 mt-5">
        <DriverCard/>
        </div>
        <div className="col-md-4 mt-5">
        <DriverCard/>
        </div>
        <div className="col-md-4 mt-5">
        <DriverCard/>
        </div>
        <div className="col-md-4 mt-5">
        <DriverCard/>
        </div>
        <div className="col-md-4 mt-5">
        <DriverCard/>
        </div>
      </div>
      <div className='mt-5 d-flex justify-content-between  '>
      <Button variant="light" className='px-4 me-' style={{ backgroundColor: "white" }}>Back</Button>
      <Button variant="light" className='px-4' style={{ backgroundColor: "white" }}>Next</Button>
      </div>
      </div>
    </div>

    </>
  )
}

export default DriverList