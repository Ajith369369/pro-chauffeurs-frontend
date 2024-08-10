import { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
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

// libraries for date
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
    // Find the place object that matches the bookingFormState.pickup_location
    const from = places.find(
      (p) =>
        p.name.toLowerCase() === bookingFormState.pickup_location.toLowerCase()
    );
    // Find the place object that matches the bookingFormState.dropoff_location
    const to = places.find(
      (p) =>
        p.name.toLowerCase() === bookingFormState.dropoff_location.toLowerCase()
    );
    
    // Calculate the distance and cost whenever the place objects are updated
    if (from && to) {
      const dist = calculateDistance(
        from.latitude,
        from.longitude,
        to.latitude,
        to.longitude
      );
      setDistance(dist.toFixed(1)); // Distance in kilometers
      const calculatedCost = dist * 30; // Cost in rupees
      setCost(Math.floor(calculatedCost)); // Cost rounded to 2 decimal places
    } else {
      // Clear the distance and cost if one or both places are not selected
      setDistance(0);
      setCost(0);
    }
  }, [
    bookingFormState.pickup_location,
    bookingFormState.dropoff_location,
    places,
  ]); // Dependency array includes input values and places

  // Function to calculate the distance using the Haversine formula
  const calculateDistance = (lat1, lon1, lat2, lon2) => {
    // Convert degrees to radians
    const toRad = (value) => (value * Math.PI) / 180;

    const R = 6371; // Radius of the Earth in kilometers
    const dLat = toRad(lat2 - lat1);
    const dLon = toRad(lon2 - lon1);
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(toRad(lat1)) *
        Math.cos(toRad(lat2)) *
        Math.sin(dLon / 2) *
        Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c; // Distance in kilometers
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

      // When using Redux Toolkit and handling non-serializable data like Dayjs objects, we'll need to convert them to serializable formats before storing them in Redux state. Dayjs objects are not serializable, but ISO strings are
      // Dayjs objects are not serializable, so you need to convert them to ISO strings (or another serializable format) before storing them in Redux state.
      // Convert Dayjs object to ISO string before dispatching. Converting Dayjs objects to ISO strings before dispatching ensures that your Redux state remains serializable and avoids any potential issues with non-serializable data.
      // Dispatching the action with the ISO string ensures that Redux state remains serializable. Our reducer then handles the conversion back to Dayjs if needed, but generally, we should only store ISO strings in Redux.
      const isoString = newDate.toISOString();
      dispatch(updateBookingFormState({ pickup_date: isoString }));
    }
  };

  // Handling changes in the input fields. The handleChange function updates the bookingFormState.
  // handleChange is a function that updates the state in the Redux store whenever an input field changes.
  // It extracts the name and value from the event target (e.target) and dispatches the updateBookingFormState action with the new value.
  // const newDate = dayjs(e.target.value); - Convert the string to a dayjs object
  const handleChange = (e) => {
    if (e.target) {
      // Standard form input
      const { name, value } = e.target;
      if (name === "pickup_date") {
        const newDate = dayjs(e.target.value);
        dispatch(updateBookingFormState({ pickup_date: newDate }));
      } else {
        dispatch(updateBookingFormState({ [name]: value }));
      }
    } else if (e && e.$d) {
      // DatePicker input
      const newDate = dayjs(e.target.value); // Convert the dayjs object to a JavaScript Date object
      dispatch(updateBookingFormState({ pickup_date: newDate }));
    }

    /* const { name, value } = e.target;
    if (name === "pickup_date") {
      const newDate = dayjs(e.target.value);
      dispatch(updateBookingFormState({ pickup_date: newDate }));
    } else {
      dispatch(updateBookingFormState({ [name]: value }));
    } */

    /* 
    if (name == "pickup_location") {
      setFromPlaceName(value);
    } else if (name == "dropoff_location") {
      setToPlaceName(value);
    } else if (name == "service_type") {
      setSelectedService(value);
    } */
  };
  // console.log(bookingFormState.pickup_location);

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
        // dispatch(addBookingDetailsOfAUserApi(combinedFormState));

        // const result = await addBookingDetailsOfAUserApi(combinedFormState);
        // console.log(result);
        console.log(combinedFormState);
        
        dispatch(resetLoginFormState());
        dispatch(resetHirerFormState());
        dispatch(resetDriverFormState());
        dispatch(resetBookingFormState());
        localStorage.removeItem("currentUser");
        toast.success("Booking Confirmed", {
          onClose: () => navigate('/')});
      } else {
        toast.error("Failed to save booking details. Please try again.");
      }
    }
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
                  <div className="dropdown-input-container w-100 mb-3">
                    <select
                      className="dropdown-input"
                      value={bookingFormState.service_type}
                      onChange={(e) => handleChange(e)}
                      name="service_type"
                    >
                      <option value="" disabled>
                        Select Service Type
                      </option>
                      <option value="Hourly Booking">Hourly Booking</option>
                      <option value="Airport Transfer">Airport Transfer</option>
                      <option value="City Transfer">City Transfer</option>
                      <option value="Corporate Transport">
                        Corporate Transport
                      </option>
                    </select>
                  </div>
                </div>
                <div className="form-group my-4">
                  <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DemoItem>
                      <DatePicker
                        name="pickup_date"
                        value={pickupDate}
                        label="PICKUP DATE"
                        onChange={handleDateChange}
                        sx={{
                          "& .MuiInputBase-input": {
                            color: "white", // Text color
                          },
                          "& .MuiOutlinedInput-root": {
                            "& fieldset": {
                              borderColor: "white", // Border color
                            },
                            "&:hover fieldset": {
                              borderColor: "white", // Border color on hover
                            },
                            "&.Mui-focused fieldset": {
                              borderColor: "white", // Border color when focused
                            },
                          },
                          "& .MuiInputLabel-root": {
                            color: "white", // Label color
                          },
                          "& .MuiSvgIcon-root": {
                            color: "white", // Icon color
                          },
                        }}
                      />
                    </DemoItem>
                  </LocalizationProvider>
                </div>
                <div className="form-group my-4">
                  <div className="dropdown-input-container w-100 mb-3">
                    <select
                      className="dropdown-input"
                      value={bookingFormState.pickup_location}
                      onChange={(e) => handleChange(e)}
                      name="pickup_location"
                    >
                      <option value="" disabled>
                        PICKUP LOCATION
                      </option>
                      {places.map((option) => {
                        return (
                          <option key={option.id} value={option.name}>
                            {option.name}
                          </option>
                        );
                      })}
                    </select>
                  </div>
                </div>
                <div className="form-group my-4">
                  <div className="dropdown-input-container w-100 mb-3">
                    <select
                      className="dropdown-input"
                      value={bookingFormState.dropoff_location}
                      onChange={(e) => handleChange(e)}
                      name="dropoff_location"
                    >
                      <option value="" disabled>
                        DROPOFF LOCATION
                      </option>
                      {places.map((option) => {
                        return (
                          <option key={option.id} value={option.name}>
                            {option.name}
                          </option>
                        );
                      })}
                    </select>
                  </div>
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
                    disabled={distance ? false : true}
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
      <ToastContainer position="top-center" theme="colored" autoclose={3000} />
    </>
  );
}

export default BookRide;
