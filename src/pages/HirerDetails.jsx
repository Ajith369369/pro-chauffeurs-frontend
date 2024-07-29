import TextField from "@mui/material/TextField";
import { useState } from "react";

function HirerDetails() {
  // State Initialization
  const [formState, setFormState] = useState({
    passenger_name: "",
    email: "",
    mobile_number: "",
    car_type: "",
    car_number: "",
  });

  return (
    <>
      <div className="container-fluid w-100">
        <div className="row">
          <div className="col-sm-0 col-md-1 col-lg-1 col-xl-1 col-xxl-1"></div>
          <div className="col-sm-12 col-md-10 col-lg-10 col-xl-10 col-xxl-10 d-flex flex-column justify-content-center align-items-center">
            <div className="d-flex flex-column justify-content-center align-items-center">
              <h4 className="text-center">Hirer Details</h4>
              <form action="">
                <div className="form-group">
                  <TextField
                    name="weight"
                    value={formState.passenger_name || ""}
                    className="w-100"
                    id="outlined-basic"
                    label="Weight (kg):"
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
                        color: "black",
                        fontSize: "16px",
                      },
                    }}
                  />
                </div>
                <div className="form-group"></div>
                <div className="form-group"></div>
                <div className="form-group">
                  <div></div>
                  <div></div>
                </div>
              </form>
            </div>
          </div>
          <div className="col-sm-0 col-md-1 col-lg-1 col-xl-1 col-xxl-1"></div>
        </div>
      </div>
    </>
  );
}

export default HirerDetails;
