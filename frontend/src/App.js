import "./App.css";
import Header from "./components/layouts/Header";
import Dashboard from "./components/leads/Dashboard";
import { Component, Fragment } from "react";
import { Provider } from "react-redux";
import store from "./components/store";
import { Provider as AlertProvider } from "react-alert";
import AlertTemplate from "react-alert-template-basic";
import Alerts from "./components/layouts/Alerts";
import Register from "./components/accounts/Register";
import Login from "./components/accounts/Login";
import PrivateRoute from "./components/common/PrivateRoute";
import { loadUser } from "./actions/auth";

import { HashRouter as Router, Route, Routes } from "react-router-dom";

const alertOptions = {
  timeout: 3000,
  position: "top center",
};

class App extends Component {
  componentDidMount() {
    store.dispatch(loadUser());
  }

  render() {
    return (
      <Provider store={store}>
        <AlertProvider template={AlertTemplate} {...alertOptions}>
          <Router>
            <Fragment>
              <Header />
              <Alerts />
              <div className="container">
                <Routes>
                  <Route element={<PrivateRoute />}>
                    <Route path="/" exact element={<Dashboard />} />
                  </Route>
                  <Route path="/login" exact element={<Login />} />
                  <Route path="/register" exact element={<Register />} />
                </Routes>
              </div>
            </Fragment>
          </Router>
        </AlertProvider>
      </Provider>
    );
  }
}

export default App;
