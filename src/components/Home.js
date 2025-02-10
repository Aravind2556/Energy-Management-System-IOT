// import React from "react";
import { Link } from "react-router-dom";
import Windmill from "../assets/sander-weeteling-iGDg_f_mlWo-unsplash.jpg";

export const Home = () => {
  return (
    <div className="container-fluid p-0">
      {/* Fullscreen section */}
      <div className="position-relative">
        {/* Image section */}
        <div className="w-100">
          <img
            src={Windmill}
            alt="windmill"
            className="img-fluid w-100"
            style={{ height: "50vh", objectFit: "cover" }}
          />
        </div>

        {/* Centered content over the image */}
        <div
          className="position-absolute top-50 start-50 translate-middle text-center text-white"
          style={{ zIndex: 2 }}
        >
          <h1 className="display-4 font-weight-bold">Our Service</h1>
          <p className="lead">
            We offer the best wind energy solutions tailored to your needs.
          </p>
        </div>
      </div>

      {/* Login & Cart Sections */}
      <div className="container my-5">
        <div className="row g-4">
          {/* User Login */}
          <div className="col-md-4">
            <div className="card text-center shadow-lg">
              <div className="card-body">
                <h5 className="card-title">User Login</h5>
                <p className="card-text">Login to access your account and track your orders.</p>
                <Link to="/login" className="btn btn-primary">
                  Login
                </Link>
              </div>
            </div>
          </div>

          {/* Cart */}
          <div className="col-md-4">
            <div className="card text-center shadow-lg">
              <div className="card-body">
                <h5 className="card-title">Cart</h5>
                <p className="card-text">View and manage items in your cart.</p>
                <Link to="/cart" className="btn btn-success">
                  View Cart
                </Link>
              </div>
            </div>
          </div>

          {/* Admin Login */}
          <div className="col-md-4">
            <div className="card text-center shadow-lg">
              <div className="card-body">
                <h5 className="card-title">Admin Login</h5>
                <p className="card-text">Admin panel access for managing orders and users.</p>
                <Link to="/login" className="btn btn-danger">
                  Admin Login
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};


