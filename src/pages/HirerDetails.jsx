import TextField from "@mui/material/TextField";
import { useState } from "react";
import Button from "react-bootstrap/Button";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Footer from "../components/Footer";
import Header from "../components/Header";
import { updateHirerFormState } from "../redux/slices/hirerDetailsSlice";
import "./HirerDetails.css";

function HirerDetails() {
  // State Initialization
  const [hireFormState, setHireFormState] = useState({
    is_passenger_name: true,
    is_car_make: true,
    is_car_model: true,
    is_mobile_number: true,
    is_reg_number: true,
  });

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const hirerFormState = useSelector(
    (state) => state.hirerDetails.hirerFormState
  );

  const handleBackClick = () => {
    navigate("/");
  };

  const handleChange = (name, value) => {
    // const { name, value } = e.target;
    setHireFormState((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const validateData = (e) => {
    const { name, value } = e.target;
    dispatch(updateHirerFormState({ [name]: value }));
    if (name === "passenger_name") {
      if (!/^[A-Za-z]+$/.test(value)) {
        handleChange(hireFormState.is_passenger_name, false)
       /*  setHireFormState((prevState) => ({
          // Copy all the existing state properties
          ...prevState,

          // Update the specific property
          is_passenger_name: false,
        })); */
      } else {
        handleChange(hireFormState.is_passenger_name, true)
        /* setHireFormState((prevState) => ({
          // Copy all the existing state properties
          ...prevState,

          // Update the specific property
          is_passenger_name: true,
        })); */
      }
    } else if (name === "car_make") {
      if (!/^[A-Za-z]+$/.test(value)) {
        setHireFormState((prevState) => ({
          // Copy all the existing state properties
          ...prevState,

          // Update the specific property
          is_car_make: false,
        }));
      }
    } else if (name === "car_model") {
      if (!/^[A-Za-z]+$/.test(value)) {
        setHireFormState((prevState) => ({
          // Copy all the existing state properties
          ...prevState,

          // Update the specific property
          is_car_model: false,
        }));
      }
    } else if (name === "mobile_number") {

      // Regular Expression: /^[0-9]*$/
      // ^: Asserts the position at the start of the string.
      // [0-9]*: Matches zero or more (*) digits (0-9). This means the value can be any combination of digits or an empty string.
      // $: Asserts the position at the end of the string.
      // test(): A method of the Regular Expression (RegExp) object that tests if a string (value) matches the regular expression. If the value contains only digits (or is empty), .test(value) returns true. If there are any non-numeric characters, it returns false.
      //isValid = /^[0-9]*$/.test(value);
      if (!/^\d+$/.test(value)) {
        setHireFormState((prevState) => ({
          // Copy all the existing state properties
          ...prevState,

          // Update the specific property
          is_mobile_number: false,
        }));
      }
    } else if (name === "reg_number") {
      if (!/^[A-Za-z0-9]+$/.test(value)) {
        setHireFormState((prevState) => ({
          // Copy all the existing state properties
          ...prevState,

          // Update the specific property
          is_reg_number: false,
        }));
      }
    }
    // dispatch(updateHirerFormState({ [name]: value }));

  };

  /*  const handleChange = (e) => {
    // const { name, value } = e.target;
    validate(e);
    // dispatch(updateHirerFormState({ [name]: value }));
  }; */

  // const handleSubmit = (e) => {
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (
      !hirerFormState.passenger_name ||
      !hirerFormState.email ||
      !hirerFormState.mobile_number ||
      !hirerFormState.car_make ||
      !hirerFormState.car_model ||
      !hirerFormState.reg_number
    ) {
      alert("Please fill the form completely.");
    } else {
      try {
        navigate("/driverlist", { state: { hirerFormState } });
      } catch (error) {
        console.error("Failed to save booking details:", error);
        alert("Failed to save booking details. Please try again.");
      }
    }
  };

  return (
    <>
      <div id="hirer_details" className="container-fluid w-100">
        <Header />
        <div className="row">
          <div className="col-sm-0 col-md-1 col-lg-1 col-xl-1 col-xxl-1"></div>
          <div className="col-sm-12 col-md-10 col-lg-10 col-xl-10 col-xxl-10 d-flex flex-column justify-content-start align-items-center">
            <div className="d-flex flex-column justify-content-center align-items-center border border-light cp">
              <h4 className="text-center my-5">Hirer Details</h4>
              <form onSubmit={handleSubmit}>
                <div className="form-group my-4">
                  <TextField
                    name="passenger_name"
                    value={hirerFormState.passenger_name || ""}
                    onChange={(e) => validateData(e)}
                    className="w-100"
                    id="outlined-basic-1"
                    label="PASSENGER NAME"
                    variant="outlined"
                    sx={{
                      // Root class for the input field
                      "& .MuiOutlinedInput-root": {
                        color: "#ffffff",
                        fontFamily: "Arial",
                        fontWeight: "bold",
                        height: "60px",
                        alignItems: "center",
                        paddingLeft: "5px",
                        // Apply text-transform to the input element
                        "& input": {
                          textTransform: "uppercase",
                        },
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
                  {hireFormState.is_passenger_name == false && (
                    <p className="text-danger fw-bold fs-5 me-auto">
                      *Invalid Input
                    </p>
                  )}
                </div>
                <div className="form-group my-4">
                  <TextField
                    name="email"
                    value={hirerFormState.email || ""}
                    onChange={(e) => validateData(e)}
                    className="w-100"
                    id="outlined-basic-2"
                    label="EMAIL"
                    variant="outlined"
                    sx={{
                      // Root class for the input field
                      "& .MuiOutlinedInput-root": {
                        color: "#ffffff",
                        fontFamily: "Arial",
                        fontWeight: "bold",
                        height: "60px",
                        alignItems: "center",
                        paddingLeft: "5px",
                        // Apply text-transform to the input element
                        "& input": {
                          textTransform: "lowercase",
                        },
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
                    value={hirerFormState.mobile_number || ""}
                    onChange={(e) => validateData(e)}
                    className="w-100"
                    id="outlined-basic-3"
                    label="MOBILE NUMBER"
                    variant="outlined"
                    sx={{
                      // Root class for the input field
                      "& .MuiOutlinedInput-root": {
                        color: "#ffffff",
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
                  {hireFormState.is_mobile_number == false && (
                    <p className="text-danger fw-bold fs-5 me-auto">
                      *Invalid Input
                    </p>
                  )}
                </div>
                <div className="form-group my-4">
                  <TextField
                    name="car_make"
                    value={hirerFormState.car_make || ""}
                    onChange={(e) => validateData(e)}
                    className="w-100"
                    id="outlined-basic-4"
                    label="CAR'S MAKE"
                    variant="outlined"
                    sx={{
                      // Root class for the input field
                      "& .MuiOutlinedInput-root": {
                        color: "#ffffff",
                        fontFamily: "Arial",
                        fontWeight: "bold",
                        height: "60px",
                        alignItems: "center",
                        paddingLeft: "5px",
                        // Apply text-transform to the input element
                        "& input": {
                          textTransform: "uppercase",
                        },
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
                  {hireFormState.is_car_make == false && (
                    <p className="text-danger fw-bold fs-5 me-auto">
                      *Invalid Input
                    </p>
                  )}
                </div>
                <div className="form-group my-4">
                  <TextField
                    name="car_model"
                    value={hirerFormState.car_model || ""}
                    onChange={(e) => validateData(e)}
                    className="w-100"
                    id="outlined-basic-5"
                    label="CAR'S MODEL"
                    variant="outlined"
                    sx={{
                      // Root class for the input field
                      "& .MuiOutlinedInput-root": {
                        color: "#ffffff",
                        fontFamily: "Arial",
                        fontWeight: "bold",
                        height: "60px",
                        alignItems: "center",
                        paddingLeft: "5px",
                        // Apply text-transform to the input element
                        "& input": {
                          textTransform: "uppercase",
                        },
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
                  {hireFormState.is_car_model == false && (
                    <p className="text-danger fw-bold fs-5 me-auto">
                      *Invalid Input
                    </p>
                  )}
                </div>
                <div className="form-group my-4">
                  <TextField
                    name="reg_number"
                    value={hirerFormState.reg_number || ""}
                    onChange={(e) => validateData(e)}
                    className="w-100"
                    id="outlined-basic-6"
                    label="CAR'S REGISTRATION NUMBER"
                    variant="outlined"
                    sx={{
                      // Root class for the input field
                      "& .MuiOutlinedInput-root": {
                        color: "#ffffff",
                        fontFamily: "Arial",
                        fontWeight: "bold",
                        height: "60px",
                        alignItems: "center",
                        paddingLeft: "5px",
                        // Apply text-transform to the input element
                        "& input": {
                          textTransform: "uppercase",
                        },
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
                  {hireFormState.is_reg_number == false && (
                    <p className="text-danger fw-bold fs-5 me-auto">
                      *Invalid Input
                    </p>
                  )}
                </div>
                {/* <div className="form-group ps-2 pe-2 my-4 d-flex justify-content-center align-items-center">
                  <div className="me-2">
                    <Form.Select
                      name="car_type"
                      value={hirerFormState.car_type || ""}
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
                    variant="light"
                    size="lg"
                    className="mb-5 book"
                    type="submit"
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

export default HirerDetails;
