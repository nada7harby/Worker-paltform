import React from 'react';
import { FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn, FaMapMarkerAlt, FaPhone, FaEnvelope } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-waves">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320">
          <path
            fill="#f8f9fa"
            fillOpacity="1"
            d="M0,96L48,112C96,128,192,160,288,160C384,160,480,128,576,112C672,96,768,96,864,112C960,128,1056,160,1152,160C1248,160,1344,128,1392,112L1440,96L1440,0L1392,0C1344,0,1248,0,1152,0C1056,0,960,0,864,0C768,0,672,0,576,0C480,0,384,0,288,0C192,0,96,0,48,0L0,0Z"
          ></path>
        </svg>
      </div>
      <div className="container">
        <div className="row g-4">
          <div className="col-lg-4">
            <div className="footer-about">
              <img
                src="images/logo.svg"
                alt="شعار المنصة"
                className="footer-logo"
              />
              <p>
                منصة متخصصة في توفير خدمات العمالة المنزلية بطريقة آمنة وموثوقة
              </p>
              <div className="social-links">
                <a href="#" className="social-link">
                  <FaFacebookF />
                </a>
                <a href="#" className="social-link">
                  <FaTwitter />
                </a>
                <a href="#" className="social-link">
                  <FaInstagram />
                </a>
                <a href="#" className="social-link">
                  <FaLinkedinIn />
                </a>
              </div>
            </div>
          </div>

          <div className="col-lg-2">
            <h4>روابط سريعة</h4>
            <ul className="footer-links">
              <li>
                <a href="./index.html">الرئيسية</a>
              </li>
              <li>
                <a href="index.html#services">خدماتنا</a>
              </li>
              <li>
                <a href="#about">عن المنصة</a>
              </li>
              <li>
                <a href="#contact">اتصل بنا</a>
              </li>
            </ul>
          </div>

          <div className="col-lg-3">
            <h4>خدمات المنصة</h4>
            <ul className="footer-links">
              <li>
                <a href="#">سائق خاص</a>
              </li>
              <li>
                <a href="#">عاملة منزلية</a>
              </li>
              <li>
                <a href="#">طباخ/طباخة</a>
              </li>
              <li>
                <a href="#">مربية أطفال</a>
              </li>
            </ul>
          </div>

          <div className="col-lg-3">
            <h4>تواصل معنا</h4>
            <ul className="footer-contact">
              <li>
                <FaMapMarkerAlt />
                <span>الرياض، المملكة العربية السعودية</span>
              </li>
              <li>
                <FaPhone />
                <span>+966 50 123 4567</span>
              </li>
              <li>
                <FaEnvelope />
                <span>info@example.com</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="footer-bottom">
          <div className="row">
            <div className="col-md-6">
              <p className="copyright">
                جميع الحقوق محفوظة &copy; 2024 منصة خدمات العمالة
              </p>
            </div>
            <div className="col-md-6">
              <ul className="footer-bottom-links">
                <li>
                  <a href="#">سياسة الخصوصية</a>
                </li>
                <li>
                  <a href="#">الشروط والأحكام</a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;