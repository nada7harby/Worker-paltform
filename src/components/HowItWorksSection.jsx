import React from "react";

const HowItWorksSection = () => {
  const steps = [
    {
      number: "1",
      title: "إنشاء حساب",
      description:
        "     قم بإنشاء حساب جديد وأكمل بياناتك الشخصية لتتمكن من الوصول إلى جميع الخدمات",
      delay: "100",
    },
    {
      number: "2",
      title: "اختيار  العمالة المناسبة",
      description:
        "تصفح قوائم العمالة المتاحة واختر العاملين الذين يتناسبون مع احتياجاتك ومتطلباتك",
      delay: "200",
    },
    {
      number: "3",
      title: "تقديم طلب التوظيف",
      description:
        "قم بتقديم طلب توظيف للعمالة المختارة وانتظر الموافقة من قبل مقدم الخدمة",
      delay: "300",
    },
    {
      number: "4",
      title: " بدء العمل",
      description:
        "بعد الموافقة على طلبك، يتم توفير العمالة المطلوبة ويمكنك بدء العمل معهم فورًا",
      delay: "400",
    },
  ];

  return (
    <section className="how-it-works-section">
      <div className="container">
        {/* العنوان والوصف */}
        <div className="section-header text-center" data-aos="fade-up">
          <h2>كيف تعمل المنصة؟</h2>
          <p>خطوات بسيطة للحصول على العمالة المطلوبة</p>
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
              <div className="step-number">{step.number}</div>
              <div className="step-content">
                <h3 style={{ textAlign: "center" }}>{step.title}</h3>
                <p style={{ textAlign: "center" }}>{step.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorksSection;
