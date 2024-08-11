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

// The Redux state should consist of serializable data structures (plain objects, arrays, primitives) and actions should contain serializable data as their payloads.
// Serializable values are values that can be converted into a format that can be easily stored, transmitted, and reconstructed later. In Redux, it's generally recommended that all state and actions be serializable, meaning that they can be easily converted to and from JSON. This is because many of Redux's features, such as time travel debugging, state persistence, and logging, rely on the ability to serialize and deserialize the state and actions.
  // Time Travel Debugging: It allows you to move back and forth in the history of your application's state changes, helping in identifying and fixing bugs. Time travel debugging relies on the ability to record and replay actions. This requires that actions and state can be serialized into JSON format, which is why they must consist of serializable data (like objects, arrays, strings, numbers, and booleans).
  // State Persistence: In some applications, you might want to save the Redux state to local storage or a server and reload it later. For this to work, the state must be serializable, as only serializable data can be reliably saved and restored.
  // Logging: For logging purposes, serializable actions and states can be easily printed or stored in logs. Non-serializable values might cause issues when trying to log them. Logging keeps track of all actions and state changes, providing insights into what your application is doing.

// Serializable Values: Plain JavaScript objects, arrays, and primitives (like strings, numbers, and booleans).
// Non-Serializable Values: Date objects, functions, class instances, and DOM elements.

// While Date objects can technically be serialized (as strings), they are often not handled correctly by Redux due to their complex nature.
// If you want to configure Redux Toolkit to allow non-serializable values in specific cases, you can disable the middleware warning for non-serializable values. However, it's generally best practice to avoid storing non-serializable values in Redux state to maintain consistency and avoid potential issues.
// To configure Redux Toolkit to ignore serialization checks for specific actions or paths, we'll need to provide the actual action types and state paths we want to ignore.

export default store;