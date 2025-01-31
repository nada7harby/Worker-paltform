import React from 'react';
import { Link } from 'react-router';
import "../assets/css/Home.css"
const HeroSection = () => {
  return (
    <section className="hero-section" id="home">
      <div className="hero-waves">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320">
          <path
            fill="#ffffff"
            fillOpacity="1"
            d="M0,96L48,112C96,128,192,160,288,160C384,160,480,128,576,112C672,96,768,96,864,112C960,128,1056,160,1152,160C1248,160,1344,128,1392,112L1440,96L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
          ></path>
        </svg>
      </div>
      <div className="container">
        <div className="row align-items-center">
          <div className="col-lg-6" data-aos="fade-up">
            <h1 className="hero-title">
              ابحث عن <span className="text-primary">العمالة المنزلية</span>
              بكل سهولة وأمان
            </h1>
            <p className="hero-subtitle">
              نوفر لك أفضل العمالة المنزلية المدربة والموثوقة مع ضمان حقوق جميع
              الأطراف
            </p>
            <div className="hero-search">
              <form className="search-form">
                <div className="row g-2">
                  <div className="col-md-5">
                    <select className="form-select">
                      <option selected>نوع الخدمة</option>
                      <option>سائق خاص</option>
                      <option>عاملة منزلية</option>
                      <option>طباخ/طباخة</option>
                      <option>مربية أطفال</option>
                    </select>
                  </div>
                  <div className="col-md-5">
                    <select className="form-select">
                      <option selected>الجنسية</option>
                      <option>الفلبين</option>
                      <option>الهند</option>
                      <option>مصر</option>
                      <option>أوغندا</option>
                    </select>
                  </div>
                  <div className="col-md-2">
                    <Link to="/workers" className="btn btn-primary w-100">
                      <i className="fas fa-search"></i>
                    </Link>
                  </div>
                </div>
              </form>
            </div>
          </div>
          <div className="col-lg-6" data-aos="fade-left">
            <img
              src="/images/At the office-pana.png"
              alt="صورة توضيحية"
              className="hero-image"
              style={{ width: '83%' }}
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;