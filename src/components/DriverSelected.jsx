import React from 'react'
import { faStar } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";
import { Button, Card } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import "../components/DriverSelected.css";
import { updateDriverFormState } from "../redux/slices/hirerDetailsSlice";
import { getDetailsOfADriverApi } from "../services/pro_allApi";

function DriverSelected() {
  return (
    <>

    </>
  )
}

export default DriverSelected