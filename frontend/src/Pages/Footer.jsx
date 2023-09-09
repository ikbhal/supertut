import React from "react";
import "../Styles/footer.css";
import { FaFacebook, FaInstagram, FaTwitter } from "react-icons/fa";
const Footer = () => {
  return (
    <div className="footer-container">
      <div className="center-container border-bottom">
        <div className="footer-data">
          <ul>
            <li className="heading">About</li>
            <li>Who are we?</li>
            <li>Our commitment</li>
            <li>Terms & Conditions</li>
            <li>Privacy Policy</li>
          </ul>
          <ul>
            <li className="heading">Online Classes</li>
            <li>States</li>
            <li>superTut Recruits</li>
          </ul>
          <ul>
            <li className="heading">Help</li>
            <li>Need help?</li>
            <li>Contact</li>
          </ul>
          <ul>
            <li className="heading">Follow Us</li>
            <li className="follow-us">
              <FaFacebook />
              <FaTwitter />
              <FaInstagram />
            </li>
          </ul>
        </div>
      </div>
      <p className="copy-right">&#169; 2023 RantoHub, Explore. Learn</p>
    </div>
  );
};

export default Footer;
