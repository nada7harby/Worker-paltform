import React from "react";

const FeaturesSection = () => {
  return (
    <section className="features-section">
      <div className="container">
        {/* Section Header */}
        <div className="section-header text-center" data-aos="fade-up">
          <h2>مميزاتنا </h2>
          <p>نقدم لك مجموعة من المميزات الفريدة</p>
        </div>

        {/* Features Grid */}
        <div className="row g-4">
          {/* Feature 1: Security */}
          <div className="col-md-4" data-aos="fade-up" data-aos-delay={100}>
            <div className="feature-card">
              <div className="feature-icon">
                <i className="fas fa-shield-alt" />
              </div>
              <h3>ضمان وأمان</h3>
              <p>نضمن حقوق جميع الأطراف ونوفر عقود قانونية موثقة</p>
            </div>
          </div>

          {/* Feature 2: Speed */}
          <div className="col-md-4" data-aos="fade-up" data-aos-delay={200}>
            <div className="feature-card">
              <div className="feature-icon">
                <i className="fas fa-clock" />
              </div>
              <h3>سرعة التوفير</h3>
              <p>نوفر العمالة المطلوبة خلال فترة قصيرة</p>
            </div>
          </div>

          {/* Feature 3: Support */}
          <div className="col-md-4" data-aos="fade-up" data-aos-delay={300}>
            <div className="feature-card">
              <div className="feature-icon">
                <i className="fas fa-headset" />
              </div>
              <h3>دعم متواصل</h3>
              <p>فريق دعم متخصص متواجد على مدار الساعة</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
