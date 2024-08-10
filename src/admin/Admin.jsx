import { faHouse, faTrashCan } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { updateLoginButtonState } from "../redux/slices/hirerDetailsSlice";
import {
  deleteBookingDetailsOfAUserApi,
  getBookingDetailsOfAllUsersApi,
} from "../services/pro_allApi";
import "./Admin.css";

function Admin() {
  const dispatch = useDispatch();

  const [allUsers, setAllUsers] = useState([]);
  const getBookingDetails = async () => {
    const result = await getBookingDetailsOfAllUsersApi();
    console.log(`result : ${result}`);

    if (result.status >= 200 && result.status < 300) {
      setAllUsers(result.data);
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

  useEffect(() => {
    getBookingDetails();
  }, []);

  return (
    <>
      <div className="admin-container row w-100 my-5 d-flex flex-column justify-content-start align-items-center">
        <div className="dash-home d-flex justify-content-between p-md-5">
          <h1 className="text-light ms-5">Dashboard</h1>
          <h5 className="mt-4 me-5">
            <Link
              to={"/"}
              style={{ textDecoration: "none", color: "white" }}
              onClick={() => {
                localStorage.removeItem("currentUser");
                dispatch(updateLoginButtonState(true));
              }}
            >
              <FontAwesomeIcon icon={faHouse} className="me-2" />
              <span className="hide">Back Home</span>
            </Link>
          </h5>
        </div>
        <div className="row w-100">
          <div className="col-md-1"></div>
          <div className="col-md-10 table-container">
            <table className="table">
              <thead>
                <tr>
                  <th>Sl. No.</th>
                  <th>Email</th>
                  <th>Mobile No.</th>
                  <th>Car Make</th>
                  <th>Car Model</th>
                  <th>Registration No.</th>
                  <th>Service Type</th>
                  <th>Driver</th>
                  <th>Pick-Up Date</th>
                  <th>Delete</th>
                </tr>
              </thead>
              {allUsers.length > 0 && (
                <tbody>
                  {allUsers?.map((item, index) => (
                    <tr key={item.id}>
                      <td>{index + 1}</td>
                      <td>{item.email}</td>
                      <td>{item.mobile_number}</td>
                      <td>{item.car_make}</td>
                      <td>{item.car_model}</td>
                      <td>{item.reg_number}</td>
                      <td>{item.service_type}</td>
                      <td>{item.driver_name}</td>
                      <td>{dateFormatter(item.pickup_date)}</td>
                      <td>
                        <button
                          className="btn btn-danger"
                          onClick={() => handleDeleteUser(item.id)}
                        >
                          <FontAwesomeIcon icon={faTrashCan} />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              )}
            </table>
            {allUsers.length == 0 && <p className="text-danger text-center fs-3 fw-bolder w-100">No Booking Details</p>}
          </div>
          <div className="col-md-1"></div>
        </div>
      </div>
    </>
  );
}

export default Admin;
