import React from "react";
import {  Navigate } from "react-router-dom";
import { Route } from "react-router-dom";

export default function PrivateRoute({ path, component }) {
  return localStorage.getItem("token") ? (
    <Route path={path} element={component} />
  ) : (
    <Navigate to="/signin" />
  );
}
