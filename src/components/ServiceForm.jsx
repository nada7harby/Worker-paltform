import React, { useState } from "react";

const ServiceForm = () => {
  // تعريف الـ state لكل قيمة
  const [job, setJob] = useState("");
  const [experience, setExperience] = useState("");
  const [religion, setReligion] = useState("");
  const [country, setCountry] = useState("");
  const [gender, setGender] = useState("");
  const [serviceType, setServiceType] = useState("");

  // دالة لتقديم النموذج
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log({
      job,
      experience,
      religion,
      country,
      gender,
      serviceType,
    });
    // يمكنك هنا إرسال البيانات إلى الخادم أو معالجتها كما تريد
  };

  return (
    <div
      style={{ backgroundColor: "rgb(0 121 96 / 19%)" }}
      data-aos="fade-up"
      data-aos-duration={1000}
    >
      <div className="container my-5">
        <div className="p-4">
          <h2 className="text-center mb-4">إضافة خدمات</h2>
          <form onSubmit={handleSubmit}>
            <div className="row p-5">
              {/* نوع الخدمة */}
              <div className="col-lg-4 p-4 ">
                <label htmlFor="serviceType" className="fs-20px form-label">
                  المهنة
                </label>
                <select
                  className="form-select"
                  style={{ borderRadius: "20px" }}
                  id="serviceType"
                  value={job}
                  onChange={(e) => setJob(e.target.value)}
                >
                  <option value="">اختر المهنة </option>
                  <option value="سائقة خاصة">سائقة خاصة</option>
                  <option value="عاملة منزلية">عاملة منزلية</option>
                  <option value="طباخة">طباخة</option>
                  <option value="مربية أطفال">مربية أطفال</option>
                  <option value="ممرضة">ممرضة</option>
                </select>
              </div>

              {/* الخبرة */}
              <div className="col-lg-4 p-4">
                <label htmlFor="experience" className="fs-20px form-label">
                  الخبرة
                </label>
                <select
                  className="form-select"
                  style={{ borderRadius: "20px" }}
                  id="experience"
                  value={experience}
                  onChange={(e) => setExperience(e.target.value)}
                >
                  <option value="">تحديد الخبرة </option>
                  <option value="سبق له العمل">سبق له العمل</option>
                  <option value="لم يسبق له العمل">لم يسبق له العمل</option>
                </select>
              </div>

              {/* الديانة */}
              <div className="col-lg-4 p-4">
                <label htmlFor="religion" className="fs-20px form-label">
                  الديانة
                </label>
                <select
                  className="form-select"
                  style={{ borderRadius: "20px" }}
                  id="religion"
                  value={religion}
                  onChange={(e) => setReligion(e.target.value)}
                >
                  <option value="">تحديد الديانة</option>
                  <option value="مسلم">مسلم</option>
                  <option value="غير مسلم">غير مسلم</option>
                </select>
              </div>

              {/* الدولة */}
              <div className="col-lg-4 p-4">
                <label htmlFor="country" className="fs-20px form-label">
                  الدولة
                </label>
                <select
                  className="form-select"
                  style={{ borderRadius: "20px" }}
                  id="country"
                  value={country}
                  onChange={(e) => setCountry(e.target.value)}
                >
                  <option value="">اختر الدولة </option>
                  <option value="السعودية">السعودية</option>
                  <option value="الإمارات">الإمارات</option>
                  <option value="الكويت">الكويت</option>
                  <option value="قطر">قطر</option>
                  <option value="عمان">عمان</option>
                </select>
              </div>

              {/* الجنس */}
              <div className="col-lg-4 p-4">
                <label htmlFor="gender" className="fs-20px form-label">
                  الجنس
                </label>
                <select
                  className="form-select"
                  style={{ borderRadius: "20px" }}
                  id="gender"
                  value={gender}
                  onChange={(e) => setGender(e.target.value)}
                >
                  <option value="">اختر الجنس</option>
                  <option value="ذكر">ذكر</option>
                  <option value="أنثى">أنثى</option>
                </select>
              </div>

              {/* نوع الخدمة */}
              <div className="col-lg-4 p-4">
                <label htmlFor="serviceType" className="fs-20px form-label">
                  نوع الخدمة
                </label>
                <select
                  className="form-select"
                  style={{ borderRadius: "20px" }}
                  id="serviceType"
                  value={serviceType}
                  onChange={(e) => setServiceType(e.target.value)}
                >
                  <option value=""> اختر نوع الخدمة </option>
                  <option value="طلب استقدام">طلب استقدام</option>
                  <option value="نقل خدمات">نقل خدمات</option>
                  <option value="عقود شهرية">عقود شهرية</option>
                  <option value="عقود بالساعة">عقود بالساعة</option>
                </select>
              </div>
            </div>

            {/* زر البحث */}
            <div className="d-grid justify-content-end">
              <button type="submit" className="btn btn-primary">
                بحث
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ServiceForm;
