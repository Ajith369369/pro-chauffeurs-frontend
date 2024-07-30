import TextField from "@mui/material/TextField";
import { useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import "./HirerDetails.css";
import Footer from "../components/Footer";

function HirerDetails() {
  // State Initialization
  const [formState, setFormState] = useState({
    passenger_name: "",
    email: "",
    mobile_number: "",
    car_type: "",
    car_number: "",
  });

  const [selectedCarType, setSelectedCarType] = useState("");

  const handleCarTypeChange = (event) => {
    setSelectedCarType(event.target.value);
  };

  return (
    <>
      <div id="hirer_details" className="container-fluid w-100">
        <div className="row">
          <div className="col-sm-0 col-md-1 col-lg-1 col-xl-1 col-xxl-1"></div>
          <div className="col-sm-12 col-md-10 col-lg-10 col-xl-10 col-xxl-10 d-flex flex-column justify-content-center align-items-center">
            <div className="d-flex flex-column justify-content-center align-items-center">
              <h4 className="text-center my-5">Hirer Details</h4>
              <form action="">
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
                      },
                      // Class for the label of the input field
                      "& .MuiInputLabel-outlined": {
                        color: "white",
                        fontSize: "16px",
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
                      },
                      // Class for the label of the input field
                      "& .MuiInputLabel-outlined": {
                        color: "white",
                        fontSize: "16px",
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
                      },
                      // Class for the label of the input field
                      "& .MuiInputLabel-outlined": {
                        color: "white",
                        fontSize: "16px",
                      },
                    }}
                  />
                </div>
                <div className="form-group ps-2 pe-2 my-4 d-flex flex-wrap justify-content-center align-items-center">
                  <div>
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
                      value={selectedCarType}
                      onChange={handleCarTypeChange}
                      aria-label="Select car type"
                    >
                      <option>CAR TYPE</option>
                      <option value="convertible">Convertible</option>
                      <option value="hatchback">Hatchback</option>
                      <option value="sedan">Sedan</option>
                      <option value="suv">SUV</option>
                      <option value="truck">Truck</option>
                    </Form.Select>
                  </div>
                  <div>
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
                        },
                        // Class for the label of the input field
                        "& .MuiInputLabel-outlined": {
                          color: "white",
                          fontSize: "16px",
                        },
                      }}
                    />
                  </div>
                </div>
                <div className="form-group ps-2 pe-2 my-4 d-flex flex-wrap justify-content-between align-items-center">
                  <Button variant="light" size="lg">
                    Back
                  </Button>
                  <Button variant="light" size="lg">
                    Book Now
                  </Button>
                </div>
              </form>
            </div>
          </div>
          <div className="col-sm-0 col-md-1 col-lg-1 col-xl-1 col-xxl-1"></div>
        </div>
      </div>
      <Footer/>
    </>
  );
}

export default HirerDetails;
