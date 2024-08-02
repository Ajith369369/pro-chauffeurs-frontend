import { Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import DriverCard from "../components/DriverCard";
import "../pages/DriverList.css";
function DriverList() {
  const navigate = useNavigate();
  const handleDriverClick = () => {
    navigate("/drivercard");
  };
  const handleBackClick = () => {
    navigate("/bookride");
  };
  return (
    <>
      <div className="driverlist px-3 px-md-5 py-5">
        <div className="container">
          <h1 className="text-light text-center  ">List Of Drivers</h1>
          <div className="row ">
            <div className="col-md-4 mt-5" onClick={handleDriverClick}>
              <DriverCard />
            </div>
            <div className="col-md-4 mt-5" onClick={handleDriverClick}>
              <DriverCard />
            </div>
            <div className="col-md-4 mt-5" onClick={handleDriverClick}>
              <DriverCard />
            </div>
            <div className="col-md-4 mt-5" onClick={handleDriverClick}>
              <DriverCard />
            </div>
            <div className="col-md-4 mt-5" onClick={handleDriverClick}>
              <DriverCard />
            </div>
            <div className="col-md-4 mt-5" onClick={handleDriverClick}>
              <DriverCard />
            </div>
          </div>
          <div className="mt-5 d-flex justify-content-center  ">
            <Button
              variant="light"
              onClick={handleBackClick}
              className="px-4 mb-5"
              style={{ backgroundColor: "white", width: "150px" }}
            >
              Back
            </Button>
            {/* <Button variant="light" className='px-4' style={{ backgroundColor: "white" }}>Next</Button> */}
          </div>
        </div>
      </div>
    </>
  );
}

export default DriverList;
