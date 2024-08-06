import { faStar } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Button, Card } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import "../components/DriverCard.css";

function DriverCard({ selected_driver }) {

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

  /*  const handleBackClick = () => {
    navigate("/driverlist");
  }; */

  return (
    <>
      <Card
        style={{ width: "100%", backgroundColor: "black" }}
        className="mt-3  p-4 rounded-4 card"
      >
        <div className="d-flex  align-items-center">
          <img
            src={`${selected_driver?.Profile}`}
            alt=""
            width={130}
            style={{ borderRadius: "50%" }}
          />
          <div className="ms-3">
            <h5 className="text-white">Name: {selected_driver?.DriverName}</h5>
            <h6 className="text-white">
              License : {selected_driver?.DriverLicense}
            </h6>
            <h6 className="text-white">
              Experience : {selected_driver?.Experience}
            </h6>
            <div className="d-flex justify-content-between mt-3">
              {renderStars(selected_driver?.DriverRating)}
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
            {selected_driver?.About}
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

export default DriverCard;
