import { faHouse, faTrashCan } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import {
  Container,
  Box,
  Typography,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  IconButton,
} from "@mui/material";
import { updateLoginButtonState } from "../redux/slices/hirerDetailsSlice";
import {
  addBookingDetailsOfAUserApi,
  deleteBookingDetailsOfAUserApi,
  getBookingDetailsOfAllUsersApi,
  getDefaultBookingDetailsApi,
} from "../services/pro_allApi";
import "./Admin.css";

function Admin() {
  const dispatch = useDispatch();

  // Initializes the state variable allUsers with an empty array. This state will hold the booking details of all users fetched from the API.
  const [allUsers, setAllUsers] = useState([]);

  // Initializes the state variable defaultUsers with an empty array. This state will hold the default booking details fetched from the API.
  const [defaultUsers, setDefaultUsers] = useState([]);

  // Get the booking details of all users
  const getBookingDetails = async () => {
    // Calls the API function getBookingDetailsOfAllUsersApi to fetch booking details and waits for the response. The await keyword pauses execution until the promise resolves.
    const result = await getBookingDetailsOfAllUsersApi();
    console.log("result: ", result);

    if (result.status >= 200 && result.status < 300) {
      // Updates the allUsers state with the data fetched from the API.
      setAllUsers(result.data);
    }
  };

  // Add default data to the database (db.json)
  const addDefaultDataToDatabase = async () => {
    // Starts a try block to catch any errors that might occur during the execution of the code inside it.
    try {
      // Use map to create an array of promises.
      // Maps over the defaultUsers array to create an array of promises. Each promise represents an API call to add a booking detail.
      const promises = defaultUsers.map(async (item) => {
        // Await the result of the API call
        // Calls addBookingDetailsOfAUserApi for each item (default booking detail) and waits for it to complete.
        // The await keyword pauses execution until the promise resolves.
        await addBookingDetailsOfAUserApi(item);
      });

      // Wait for all promises to resolve
      // Waits for all the promises to resolve. This ensures that all default booking details are added before proceeding.
      await Promise.all(promises);

      // Logs a message to indicate that all default data has been successfully added.
      console.log("All default data has been added to the database.");

      // Get the updated booking details
      // Calls getBookingDetails to fetch the updated list of booking details from the API, reflecting the newly added data.
      getBookingDetails();

      // Catches any errors that occur during the try block execution.
    } catch (error) {
      // Logs an error message to the console if an error occurs.
      console.error("Error adding default data to the database:", error);
    }
  };

  // Load default booking details from db.json
  const loadDefaultBookingDetails = async () => {
    // Starts a try block to catch any errors that might occur during the execution of the code inside it.
    try {
      // Calls getDefaultBookingDetailsApi to fetch default booking details and waits for the response.
      // The await keyword pauses execution until the promise resolves.
      const defaultData = await getDefaultBookingDetailsApi();
      if (defaultData.status >= 200 && defaultData.status < 300) {
        // Updates the defaultUsers state with the fetched default booking details.
        setDefaultUsers(defaultData.data);

        // Calls addDefaultDataToDatabase to add the default booking details to the database.
        await addDefaultDataToDatabase();
      }

      // Catches any errors that occur during the try block execution.
    } catch (error) {
      // Logs an error message to the console if an error occurs.
      console.error("Error loading default booking details:", error);
    }
  };

  const dateFormatter = (isoString) => {
    const date = new Date(isoString);

    // en-GB format gives dd/mm/yyyy
    const formattedDate = date.toLocaleDateString("en-GB");

    // Input: "2024-08-10T07:39:55.209Z"
    // Output: 10/08/2024
    console.log(formattedDate);
    return formattedDate;
  };

  const handleDeleteUser = async (id) => {
    await deleteBookingDetailsOfAUserApi(id);
    getBookingDetails();
  };

  // The function call inside the useEffect hook triggers the getBookingDetails function as soon as the component (the specific React component in which the useEffect is defined, i.e., <Admin/>) is mounted (rendered for the first time).
  // The empty array [] as the second argument means that this effect will only run once when the component first mounts.
  useEffect(() => {
    getBookingDetails();
  }, []);

  return (
    <>
      <Box
        sx={{
          backgroundColor: "#0a0a0a",
          minHeight: "100vh",
          width: "100%",
          py: { xs: 3, md: 5 },
        }}
      >
        <Container maxWidth="xl">
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              mb: { xs: 3, md: 4 },
              flexWrap: "wrap",
              gap: 2,
            }}
          >
            <Typography
              variant="h3"
              component="h1"
              sx={{
                color: "#ffffff",
                fontWeight: 600,
                fontSize: { xs: "1.75rem", md: "2.5rem" },
                letterSpacing: "0.5px",
              }}
            >
              Dashboard
            </Typography>
            <Link
              to={"/"}
              style={{ textDecoration: "none" }}
              onClick={() => {
                localStorage.removeItem("currentUser");
                dispatch(updateLoginButtonState(true));
              }}
            >
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  gap: 1,
                  color: "#ffffff",
                  fontSize: { xs: "0.9rem", md: "1.1rem" },
                  fontWeight: 500,
                  transition: "all 0.3s ease",
                  "&:hover": {
                    color: "#b0b0b0",
                  },
                }}
              >
                <FontAwesomeIcon icon={faHouse} />
                <span className="hide">Back Home</span>
              </Box>
            </Link>
          </Box>

          <Paper
            elevation={24}
            sx={{
              width: "100%",
              backgroundColor: "#1a1a1a",
              border: "1px solid #333333",
              borderRadius: "16px",
              padding: { xs: 2, md: 3 },
              boxShadow: "0 8px 32px rgba(0, 0, 0, 0.5), 0 0 0 1px rgba(255, 255, 255, 0.05) inset",
              overflow: "hidden",
            }}
          >
            {allUsers.length > 0 ? (
              <TableContainer
                sx={{
                  maxHeight: "70vh",
                  "&::-webkit-scrollbar": {
                    width: "8px",
                    height: "8px",
                  },
                  "&::-webkit-scrollbar-track": {
                    backgroundColor: "#0a0a0a",
                  },
                  "&::-webkit-scrollbar-thumb": {
                    backgroundColor: "#4a4a4a",
                    borderRadius: "4px",
                    "&:hover": {
                      backgroundColor: "#6a6a6a",
                    },
                  },
                }}
              >
                <Table
                  stickyHeader
                  sx={{
                    "& .MuiTableCell-root": {
                      borderColor: "#2a2a2a",
                      color: "#ffffff",
                      fontFamily: "'Inter', 'Arial', sans-serif",
                    },
                  }}
                >
                  <TableHead>
                    <TableRow
                      sx={{
                        backgroundColor: "#2a2a2a",
                        "& .MuiTableCell-head": {
                          backgroundColor: "#2a2a2a",
                          color: "#ffffff",
                          fontWeight: 600,
                          fontSize: { xs: "0.75rem", md: "0.9rem" },
                          padding: { xs: "8px 4px", md: "12px 8px" },
                          textAlign: "center",
                        },
                      }}
                    >
                      <TableCell>Sl. No.</TableCell>
                      <TableCell>Email</TableCell>
                      <TableCell>Mobile No.</TableCell>
                      <TableCell>Car Make</TableCell>
                      <TableCell>Car Model</TableCell>
                      <TableCell>Registration No.</TableCell>
                      <TableCell>Service Type</TableCell>
                      <TableCell>Driver</TableCell>
                      <TableCell>Pick-Up Date</TableCell>
                      <TableCell>Delete</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {allUsers?.map((item, index) => (
                      <TableRow
                        key={item.id}
                        sx={{
                          backgroundColor: index % 2 === 0 ? "#1a1a1a" : "#222222",
                          transition: "background-color 0.2s ease",
                          "&:hover": {
                            backgroundColor: "#2a2a2a",
                          },
                          "& .MuiTableCell-body": {
                            color: "#d0d0d0",
                            fontSize: { xs: "0.8rem", md: "0.9rem" },
                            padding: { xs: "8px 4px", md: "12px 8px" },
                            textAlign: "center",
                          },
                        }}
                      >
                        <TableCell>{index + 1}</TableCell>
                        <TableCell>{item.email}</TableCell>
                        <TableCell>{item.mobile_number}</TableCell>
                        <TableCell>{item.car_make}</TableCell>
                        <TableCell>{item.car_model}</TableCell>
                        <TableCell>{item.reg_number}</TableCell>
                        <TableCell>{item.service_type}</TableCell>
                        <TableCell>{item.driver_name}</TableCell>
                        <TableCell>{dateFormatter(item.pickup_date)}</TableCell>
                        <TableCell>
                          <IconButton
                            onClick={() => handleDeleteUser(item.id)}
                            sx={{
                              color: "#ff4444",
                              backgroundColor: "rgba(255, 68, 68, 0.1)",
                              transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
                              "&:hover": {
                                backgroundColor: "rgba(255, 68, 68, 0.2)",
                                transform: "scale(1.1)",
                              },
                            }}
                          >
                            <FontAwesomeIcon icon={faTrashCan} />
                          </IconButton>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            ) : (
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                  alignItems: "center",
                  py: 8,
                }}
              >
                <Typography
                  sx={{
                    color: "#ff4444",
                    fontSize: { xs: "1.5rem", md: "2rem" },
                    fontWeight: 600,
                    mb: 3,
                    textAlign: "center",
                  }}
                >
                  No Booking Details
                </Typography>
                <Button
                  onClick={loadDefaultBookingDetails}
                  variant="light"
                  size="lg"
                  sx={{
                    minWidth: "180px",
                    height: "48px",
                    backgroundColor: "#ffffff",
                    color: "#0a0a0a",
                    border: "1.5px solid #ffffff",
                    borderRadius: "8px",
                    fontWeight: 600,
                    fontSize: "1rem",
                    textTransform: "none",
                    transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
                    "&:hover": {
                      backgroundColor: "#f0f0f0",
                      borderColor: "#ffffff",
                      transform: "translateY(-2px)",
                      boxShadow: "0 4px 16px rgba(255, 255, 255, 0.2)",
                    },
                    "&:active": {
                      transform: "translateY(0)",
                    },
                  }}
                >
                  Load Default Data
                </Button>
              </Box>
            )}
          </Paper>
        </Container>
      </Box>
    </>
  );
}

export default Admin;
