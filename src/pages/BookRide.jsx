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
import { addBookingDetailsOfAUserApi } from "../services/pro_allApi";


function BookRide() {
  // Setting up the dispatch function from react-redux. This function is used to dispatch actions to the Redux store.
  const dispatch = useDispatch()

  // Setting up the navigate function from react-router-dom. This function is used for programmatic navigation within the application.
  const navigate = useNavigate();

  // Accessing the bookingFormState from the Redux store. The useSelector hook allows you to extract data from the Redux store state.
  const hirerFormState = useSelector((state) => state.form.hirerFormState);
  const driverFormState = useSelector((state) => state.form.driverFormState);
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
  const handleSubmit = (e) => {
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
      if (response.status >=200 && response.status <300) {
        dispatch(addBookingDetail(combinedFormState));
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
