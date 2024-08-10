import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import TextField from "@mui/material/TextField";
import { useState } from "react";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import loginImage from "../assets/favicon.jpeg";
import { updateLoginFormState } from "../redux/slices/hirerDetailsSlice";
import { ADMIN_USER } from "./constants";

const Login = () => {
  // const [log_email_id, setLogUsername] = useState("");
  // const [log_password, setLogPassword] = useState("");

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const loginFormState = useSelector(
    (state) => state.hirerDetails.loginFormState
  );

  const handleChange = (e) => {
    const { name, value } = e.target;
    dispatch(updateLoginFormState({ [name]: value }));
  };

  const handleLogin = () => {
    const users = JSON.parse(localStorage.getItem("users")) || [];
    const user = users.find(
      (user) =>
        // user.reg_email_id === log_email_id && user.reg_password === log_password
      user.reg_email_id === loginFormState.login_email && user.reg_password === loginFormState.login_pswd
    );

    if (!loginFormState.login_email || !loginFormState.login_pswd) {
      toast.info("Please fill the form completely");
    } else {
      if (
        user ||
        (loginFormState.login_email === ADMIN_USER.email_id &&
          loginFormState.login_pswd === ADMIN_USER.password)
      ) {
        const log_email_id = String(loginFormState.login_email);
        // localStorage.setItem("currentUser", JSON.stringify({ log_email_id }));
        localStorage.setItem("currentUser",log_email_id)
        const show_currentUser = localStorage.getItem("currentUser");
        console.log('Current User: ', show_currentUser)
        
        if (log_email_id === ADMIN_USER.email_id) {
          toast.success("Administrator Login successful", {
            onClose: () => navigate("/admin"),
          });
        } else {
          toast.success("Login successful", {
            onClose: () => navigate("/", { state: { loginFormState } }),
          });
        }
      } else {
        toast.error("Invalid credentials");
      }
    }
  };

  return (
    <>
      {/* <h1>Login</h1>
      <input
        type="text"
        placeholder="Username"
        value={email_id}
        onChange={(e) => setUsername(e.target.value)}
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button onClick={handleLogin}>Login</button> */}

      <div
        className="d-flex justify-content-center align-items-center"
        style={{ width: "100%", height: "100vh" }}
      >
        <div className="container w-75">
          <Link
            to={"/"}
            className="text-warning"
            style={{ textDecoration: "none" }}
          >
            <h4 className="text-light">
              <FontAwesomeIcon icon={faArrowLeft} className="me-2" />
              Back Home
            </h4>
          </Link>
          <div className="bg-dark p-3 border border-light">
            <Row>
              <Col
                md={6}
                className="p-4 d-flex justify-content-center align-items-center"
              >
                <img src={loginImage} alt="" width={"80%"} />
              </Col>
              <Col
                md={6}
                className="p-5 d-flex justify-content-center text-light"
              >
                <form className="w-100">
                  <h3 className="text-center text-light mb-4">ProChauffeurs</h3>
                  <h5 className="text-center my-3">Sign In to Your Account</h5>

                  <div className="mt-4 mb-3">
                    {/* <input
                      type="text"
                      placeholder="Email ID"
                      className="form-control rounded-0"
                    /> */}
                    <TextField
                      name="login_email"
                      value={loginFormState.login_email || ""}
                      // onChange={(e) => setLogUsername(e.target.value)}
                      onChange={handleChange}
                      className="w-100"
                      id="outlined-basic-1"
                      label="EMAIL ID"
                      variant="outlined"
                      sx={{
                        // Root class for the input field
                        "& .MuiOutlinedInput-root": {
                          color: "#ffffff",
                          fontFamily: "Arial",
                          fontWeight: "bold",
                          height: "60px",
                          alignItems: "center",
                          paddingLeft: "5px",
                          // Class for the border around the input field
                          "& .MuiOutlinedInput-notchedOutline": {
                            borderColor: "#000000",
                            borderWidth: "1px",
                          },
                          // Change border color when focused
                          "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                            borderColor: "#ffffff",
                          },
                        },
                        // Class for the label of the input field
                        "& .MuiInputLabel-outlined": {
                          color: "white",
                          fontSize: "16px",
                        },
                        // Change label color when focused
                        "& .MuiInputLabel-outlined.Mui-focused": {
                          color: "white",
                        },
                      }}
                    />
                  </div>
                  <div className="mb-3">
                    {/* <input
                      type="text"
                      placeholder="Password"
                      className="form-control rounded-0"
                    /> */}
                    <TextField
                      name="login_pswd"
                      value={loginFormState.login_pswd || ""}
                      // onChange={(e) => setLogPassword(e.target.value)}
                      onChange={handleChange}
                      className="w-100"
                      id="outlined-basic-2"
                      label="PASSWORD"
                      type="password"
                      variant="outlined"
                      sx={{
                        // Root class for the input field
                        "& .MuiOutlinedInput-root": {
                          color: "#ffffff",
                          fontFamily: "Arial",
                          fontWeight: "bold",
                          height: "60px",
                          alignItems: "center",
                          paddingLeft: "5px",
                          // Class for the border around the input field
                          "& .MuiOutlinedInput-notchedOutline": {
                            borderColor: "#000000",
                            borderWidth: "1px",
                          },
                          // Change border color when focused
                          "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                            borderColor: "#ffffff",
                          },
                        },
                        // Class for the label of the input field
                        "& .MuiInputLabel-outlined": {
                          color: "white",
                          fontSize: "16px",
                        },
                        // Change label color when focused
                        "& .MuiInputLabel-outlined.Mui-focused": {
                          color: "white",
                        },
                      }}
                    />
                  </div>
                  <div className="mb-3">
                    <div>
                      {/* <button className="btn btn-warning w-100 rounded-0">
                        Login
                      </button> */}
                      <Button
                        variant="light"
                        size="lg"
                        onClick={handleLogin}
                        className="mb-3 w-100 rounded-0"
                        style={{ width: "150px" }}
                      >
                        Login
                      </Button>
                      <p>
                        New User? Click Here to{" "}
                        <Link to={"/register"} className="text-warning">
                          Register
                        </Link>
                      </p>
                    </div>
                  </div>
                </form>
              </Col>
            </Row>
          </div>
        </div>
      </div>
      <ToastContainer position="top-center" theme="colored" autoclose={1000} />
    </>
  );
};

export default Login;
