import { configureStore } from "@reduxjs/toolkit";
import thunk from "redux-thunk";
import hirerDetailsReducer from "./slices/hirerDetailsSlice";
// import driverDetailsReducer from "./slices/driverDetailsSlice";
// import bookingDetailsReducer from "./slices/bookingDetailsSlice";

const store = configureStore({
  reducer: {
    // bookingDetails: bookingDetailsReducer,
    // driverDetails: driverDetailsReducer,
    hirerDetails: hirerDetailsReducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(thunk),
});

export default store;