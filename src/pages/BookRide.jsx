import { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Container, Box, Typography, Paper, MenuItem, Select, FormControl, InputLabel } from "@mui/material";
import Footer from "../components/Footer";
import Header from "../components/Header";
import {
  resetBookingFormState,
  resetDriverFormState,
  resetHirerFormState,
  resetLoginFormState,
  updateBookingFormState,
} from "../redux/slices/hirerDetailsSlice";
import {
  addBookingDetailsOfAUserApi,
  getPlacesApi,
} from "../services/pro_allApi";
import "./BookRide.css";

// Libraries for date
import { DatePicker } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DemoItem } from "@mui/x-date-pickers/internals/demo";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import dayjs from "dayjs";

function BookRide() {
  // Setting up the dispatch function from react-redux. This function is used to dispatch actions to the Redux store.
  const dispatch = useDispatch();

  // Setting up the navigate function from react-router-dom. This function is used for programmatic navigation within the application.
  const navigate = useNavigate();

  // Accessing the bookingFormState from the Redux store. The useSelector hook allows you to extract data from the Redux store state.
  const hirerFormState = useSelector(
    (state) => state.hirerDetails.hirerFormState
  );
  const driverFormState = useSelector(
    (state) => state.hirerDetails.driverFormState
  );
  const bookingFormState = useSelector(
    (state) => state.hirerDetails.bookingFormState
  );

  // -----------------------------------------------------------------------
  // State to hold the list of places fetched from the server
  const [places, setPlaces] = useState([]);
  // State to store the input values for from and to locations
  // const [bookingFormState.pickup_location, setFromPlaceName] = useState("");
  // const [bookingFormState.dropoff_location, setToPlaceName] = useState("");
  // State to hold the place objects corresponding to the input values

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
        const response = await getPlacesApi();
        // Update the state with the fetched places
        setPlaces(response.data);
        // console.log(response.data);
      } catch (error) {
        // Log any errors that occur during the fetch
        console.error("Error fetching places:", error);
      }
    };

    fetchPlaces();
  }, []); // Empty dependency array means this effect runs only once when the component mounts

  // Update the fromPlace and toPlace states whenever the input values or places change
  useEffect(() => {

    // Calculates the distance and cost between two locations based on user input. 
    // Find the place object that matches the bookingFormState.pickup_location.
    // This searches through an array of place objects (places) to find one where the name property matches the user's input for pickup_location and dropoff_location.
    // .toLowerCase(): Ensures that the search is case-insensitive by converting both the place name and user input to lowercase before comparison.
    const from = places.find(
      (p) =>
        p.name.toLowerCase() === bookingFormState.pickup_location.toLowerCase()
    );
    // Find the place object that matches the bookingFormState.dropoff_location
    const to = places.find(
      (p) =>
        p.name.toLowerCase() === bookingFormState.dropoff_location.toLowerCase()
    );
    
    // Calculate the distance and cost whenever the place objects are updated.
    // from and to: These variables store the place objects corresponding to the pickup_location and dropoff_location, respectively. If no matching place is found, from or to will be undefined.
    if (from && to) {

      // calculateDistance() computes the distance between the two places using their latitude and longitude values. The calculateDistance function uses the Haversine formula to determine the distance in kilometers.
      const dist = calculateDistance(
        from.latitude,
        from.longitude,
        to.latitude,
        to.longitude
      );

      // Formats the distance to one decimal place.
      // Distance in kilometers
      // distance = 123.45678
      // distance.toFixed(1) = 123.5
      setDistance(dist.toFixed(1));

      // Computes the cost based on the distance. The cost is calculated by multiplying the distance by 30 (i.e., the cost per kilometer).
      // Cost in Rupees.
      const calculatedCost = dist * 30;

      // Rounds down the calculated cost to the nearest integer and updates the state with this rounded cost.. 
      setCost(Math.floor(calculatedCost));
    } else {

      // Clears the distance and cost if one or both places are not selected.
      setDistance(0);
      setCost(0);
    }
  }, [
    bookingFormState.pickup_location,
    bookingFormState.dropoff_location,
    places,
  ]); // Dependency array includes input values and places

  // Function to calculate the distance using the Haversine formula.
  // Haversine formula used to calculate the great-circle distance between two points on the surface of a sphere, such as the Earth.
  // The Haversine formula provides an efficient way to calculate the distance between two points on a sphere (like Earth) based on their latitude and longitude. The formula takes into account the curvature of the Earth, making it accurate for most practical purposes.
  // In this function:
    // lat1, lon1 are the latitude and longitude of the first point.
    // lat2, lon2 are the latitude and longitude of the second point.
    // The function returns the distance in kilometers between these two points.
  // This is a JavaScript function that calculates the distance between two points on the Earth's surface using the Haversine formula. This formula accounts for the spherical shape of the Earth and is commonly used for calculating distances between geographical coordinates.
  const calculateDistance = (lat1, lon1, lat2, lon2) => {

    // Convert degrees to radians.
    // Latitude and longitude are given in degrees, but trigonometric functions in JavaScript (like Math.sin and Math.cos) require input in radians. This function multiplies the degree value by (π/180) to convert it to radians.
    const toRad = (value) => (value * Math.PI) / 180;

    // Radius of the Earth in kilometers.
    // The Haversine formula requires the Earth's radius to calculate the actual distance on the surface.
    // Value: 6371 is a commonly accepted average radius of the Earth in kilometers.
    const R = 6371;

    // Calculates the difference in latitude and longitude between the two points and converts them to radians.
    // The differences dLat and dLon are essential for the Haversine formula as they represent the "arc" between the two points on the globe.
    const dLat = toRad(lat2 - lat1);
    const dLon = toRad(lon2 - lon1);

    // Haversine Formula Components
    // Calculates the value a using the Haversine formula. 'a' is an intermediate value that represents the square of half the chord length between the two points.
    // Chord length is a term used in geometry and specifically in the context of circles or spheres. It refers to the straight-line distance between two points on the circumference of a circle (or surface of a sphere). In other words, it's the distance across the circle or sphere directly connecting two points without following the curve.

    // Math.sin(dLat / 2) * Math.sin(dLat / 2):
      // dLat / 2: This is half of the difference in latitude between the two points, converted to radians.
      // Math.sin(dLat / 2): Computes the sine of half the latitude difference. This value is then squared to account for the spherical shape in the formula.
      //This part of the formula accounts for the effect of the latitude difference on the distance between the two points.
    // Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)):
      // lat1: Latitude of the first point.
      // The product of these cosines accounts for the spherical trigonometric relationship between the two latitudes.
    // Math.sin(dLon / 2) * Math.sin(dLon / 2):
      // dLon / 2: This is half of the difference in longitude between the two points, converted to radians.
      // This part of the formula accounts for the effect of the longitude difference on the distance between the two points.
    // 'a' is an intermediate value that represents a combination of the effects of latitude and longitude differences on the distance.
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(toRad(lat1)) *
        Math.cos(toRad(lat2)) *
        Math.sin(dLon / 2) *
        Math.sin(dLon / 2);

    // Calculates the angular distance 'c' in radians between the two points on the Earth.
    // Angular distance refers to the angle between two points as seen from a particular reference point. In the context of circles or spheres, it measures the angle subtended by the arc or chord connecting these two points.

    // Math.atan2 is a special arctangent function that takes two arguments and handles the division and quadrant identification to return the correct angle. This calculation gives the central angle between the two points.
    // Arctangent, also known as the inverse tangent function, is a mathematical function used to determine the angle whose tangent is a given number. It is the inverse of the tangent function. The notation commonly used for the arctangent function is arctan or tan−1 (tan inverse).
    // Math.atan2 is a JavaScript function used to compute the arctangent (inverse tangent) of the quotient of its arguments. It is often used to find the angle between the positive x-axis and the point (x, y) in a Cartesian coordinate system.
    // Math.atan2 correctly identifies the quadrant in which the point (x, y) lies. The function returns the angle in radians between the positive x-axis and the point (x, y). The result ranges from −𝜋 to 𝜋 (or −180° to 180°).

    // Math.sqrt(a): This computes the square root of a. The variable a is derived from the intermediate calculations in the Haversine formula and represents a function of the differences in latitude and longitude.
    // Math.sqrt(1 - a): This computes the square root of (1 - a). This term is used to find the other component required for the calculation.
    // Math.atan2(y, x): This is a standard mathematical function that calculates the arctangent of the quotient y / x, taking into account the signs of x and y to determine the correct quadrant of the angle.
      // Math.atan2(y, x) returns the angle in radians between the positive x-axis and the point (x, y) on a plane.
      // In this formula, y is Math.sqrt(a) and x is Math.sqrt(1 - a).
    // 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a)):
    // The 2 * part scales the result of Math.atan2() by 2. This scaling is required because the Haversine formula involves a central angle that spans twice the angle computed from the atan2 function.
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

    // Final distance in kilometers
    // Converts the angular distance c into the actual distance by multiplying it by the Earth's radius R.
    // The function returns the distance between the two points in kilometers.
    // Arc length is the distance along the curve of a circle or a segment of a circle between two points. It represents the actual length of the curve, rather than a straight line between the two points.
    // For a circle, the arc length, 𝐿 can be calculated using the angle subtended by the arc and the radius of the circle. The formula is:
    // 𝐿 = 𝑟⋅𝜃, where:
    // 𝑟 is the radius of the circle (here R).
    // 𝜃 is the central angle subtended by the arc, measured in radians.
    // If the angle, 𝜃 is given in degrees, it should be converted to radians first:
    // 𝜃 (radians) = 𝜃 (degrees) × (𝜋/180) (here c)
    return R * c; 
  };

  // ------------------------------------------------------------------------

  // The DatePicker component from Material-UI expects its value prop to be a dayjs object. We need to ensure that the 'value' prop for the DatePicker is a dayjs object.
  // Here, bookingFormState.pickup_date is being passed directly to the DatePicker's value prop. The DatePicker expects this value to be a dayjs object, but we are storing it as an ISO string in the Redux state.

  {
    /* <DatePicker
  name="pickup_date"
  value={bookingFormState.pickup_date}
  label="PICKUP DATE"
  onChange={handleChange}
  sx={{
    // styling options
  }}
/> */
  }

  // The pickup_date field in the bookingFormState contains a date object that cannot be serialized by Redux. Redux expects all state values to be serializable for purposes like time-travel debugging and persistence. Date objects are inherently non-serializable because they include methods and internal properties that cannot be represented as plain JSON. When we attempt to store a date object directly in our Redux state, we encounter this issue.
  // We can address this issue by converting the date object to a serializable format before storing it in the Redux state, and converting it back to a date object when needed.

  /* const pickupDateString = useSelector(
    (state) => state.hirerDetails.bookingFormState.pickup_date
  ); */

  // Using the date in the component. When we need to use the pickup_date in our component, convert the string back to a Date object.
  // This ensures that our Redux state remains serializable while still allowing us to work with Date objects in our components.

  const pickupDate = bookingFormState.pickup_date
    ? dayjs(bookingFormState.pickup_date)
    : null;

  // Pass the pickupDate to the DatePicker.
  {
    /* <DatePicker
  name="pickup_date"
  value={pickupDate}
  label="PICKUP DATE"
  onChange={handleChange}
  sx={{
    // styling options
  }}
/> */
  }

  {
    /* <div>
    <input type="date" onChange={handleDateChange} />
    {pickupDate && <p>Pickup Date: {pickupDate.toString()}</p>}
  </div>; */
  }

  const handleDateChange = (newDate) => {
    if (newDate) {
      // Should log "object" since it's a Date object or Dayjs object
      console.log(newDate);
      console.log(typeof newDate);

      // When using Redux Toolkit and handling non-serializable data like Dayjs objects, we'll need to convert them to serializable formats before storing them in Redux state. Dayjs objects are not serializable, but ISO strings are.
      // Dayjs objects are not serializable, so you need to convert them to ISO strings (or another serializable format) before storing them in Redux state.
      // Convert Dayjs object to ISO string before dispatching. Converting Dayjs objects to ISO strings before dispatching ensures that your Redux state remains serializable and avoids any potential issues with non-serializable data.
      // Dispatching the action with the ISO string ensures that Redux state remains serializable. Our reducer then handles the conversion back to Dayjs if needed, but generally, we should only store ISO strings in Redux.
      const isoString = newDate.toISOString();
      dispatch(updateBookingFormState({ pickup_date: isoString }));
    }
  };

  // Handling changes in the input fields. The handleChange function updates the bookingFormState.
  // The handleChange function handles changes from form inputs, specifically dealing with both standard form inputs and DatePicker inputs.
  // handleChange is a function that updates the state in the Redux store whenever an input field changes.
  // It extracts the name and value from the event target (e.target) and dispatches the updateBookingFormState action with the new value.
  // const newDate = dayjs(e.target.value); - Convert the string to a dayjs object
  const handleChange = (e) => {
    if (e.target) {

      // Standard form input
      // e.target is typically available for standard form elements like text inputs, selects, etc.
      const { name, value } = e.target;
      if (name === "pickup_date") {

        // If the field name is "pickup_date", convert the input value (a date string) into a dayjs object for date manipulation and formatting.
        const newDate = dayjs(e.target.value);

        // Use dispatch to update the bookingFormState with the new pickup_date.
        dispatch(updateBookingFormState({ pickup_date: newDate }));
      } else {

        // For all other fields, use the field's name as the key and value as the value in the updateBookingFormState action. This will update the state for the specific form field.
        dispatch(updateBookingFormState({ [name]: value }));
      }

      // This condition checks if e has the $d property. This property is commonly used by date picker libraries to identify date-related events.
    } else if (e && e.$d) {

      // DatePicker input
      // Convert the value to a dayjs object.
      const newDate = dayjs(e.target.value);

      // Use dispatch to update the bookingFormState with the new pickup_date.
      dispatch(updateBookingFormState({ pickup_date: newDate }));
    }
  };

  const handleBackClick = () => {
    navigate("/driverlist");
  };

  const handleSubmit = async (e) => {

    // Prevents form from reloading the page
    e.preventDefault();

    // console.log(bookingFormState);
    // Check if service_type, pickup_date, pickup_location or dropoff_location is zero
    // name="pickup_location"
    // value={bookingFormState.pickup_location}
    if (
      !bookingFormState.service_type ||
      !bookingFormState.pickup_date ||
      !bookingFormState.pickup_location ||
      !bookingFormState.dropoff_location
    ) {
      toast.info("Please fill the form completely.");
    } else {
      const combinedFormState = {
        ...hirerFormState,
        ...driverFormState,
        ...bookingFormState,
      };
      const response_booking = await addBookingDetailsOfAUserApi(
        combinedFormState
      );
      if (response_booking.status >= 200 && response_booking.status < 300) {
        
        // console.log(result);
        console.log(combinedFormState);
        
        dispatch(resetLoginFormState());
        dispatch(resetHirerFormState());
        dispatch(resetDriverFormState());
        // dispatch(resetBookingFormState());
        localStorage.removeItem("currentUser");
        toast.success("Booking Confirmed", {
          onClose: () => navigate('/')});
        dispatch(resetBookingFormState());
      } else {
        toast.error("Failed to save booking details. Please try again.");
      }
    }
  };

  return (
    <>
      <div id="book_ride" className="container-fluid w-100" style={{ backgroundColor: "#0a0a0a", minHeight: "100vh" }}>
        <Header />
        <Container maxWidth="lg" sx={{ py: { xs: 4, md: 6 } }}>
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              minHeight: "calc(100vh - 200px)",
            }}
          >
            <Paper
              elevation={24}
              sx={{
                width: "100%",
                maxWidth: "800px",
                backgroundColor: "#1a1a1a",
                border: "1px solid #333333",
                borderRadius: "16px",
                padding: { xs: 3, md: 5 },
                boxShadow: "0 8px 32px rgba(0, 0, 0, 0.5), 0 0 0 1px rgba(255, 255, 255, 0.05) inset",
              }}
            >
              <Typography
                variant="h4"
                component="h1"
                sx={{
                  textAlign: "center",
                  color: "#ffffff",
                  fontWeight: 600,
                  mb: 1,
                  fontSize: { xs: "1.75rem", md: "2rem" },
                  letterSpacing: "0.5px",
                }}
              >
                Booking Details
              </Typography>
              <Typography
                variant="body2"
                sx={{
                  textAlign: "center",
                  color: "#b0b0b0",
                  mb: 4,
                  fontSize: "0.9rem",
                }}
              >
                Complete your booking information
              </Typography>
              <form onSubmit={handleSubmit}>
                <Box sx={{ mb: 3 }}>
                  <FormControl fullWidth>
                    <InputLabel
                      id="service-type-label"
                      sx={{
                        color: "#b0b0b0",
                        fontSize: "14px",
                        fontWeight: 500,
                        "&.Mui-focused": {
                          color: "#ffffff",
                        },
                      }}
                    >
                      SERVICE TYPE
                    </InputLabel>
                    <Select
                      labelId="service-type-label"
                      name="service_type"
                      value={bookingFormState.service_type || ""}
                      onChange={(e) => handleChange(e)}
                      label="SERVICE TYPE"
                      sx={{
                        color: "#ffffff",
                        height: "56px",
                        backgroundColor: "#0a0a0a",
                        borderRadius: "8px",
                        fontFamily: "'Inter', 'Arial', sans-serif",
                        fontWeight: 500,
                        "& .MuiOutlinedInput-notchedOutline": {
                          borderColor: "#2a2a2a",
                          borderWidth: "1.5px",
                        },
                        "&:hover .MuiOutlinedInput-notchedOutline": {
                          borderColor: "#4a4a4a",
                        },
                        "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                          borderColor: "#ffffff",
                          borderWidth: "2px",
                        },
                        "& .MuiSvgIcon-root": {
                          color: "#ffffff",
                        },
                      }}
                      MenuProps={{
                        PaperProps: {
                          sx: {
                            backgroundColor: "#1a1a1a",
                            border: "1px solid #2a2a2a",
                            "& .MuiMenuItem-root": {
                              color: "#ffffff",
                              "&:hover": {
                                backgroundColor: "#2a2a2a",
                              },
                              "&.Mui-selected": {
                                backgroundColor: "#3a3a3a",
                                "&:hover": {
                                  backgroundColor: "#4a4a4a",
                                },
                              },
                            },
                          },
                        },
                      }}
                    >
                      <MenuItem value="Hourly Booking">Hourly Booking</MenuItem>
                      <MenuItem value="Airport Transfer">Airport Transfer</MenuItem>
                      <MenuItem value="City Transfer">City Transfer</MenuItem>
                      <MenuItem value="Corporate Transport">
                        Corporate Transport
                      </MenuItem>
                    </Select>
                  </FormControl>
                </Box>
                <Box sx={{ mb: 3 }}>
                  <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DemoItem>
                      <DatePicker
                        name="pickup_date"
                        value={pickupDate}
                        label="PICKUP DATE"
                        onChange={handleDateChange}
                        format="DD/MM/YYYY"
                        slotProps={{
                          textField: {
                            fullWidth: true,
                            InputLabelProps: {
                              shrink: !!pickupDate,
                            },
                          },
                        }}
                        sx={{
                          width: "100%",
                          "& .MuiInputBase-input": {
                            color: "#ffffff",
                            fontFamily: "'Inter', 'Arial', sans-serif",
                            fontWeight: 500,
                            padding: "16.5px 14px",
                          },
                          "& .MuiOutlinedInput-root": {
                            height: "56px",
                            backgroundColor: "#0a0a0a",
                            borderRadius: "8px",
                            transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
                            "& fieldset": {
                              borderColor: "#2a2a2a",
                              borderWidth: "1.5px",
                            },
                            "&:hover fieldset": {
                              borderColor: "#4a4a4a",
                            },
                            "&.Mui-focused fieldset": {
                              borderColor: "#ffffff",
                              borderWidth: "2px",
                            },
                          },
                          "& .MuiInputLabel-root": {
                            color: "#b0b0b0",
                            fontSize: "14px",
                            fontWeight: 500,
                          },
                          "& .MuiInputLabel-root.Mui-focused": {
                            color: "#ffffff",
                          },
                          "& .MuiSvgIcon-root": {
                            color: "#ffffff",
                          },
                        }}
                      />
                    </DemoItem>
                  </LocalizationProvider>
                </Box>
                <Box sx={{ mb: 3 }}>
                  <FormControl fullWidth>
                    <InputLabel
                      id="pickup-location-label"
                      sx={{
                        color: "#b0b0b0",
                        fontSize: "14px",
                        fontWeight: 500,
                        "&.Mui-focused": {
                          color: "#ffffff",
                        },
                      }}
                    >
                      PICKUP LOCATION
                    </InputLabel>
                    <Select
                      labelId="pickup-location-label"
                      name="pickup_location"
                      value={bookingFormState.pickup_location || ""}
                      onChange={(e) => handleChange(e)}
                      label="PICKUP LOCATION"
                      sx={{
                        color: "#ffffff",
                        height: "56px",
                        backgroundColor: "#0a0a0a",
                        borderRadius: "8px",
                        fontFamily: "'Inter', 'Arial', sans-serif",
                        fontWeight: 500,
                        "& .MuiOutlinedInput-notchedOutline": {
                          borderColor: "#2a2a2a",
                          borderWidth: "1.5px",
                        },
                        "&:hover .MuiOutlinedInput-notchedOutline": {
                          borderColor: "#4a4a4a",
                        },
                        "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                          borderColor: "#ffffff",
                          borderWidth: "2px",
                        },
                        "& .MuiSvgIcon-root": {
                          color: "#ffffff",
                        },
                      }}
                      MenuProps={{
                        PaperProps: {
                          sx: {
                            backgroundColor: "#1a1a1a",
                            border: "1px solid #2a2a2a",
                            "& .MuiMenuItem-root": {
                              color: "#ffffff",
                              "&:hover": {
                                backgroundColor: "#2a2a2a",
                              },
                              "&.Mui-selected": {
                                backgroundColor: "#3a3a3a",
                                "&:hover": {
                                  backgroundColor: "#4a4a4a",
                                },
                              },
                            },
                          },
                        },
                      }}
                    >
                      {places.map((option) => {
                        return (
                          <MenuItem key={option.id} value={option.name}>
                            {option.name}
                          </MenuItem>
                        );
                      })}
                    </Select>
                  </FormControl>
                </Box>
                <Box sx={{ mb: 3 }}>
                  <FormControl fullWidth>
                    <InputLabel
                      id="dropoff-location-label"
                      sx={{
                        color: "#b0b0b0",
                        fontSize: "14px",
                        fontWeight: 500,
                        "&.Mui-focused": {
                          color: "#ffffff",
                        },
                      }}
                    >
                      DROPOFF LOCATION
                    </InputLabel>
                    <Select
                      labelId="dropoff-location-label"
                      name="dropoff_location"
                      value={bookingFormState.dropoff_location || ""}
                      onChange={(e) => handleChange(e)}
                      label="DROPOFF LOCATION"
                      sx={{
                        color: "#ffffff",
                        height: "56px",
                        backgroundColor: "#0a0a0a",
                        borderRadius: "8px",
                        fontFamily: "'Inter', 'Arial', sans-serif",
                        fontWeight: 500,
                        "& .MuiOutlinedInput-notchedOutline": {
                          borderColor: "#2a2a2a",
                          borderWidth: "1.5px",
                        },
                        "&:hover .MuiOutlinedInput-notchedOutline": {
                          borderColor: "#4a4a4a",
                        },
                        "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                          borderColor: "#ffffff",
                          borderWidth: "2px",
                        },
                        "& .MuiSvgIcon-root": {
                          color: "#ffffff",
                        },
                      }}
                      MenuProps={{
                        PaperProps: {
                          sx: {
                            backgroundColor: "#1a1a1a",
                            border: "1px solid #2a2a2a",
                            "& .MuiMenuItem-root": {
                              color: "#ffffff",
                              "&:hover": {
                                backgroundColor: "#2a2a2a",
                              },
                              "&.Mui-selected": {
                                backgroundColor: "#3a3a3a",
                                "&:hover": {
                                  backgroundColor: "#4a4a4a",
                                },
                              },
                            },
                          },
                        },
                      }}
                    >
                      {places.map((option) => {
                        return (
                          <MenuItem key={option.id} value={option.name}>
                            {option.name}
                          </MenuItem>
                        );
                      })}
                    </Select>
                  </FormControl>
                </Box>
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
                <div className={isDisabled ? "disabled" : ""}>
                  <div className="d-flex  flex-column justify-content-center align-items-center">
                    <div className="bg-success w-100 rounded d-flex justify-content-center align-items-center p-2">
                      {" "}
                      <h5 className="mt-1">Distance : {distance} km</h5>
                    </div>
                    <div className="bg-primary w-100 rounded d-flex justify-content-center align-items-center p-2 mt-3">
                      {" "}
                      <h5 className="mt-1">Amount : ₹{cost}</h5>
                    </div>
                  </div>
                </div>
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    gap: 1,
                    mt: 5,
                    width: "100%",
                  }}
                >
                  <Button
                    onClick={handleBackClick}
                    variant="light"
                    size="lg"
                    sx={{
                      flex: "1 1 50%",
                      maxWidth: "50%",
                      height: "48px",
                      backgroundColor: "#2a2a2a",
                      color: "#ffffff",
                      border: "1.5px solid #4a4a4a",
                      borderRadius: "8px",
                      fontWeight: 600,
                      fontSize: "1rem",
                      textTransform: "none",
                      transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
                      "&:hover": {
                        backgroundColor: "#3a3a3a",
                        borderColor: "#6a6a6a",
                        transform: "translateY(-2px)",
                        boxShadow: "0 4px 12px rgba(0, 0, 0, 0.3)",
                      },
                      "&:active": {
                        transform: "translateY(0)",
                      },
                    }}
                  >
                    Back
                  </Button>
                  <Button
                    type="submit"
                    variant="light"
                    size="lg"
                    disabled={distance ? false : true}
                    sx={{
                      flex: "1 1 50%",
                      maxWidth: "50%",
                      height: "48px",
                      backgroundColor: distance ? "#ffffff" : "#4a4a4a",
                      color: distance ? "#0a0a0a" : "#808080",
                      border: distance ? "1.5px solid #ffffff" : "1.5px solid #4a4a4a",
                      borderRadius: "8px",
                      fontWeight: 600,
                      fontSize: "1rem",
                      textTransform: "none",
                      transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
                      "&:hover": {
                        backgroundColor: distance ? "#f0f0f0" : "#4a4a4a",
                        borderColor: distance ? "#ffffff" : "#4a4a4a",
                        transform: distance ? "translateY(-2px)" : "none",
                        boxShadow: distance ? "0 4px 16px rgba(255, 255, 255, 0.2)" : "none",
                      },
                      "&:active": {
                        transform: "translateY(0)",
                      },
                      "&:disabled": {
                        backgroundColor: "#4a4a4a",
                        color: "#808080",
                        borderColor: "#4a4a4a",
                      },
                    }}
                  >
                    PAY Now
                  </Button>
                </Box>
              </form>
            </Paper>
          </Box>
        </Container>
        <Footer />
      </div>
      <ToastContainer position="top-center" theme="colored" autoclose={3000} />
    </>
  );
}

export default BookRide;
