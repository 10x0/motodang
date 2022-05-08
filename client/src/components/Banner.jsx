import React from "react";
import banner from "../assets/images/banner.jpg";
const Banner = () => {
  return (
    <section
      className="billboard"
      style={{ backgroundImage: "url(" + banner + ")" }}
    >
      <div className="container">
        <div className="billboard-content">
          <h1 className="text-light display-3">
            Moto Dang <span className="d-block">Till i Ride</span>
          </h1>
          <p className="lead text-light pb-2">
            Your one stop solution for every biking needs.
          </p>
          <a href="#" className="btn btn-primary btn-lg">
            Shop Now
          </a>
        </div>
      </div>
    </section>
  );
};

export default Banner;
