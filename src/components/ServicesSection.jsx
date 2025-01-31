import React from "react";
import "../assets/css/Home.css";

const ServicesSection = () => {
  return (
    <section className="services-section" id="services">
      <div className="container">
        <div className="section-header text-center" data-aos="fade-up">
          <h2>خدماتنا</h2>
          <p>نقدم مجموعة متنوعة من الخدمات المنزلية لتلبية احتياجاتك</p>
        </div>

        <div className="row g-4">
          {/* Service Card 1 */}
          <div
            className="col-md-6 col-lg-3"
            data-aos="fade-up"
            data-aos-delay="100"
          >
            <div className="service-card">
              <div className="service-icon">
                <i className="fas fa-car"></i>
              </div>
              <h3>سائق خاص</h3>
              <p>سائقين محترفين ذوي خبرة في القيادة والتعامل</p>
              <a
                href="workers.html?service=driver"
                className="btn btn-outline-primary"
              >
                عرض السائقين
              </a>
            </div>
          </div>

          {/* Service Card 2 */}
          <div
            className="col-md-6 col-lg-3"
            data-aos="fade-up"
            data-aos-delay="200"
          >
            <div className="service-card">
              <div className="service-icon">
                <i className="fas fa-home"></i>
              </div>
              <h3>عاملة منزلية</h3>
              <p>عاملات منزليات مدربات على أعلى مستوى</p>
              <a
                href="workers.html?service=maid"
                className="btn btn-outline-primary"
              >
                عرض العاملات
              </a>
            </div>
          </div>

          {/* Service Card 3 */}
          <div
            className="col-md-6 col-lg-3"
            data-aos="fade-up"
            data-aos-delay="300"
          >
            <div className="service-card">
              <div className="service-icon">
                <i className="fas fa-utensils"></i>
              </div>
              <h3>طباخ/طباخة</h3>
              <p>طباخين محترفين في مختلف أنواع المطابخ</p>
              <a
                href="workers.html?service=cook"
                className="btn btn-outline-primary"
              >
                عرض الطباخين
              </a>
            </div>
          </div>

          {/* Service Card 4 */}
          <div
            className="col-md-6 col-lg-3"
            data-aos="fade-up"
            data-aos-delay="400"
          >
            <div className="service-card">
              <div className="service-icon">
                <i className="fas fa-baby"></i>
              </div>
              <h3>مربية أطفال</h3>
              <p>مربيات متخصصات في رعاية وتربية الأطفال</p>
              <a
                href="workers.html?service=nanny"
                className="btn btn-outline-primary"
              >
                عرض المربيات
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;
