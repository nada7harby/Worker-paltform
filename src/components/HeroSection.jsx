import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import "../assets/css/Home.css";

const HeroSection = () => {
  useEffect(() => {
    const carouselElement = document.getElementById("homeCarousel");
    if (carouselElement) {
      const carousel = new window.bootstrap.Carousel(carouselElement, {
        interval: 3000,
        pause: false,
      });
      carousel.cycle();

      const toggleButton = document.querySelector("button.toggle-player");
      if (toggleButton) {
        toggleButton.addEventListener("click", (event) => {
          const button = event.currentTarget;
          button.classList.toggle("toggle-player_play");
          button.classList.toggle("toggle-player_pause");

          if (button.classList.contains("toggle-player_pause")) {
            carousel.pause();
            button.setAttribute("aria-pressed", "true");
            button.querySelector(".pause-img").classList.add("d-none");
            button.querySelector(".play-img").classList.remove("d-none");
          } else {
            carousel.cycle();
            button.setAttribute("aria-pressed", "false");
            button.querySelector(".pause-img").classList.remove("d-none");
            button.querySelector(".play-img").classList.add("d-none");
          }
        });
      }
    }
  }, []);

  return (
    <div id="homeCarousel" className="carousel slide carousel-fade border-0 rounded-0 mb-5">
      <div className="carousel-inner rounded-0 h-400px h-md-440px overflow-hidden" role="region" aria-label="جديد إحسان">
        <h2 className="visually-hidden">جديد إحسان</h2>
        <div className="carousel-indicators align-items-center">
          {[0, 1, 2, 3, 4].map((index) => (
            <button
              key={index}
              type="button"
              data-bs-target="#homeCarousel"
              data-bs-slide-to={index}
              className={`carousel-indicators_item h-9px rounded-0 w-18px border-0 ${index === 0 ? 'active' : ''}`}
              aria-current={index === 0 ? "true" : "false"}
              aria-label={`الانتقال إلى الشريحة رقم ${index + 1}`}
            />
          ))}
        </div>
        <div className="align-items-center carousel-item d-flex h-100 active" role="region" aria-roledescription="شريحة" aria-label="أخرج زكاة مالك">
          <img
            className="h-100 w-100"
            src="images/worker2.jpg"
            alt="أخرج زكاة مالك"
          />
          <div className="carousel-content position-absolute text-center w-sm-100 bottom-sm-0 text-md-start bottom-60px translate-middle-y mx-auto ms-md-5" style={{ color: "#003f6a" }}>
            <h1 aria-level={3} className="text-center fs-28px font-ehsan-bold text-md-start">أخرج زكاة مالك</h1>
            <p className="fs-18px font-ehsan-regular">بيسر وفي ثوانٍ</p>
            <a href="https://ehsan.sa/zakat/zakat" className="btn fs-16px" style={{ color: "#ffffff", background: "#004274 !important" }}>أخرجها الآن</a>
          </div>
        </div>
        <div className="align-items-center carousel-item d-flex h-100" role="region" aria-roledescription="شريحة" aria-label="بكريم عطائك">
          <img
            className="h-100 w-100"
            src="images/worker2.jpg"
            alt="بكريم عطائك"
          />
          <div className="carousel-content position-absolute text-center w-sm-100 bottom-sm-0 text-md-start bottom-60px translate-middle-y mx-auto ms-md-5" style={{ color: "#ffffff" }}>
            <h1 aria-level={3} className="text-center fs-28px font-ehsan-bold text-md-start">بكريم عطائك</h1>
            <p className="fs-18px font-ehsan-regular">تحيي أملاً وتفرج هماً</p>
            <a href="https://ehsan.sa/projects" className="btn fs-16px" style={{ color: "#018c72", background: "#ffffff !important" }}>تبرع الآن</a>
          </div>
        </div>
        <div className="align-items-center carousel-item d-flex h-100" role="region" aria-roledescription="شريحة" aria-label="عطاء جزيل وثواب عظيم">
          <img
            className="h-100 w-100"
            src="images/worker2.jpg"
            alt="عطاء جزيل وثواب عظيم"
          />
          <div className="carousel-content position-absolute text-center w-sm-100 bottom-sm-0 text-md-start bottom-60px translate-middle-y mx-auto ms-md-5" style={{ color: "#ffffff" }}>
            <h1 aria-level={3} className="text-center fs-28px font-ehsan-bold text-md-start">عطاء جزيل وثواب عظيم</h1>
            <p className="fs-18px font-ehsan-regular">عبر فرص العناية بالمساجد</p>
            <a href="https://ehsan.sa/mosques" className="btn fs-16px" style={{ color: "#003f6a", background: "#ffffff !important" }}>تبرع الآن</a>
          </div>
        </div>
        <div className="align-items-center carousel-item d-flex h-100" role="region" aria-roledescription="شريحة" aria-label="التبرع الدوري">
          <img
            className="h-100 w-100"
            src="images/worker2.jpg"
            alt="التبرع الدوري"
          />
          <div className="carousel-content position-absolute text-center w-sm-100 bottom-sm-0 text-md-start bottom-60px translate-middle-y mx-auto ms-md-5" style={{ color: "#ffffff" }}>
            <h1 aria-level={3} className="text-center fs-28px font-ehsan-bold text-md-start">التبرع الدوري</h1>
            <p className="fs-18px font-ehsan-regular">أجر وعون للمتعفيين</p>
            <a href="https://ehsan.sa/periodicdonation" className="btn fs-16px" style={{ color: "#ffffff", background: "#003f6a !important" }}>اشترك الآن</a>
          </div>
        </div>
        <div className="align-items-center carousel-item d-flex h-100" role="region" aria-roledescription="شريحة" aria-label="خدمة الحملات">
          <img
            className="h-100 w-100"
            src="https://ehsanbaner.s3.me-south-1.amazonaws.com/CAMPAIGN2web+copy.png"
            alt="خدمة الحملات"
          />
          <div className="carousel-content position-absolute text-center w-sm-100 bottom-sm-0 text-md-start bottom-60px translate-middle-y mx-auto ms-md-5" style={{ color: "#003c6f" }}>
            <h1 aria-level={3} className="text-center fs-28px font-ehsan-bold text-md-start">خدمة الحملات</h1>
            <p className="fs-18px font-ehsan-regular">للمساهمة في جمع التبرعات</p>
            <a href="https://ehsan.sa/donationcampaign" className="btn fs-16px" style={{ color: "#c8dae6", background: "#004274 !important" }}>أنشئ حملتك</a>
          </div>
        </div>
      </div>
      <div className="top-sm-20px bottom-md-20px d-flex end-30px end-md-50px justify-content-between position-absolute z-index-1070">
        <button
          className="border carousel-control-prev d-md-flex h-40px w-40px p-1 border-white-opacity-4 align-items-center justify-content-center rounded-2 me-2"
          type="button"
          data-bs-target="#homeCarousel"
          data-bs-slide="prev"
        >
          <span className="carousel-control-next-icon icon-white w-20px" aria-hidden="true" />
          <span className="visually-hidden">الشريحة السابقة</span>
        </button>
        <button
          type="button"
          className="border-white-opacity-4 btn btn-outline-light h-40px w-40px d-flex align-items-center justify-content-center z-1 rounded-2 toggle-player toggle-player_play"
          aria-pressed="false"
          aria-label="إيقاف حركة الشرائح"
        >
          <img className="pause-img" src="/ehsan-ui/images/icons/pause-icon.svg" alt="إيقاف" />
          <svg
            className="d-none play-img icon-white"
            xmlns="http://www.w3.org/2000/svg"
            width={16}
            height={18}
            viewBox="0 0 16 18"
            fill="none"
          >
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M9.852 3.28676L9.94054 3.33706C11.5735 4.26475 12.8567 4.99375 13.7709 5.66154C14.6913 6.33392 15.3721 7.0367 15.6159 7.96321C15.7947 8.64269 15.7947 9.35743 15.6159 10.0369C15.3721 10.9634 14.6913 11.6662 13.7709 12.3386C12.8567 13.0064 11.5735 13.7354 9.94058 14.663L9.852 14.7134C8.27461 15.6095 7.03303 16.3149 6.02322 16.7444C5.0053 17.1774 4.07729 17.3968 3.17536 17.1412C2.51252 16.9534 1.90941 16.5969 1.42356 16.1067C0.764188 15.4414 0.49951 14.522 0.374288 13.4154C0.249982 12.317 0.24999 10.879 0.25 9.05016V8.94997C0.24999 7.12109 0.249982 5.68315 0.374288 4.5847C0.49951 3.47816 0.764188 2.55867 1.42356 1.89341C1.90941 1.40323 2.51252 1.04672 3.17536 0.858895C4.07729 0.603311 5.0053 0.822753 6.02322 1.25571C7.03303 1.68522 8.27461 2.3906 9.852 3.28676ZM5.43611 2.63604C4.51385 2.24377 3.98374 2.18888 3.58431 2.30207C3.17108 2.41917 2.79377 2.64179 2.48892 2.94935C2.19206 3.24887 1.97861 3.74743 1.86477 4.75337C1.75115 5.75741 1.75 7.1102 1.75 9.00006C1.75 10.8899 1.75115 12.2427 1.86477 13.2467C1.97861 14.2527 2.19206 14.7513 2.48892 15.0508C2.79377 15.3583 3.17108 15.581 3.58431 15.6981C3.98374 15.8112 4.51385 15.7564 5.43611 15.3641C6.35708 14.9724 7.524 14.3108 9.15527 13.384C10.8421 12.4257 12.0497 11.7383 12.8861 11.1273C13.7244 10.5149 14.0557 10.0717 14.1653 9.65515C14.2782 9.22592 14.2782 8.7742 14.1653 8.34497C14.0557 7.92845 13.7244 7.4852 12.8861 6.8728C12.0497 6.26183 10.8421 5.57445 9.15527 4.6161C7.524 3.68934 6.35708 3.02776 5.43611 2.63604Z"
              fill="#161616"
            />
          </svg>
        </button>
        <button
          className="carousel-control-next border d-md-flex h-40px w-40px border-white-opacity-4 align-items-center justify-content-center rounded-2 ms-2"
          type="button"
          data-bs-target="#homeCarousel"
          data-bs-slide="next"
        >
          <span className="carousel-control-prev-icon icon-white w-20px" aria-hidden="true" />
          <span className="visually-hidden">الشريحة التالية</span>
        </button>
      </div>
    </div>
  );
};

export default HeroSection;