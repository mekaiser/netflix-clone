import React from "react";
import "./Footer.css";

function Footer() {
  return (
    <div className="footer__wrapper">
      <div className="footer">
        <p className="footer__top">
          <a href="#">Questions? Contact us.</a>
        </p>
        <ul className="footer__links">
          <li className="footer__link__item">
            <a href="#">FAQ</a>
          </li>
          <li className="footer__link__item">
            <a href="#">Help Center</a>
          </li>
          <li className="footer__link__item">
            <a href="#">Account</a>
          </li>
          <li className="footer__link__item">
            <a href="#">Media Center</a>
          </li>
          <li className="footer__link__item">
            <a href="#">Investor Relations</a>
          </li>
          <li className="footer__link__item">
            <a href="#">Jobs</a>
          </li>
          <li className="footer__link__item">
            <a href="#">Ways to Watch</a>
          </li>
          <li className="footer__link__item">
            <a href="#">Terms of Use</a>
          </li>
          <li className="footer__link__item">
            <a href="#">Privacy</a>
          </li>
          <li className="footer__link__item">
            <a href="#">Cookie Preferences</a>
          </li>
          <li className="footer__link__item">
            <a href="#">Corporate Information</a>
          </li>
          <li className="footer__link__item">
            <a href="#">Contact Us</a>
          </li>
          <li className="footer__link__item">
            <a href="#">Speed Test</a>
          </li>
          <li className="footer__link__item">
            <a href="#">Legal Notices</a>
          </li>
          <li className="footer__link__item">
            <a href="#">Only on Netflix</a>
          </li>
        </ul>
        <p className="footer__country">Netflix World</p>
      </div>
    </div>
  );
}

export default Footer;
