import { Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import DriverCard from "../components/DriverCard";
import "../pages/DriverList.css";
import { useEffect, useState } from "react";
import { getDetailsOfAllDriversApi } from "../services/pro_allApi";
// import { useDispatch, useSelector } from "react-redux";
// import { updateDriverFormState } from "../redux/slices/hirerDetailsSlice";

function DriverList() {
  
  const navigate = useNavigate();

  // const dispatch = useDispatch()
  // const hirerFormState = useSelector((state) => state.hirerDetails.hirerFormState);
  // const driverFormState = useSelector((state) => state.hirerDetails.driverFormState);

  const [allDrivers, setAllDrivers] = useState([]);
  const getAllDrivers = async () => {
    const result = await getDetailsOfAllDriversApi();
    // console.log(result);
    setAllDrivers(result.data);
  };
  console.log(allDrivers);

  useEffect(() => {
    getAllDrivers();
  }, []);

  /* const handleDriverClick = () => {
    navigate("/drivercard");
  }; */

  const handleDriverClick = (driver) => {
    // Navigate with the selected driver's data
    navigate("/drivercard", { state: { driver } });
  };


  const handleBackClick = () => {
    navigate("/hirerdetails");
  };
  return (
    <>
      <div className="driverlist px-3 px-md-5 py-5">
        <div className="container">
          <h1 className="text-light text-center  ">List Of Drivers</h1>
          <div className="row ">
            {allDrivers?allDrivers?.map((item) => (<div key={item.id} className="col-md-4 mt-5" onClick={() => handleDriverClick(item)}>
              <DriverCard selected_driver={item} selected_driver_id={item?.id}/>
            </div>))
            :<p className="text-danger fs-5 mt-5">Nothing to display.</p>}
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
