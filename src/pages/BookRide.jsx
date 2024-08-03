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
import { updateBookingFormState } from "../redux/slices/hirerDetailsSlice";
import "./BookRide.css";

function BookRide() {
  // Setting up the dispatch function from react-redux. This function is used to dispatch actions to the Redux store.
  const dispatch = useDispatch();

  // Setting up the navigate function from react-router-dom. This function is used for programmatic navigation within the application.
  const navigate = useNavigate();

  // Accessing the formffState from the Redux store. The useSelector hook allows you to extract data from the Redux store state.
  const bookingFormState = useSelector((state) => state.form.bookingFormState);

  // Handling changes in the input fields. The handleChange function updates the bookingFormState.
  // handleChange is a function that updates the state in the Redux store whenever an input field changes.
  // It extracts the name and value from the event target (e.target) and dispatches the updateBookingFormState action with the new value.
  const handleChange = (e) => {
    const { name, value } = e.target;
    dispatch(updateBookingFormState({ [name]: value }));
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
  /*   const handleNext = (e) => {
    e.preventDefault();
    if (!bookingFormState.service_type) {
      alert("Please fill the form completely.");
    } else {
      navigate("/driverlist");
    }
  }; */

  const handleBookNowClick = () => {
    navigate("/");
  };

  // State Initialization
  /* const [formState, setFormState] = useState({
    passenger_name: "",
    email: "",
    mobile_number: "",
    car_make: "",
    car_model: "",
    reg_number: "",
    ismobile_number: true,
    iscar_make: true,
    iscar_model: true,
    isreg_number: true,
  }); */

  const validate = (e) => {
    const data = e.target.value;
    const name = e.target.name;

    /* !!data.match(/^[0-9]*$/) ? (
      setWeight(data),
      setIsweight(true)
    ) : name === 'height' ? (
      setHeight(data),
      setIsheight(true)
    ) : null; */

    if (data.match(/^[0-9]*$/)) {
      if (name == "mobile_number") {
        handleChange(e);
        updateBookingFormState((prevState) => ({
          ...prevState,
          ismobile_number: true,
        }));
      } else {
        handleChange(e);
        updateBookingFormState((prevState) => ({
          ...prevState,
          isreg_number: true,
        }));
      }
    } else {
      if (name == "mobile_number") {
        handleChange(e);
        updateBookingFormState((prevState) => ({
          ...prevState,
          ismobile_number: false,
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

  const handleSubmit = (e) => {
    // Prevents form from reloading the page
    e.preventDefault();
    console.log(bookingFormState);

    // Check if weight or height is zero
    // if (formState.weight === "" || formState.height === "") {
    if (
      !bookingFormState.passenger_name ||
      !bookingFormState.email ||
      !bookingFormState.mobile_number ||
      !bookingFormState.car_type ||
      !bookingFormState.reg_number
    ) {
      alert("Please fill the form completely.");
    } /* else if (formState.weight === 0 || formState.height === 0){
      alert("Please fill the form completely.");
    } */
    /* else {
      // Calls the parent function to calculate BMI
      onCalculate(formState.weight, formState.height);
    } */
  };

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
                    name="passenger_name"
                    value={bookingFormState.passenger_name || ""}
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
                    name="email"
                    value={bookingFormState.email || ""}
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
                    name="mobile_number"
                    value={bookingFormState.mobile_number || ""}
                    onChange={validate}
                    className="w-100"
                    id="outlined-basic"
                    label="PICKUP LOCATION"
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
                  {!bookingFormState.ismobile_number && (
                    <p className="text-danger fw-bold fs-5 me-auto">
                      *Invalid Input
                    </p>
                  )}
                </div>
                <div className="form-group my-4">
                  <TextField
                    name="car_make"
                    value={bookingFormState.car_make || ""}
                    onChange={validate}
                    className="w-100"
                    id="outlined-basic"
                    label="DROPOFF LOCATION"
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
                  {!bookingFormState.iscar_make && (
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
                    onClick={handleBookNowClick}
                    variant="light"
                    size="lg"
                    className="mb-5 book"
                  >
                    Next
                  </Button>
                </div>
              </form>
            </div>
          </div>
          <div className="col-sm-0 col-md-1 col-lg-1 col-xl-1 col-xxl-1"></div>
        </div>
        <Footer />
      </div>
    </>
  );
}

export default BookRide;
