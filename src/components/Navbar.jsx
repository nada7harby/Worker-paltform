import React, { useState } from "react";
import { NavLink } from "react-router-dom";

import "../assets/css/Home.css";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleNavbar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-white fixed-top">
      <div className="container">
        <NavLink className="navbar-brand" to="/">
          <img src="images/logo.svg" alt="شعار المنصة" height={40} />
        </NavLink>
        <button
          className="navbar-toggler"
          type="button"
          onClick={toggleNavbar}
        >
          <span className="navbar-toggler-icon" />
        </button>
        <div
          className={`collapse navbar-collapse ${isOpen ? "show" : ""}`}
          id="navbarNav"
        >
          <ul className="navbar-nav me-auto">
            <li className="nav-item">
              <NavLink className="nav-link" to="/" activeClassName="active" exact>
                الرئيسية
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to="/services" activeClassName="active">
                خدماتنا
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to="/workers" activeClassName="active">
                العمالة
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to="/about" activeClassName="active">
                عن المنصة
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to="/contact-us" activeClassName="active">
                اتصل بنا
              </NavLink>
            </li>
          </ul>
          <div className="nav-buttons">
            <NavLink
              to="/client-dashboard"
              className="btn btn-outline-primary me-2"
            >
                 <i className="fas fa-tachometer-alt" />  لوحة التحكم
            </NavLink>
            <NavLink to="/login" className="btn btn-outline-primary me-2">
              تسجيل الدخول
            </NavLink>
            <NavLink to="/register" className="btn btn-primary">
              إنشاء حساب
            </NavLink>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;