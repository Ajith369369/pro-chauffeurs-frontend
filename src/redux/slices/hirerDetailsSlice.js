import { createSlice } from "@reduxjs/toolkit";
import dayjs from "dayjs";

// This defines the initial state of the hirerDetails slice.
// In our Redux setup, loginFormState, bookingFormState, driverFormState, and hirerFormState are pieces of the application state managed by Redux. They represent different parts of the form data used across our application.
// loginFormState, bookingFormState, driverFormState, and hirerFormState are states that are part of the hirerDetails slice. They are states managed within the hirerDetails slice.
// loginFormState, bookingFormState, driverFormState, and hirerFormState are parts (or sub-states) of the overall hirerDetails slice. Each of these sub-states holds specific data relevant to different parts of our application
// initialState is an object containing four nested objects: loginFormState, bookingFormState, driverFormState, and hirerFormState.
// The state, driverFormState has a single property.
const initialState = {

  // Manages the state associated with the login form.
  loginFormState: {
    login_email: "",
    login_pswd: "",
    login_button: true,
  },

  // Manages the state associated with booking details.
  bookingFormState: {
    service_type: "",

    // Initialize pickup_date with Day.js object
    pickup_date: dayjs(),
    pickup_location: "",
    dropoff_location: "",
  },

  // Manages the state associated with driver information.
  driverFormState: {
    driver_name: "",
  },

  // Manages the state associated with hirer's details.
  hirerFormState: {
    passenger_name: "",
    email: "",
    mobile_number: "",
    car_make: "",
    car_model: "",
    reg_number: "",
  },
};

// This creates a Redux slice named "hirerDetails" with the specified initial state and reducers.
// name: The name of the slice, which is "hirerDetails".
// initialState: The initial state defined above.
// reducers: An object containing reducer functions that handle state updates.
// updateBookingFormState: Updates bookingFormState with the payload from the action, merging it with the existing state.
// resetBookingFormState: Resets bookingFormState to its initial state.
const hirerDetailsSlice = createSlice({

  // Name of the slice.
  // In Redux, a slice is a portion of the Redux store that manages a specific part of the application's state.
  // A slice typically contains Initial State, Reducers, and Actions.
  // We have a slice called hirerDetails (managed in hirerDetailsSlice.js) which includes several states like loginFormState, bookingFormState, driverFormState, and hirerFormState.
  name: "hirerDetails",

  // Initial State: The default values for the part of the state that this slice manages.
  initialState,

  // Reducers: Functions that define how the state should be updated in response to actions.
  // A reducer is a function that takes the current state and an action as arguments and returns a new state. They define how state transitions happen in response to actions.
  // Reducers specify how the application's state changes in response to actions sent to the store.
  // In hirerDetailsSlice.js, the slice hirerDetailsSlice contains multiple reducers.
  reducers: {
    // The pickup_date field in the bookingFormState contains a date object that cannot be serialized by Redux. Redux expects all state values to be serializable for purposes like time-travel debugging and persistence. Date objects are inherently non-serializable because they include methods and internal properties that cannot be represented as plain JSON. When we attempt to store a date object directly in our Redux state, we encounter this issue.
    // We can address this issue by converting the date object to a serializable format before storing it in the Redux state, and converting it back to a date object when needed.

    // const newState = { ...state.bookingFormState, ...action.payload }; - Create a new state object for the bookingFormState by merging the current state with the new values from action.payload
    // The spread operator (...) is used to copy all properties from state.bookingFormState and action.payload into a new object. If there are properties with the same name in both objects, the values from action.payload will overwrite those from state.bookingFormState. This effectively combines the existing state with any updates from the action payload.
    // If it is a dayjs object, convert it to an ISO string representation
    /* if (dayjs.isDayjs(newState.pickup_date)) {
        newState.pickup_date = newState.pickup_date.toISOString();
      } */

    // Check if the 'pickup_date' in newState, exists in the payload and if it is a valid dayjs object (i.e., an instance of dayjs)..
    // Convert the dayjs object to an ISO string (i.e., a standardized ISO 8601 string format, which is a common format for storing date and time in strings.) and assigns it to the 'pickup_date' field in the newState object.
    // Update the bookingFormState property in the Redux state with the new state object. 'state.bookingFormState' is assigned the value of newState, effectively applying all the changes made in the newState to the Redux state. This replaces the previous bookingFormState with the updated state, including any changes from action.payload and the converted pickup_date.
    // This reducer function updates the bookingFormState in our Redux store with new values from action.payload, ensuring that any dayjs objects in the payload are converted to ISO strings before being stored. This approach maintains consistent data types and avoids potential issues with non-serializable values in Redux state.

    // updateLoginButtonState and updateLoginFormState: These reducers modify parts of the loginFormState slice of the state.
    updateLoginButtonState(state, action) {
      state.loginFormState.login_button = action.payload;
    },
    updateLoginFormState(state, action) {
      state.loginFormState = { ...state.loginFormState, ...action.payload };
    },

    // updateBookingFormState: This reducer updates the bookingFormState, specifically ensuring that if pickup_date is provided and is a Day.js object, it is converted to an ISO string.
    updateBookingFormState(state, action) {
      const newState = { ...state.bookingFormState, ...action.payload };

      if (
        action.payload.pickup_date &&
        dayjs.isDayjs(action.payload.pickup_date)
      ) {
        newState.pickup_date = action.payload.pickup_date.toISOString();
      }

      state.bookingFormState = newState;
    },
    updateDriverFormState(state, action) {
      state.driverFormState = { ...state.driverFormState, ...action.payload };
    },
    updateHirerFormState(state, action) {
      state.hirerFormState = { ...state.hirerFormState, ...action.payload };
    },
    resetLoginFormState(state) {
      state.loginFormState = initialState.loginFormState;
    },
    resetBookingFormState(state) {
      state.bookingFormState = initialState.bookingFormState;
    },
    resetDriverFormState(state) {
      state.driverFormState = initialState.driverFormState;
    },
    resetHirerFormState(state) {
      state.hirerFormState = initialState.hirerFormState;
    },
  },
});

