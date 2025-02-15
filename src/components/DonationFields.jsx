import React from "react";
import "../assets/css/style.css"; // تأكد من استيراد ملف CSS

const DonationFields = () => {
  return (
    <section className="my-80px container" id="donations-feilds">
      <h1
        data-aos="fade-up"
        data-aos-duration={2000}
        className="fs-28px fs-sm-22px text-center text-secondary mb-0"
      >
      
        المهن المتاحه{" "}
      </h1>
      <p
        data-aos="fade-up"
        data-aos-duration={2000}
        className="font-ehsan-regular fs-18px mt-1 text-center text-neutral-5"
      >
        استكشف الان واستقدم المناسب لك{" "}
      </p>
      <div className="row justify-content-center">
        <div
          data-aos="fade-up"
          data-aos-duration={2000}
          className="col-11 col-md-3"
        >
          <div
            className="d-flex position-relative justify-content-between align-items-end h-200px justify-content-end px-2 rounded-4 mb-3 bg-size-cover text-white"
            style={{
              backgroundImage: "url(images/img1.jpg)",
            }}
          >
            <div className="align-items-center d-flex justify-content-between w-100 mb-2 mb-md-0">
              <div className="d-flex flex-column">
                <h5 className="fs-20px mb-0 mb-md-2"> سائق خاص</h5>
                <p className="fs-14px font-ehsan-regular d-none d-md-block"></p>
              </div>
              <a
                href="Home/Zakat"
                className="btn bg-white-opacity-30 pt-0 px-3"
              >
                <svg
                  className="icon-white"
                  xmlns="http://www.w3.org/2000/svg"
                  width={6}
                  height={10}
                  viewBox="0 0 6 10"
                  fill="none"
                >
                  <path
                    d="M5.29648 1.41249C5.18889 1.49375 4.86773 1.73635 4.68259 1.88084C4.31178 2.17022 3.81906 2.56562 3.32779 2.99216C2.83405 3.42086 2.35319 3.8712 1.99969 4.27127C1.82244 4.47188 1.68775 4.6481 1.60008 4.79352C1.51763 4.93029 1.50049 5.01108 1.50049 5.01108C1.50049 5.01108 1.51764 5.0895 1.60008 5.22626C1.68775 5.37168 1.82243 5.5479 1.99969 5.74851C2.35318 6.14858 2.83405 6.59893 3.3278 7.02762C3.81907 7.45416 4.3118 7.84956 4.68261 8.13895C4.86776 8.28343 5.18846 8.5257 5.29605 8.60696C5.5184 8.77071 5.56635 9.08405 5.4026 9.3064C5.23884 9.52874 4.92584 9.57624 4.7035 9.41249L4.70194 9.41131C4.58923 9.32619 4.25637 9.07478 4.06739 8.92729C3.6882 8.63138 3.18093 8.22442 2.67219 7.78272C2.16594 7.34317 1.64681 6.85939 1.25031 6.41065C1.05256 6.18685 0.874748 5.95999 0.743664 5.74254C0.620854 5.53883 0.499998 5.2809 0.5 5.00989C0.500002 4.73888 0.620858 4.48096 0.743668 4.27724C0.874752 4.0598 1.05256 3.83294 1.25031 3.60914C1.64681 3.16039 2.16594 2.67661 2.67218 2.23706C3.18091 1.79536 3.68818 1.38841 4.06736 1.09249C4.25641 0.944952 4.58914 0.693636 4.70172 0.608606L4.70314 0.60753C4.92549 0.443773 5.23881 0.491037 5.40257 0.713384C5.56632 0.935725 5.51881 1.24873 5.29648 1.41249Z"
                    fill="white"
                  />
                </svg>
              </a>
            </div>
          </div>
        </div>
        <div
          data-aos="fade-up"
          data-aos-duration={2000}
          className="col-11 col-md-3"
        >
          <div
            className="d-flex justify-content-between align-items-end h-200px justify-content-end px-2 rounded-4 mb-3 bg-size-cover text-white"
            style={{
              backgroundImage: "url(images/img3.jpg)",
            }}
          >
            <div className="align-items-center d-flex justify-content-between w-100 mb-2 mb-md-0">
              <div className="d-flex flex-column">
                <h5 className="fs-20px mb-0 mb-md-2"> مربية اطفال</h5>
                <p className="fs-14px font-ehsan-regular d-none d-md-block"></p>
              </div>
              <a href="/Orphans" className="btn bg-white-opacity-30 pt-0 px-3">
                <svg
                  className="icon-white"
                  xmlns="http://www.w3.org/2000/svg"
                  width={6}
                  height={10}
                  viewBox="0 0 6 10"
                  fill="none"
                >
                  <path
                    d="M5.29648 1.41249C5.18889 1.49375 4.86773 1.73635 4.68259 1.88084C4.31178 2.17022 3.81906 2.56562 3.32779 2.99216C2.83405 3.42086 2.35319 3.8712 1.99969 4.27127C1.82244 4.47188 1.68775 4.6481 1.60008 4.79352C1.51763 4.93029 1.50049 5.01108 1.50049 5.01108C1.50049 5.01108 1.51764 5.0895 1.60008 5.22626C1.68775 5.37168 1.82243 5.5479 1.99969 5.74851C2.35318 6.14858 2.83405 6.59893 3.3278 7.02762C3.81907 7.45416 4.3118 7.84956 4.68261 8.13895C4.86776 8.28343 5.18846 8.5257 5.29605 8.60696C5.5184 8.77071 5.56635 9.08405 5.4026 9.3064C5.23884 9.52874 4.92584 9.57624 4.7035 9.41249L4.70194 9.41131C4.58923 9.32619 4.25637 9.07478 4.06739 8.92729C3.6882 8.63138 3.18093 8.22442 2.67219 7.78272C2.16594 7.34317 1.64681 6.85939 1.25031 6.41065C1.05256 6.18685 0.874748 5.95999 0.743664 5.74254C0.620854 5.53883 0.499998 5.2809 0.5 5.00989C0.500002 4.73888 0.620858 4.48096 0.743668 4.27724C0.874752 4.0598 1.05256 3.83294 1.25031 3.60914C1.64681 3.16039 2.16594 2.67661 2.67218 2.23706C3.18091 1.79536 3.68818 1.38841 4.06736 1.09249C4.25641 0.944952 4.58914 0.693636 4.70172 0.608606L4.70314 0.60753C4.92549 0.443773 5.23881 0.491037 5.40257 0.713384C5.56632 0.935725 5.51881 1.24873 5.29648 1.41249Z"
                    fill="white"
                  />
                </svg>
              </a>
            </div>
          </div>
        </div>
        <div
          data-aos="fade-up"
          data-aos-duration={2000}
          className="col-11 col-md-3"
        >
          <div
            className="d-flex justify-content-between align-items-end h-200px justify-content-end px-2 rounded-4 mb-3 bg-size-cover text-white"
            style={{
              backgroundImage: "url(images/img2.jpg)",
            }}
          >
            <div className="align-items-center d-flex justify-content-between w-100 mb-2 mb-md-0">
              <div className="d-flex flex-column">
                <h5 className="fs-20px mb-0 mb-md-2"> ممرضه</h5>
                <p className="fs-14px font-ehsan-regular d-none d-md-block"></p>
              </div>
              <a
                href="/tyassarat/judicialbills"
                className="btn bg-white-opacity-30 pt-0 px-3"
              >
                <svg
                  className="icon-white"
                  xmlns="http://www.w3.org/2000/svg"
                  width={6}
                  height={10}
                  viewBox="0 0 6 10"
                  fill="none"
                >
                  <path
                    d="M5.29648 1.41249C5.18889 1.49375 4.86773 1.73635 4.68259 1.88084C4.31178 2.17022 3.81906 2.56562 3.32779 2.99216C2.83405 3.42086 2.35319 3.8712 1.99969 4.27127C1.82244 4.47188 1.68775 4.6481 1.60008 4.79352C1.51763 4.93029 1.50049 5.01108 1.50049 5.01108C1.50049 5.01108 1.51764 5.0895 1.60008 5.22626C1.68775 5.37168 1.82243 5.5479 1.99969 5.74851C2.35318 6.14858 2.83405 6.59893 3.3278 7.02762C3.81907 7.45416 4.3118 7.84956 4.68261 8.13895C4.86776 8.28343 5.18846 8.5257 5.29605 8.60696C5.5184 8.77071 5.56635 9.08405 5.4026 9.3064C5.23884 9.52874 4.92584 9.57624 4.7035 9.41249L4.70194 9.41131C4.58923 9.32619 4.25637 9.07478 4.06739 8.92729C3.6882 8.63138 3.18093 8.22442 2.67219 7.78272C2.16594 7.34317 1.64681 6.85939 1.25031 6.41065C1.05256 6.18685 0.874748 5.95999 0.743664 5.74254C0.620854 5.53883 0.499998 5.2809 0.5 5.00989C0.500002 4.73888 0.620858 4.48096 0.743668 4.27724C0.874752 4.0598 1.05256 3.83294 1.25031 3.60914C1.64681 3.16039 2.16594 2.67661 2.67218 2.23706C3.18091 1.79536 3.68818 1.38841 4.06736 1.09249C4.25641 0.944952 4.58914 0.693636 4.70172 0.608606L4.70314 0.60753C4.92549 0.443773 5.23881 0.491037 5.40257 0.713384C5.56632 0.935725 5.51881 1.24873 5.29648 1.41249Z"
                    fill="white"
                  />
                </svg>
              </a>
            </div>
          </div>
        </div>
        <div
          data-aos="fade-up"
          data-aos-duration={2000}
          className="col-11 col-md-3"
        >
          <div
            className="d-flex justify-content-between align-items-end h-200px justify-content-end px-2 rounded-4 mb-3 bg-size-cover text-white"
            style={{
              backgroundImage: "url(images/img4.jpg)",
            }}
          >
            <div className="align-items-center d-flex justify-content-between w-100 mb-2 mb-md-0">
              <div className="d-flex flex-column">
                <h5 className="fs-20px mb-0 mb-md-2"> طباخ </h5>
                <p className="fs-14px font-ehsan-regular d-none d-md-block"></p>
              </div>
              <a
                href="/projects?projectType=Health"
                className="btn bg-white-opacity-30 pt-0 px-3"
              >
                <svg
                  className="icon-white"
                  xmlns="http://www.w3.org/2000/svg"
                  width={6}
                  height={10}
                  viewBox="0 0 6 10"
                  fill="none"
                >
                  <path
                    d="M5.29648 1.41249C5.18889 1.49375 4.86773 1.73635 4.68259 1.88084C4.31178 2.17022 3.81906 2.56562 3.32779 2.99216C2.83405 3.42086 2.35319 3.8712 1.99969 4.27127C1.82244 4.47188 1.68775 4.6481 1.60008 4.79352C1.51763 4.93029 1.50049 5.01108 1.50049 5.01108C1.50049 5.01108 1.51764 5.0895 1.60008 5.22626C1.68775 5.37168 1.82243 5.5479 1.99969 5.74851C2.35318 6.14858 2.83405 6.59893 3.3278 7.02762C3.81907 7.45416 4.3118 7.84956 4.68261 8.13895C4.86776 8.28343 5.18846 8.5257 5.29605 8.60696C5.5184 8.77071 5.56635 9.08405 5.4026 9.3064C5.23884 9.52874 4.92584 9.57624 4.7035 9.41249L4.70194 9.41131C4.58923 9.32619 4.25637 9.07478 4.06739 8.92729C3.6882 8.63138 3.18093 8.22442 2.67219 7.78272C2.16594 7.34317 1.64681 6.85939 1.25031 6.41065C1.05256 6.18685 0.874748 5.95999 0.743664 5.74254C0.620854 5.53883 0.499998 5.2809 0.5 5.00989C0.500002 4.73888 0.620858 4.48096 0.743668 4.27724C0.874752 4.0598 1.05256 3.83294 1.25031 3.60914C1.64681 3.16039 2.16594 2.67661 2.67218 2.23706C3.18091 1.79536 3.68818 1.38841 4.06736 1.09249C4.25641 0.944952 4.58914 0.693636 4.70172 0.608606L4.70314 0.60753C4.92549 0.443773 5.23881 0.491037 5.40257 0.713384C5.56632 0.935725 5.51881 1.24873 5.29648 1.41249Z"
                    fill="white"
                  />
                </svg>
              </a>
            </div>
          </div>
        </div>
        <div
          data-aos="fade-up"
          data-aos-duration={2000}
          className="col-11 col-md-3"
        >
          <div
            className="d-flex justify-content-between align-items-end h-200px justify-content-end px-2 rounded-4 mb-3 bg-size-cover text-white"
            style={{
              backgroundImage: "url(images/worker2.jpg)",
            }}
          >
            <div className="align-items-center d-flex justify-content-between w-100 mb-2 mb-md-0">
              <div className="d-flex flex-column">
                <h5 className="fs-20px mb-0 mb-md-2"> عامل</h5>
                <p className="fs-14px font-ehsan-regular d-none d-md-block"></p>
              </div>
              <a
                href="/projects?projectType=Feeding"
                className="btn bg-white-opacity-30 pt-0 px-3"
              >
                <svg
                  className="icon-white"
                  xmlns="http://www.w3.org/2000/svg"
                  width={6}
                  height={10}
                  viewBox="0 0 6 10"
                  fill="none"
                >
                  <path
                    d="M5.29648 1.41249C5.18889 1.49375 4.86773 1.73635 4.68259 1.88084C4.31178 2.17022 3.81906 2.56562 3.32779 2.99216C2.83405 3.42086 2.35319 3.8712 1.99969 4.27127C1.82244 4.47188 1.68775 4.6481 1.60008 4.79352C1.51763 4.93029 1.50049 5.01108 1.50049 5.01108C1.50049 5.01108 1.51764 5.0895 1.60008 5.22626C1.68775 5.37168 1.82243 5.5479 1.99969 5.74851C2.35318 6.14858 2.83405 6.59893 3.3278 7.02762C3.81907 7.45416 4.3118 7.84956 4.68261 8.13895C4.86776 8.28343 5.18846 8.5257 5.29605 8.60696C5.5184 8.77071 5.56635 9.08405 5.4026 9.3064C5.23884 9.52874 4.92584 9.57624 4.7035 9.41249L4.70194 9.41131C4.58923 9.32619 4.25637 9.07478 4.06739 8.92729C3.6882 8.63138 3.18093 8.22442 2.67219 7.78272C2.16594 7.34317 1.64681 6.85939 1.25031 6.41065C1.05256 6.18685 0.874748 5.95999 0.743664 5.74254C0.620854 5.53883 0.499998 5.2809 0.5 5.00989C0.500002 4.73888 0.620858 4.48096 0.743668 4.27724C0.874752 4.0598 1.05256 3.83294 1.25031 3.60914C1.64681 3.16039 2.16594 2.67661 2.67218 2.23706C3.18091 1.79536 3.68818 1.38841 4.06736 1.09249C4.25641 0.944952 4.58914 0.693636 4.70172 0.608606L4.70314 0.60753C4.92549 0.443773 5.23881 0.491037 5.40257 0.713384C5.56632 0.935725 5.51881 1.24873 5.29648 1.41249Z"
                    fill="white"
                  />
                </svg>
              </a>
            </div>
          </div>
        </div>
        <div
          data-aos="fade-up"
          data-aos-duration={2000}
          className="col-11 col-md-3"
        >
          <div
            className="d-flex justify-content-between align-items-end h-200px justify-content-end px-2 rounded-4 mb-3 bg-size-cover text-white"
            style={{
              backgroundImage: "url(images/worker2.jpg)",
            }}
          >
            <div className="align-items-center d-flex justify-content-between w-100 mb-2 mb-md-0">
              <div className="d-flex flex-column">
                <h5 className="fs-20px mb-0 mb-md-2"> دكتور</h5>
                <p className="fs-14px font-ehsan-regular d-none d-md-block"></p>
              </div>
              <a href="/forijat" className="btn bg-white-opacity-30 pt-0 px-3">
                <svg
                  className="icon-white"
                  xmlns="http://www.w3.org/2000/svg"
                  width={6}
                  height={10}
                  viewBox="0 0 6 10"
                  fill="none"
                >
                  <path
                    d="M5.29648 1.41249C5.18889 1.49375 4.86773 1.73635 4.68259 1.88084C4.31178 2.17022 3.81906 2.56562 3.32779 2.99216C2.83405 3.42086 2.35319 3.8712 1.99969 4.27127C1.82244 4.47188 1.68775 4.6481 1.60008 4.79352C1.51763 4.93029 1.50049 5.01108 1.50049 5.01108C1.50049 5.01108 1.51764 5.0895 1.60008 5.22626C1.68775 5.37168 1.82243 5.5479 1.99969 5.74851C2.35318 6.14858 2.83405 6.59893 3.3278 7.02762C3.81907 7.45416 4.3118 7.84956 4.68261 8.13895C4.86776 8.28343 5.18846 8.5257 5.29605 8.60696C5.5184 8.77071 5.56635 9.08405 5.4026 9.3064C5.23884 9.52874 4.92584 9.57624 4.7035 9.41249L4.70194 9.41131C4.58923 9.32619 4.25637 9.07478 4.06739 8.92729C3.6882 8.63138 3.18093 8.22442 2.67219 7.78272C2.16594 7.34317 1.64681 6.85939 1.25031 6.41065C1.05256 6.18685 0.874748 5.95999 0.743664 5.74254C0.620854 5.53883 0.499998 5.2809 0.5 5.00989C0.500002 4.73888 0.620858 4.48096 0.743668 4.27724C0.874752 4.0598 1.05256 3.83294 1.25031 3.60914C1.64681 3.16039 2.16594 2.67661 2.67218 2.23706C3.18091 1.79536 3.68818 1.38841 4.06736 1.09249C4.25641 0.944952 4.58914 0.693636 4.70172 0.608606L4.70314 0.60753C4.92549 0.443773 5.23881 0.491037 5.40257 0.713384C5.56632 0.935725 5.51881 1.24873 5.29648 1.41249Z"
                    fill="white"
                  />
                </svg>
              </a>
            </div>
          </div>
        </div>
        <div
          data-aos="fade-up"
          data-aos-duration={2000}
          className="col-11 col-md-3"
        >
          <div
            className="d-flex justify-content-between align-items-end h-200px justify-content-end px-2 rounded-4 mb-3 bg-size-cover text-white"
            style={{
              backgroundImage: "url(images/worker2.jpg)",
            }}
          >
            <div className="align-items-center d-flex justify-content-between w-100 mb-2 mb-md-0">
              <div className="d-flex flex-column">
                <h5 className="fs-20px mb-0 mb-md-2">مهندس </h5>
                <p className="fs-14px font-ehsan-regular d-none d-md-block"></p>
              </div>
              <a href="/housing" className="btn bg-white-opacity-30 pt-0 px-3">
                <svg
                  className="icon-white"
                  xmlns="http://www.w3.org/2000/svg"
                  width={6}
                  height={10}
                  viewBox="0 0 6 10"
                  fill="none"
                >
                  <path
                    d="M5.29648 1.41249C5.18889 1.49375 4.86773 1.73635 4.68259 1.88084C4.31178 2.17022 3.81906 2.56562 3.32779 2.99216C2.83405 3.42086 2.35319 3.8712 1.99969 4.27127C1.82244 4.47188 1.68775 4.6481 1.60008 4.79352C1.51763 4.93029 1.50049 5.01108 1.50049 5.01108C1.50049 5.01108 1.51764 5.0895 1.60008 5.22626C1.68775 5.37168 1.82243 5.5479 1.99969 5.74851C2.35318 6.14858 2.83405 6.59893 3.3278 7.02762C3.81907 7.45416 4.3118 7.84956 4.68261 8.13895C4.86776 8.28343 5.18846 8.5257 5.29605 8.60696C5.5184 8.77071 5.56635 9.08405 5.4026 9.3064C5.23884 9.52874 4.92584 9.57624 4.7035 9.41249L4.70194 9.41131C4.58923 9.32619 4.25637 9.07478 4.06739 8.92729C3.6882 8.63138 3.18093 8.22442 2.67219 7.78272C2.16594 7.34317 1.64681 6.85939 1.25031 6.41065C1.05256 6.18685 0.874748 5.95999 0.743664 5.74254C0.620854 5.53883 0.499998 5.2809 0.5 5.00989C0.500002 4.73888 0.620858 4.48096 0.743668 4.27724C0.874752 4.0598 1.05256 3.83294 1.25031 3.60914C1.64681 3.16039 2.16594 2.67661 2.67218 2.23706C3.18091 1.79536 3.68818 1.38841 4.06736 1.09249C4.25641 0.944952 4.58914 0.693636 4.70172 0.608606L4.70314 0.60753C4.92549 0.443773 5.23881 0.491037 5.40257 0.713384C5.56632 0.935725 5.51881 1.24873 5.29648 1.41249Z"
                    fill="white"
                  />
                </svg>
              </a>
            </div>
          </div>
        </div>
        <div
          data-aos="fade-up"
          data-aos-duration={2000}
          className="col-11 col-md-3"
        >
          <div
            className="d-flex justify-content-between align-items-end h-200px justify-content-end px-2 rounded-4 mb-3 bg-size-cover text-white"
            style={{
              backgroundImage: "url(images/worker2.jpg)",
            }}
          >
            <div className="align-items-center d-flex justify-content-between w-100 mb-2 mb-md-0">
              <div className="d-flex flex-column">
                <h5 className="fs-20px mb-0 mb-md-2"> معلم</h5>
                <p className="fs-14px font-ehsan-regular d-none d-md-block"></p>
              </div>
              <a href="/rescue" className="btn bg-white-opacity-30 pt-0 px-3">
                <svg
                  className="icon-white"
                  xmlns="http://www.w3.org/2000/svg"
                  width={6}
                  height={10}
                  viewBox="0 0 6 10"
                  fill="none"
                >
                  <path
                    d="M5.29648 1.41249C5.18889 1.49375 4.86773 1.73635 4.68259 1.88084C4.31178 2.17022 3.81906 2.56562 3.32779 2.99216C2.83405 3.42086 2.35319 3.8712 1.99969 4.27127C1.82244 4.47188 1.68775 4.6481 1.60008 4.79352C1.51763 4.93029 1.50049 5.01108 1.50049 5.01108C1.50049 5.01108 1.51764 5.0895 1.60008 5.22626C1.68775 5.37168 1.82243 5.5479 1.99969 5.74851C2.35318 6.14858 2.83405 6.59893 3.3278 7.02762C3.81907 7.45416 4.3118 7.84956 4.68261 8.13895C4.86776 8.28343 5.18846 8.5257 5.29605 8.60696C5.5184 8.77071 5.56635 9.08405 5.4026 9.3064C5.23884 9.52874 4.92584 9.57624 4.7035 9.41249L4.70194 9.41131C4.58923 9.32619 4.25637 9.07478 4.06739 8.92729C3.6882 8.63138 3.18093 8.22442 2.67219 7.78272C2.16594 7.34317 1.64681 6.85939 1.25031 6.41065C1.05256 6.18685 0.874748 5.95999 0.743664 5.74254C0.620854 5.53883 0.499998 5.2809 0.5 5.00989C0.500002 4.73888 0.620858 4.48096 0.743668 4.27724C0.874752 4.0598 1.05256 3.83294 1.25031 3.60914C1.64681 3.16039 2.16594 2.67661 2.67218 2.23706C3.18091 1.79536 3.68818 1.38841 4.06736 1.09249C4.25641 0.944952 4.58914 0.693636 4.70172 0.608606L4.70314 0.60753C4.92549 0.443773 5.23881 0.491037 5.40257 0.713384C5.56632 0.935725 5.51881 1.24873 5.29648 1.41249Z"
                    fill="white"
                  />
                </svg>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default DonationFields;
