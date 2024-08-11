// The store is the centralized place where the entire state of your application is kept.
// The store is the central hub for state in a Redux application. It holds the application's state, and provides methods to access the state, dispatch actions, and subscribe to state changes.
// The Redux store is created using configureStore from @reduxjs/toolkit.
// The store holds the state and allows the state to be accessed and updated by dispatching actions.

import { configureStore } from "@reduxjs/toolkit";
import hirerDetailsReducer from "./slices/hirerDetailsSlice";

const store = configureStore({
  reducer: {

    // reducer: This key contains all the reducers responsible for managing different parts of the application state.
    // In this case, hirerDetailsReducer is handling the state slice named hirerDetails.
    hirerDetails: hirerDetailsReducer,
  },

  // middleware: Middleware is a way to customize the dispatch process. Here, it's configured to ignore serialization checks for specific actions and state paths.
  // This is useful because certain parts of our state (like pickup_date, which is a Day.js object) may not be serializable by default, and Redux Toolkit expects state to be serializable.
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ['hirerDetails/updateBookingFormState'], // Add any actions you want to ignore
        ignoredPaths: ['hirerDetails.bookingFormState.pickup_date'], // Add any state paths you want to ignore
      },
    }),
});

// If you want to configure Redux Toolkit to allow non-serializable values in specific cases, you can disable the middleware warning for non-serializable values. However, it's generally best practice to avoid storing non-serializable values in Redux state to maintain consistency and avoid potential issues.
// To configure Redux Toolkit to ignore serialization checks for specific actions or paths, we'll need to provide the actual action types and state paths we want to ignore.

export default store;