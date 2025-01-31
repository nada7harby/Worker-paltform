import React from "react";
import { Link } from "react-router-dom";
import "../assets/css/Home.css";

const Navbar = () => {
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-white fixed-top">
      <div className="container">
        <a className="navbar-brand" href="index.html">
          <img src="images/logo.svg" alt="شعار المنصة" height={40} />
        </a>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
        >
          <span className="navbar-toggler-icon" />
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav me-auto">
            <li className="nav-item">
              <a className="nav-link " href="./index.html">
                الرئيسية
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="index.html#services">
                خدماتنا
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="./workers.html">
                العمالة
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="./about.html">
                عن المنصة
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="./Contact-Us.html">
                اتصل بنا
              </a>
            </li>
          </ul>
          <div className="nav-buttons">
            {/* إضافة أيقونة لوحة التحكم */}
            <a
              href="./client-dashboard.html"
              className="btn btn-outline-primary me-2"
            >
              <i className="fas fa-tachometer-alt" /> لوحة التحكم
            </a>
            <a href="./login.html" className="btn btn-outline-primary me-2">
              تسجيل الدخول
            </a>
            <a href="./register.html" className="btn btn-primary">
              إنشاء حساب
            </a>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
