import React from "react";
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import { Navbar, Footer } from "./components";

import "./App.css";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "antd/dist/antd.css";

function App() {
  return (
    <div>
      <ToastContainer />
      <Navbar />
      <Footer />
    </div>
  );
}

export default App;
