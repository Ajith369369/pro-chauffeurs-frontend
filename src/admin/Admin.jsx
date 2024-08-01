import { faHouse, faTrashCan } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";
import { Link } from "react-router-dom";
import {
  deleteBookingDetailsOfAUserApi,
  getBookingDetailsOfAllUsersApi,
} from "../services/pro_allApi";

function Admin() {
  const [allUsers, setAllUsers] = useState([]);
  const getBookingDetails = async () => {
    const result = await getBookingDetailsOfAllUsersApi();
    console.log(`result : ${result}`);

    if (result.status >= 200 && result.status < 300) {
      setAllUsers(result.data);
    }
  };

  const handleDeleteUser = async (id) => {
    await deleteBookingDetailsOfAUserApi(id);
    getBookingDetails();
  };

  return (
    <>
      <div className="row w-100 my-5">
        <div className="d-flex justify-content-between p-md-5">
          <h3 className="text-light">Dashboard</h3>
          <h5>
            <Link
              to={"/home"}
              style={{ textDecoration: "none", color: "white" }}
            >
              <FontAwesomeIcon icon={faHouse} className="me-2" />
              <span className="hide">Back Home</span>
            </Link>
          </h5>
        </div>
        <div className="col-md-2"></div>
        <div className="col-md-8">
          <table className="table">
            <thead>
              <tr>
                <th>Sl. No.</th>
                <th>Username</th>
                <th>Email</th>
                <th>Mobile No.</th>
                <th>Service Type</th>
                <th>Car Type</th>
                <th>Car No.</th>
                <th>Delete</th>
              </tr>
            </thead>
            <tbody>
              {allUsers?.map((item, index) => (
                <tr key={id}>
                  <td>{index + 1}</td>
                  <td>{item.username}</td>
                  <td>{item.email}</td>
                  <td>{item.mobile_number}</td>
                  <td>{item.service_type}</td>
                  <td>{item.car_type}</td>
                  <td>{item.car_number}</td>
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
          </table>
          : <p className="text-danger fs-3">No Booking Details</p>
        </div>
        <div className="col-md-2"></div>
      </div>
    </>
  );
}

export default Admin;
