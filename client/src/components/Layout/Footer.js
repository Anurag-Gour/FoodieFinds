import React from "react";
import "../../style/Footer.css";
import { Link } from "react-router-dom";
const Footer = () => {
  return (
    <>
      <footer className="footer">
        <div className="footer-left col-md-4 col-sm-6">
          <p className="about">
            <span> About the company</span> Ut congue augue non tellus bibendum,
            in varius tellus condimentum. In scelerisque nibh tortor, sed
            rhoncus odio condimentum in. Sed sed est ut sapien ultrices
            eleifend. Integer tellus est, vehicula eu lectus tincidunt,
            ultricies feugiat leo. Suspendisse tellus elit, pharetra in
            hendrerit ut, aliquam quis augue. Nam ut nibh mollis, tristique ante
            sed, viverra massa.
          </p>
          <div className="icons">
            <Link to="">
              <i className="fa fa-facebook" />
            </Link>
            <Link to="">
              <i className="fa fa-twitter" />
            </Link>
            <Link to="">
              <i className="fa fa-linkedin" />
            </Link>
            <Link to="">
              <i className="fa fa-google-plus" />
            </Link>
            <Link to="">
              <i className="fa fa-instagram" />
            </Link>
          </div>
        </div>
        <div className="footer-center col-md-4 col-sm-6">
          <div>
            <i className="fa fa-map-marker" />
            <p>
              <span> Ahmedabad</span> Gujarat, India
            </p>
          </div>
          <div>
            <i className="fa fa-phone" />
            <p> (+91) 1234567890</p>
          </div>
          <div>
            <i className="fa fa-envelope" />
            <p>
              <Link to=""> office@foodiefinds.com</Link>
            </p>
          </div>
        </div>
        <div className="footer-right col-md-4 col-sm-6">
          <img src="/images/brandLogo.png" alt="brandLogo" />
          <p className="menu">
            <Link to="/about"> About</Link> |{" "}
            <Link to="/contact"> Contact</Link> |{" "}
            <Link to="/policy"> Policy </Link>
          </p>
          <p className="name"> FoodieFinds © 2023</p>
        </div>
      </footer>
    </>
  );
};

export default Footer;
