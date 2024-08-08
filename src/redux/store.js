import { configureStore } from "@reduxjs/toolkit";
import hirerDetailsReducer from "./slices/hirerDetailsSlice";
// import driverDetailsReducer from "./slices/driverDetailsSlice";
// import bookingDetailsReducer from "./slices/bookingDetailsSlice";

const store = configureStore({
  reducer: {
    // bookingDetails: bookingDetailsReducer,
    // driverDetails: driverDetailsReducer,
    hirerDetails: hirerDetailsReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ['hirerDetails/updateBookingFormState'], // Add any actions you want to ignore
        ignoredPaths: ['hirerDetails.bookingFormState.pickup_date'], // Add any state paths you want to ignore
      },
    }),
});

// If you want to configure Redux Toolkit to allow non-serializable values in specific cases, you can disable the middleware warning for non-serializable values. However, it's generally best practice to avoid storing non-serializable values in Redux state to maintain consistency and avoid potential issues.
// To configure Redux Toolkit to ignore serialization checks for specific actions or paths, you'll need to provide the actual action types and state paths you want to ignore.

export default store;