// Actions: Payloads of information that send data from our application to the Redux store.
// This exports the action creators generated by createSlice().
// The createSlice function automatically generates action creators for each reducer function. Here, the action creators for updateBookingFormState, updateDriverFormState, updateHirerFormState,resetBookingFormState, resetDriverFormState and resetHirerFormState are exported.
// An action is a plain JavaScript object that has a type property. Actions are plain objects that describe an intention to change the state. Each action has a type and may include additional data (payload).
// Actions are dispatched to the store, and reducers listen for actions to determine how the state should change.
// An action creator is a function that returns an action. In Redux Toolkit, these are automatically generated by the createSlice function.
// Here, actions are generated by the createSlice function from Redux Toolkit:
export const {
  updateLoginButtonState,
  updateLoginFormState,
  updateBookingFormState,
  updateDriverFormState,
  updateHirerFormState,
  resetLoginFormState,
  resetBookingFormState,
  resetDriverFormState,
  resetHirerFormState,
} = hirerDetailsSlice.actions;

// Each action corresponds to one of the reducers. For example:
  // updateLoginFormState: An action created to update the loginFormState.
  // resetBookingFormState: An action created to reset bookingFormState to its initial state.

// Action Creator
// Action creators are functions that return action objects. They are used to simplify the creation and dispatching of actions.
// This exports the reducer function generated by createSlice as the default export.
// The createSlice function returns an object containing the reducer, which is needed to configure the Redux store. The reducer handles the state transitions based on the actions dispatched.
export default hirerDetailsSlice.reducer;

// updateLoginButtonState is both an action and a reducer in the context of Redux Toolkit.
  // As a reducer: It is a function defined within the reducers object inside the slice. This function specifies how the state should be updated when the corresponding action is dispatched.

  /* updateLoginButtonState(state, action) {
    state.loginFormState.login_button = action.payload;
  } */
  
  // As an action: When you define a reducer like updateLoginButtonState, Redux Toolkit automatically creates an action creator with the same name. This action creator, when called, returns an action object that can be dispatched to the store.

  //export const { updateLoginButtonState } = hirerDetailsSlice.actions;

  // When you call updateLoginButtonState(payload), it returns an action like:

  /* {
    type: 'hirerDetails/updateLoginButtonState',
    payload: ... // The payload you pass in
  } */
  
  // So, updateLoginButtonState refers to both the reducer function that updates the state and the action creator that generates the action object to trigger that state update.