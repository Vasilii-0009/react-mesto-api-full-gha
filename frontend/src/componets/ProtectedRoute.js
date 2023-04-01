import React from "react";
import { Navigate } from "react-router-dom";

function ProtectedRoute({ element: Component, ...props }) {
  return (
    props.loggedIn ? Component : <Navigate to="/sign-in" />
  )
}



export default ProtectedRoute