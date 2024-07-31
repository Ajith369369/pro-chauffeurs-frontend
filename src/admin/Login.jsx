import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import { Link, useNavigate } from "react-router-dom";
import loginImage from "../assets/lock-icon.jpg";
import { ADMIN_USER } from "./constants";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = () => {
    const users = JSON.parse(localStorage.getItem("users")) || [];
    const user = users.find(
      (user) => user.username === username && user.password === password
    );

    if (
      user ||
      (username === ADMIN_USER.username && password === ADMIN_USER.password)
    ) {
      localStorage.setItem("currentUser", JSON.stringify({ username }));
      if (username === ADMIN_USER.username) {
        navigate("/admin");
      } else {
        navigate("/");
      }
    } else {
      alert("Invalid credentials");
    }
  };

  return (
    <>
      <h1>Login</h1>
      <input
        type="text"
        placeholder="Username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button onClick={handleLogin}>Login</button>
      {/*  */}

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
                  <h3 className="text-center text-light">ProChauffeurs</h3>
                  <h5 className="text-center">Sign In to Your Account</h5>

                  <div className="mb-3">
                    <input
                      type="text"
                      placeholder="Email ID"
                      className="form-control rounded-0"
                    />
                  </div>
                  <div className="mb-3">
                    <input
                      type="text"
                      placeholder="Password"
                      className="form-control rounded-0"
                    />
                  </div>
                  <div className="mb-3">
                    <div>
                      <button className="btn btn-warning w-100 rounded-0">
                        Login
                      </button>
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
    </>
  );
};

export default Login;
