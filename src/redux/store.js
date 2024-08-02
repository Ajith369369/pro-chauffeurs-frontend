import { configureStore } from "@reduxjs/toolkit";
import hirerDetailsReducer from "./slices/hirerDetailsSlice";
import driverDetailsReducer from "./slices/driverDetailsSlice";
import bookingDetailsReducer from "./slices/bookingDetailsSlice";

const store = configureStore({
  reducer: {
    bookingDetails: bookingDetailsReducer,
    driverDetails: driverDetailsReducer,
    hirerDetails: hirerDetailsReducer,
  },
});

export default store;