import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { connect } from "react-redux";

const PrivateRoute = ({ component: Component, auth, ...rest }) => {
  if (auth.isLoading) {
    return <h2>Loading ...</h2>;
  } else if (!auth.isAuthenticated) {
    return <Navigate to="/login" />;
  } else {
    return <Outlet />;
  }
};

const mapStateToProp = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProp)(PrivateRoute);
