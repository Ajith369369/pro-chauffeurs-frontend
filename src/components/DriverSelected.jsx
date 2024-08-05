import { faStar } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useState } from "react";
import { Button, Card } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import "../components/DriverSelected.css";
import { updateDriverFormState } from "../redux/slices/hirerDetailsSlice";
import { getDetailsOfADriverApi } from "../services/pro_allApi";

function DriverSelected() {
  const navigate = useNavigate();

  const dispatch = useDispatch();
  const hirerFormState = useSelector(
    (state) => state.hirerDetails.hirerFormState
  );
  const driverFormState = useSelector(
    (state) => state.hirerDetails.driverFormState
  );

  // Use useLocation from react-router-dom to access the state passed through navigation.
  const location = useLocation();
  // Access driver details from navigation state
  const selectedDriver = location.state?.driver;
  console.log(`selectedDriver: ${selectedDriver}`);

  const [aDriver, setADriver] = useState([]);
  const getADriver = async (id) => {
    const result = await getDetailsOfADriverApi(id);
    console.log(result);
    setADriver(result.data);
  };
  console.log(aDriver);

  useEffect(() => {
    getADriver(selectedDriver?.id);
  }, []);

  const renderStars = (rating) => {
    const totalStars = 5;
    const filledStars = Array(rating)
      .fill()
      .map((_, i) => (
        <FontAwesomeIcon
          key={`filled-${i}`}
          icon={faStar}
          style={{ color: "#FFD43B" }}
        />
      ));
    console.log(`filledStars: ${filledStars.length}`);

    const unfilledStars = Array(totalStars - rating)
      .fill()
      .map((_, i) => (
        <FontAwesomeIcon
          key={`unfilled-${i}`}
          icon={faStar}
          style={{ color: "white" }}
        />
      ));
    console.log(`unfilledStars: ${unfilledStars.length}`);

    return [...filledStars, ...unfilledStars];
    // const validRating =[]
    /* if (rating>0 && rating<=5) {
      
    } else {
      console.log("Invalid rating.");
    } */
  };

  const handleSelectDriverClick = () => {
    dispatch(updateDriverFormState({ selectedDriver }));
    navigate("/bookride", { state: { hirerFormState, driverFormState } });
  };

  return (
    <>
      <Card
        style={{ width: "100%", backgroundColor: "black" }}
        className="mt-3  p-4 rounded-4 card"
      >
        <div className="d-flex  align-items-center">
          <img
            src={`${selectedDriver?.Profile}`}
            alt=""
            width={130}
            style={{ borderRadius: "50%" }}
          />
          <div className="ms-3">
            <h5 className="text-white">Name: {selectedDriver?.DriverName}</h5>
            <h6 className="text-white">
              License : {selectedDriver?.DriverLicense}
            </h6>
            <h6 className="text-white">
              Experience : {selectedDriver?.Experience}
            </h6>
            <div className="d-flex justify-content-between mt-3">
              {/* {renderStars(selectedDriver?.DriverRating)} */}
              {/* <FontAwesomeIcon icon={faStar} style={{ color: "#FFD43B" }} />
              <FontAwesomeIcon icon={faStar} style={{ color: "white" }} /> */}
            </div>
          </div>
        </div>
        <Card.Body>
          <Card.Text
            className="text-light mt-3"
            style={{ textAlign: "justify" }}
          >
            {selectedDriver?.About}
          </Card.Text>
          <div className="d-flex align-items-center justify-content-center mt-4 px-4">
            {/* <Button
              onClick={handleBackClick}
              variant="light"
              className="px-4 me-5"
              style={{ backgroundColor: "white", width: "150px" }}
            >
              Back
            </Button> */}
            <Button
              onClick={handleSelectDriverClick}
              variant="light"
              className="px-4"
              style={{ backgroundColor: "white", width: "150px" }}
            >
              Select Driver
            </Button>
          </div>
        </Card.Body>
      </Card>
    </>
  );
}

export default DriverSelected;
