// useDispatch, useSelector: Importing hooks from react-redux to interact with the Redux store.
// useNavigate: Importing the hook from react-router-dom for navigation.
// updateFormffState: Importing the action creator from the formSlice
import TextField from "@mui/material/TextField";
// import { useState } from "react";
import Button from "react-bootstrap/Button";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Footer from "../components/Footer";
import Header from "../components/Header";
import { resetBookingFormState, resetDriverFormState, resetHirerFormState, updateBookingFormState } from "../redux/slices/hirerDetailsSlice";
import "./BookRide.css";
import { addBookingDetailsOfAUserApi, getPlacesApi } from "../services/pro_allApi";
import { useEffect, useState } from "react";
import {  ToastContainer } from "react-bootstrap";
import { toast } from "react-toastify";

function BookRide() {
  // -----------------------------------------------------------------------
  // State to hold the list of places fetched from the server
  const [places, setPlaces] = useState([]);
  // State to store the input values for from and to locations
  const [fromPlaceName, setFromPlaceName] = useState('');
  const [toPlaceName, setToPlaceName] = useState('');
  // State to hold the place objects corresponding to the input values
  const [fromPlace, setFromPlace] = useState(null);
  const [toPlace, setToPlace] = useState(null);
  // State to hold the calculated distance and cost
  const [distance, setDistance] = useState(0);
  const [cost, setCost] = useState(0);
// for disable div
const isDisabled = !distance; // Determine if the div should be disabled


  // Fetch the list of places from the server when the component mounts
  useEffect(() => {
    const fetchPlaces = async () => {
      try {
        // Make a GET request to the JSON Server to fetch places
        const response = await getPlacesApi()
        // Update the state with the fetched places
        setPlaces(response.data);
        // console.log(response.data);

      } catch (error) {
        // Log any errors that occur during the fetch
        console.error('Error fetching places:', error);
      }
    };

    fetchPlaces();
  }, []); // Empty dependency array means this effect runs only once when the component mounts

  // Update the fromPlace and toPlace states whenever the input values or places change
  useEffect(() => {
    // Find the place object that matches the fromPlaceName
    const from = places.find(p => p.name.toLowerCase() === fromPlaceName.toLowerCase());
    // Find the place object that matches the toPlaceName
    const to = places.find(p => p.name.toLowerCase() === toPlaceName.toLowerCase());
    // Update the state with the found place objects
    setFromPlace(from);
    setToPlace(to);

    // Calculate the distance and cost whenever the place objects are updated
    if (from && to) {
      const dist = calculateDistance(from.latitude, from.longitude, to.latitude, to.longitude);
      setDistance(dist.toFixed(1)); // Distance in kilometers
      const calculatedCost = dist * 30; // Cost in rupees
      setCost(Math.floor(calculatedCost)); // Cost rounded to 2 decimal places
    } else {
      // Clear the distance and cost if one or both places are not selected
      setDistance(0);
      setCost(0);
    }
  }, [fromPlaceName, toPlaceName, places]); // Dependency array includes input values and places

  // Function to calculate the distance using the Haversine formula
  const calculateDistance = (lat1, lon1, lat2, lon2) => {
    // Convert degrees to radians
    const toRad = (value) => (value * Math.PI) / 180;

    const R = 6371; // Radius of the Earth in kilometers
    const dLat = toRad(lat2 - lat1);
    const dLon = toRad(lon2 - lon1);
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) *
      Math.sin(dLon / 2) * Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c; // Distance in kilometers
  };

  // ------------------------------------------------------------------------



  // Setting up the dispatch function from react-redux. This function is used to dispatch actions to the Redux store.
  const dispatch = useDispatch()

  // Setting up the navigate function from react-router-dom. This function is used for programmatic navigation within the application.
  const navigate = useNavigate();

  // Accessing the bookingFormState from the Redux store. The useSelector hook allows you to extract data from the Redux store state.
  const hirerFormState = useSelector((state) => state.hirerDetails.hirerFormState);
  const driverFormState = useSelector((state) => state.hirerDetails.driverFormState);
  const bookingFormState = useSelector((state) => state.hirerDetails.bookingFormState);

  // Handling changes in the input fields. The handleChange function updates the bookingFormState.
  // handleChange is a function that updates the state in the Redux store whenever an input field changes.
  // It extracts the name and value from the event target (e.target) and dispatches the updateBookingFormState action with the new value.
  const handleChange = (e) => {
    const { name, value } = e.target;
    dispatch(updateBookingFormState({ [name]: value }));

    if (name == "pickup_location") {
      setFromPlaceName(value)

    }
    else {
      setToPlaceName(value)

    }

  };

  /*   const handleChange = (e) => {
    const { name, value } = e.target;
    setFormState((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  }; */

  const handleBackClick = () => {
    navigate("/driverlist");
  };

  // Handling the form submission. handleNext is a function that gets called when the form is submitted. The handleNext function handles form submission.
  //It prevents the default form submission behavior (e.preventDefault()).
  // If service_type is not filled, it alerts the user. Otherwise, it navigates to the /driverlist route.
  /*     const handleBookNowClick = (e) => {
      e.preventDefault();
      if (!bookingFormState.service_type) {
        alert("Please fill the form completely.");
      } else {
  
        navigate("/");
      }
    }; */

  /*  const validate = (e) => {
     const data = e.target.value;
     const name = e.target.name;
 
     if (data.match(/^[0-9]*$/)) {
       if (name == "pickup_location") {
         handleChange(e);
         updateBookingFormState((prevState) => ({
           ...prevState,
           ispickup_location: true,
         }));
       } else {
         handleChange(e);
         updateBookingFormState((prevState) => ({
           ...prevState,
           isreg_number: true,
         }));
       }
     } else {
       if (name == "pickup_location") {
         handleChange(e);
         updateBookingFormState((prevState) => ({
           ...prevState,
           ispickup_location: false,
         }));
       } else {
         handleChange(e);
         updateBookingFormState((prevState) => ({
           ...prevState,
           isreg_number: false,
         }));
       }
     }
   };
  */
  const handleSubmit = async (e) => {
    // Prevents form from reloading the page
    e.preventDefault();
    console.log(bookingFormState);

    // Check if weight or height is zero
    // if (formState.weight === "" || formState.height === "") {
    if (
      !bookingFormState.service_type ||
      !bookingFormState.pickup_date ||
      !bookingFormState.pickup_location ||
      !bookingFormState.dropoff_location
    ) {
      alert("Please fill the form completely.");
    } else {
      const combinedFormState = { ...hirerFormState, ...driverFormState, ...bookingFormState };
      const response = await addBookingDetailsOfAUserApi(combinedFormState);
      if (response.status >= 200 && response.status < 300) {
        dispatch(addBookingDetailsOfAUserApi(combinedFormState));
        dispatch(resetHirerFormState());
        dispatch(resetDriverFormState());
        dispatch(resetBookingFormState());
      } else {
        alert("Failed to save booking details. Please try again.");
      }
      navigate("/");
    }
    /* else {
      // Calls the parent function to calculate BMI
      onCalculate(formState.weight, formState.height);
    } */
  };
  //  Confrim Booking
  const confirmBooking=()=>{
    toast.success("video uploaded Successfully")
  }
  return (
    <>
      <div id="book_ride" className="container-fluid w-100">
        <Header />
        <div className="row">
          <div className="col-sm-0 col-md-1 col-lg-1 col-xl-1 col-xxl-1"></div>
          <div className="col-sm-12 col-md-10 col-lg-10 col-xl-10 col-xxl-10 d-flex flex-column justify-content-start align-items-center">
            <div className="d-flex flex-column justify-content-center align-items-center border border-light cp">
              <h4 className="text-center my-5">Booking Details</h4>
              <form onSubmit={handleSubmit}>
                <div className="form-group my-4">
                  <TextField
                    name="service_type"
                    value={bookingFormState.service_type || ""}
                    className="w-100"
                    id="outlined-basic"
                    label="SERVICE TYPE"
                    variant="outlined"
                    sx={{
                      // Root class for the input field
                      "& .MuiOutlinedInput-root": {
                        color: "#000000",
                        fontFamily: "Arial",
                        fontWeight: "bold",
                        height: "60px",
                        alignItems: "center",
                        paddingLeft: "5px",
                        // Class for the border around the input field
                        "& .MuiOutlinedInput-notchedOutline": {
                          borderColor: "#000000",
                          borderWidth: "1px",
                        },
                        // Change border color when focused
                        "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                          borderColor: "#ffffff",
                        },
                      },
                      // Class for the label of the input field
                      "& .MuiInputLabel-outlined": {
                        color: "white",
                        fontSize: "16px",
                      },
                      // Change label color when focused
                      "& .MuiInputLabel-outlined.Mui-focused": {
                        color: "white",
                      },
                    }}
                  />
                </div>
                <div className="form-group my-4">
                  <TextField
                    name="pickup_date"
                    value={bookingFormState.pickup_date || ""}
                    className="w-100"
                    id="outlined-basic"
                    label="PICKUP DATE"
                    variant="outlined"
                    sx={{
                      // Root class for the input field
                      "& .MuiOutlinedInput-root": {
                        color: "#000000",
                        fontFamily: "Arial",
                        fontWeight: "bold",
                        height: "60px",
                        alignItems: "center",
                        paddingLeft: "5px",
                        // Class for the border around the input field
                        "& .MuiOutlinedInput-notchedOutline": {
                          borderColor: "#000000",
                          borderWidth: "1px",
                        },
                        // Change border color when focused
                        "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                          borderColor: "#ffffff",
                        },
                      },
                      // Class for the label of the input field
                      "& .MuiInputLabel-outlined": {
                        color: "white",
                        fontSize: "16px",
                      },
                      // Change label color when focused
                      "& .MuiInputLabel-outlined.Mui-focused": {
                        color: "white",
                      },
                    }}
                  />
                </div>
                <div className="form-group my-4">
                  <TextField
                    name="pickup_location"
                    value={bookingFormState.pickup_location || ""}
                    onChange={handleChange}
                    className="w-100"
                    id="outlined-basic"
                    label="PICKUP LOCATION"
                    variant="outlined"
                    sx={{
                      // Root class for the input field
                      "& .MuiOutlinedInput-root": {
                        color: "white",
                        fontFamily: "Arial",
                        fontWeight: "bold",
                        height: "60px",
                        alignItems: "center",
                        paddingLeft: "5px",
                        // Class for the border around the input field
                        "& .MuiOutlinedInput-notchedOutline": {
                          borderColor: "#000000",
                          borderWidth: "1px",
                        },
                        // Change border color when focused
                        "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                          borderColor: "#ffffff",
                        },
                      },
                      // Class for the label of the input field
                      "& .MuiInputLabel-outlined": {
                        color: "white",
                        fontSize: "16px",
                      },
                      // Change label color when focused
                      "& .MuiInputLabel-outlined.Mui-focused": {
                        color: "white",
                      },
                    }}
                  />
                  {!bookingFormState.ispickup_location && (
                    <p className="text-danger fw-bold fs-5 me-auto">
                      *Invalid Input
                    </p>
                  )}
                </div>
                <div className="form-group my-4">
                  <TextField
                    name="dropoff_location"
                    value={bookingFormState.dropoff_location || ""}
                    onChange={handleChange}
                    className="w-100"
                    id="outlined-basic"
                    label="DROPOFF LOCATION"
                    variant="outlined"
                    sx={{
                      // Root class for the input field
                      "& .MuiOutlinedInput-root": {
                        color: "white",
                        fontFamily: "Arial",
                        fontWeight: "bold",
                        height: "60px",
                        alignItems: "center",
                        paddingLeft: "5px",
                        // Class for the border around the input field
                        "& .MuiOutlinedInput-notchedOutline": {
                          borderColor: "#000000",
                          borderWidth: "1px",
                        },
                        // Change border color when focused
                        "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                          borderColor: "#ffffff",
                        },
                      },
                      // Class for the label of the input field
                      "& .MuiInputLabel-outlined": {
                        color: "white",
                        fontSize: "16px",
                      },
                      // Change label color when focused
                      "& .MuiInputLabel-outlined.Mui-focused": {
                        color: "white",
                      },
                    }}
                  />
                  {!bookingFormState.isdropoff_location && (
                    <p className="text-danger fw-bold fs-5 me-auto">
                      *Invalid Input
                    </p>
                  )}
                </div>

                {/* <div className="form-group ps-2 pe-2 my-4 d-flex justify-content-center align-items-center">
                  <div className="me-2">
                    <Form.Select
                      name="car_type"
                      value={formState.car_type || ""}
                      onChange={handleChange}
                      aria-label="Select car type"
                      className="custom-form-select"
                    >
                      <option>CAR TYPE</option>
                      <option value="convertible">CONVERTIBLE</option>
                      <option value="hatchback">HATCHBACK</option>
                      <option value="sedan">SEDAN</option>
                      <option value="suv">SUV</option>
                      <option value="truck">TRUCK</option>
                    </Form.Select>
                  </div>
                  <div className="ms-2">
                  </div>
                </div> */}
                <div className={isDisabled ? 'disabled' : ''}>
                    <div className="d-flex  flex-column justify-content-center align-items-center">
                     <div className="bg-success w-100 rounded d-flex justify-content-center align-items-center p-2" > <h5 className="mt-1" >Distance : {distance} km</h5></div>
                     <div className="bg-primary w-100 rounded d-flex justify-content-center align-items-center p-2 mt-3"> <h5 className="mt-1" >Amount : ₹{cost}</h5></div>
                      
                    </div>
                 
                </div>
                <div className="form-group ps-2 pe-2 my-5 d-flex flex-wrap justify-content-center align-items-center">
                  <Button
                    onClick={handleBackClick}
                    variant="light"
                    size="lg"
                    className="mb-5 back"
                  >
                    Back
                  </Button>
                  <Button
                    type="submit"
                    variant="light"
                    size="lg"
                    className="mb-5 book"
                    onClick={confirmBooking}
                    disabled={distance ? false:true}
                    
                  >
                    PAY Now
                  </Button>
                </div>
              </form>
            </div>
          </div>
          <div className="col-sm-0 col-md-1 col-lg-1 col-xl-1 col-xxl-1"></div>
        </div>
        <Footer />
      </div>
      <ToastContainer position="top-right" theme="colored" autoclose={5000}/>
    </>
  );
}

export default BookRide;
