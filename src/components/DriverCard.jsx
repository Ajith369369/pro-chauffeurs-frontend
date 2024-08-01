import { faStar } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Button, Card } from 'react-bootstrap'
import  '../components/DriverCard.css'
import { useNavigate } from "react-router-dom";
function DriverCard() {
  const navigate = useNavigate();

  const handleDriverClick = () => {
    navigate("/hirerdetails");
  };
  return (
    <>
      <Card onClick={handleDriverClick} style={{ width: '100%', backgroundColor: 'black' }} className='mt-3  p-4 rounded-4 card'>
        <div className='d-flex  align-items-center'>
          <img src="https://cms-assets.tutsplus.com/uploads/users/810/profiles/19338/profileImage/profile-square-extra-small.png" alt="" width={100} style={{ borderRadius: "50%" }} />
          <div className='ms-3'>
            <h5 className='text-white'>Driver Name</h5>
            <div className='d-flex justify-content-between mt-3'>
              <FontAwesomeIcon icon={faStar} style={{ color: "#FFD43B", }} />
              <FontAwesomeIcon icon={faStar} style={{ color: "#FFD43B", }} />
              <FontAwesomeIcon icon={faStar} style={{ color: "#FFD43B", }} />
              <FontAwesomeIcon icon={faStar} style={{ color: "white", }} />
              <FontAwesomeIcon icon={faStar} style={{ color: "white", }} />
            </div>
          </div>
        </div>
        <Card.Body>
          <Card.Text className='text-light mt-3' style={{ textAlign: "justify" }}>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Doloremque ducimus numquam nam ab dolor alias impedit neque dolore, corporis vel, exercitationem distinctio, eaque ipsum laborum?
          </Card.Text>
          <div className='d-flex align-items-center justify-content-center mt-4 '> <Button variant="light" className='px-4' style={{ backgroundColor: "white" }}>Select Driver</Button></div>
        </Card.Body>
      </Card>
     
    </>
  )
}

export default DriverCard