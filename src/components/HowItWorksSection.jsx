import React from "react";

const HowItWorksSection = () => {
  const steps = [
    {
      number: "1",
      title: "خدمات متخصصة",
      icon: "fa-solid fa-sliders", // أيقونة الخطوة الثانية
      delay: "100",
      color: "#1143c4",
    },
    {
      number: "2",
      title: "ثقه والمصداقيه  ",
      icon: "fa-solid fa-shield-halved",
      delay: "300",
      color: "#007960",
    },
    {
      number: "3",
      title: "الكفاءه العاليه  ",
      icon: "fa-solid fa-chart-line",
      delay: "200",
      color: "#11abf3",
    },

    {
      number: "4",
      title: " سرعه الوصول",
      icon: "fa-solid fa-stopwatch", // أيقونة الخطوة الرابعة
      delay: "400",
      color: "#0e80b5",
    },
  ];

  return (
    <section className="how-it-works-section">
      <div className="container">
        {/* العنوان والوصف */}
        <div className="section-header text-center" data-aos="fade-up">
          <h3>من نحن</h3>
          <h1> شركة ماهن للاستقدام</h1>
          <p className="fs-18px ">
            كشركه رائده في تقديم الحلول العماله المنزلية في المملكه نقدم خدماتنا
            لافراد و الشركات علي حد سواء مع التركيز علي تلبيه احتايجاتكم بكل
            اخترافيه ومهاره
          </p>
        </div>

        {/* الخطوات */}
        <div className="steps-wrapper">
          {steps.map((step, index) => (
            <div
              className="step"
              key={index}
              data-aos="fade-up"
              data-aos-delay={step.delay}
             
            >
              <div className="step-number"></div>
              <div className="step-content"  style={{backgroundColor:step.color}}>
                <h3 style={{ textAlign: "center" }}>
                  {step.title} <i className={step.icon}></i>
                </h3>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorksSection;
