import React from "react";
import "../assets/css/Header.css"; // استيراد ملف CSS

const Header = () => {
  return (
    <header className="border-bottom h-72px d-flex justify-content-between fixed-top z-index-1070 bg-white sticky-top">
      <nav
        className="navbar flex-fill navbar-expand-lg navbar-light p-0"
        id="navbarMenu"
      >
        <div className="container-fluid d-flex justify-content-start pe-0 ps-0">
          <a
            className="ms-16px ms-md-3 navbar-brand pe-0 d-flex flex-grow-1 flex-lg-grow-0 justify-content-lg-start"
            href="/"
          >
            <img
              loading="lazy"
              src="/ehsan-ui/images/Ehsan-Logo.svg"
              className="h-md-56px h-45px"
              alt="موقع ماهن"
            />
          </a>
          <div
            className="collapse navbar-collapse h-md-70px bg-white"
            id="navbarNavDropdown"
          >
            <ul className="navbar-nav h-100 ps-3 ps-md-5">
              <li className="nav-item active my-2 my-md-0">
                <a
                  className="nav-link py-0 h-100 align-content-around position-relative font-ehsan-semibold d-flex align-items-baseline align-content-md-center align-items-md-center"
                  href="/"
                >
                  الرئيسية
                </a>
              </li>
              <li className="nav-item my-2 my-md-0">
                <a
                  className="nav-link py-0 h-100 align-content-around position-relative font-ehsan-semibold d-flex align-items-baseline align-content-md-center align-items-md-center"
                  href="/waqf"
                >
                  طلب استقدام
                </a>
              </li>
              <li className="nav-item dropdown my-2 my-md-0">
                <a
                  className="nav-link dropdown-toggle py-0 align-content-around h-100 h-sm-30px position-relative font-ehsan-semibold d-flex align-items-center justify-content-between pe-3 pe-md-0"
                  href="#"
                  id="navbarDropdownMenuLink"
                  role="button"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  نقل الخدمات
                </a>
                <div className="dropdown-menu border-0 border-top justify-content-around py-md-4 shadow-sm shadow-sm-none">
                  <ul className="container d-flex list-unstyled flex-wrap">
                    <li className="w-fit-content">
                      <a
                        className="align-items-center d-flex dropdown-item h-40px me-3 w-180px"
                        href="/projects"
                      >
                        المشاريع
                      </a>
                    </li>
                    <li className="w-fit-content">
                      <a
                        className="align-items-center d-flex dropdown-item h-40px me-3 w-180px"
                        href="/tyassarat/judicialbills"
                      >
                        تيسرت
                      </a>
                    </li>
                    <li className="w-fit-content">
                      <a
                        className="align-items-center d-flex dropdown-item h-40px me-3 w-180px"
                        href="/forijat"
                      >
                        فرجت
                      </a>
                    </li>
                    <li className="w-fit-content">
                      <a
                        className="align-items-center d-flex dropdown-item h-40px me-3 w-180px"
                        href="/subsidy"
                      >
                        الكفارات
                      </a>
                    </li>
                    <li className="w-fit-content">
                      <a
                        className="align-items-center d-flex dropdown-item h-40px me-3 w-180px"
                        href="/rescue"
                      >
                        إغاثة
                      </a>
                    </li>
                  </ul>
                </div>
              </li>
              <li className="nav-item dropdown my-2 my-md-0">
                <a
                  className="nav-link dropdown-toggle py-0 align-content-around h-100 h-sm-30px position-relative font-ehsan-semibold d-flex align-items-center justify-content-between pe-3 pe-md-0"
                  href="#"
                  id="navbarDropdownMenuLink"
                  role="button"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  عقود شهرية
                </a>
                <div className="dropdown-menu border-0 border-top justify-content-around py-md-4 shadow-sm shadow-sm-none">
                  <ul className="container d-flex list-unstyled flex-wrap">
                    <li className="mb-0 mb-md-2 w-fit-content">
                      <a
                        className="align-items-center d-flex dropdown-item h-40px me-3 w-180px"
                        href="/blood"
                      >
                        التبرع بالدم
                      </a>
                    </li>
                    <li className="mb-0 mb-md-2 w-fit-content">
                      <a
                        className="align-items-center d-flex dropdown-item h-40px me-3 w-180px"
                        href="/home/gheras"
                      >
                        غراس
                      </a>
                    </li>
                    <li className="mb-0 mb-md-2 w-fit-content">
                      <a
                        className="align-items-center d-flex dropdown-item h-40px me-3 w-180px"
                        href="/zakat"
                      >
                        الزكاة
                      </a>
                    </li>
                    <li className="mb-0 mb-md-2 w-fit-content">
                      <a
                        className="align-items-center d-flex dropdown-item h-40px me-3 w-180px"
                        href="/gift"
                      >
                        هدية
                      </a>
                    </li>
                    <li className="mb-0 mb-md-2 w-fit-content">
                      <a
                        className="align-items-center d-flex dropdown-item h-40px me-3 w-180px"
                        href="/adahi"
                      >
                        الأضاحي
                      </a>
                    </li>
                    <li className="mb-0 mb-md-2 w-fit-content">
                      <a
                        className="align-items-center d-flex dropdown-item h-40px me-3 w-180px"
                        href="/donationcampaign"
                      >
                        الحملات
                      </a>
                    </li>
                    <li className="mb-0 mb-md-2 w-fit-content">
                      <a
                        className="align-items-center d-flex dropdown-item h-40px me-3 w-180px"
                        href="/periodicdonation"
                      >
                        التبرع الدوري
                      </a>
                    </li>
                    <li className="mb-0 mb-md-2 w-fit-content">
                      <a
                        className="align-items-center d-flex dropdown-item h-40px me-3 w-180px"
                        href="/smsdonation"
                      >
                        التبرع بالرسائل
                      </a>
                    </li>
                    <li className="mb-0 mb-md-2 w-fit-content">
                      <a
                        className="align-items-center d-flex dropdown-item h-40px me-3 w-180px"
                        href="/stockspurification"
                      >
                        تطهير الأسهم
                      </a>
                    </li>
                  </ul>
                </div>
              </li>
              <li className="nav-item dropdown my-2 my-md-0">
                <a
                  className="nav-link dropdown-toggle py-0 align-content-around h-100 h-sm-30px position-relative font-ehsan-semibold d-flex align-items-center justify-content-between pe-3 pe-md-0"
                  href="#"
                  id="navbarDropdownMenuLink"
                  role="button"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  عقود بالساعة
                </a>
                <div className="dropdown-menu border-0 border-top justify-content-around py-md-4 shadow-sm shadow-sm-none">
                  <ul className="container d-flex list-unstyled flex-wrap">
                    <li className="w-fit-content">
                      <a
                        className="align-items-center d-flex dropdown-item h-40px me-3 w-180px"
                        href="/home/about"
                      >
                        من نحن
                      </a>
                    </li>
                    <li className="w-fit-content">
                      <a
                        className="align-items-center d-flex dropdown-item h-40px me-3 w-180px"
                        href="/committee"
                      >
                        اللجان
                      </a>
                    </li>
                  </ul>
                </div>
              </li>
            </ul>
          </div>
        </div>
        <a
          className="btn btn-primary d-flex align-items-center text-nowrap m-2 "
          href="/auth/login"
        >
          <i className="fa-solid fa-user"></i>{" "}
          <span className="fs-14px">تسجيل الدخول</span>
        </a>
      </nav>
    </header>
  );
};

export default Header;
