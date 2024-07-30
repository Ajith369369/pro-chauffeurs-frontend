import { commonAPI } from "./pro_commonApi";
import { serverUrl } from "./pro_serverUrl";

// API (on button click) to upload/add Booking Details (HirerDetails.jsx)
export const addBookingDetailsOfAUserApi = async (reqBody) => {
  return await commonAPI("POST", `${serverUrl}/allUsersBookingDetails`, reqBody);
};

// API to get all users' Booking Details
export const getBookingDetailsOfAllUsersApi = async () => {
  return await commonAPI("GET", `${serverUrl}/allUsersBookingDetails`, "");
};

// API to get a single user's Booking Details
export const getBookingDetailsOfAUserApi = async (id) => {
  return await commonAPI("GET", `${serverUrl}/allUsersBookingDetails/${id}`, "");
};

// API to delete a single user's Booking Details
export const deleteBookingDetailsOfAUserApi = async (id) => {
  return await commonAPI("DELETE", `${serverUrl}/allUsersBookingDetails/${id}`, {});
};