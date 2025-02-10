import React from "react";

const Footer = () => {
  return (
    <footer className="bg-dark text-white py-4 mt-auto">
      <div className="container">
        <div className="row">
          {/* About Section */}
          <div className="col-md-4 mb-3">
            <h5>About Us</h5>
            <p>
              We provide the best services to our customers with a commitment to quality and satisfaction.
            </p>
          </div>

          {/* Links Section */}
          <div className="col-md-4 mb-3">
            <h5>Quick Links</h5>
            <ul className="list-unstyled">
              <li>
                <a href="#home" className="text-white text-decoration-none">
                  Home
                </a>
              </li>
              <li>
                <a href="#about" className="text-white text-decoration-none">
                  About
                </a>
              </li>
              <li>
                <a href="#services" className="text-white text-decoration-none">
                  Services
                </a>
              </li>
              <li>
                <a href="#contact" className="text-white text-decoration-none">
                  Contact
                </a>
              </li>
            </ul>
          </div>

          {/* Contact Section */}
          <div className="col-md-4 mb-3">
            <h5>Contact Us</h5>
            <p>Email: support@example.com</p>
            <p>Phone: +91 98765 43210</p>
            <p>Address: 123, Main Street, Chennai, India</p>
          </div>
        </div>

        <div className="text-center mt-4">
          <p className="mb-0">
            &copy; {new Date().getFullYear()} Your Company. All Rights Reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
