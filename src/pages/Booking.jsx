import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "../assets/css/booking.css";

const Booking = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { worker } = location.state || {};

  const [formData, setFormData] = useState({
    sponsorName: "", // اسم الكفيل
    phone: "", // رقم الجوال
    visaNumber: "", // رقم التأشيرة
    arrivalLocation: "", // مكان الوصول
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // يمكنك هنا إرسال البيانات إلى الخادم أو تخزينها مؤقتًا
    const bookingData = {
      ...formData,
      workerId: worker.id,
      workerName: worker.name,
      workerSalary: worker.salary,
    };

    console.log("بيانات الحجز:", bookingData);

    // تخزين بيانات الحجز مؤقتاً
    localStorage.setItem("currentBooking", JSON.stringify(bookingData));

    // التوجيه إلى صفحة الدفع
    navigate("/payment");
  };

  if (!worker) {
    return <div>جارٍ تحميل بيانات العامل...</div>;
  }

  return (
    <div className="booking-summary" style={{ paddingTop: "50px" }}>
      {" "}
      {/* زيادة المسافة من الأعلى */}
      <h2>إتمام الحجز</h2>
      {/* معلومات العامل */}
      <div className="section">
        <h3>معلومات العامل</h3>
        <div className="info-grid">
          <div className="info-item">
            <span className="label">اسم العامل</span>
            <span
              className="value"
              style={{ marginRight: "10px", marginBottom: "10px" }}
            >
              {worker.name}
            </span>
          </div>
          <div className="info-item">
            <span className="label">الجنسية</span>
            <span
              className="value"
              style={{ marginRight: "10px", marginBottom: "10px" }}
            >
              {worker.nationality}
            </span>
          </div>
          <div className="info-item">
            <span className="label">الراتب الشهري</span>
            <span
              className="value"
              style={{ marginRight: "10px", marginBottom: "10px" }}
            >
              {worker.salary} ريال
            </span>
          </div>
        </div>
      </div>
      {/* معلومات مقدم الطلب */}
      <div className="section">
        <h3>معلومات مقدم الطلب</h3>
        <form onSubmit={handleSubmit}>
          <div className="info-grid">
            <div className="info-item">
              <label className="label">اسم الكفيل</label>
              <input
                type="text"
                className="form-control"
                name="sponsorName"
                value={formData.sponsorName}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="info-item">
              <label className="label">رقم الجوال</label>
              <input
                type="tel"
                className="form-control"
                name="phone"
                value={formData.phone}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="info-item">
              <label className="label">رقم التأشيرة</label>
              <input
                type="text"
                className="form-control"
                name="visaNumber"
                value={formData.visaNumber}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="info-item">
              <label className="label">مكان الوصول</label>
              <select
                className="form-control"
                name="arrivalLocation"
                value={formData.arrivalLocation}
                onChange={handleInputChange}
                required
              >
                <option value="">اختر المطار</option>
                <option value="مطار الملك فهد">مطار الملك فهد</option>
                <option value="مطار الرياض">مطار الرياض</option>
                <option value="مطار جدة">مطار جدة</option>
                <option value="مطار الدمام">مطار الدمام</option>
              </select>
            </div>
          </div>

          {/* ملخص التكاليف */}
          <div className="section">
            <h3>ملخص التكاليف</h3>
            <div className="cost-summary">
              <div className="cost-item">
                <span>الراتب الشهري</span>
                <span>{worker.salary} ريال</span>
              </div>
              <div className="cost-item">
                <span>رسوم الخدمة</span>
                <span>500 ريال</span>
              </div>
              <div className="cost-item">
                <span>التأمين</span>
                <span>200 ريال</span>
              </div>
              <div className="cost-item total">
                <span>الإجمالي</span>
                <span>{worker.salary + 500 + 200} ريال</span>
              </div>
            </div>
          </div>

          {/* الموافقة على الشروط */}
          <div className="section">
            <div className="form-check">
              <input
                type="checkbox"
                className="form-check-input"
                id="termsCheck"
                required
              />
              <label className="form-check-label" htmlFor="termsCheck">
                أوافق على <a href="#">الشروط والأحكام</a>
              </label>
            </div>
          </div>

          {/* تأكيد الحجز */}
          <div className="section">
            <button type="submit" className="btn btn-primary w-100">
              تأكيد الحجز
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Booking;
