import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  formffState: {
    passengerdd_name: "",
  },
  formState: {
    passenger_name: "",
    email: "",
    mobile_number: "",
    car_type: "",
    car_number: "",
    ismobile_number: true,
    iscar_number: true,
  },
};

const formSlice = createSlice({
  name: "form",
  initialState,
  reducers: {
    updateFormffState(state, action) {
      state.formffState = { ...state.formffState, ...action.payload };
    },
    updateFormState(state, action) {
      state.formState = { ...state.formState, ...action.payload };
    },
    resetFormState(state) {
      state.formState = initialState.formState;
    },
    resetFormffState(state) {
      state.formffState = initialState.formffState;
    },
  },
});

export const {
  updateFormffState,
  updateFormState,
  resetFormState,
  resetFormffState,
} = formSlice.actions;

export default formSlice.reducer;
