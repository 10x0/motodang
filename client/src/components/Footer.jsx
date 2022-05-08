import React from "react";
import { Logo } from "../components/index";
const Footer = () => {
  return (
    <footer className="py-4 bg-dark text-light">
      <div className="container">
        <div className="row align-items-center">
          <div className="col-md-3">
            <Logo />
          </div>
          <div className="col-md-6 text-center">
            Copyright © 2022 Moto Dang. All rights reserved.
          </div>
          <div className="col-md-3">
            <div className="d-flex gap-3 justify-content-end">
              <a className="link-light" href="#s">
                <em className="bi bi-facebook"></em>
              </a>
              <a className="link-light" href="#s">
                <em className="bi bi-twitter"></em>
              </a>
              <a className="link-light" href="#s">
                <em className="bi bi-youtube"></em>
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
