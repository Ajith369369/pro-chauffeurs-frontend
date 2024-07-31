import TextField from "@mui/material/TextField";
import { useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Footer from "../components/Footer";
import Header from "../components/Header";
import "./HirerDetails.css";

function HirerDetails() {
  // State Initialization
  const [formState, setFormState] = useState({
    passenger_name: "",
    email: "",
    mobile_number: "",
    car_type: "",
    car_number: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormState((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

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
        setFormState((prevState) => ({
          ...prevState,
          isweight: true,
        }));
      } else {
        handleChange(e);
        setFormState((prevState) => ({
          ...prevState,
          isheight: true,
        }));
      }
    } else {
      if (name == "mobile_number") {
        handleChange(e);
        setFormState((prevState) => ({
          ...prevState,
          isweight: false,
        }));
      } else {
        handleChange(e);
        setFormState((prevState) => ({
          ...prevState,
          isheight: false,
        }));
      }
    }
  };

  /* const handleCarTypeChange = (event) => {
    setSelectedCarType(event.target.value);
  }; */

  return (
    <>
      <div id="hirer_details" className="container-fluid w-100">
        <Header />
        <div className="row">
          <div className="col-sm-0 col-md-1 col-lg-1 col-xl-1 col-xxl-1"></div>
          <div className="col-sm-12 col-md-10 col-lg-10 col-xl-10 col-xxl-10 d-flex flex-column justify-content-start align-items-center">
            <div className="d-flex flex-column justify-content-center align-items-center">
              <h4 className="text-center my-5">Hirer Details</h4>
              <form onSubmit={handleSubmit}>
                <div className="form-group my-4">
                  <TextField
                    name="passenger_name"
                    value={formState.passenger_name || ""}
                    className="w-100"
                    id="outlined-basic"
                    label="PASSENGER NAME"
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
                    value={formState.email || ""}
                    className="w-100"
                    id="outlined-basic"
                    label="EMAIL"
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
                    value={formState.mobile_number || ""}
                    className="w-100"
                    id="outlined-basic"
                    label="MOBILE NUMBER"
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
                <div className="form-group ps-2 pe-2 my-4 d-flex justify-content-center align-items-center">
                  <div className="me-2">
                    {/* <TextField
                    name="passenger_name"
                    value={formState.passenger_name || ""}
                    className="w-100"
                    id="outlined-basic"
                    label="CAR TYPE"
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
                      },
                      // Class for the label of the input field
                      "& .MuiInputLabel-outlined": {
                        color: "white",
                        fontSize: "16px",
                      },
                    }}
                  /> */}
                    <Form.Select
                    name="car_type"
                      value={formState.car_type || ""}
                      onChange={handleCarTypeChange}
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
                    <TextField
                      name="car_number"
                      value={formState.car_number || ""}
                      className="w-100"
                      id="outlined-basic"
                      label="CAR NUMBER"
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
                </div>
                <div className="form-group ps-2 pe-2 my-4 d-flex flex-wrap justify-content-between align-items-center">
                  <Button
                    variant="light"
                    size="lg"
                    className="mb-5"
                    style={{ width: "150px" }}
                  >
                    Back
                  </Button>
                  <Button
                    variant="light"
                    size="lg"
                    className="mb-5"
                    style={{ width: "150px" }}
                  >
                    Book Now
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
