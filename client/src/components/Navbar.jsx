import React from "react";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import {
  Home,
  About,
  Products,
  Cart,
  Contact,
  LogoutButton,
  Profile,
} from "../pages";
import logo from "../assets/images/logo.png";
import LoginButton from "../pages/Login";
import { useAuth0 } from "@auth0/auth0-react";
import AdminLogin from "../pages/AdminLogin";
import AdminProductsPage from "../pages/admin/products";
import Dashboard from "../pages/admin/dashboard";
import AdminOrdersPage from "../pages/admin/orders";

const Navbar = () => {
  const { isAuthenticated } = useAuth0();

  return (
    <>
      <BrowserRouter>
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
          <div className="container">
            <Link className="navbar-brand" to="/">
              <img src={logo} alt="Moto Dang" />
            </Link>

            <button
              className="navbar-toggler"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#navbarSupportedContent"
              aria-controls="navbarSupportedContent"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <span className="navbar-toggler-icon"></span>
            </button>
            <div
              className="collapse navbar-collapse"
              id="navbarSupportedContent"
            >
              <ul className="navbar-nav mx-auto mb-2 gap-4 mb-lg-0">
                <li className="nav-item">
                  <Link className="nav-link active" to="/">
                    Home
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link " to="/about">
                    About
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link " to="/products">
                    Products
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link " to="/cart">
                    Cart
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link " to="/contact">
                    Contact
                  </Link>
                </li>
              </ul>

              <div className="nav-right-bar">
                {!isAuthenticated ? <LoginButton /> : <LogoutButton />}

                {/* <strong className="position-relative">
                  <em className="bi bi-cart text-light fs-5"></em>
                  <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                    2
                  </span>
                </strong>
                <span className="text-light ms-4">Rs 0.00</span>
                <em className="bi bi-search text-light ms-3"></em> */}
              </div>
            </div>
          </div>
        </nav>

        <main className="main-content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/products" element={<Products />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/admin" element={<AdminLogin />} />
            <Route path="/admin/dashboard" element={<Dashboard />} />
            <Route path="/admin/products" element={<AdminProductsPage />} />
            <Route path="/admin/orders" element={<AdminOrdersPage />} />
            <Route path="*" element={<div>Error</div>} />
          </Routes>
        </main>
      </BrowserRouter>
    </>
  );
};

export default Navbar;
