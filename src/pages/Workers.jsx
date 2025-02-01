import React, { useState, useEffect } from "react";
import "../assets/css/workers.css";
const Workers = () => {
  const [workers, setWorkers] = useState([]); // بيانات العمال
  const [filteredWorkers, setFilteredWorkers] = useState([]); // العمال بعد التصفية
  const [selectedWorker, setSelectedWorker] = useState(null); // العامل المحدد لعرض التفاصيل
  const [filters, setFilters] = useState({
    serviceType: "الكل",
    nationality: "الكل",
    experience: "الكل",
    salary: "الكل",
  });
  const [isLoading, setIsLoading] = useState(true); // حالة التحميل

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("Data.json");
        const data = await response.json();
        setWorkers(data.workers);
        setFilteredWorkers(data.workers);
        setIsLoading(false);
      } catch (error) {
        console.error("فشل في تحميل البيانات:", error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    const filtered = workers.filter((worker) => {
      return (
        (filters.serviceType === "الكل" ||
          worker.category === filters.serviceType) &&
        (filters.nationality === "الكل" ||
          worker.nationality === filters.nationality) &&
        (filters.experience === "الكل" ||
          checkExperience(worker.experience, filters.experience)) &&
        (filters.salary === "الكل" ||
          checkSalary(worker.salary, filters.salary))
      );
    });
    setFilteredWorkers(filtered);
  }, [filters, workers]);

  // تغيير الفلاتر
  const handleFilterChange = (e) => {
    const { id, value } = e.target;
    setFilters({ ...filters, [id]: value });
  };

  // مسح الفلاتر
  const clearFilters = () => {
    setFilters({
      serviceType: "الكل",
      nationality: "الكل",
      experience: "الكل",
      salary: "الكل",
    });
  };

  // عرض تفاصيل العامل
  const handleShowDetails = (workerId) => {
    const worker = workers.find((w) => w.id === workerId);
    setSelectedWorker(worker);
  };

  // حجز العامل
  const handleBookWorker = (workerId) => {
    alert(`تم حجز العامل رقم ${workerId}`);
    setSelectedWorker(null);
  };

  // إغلاق النموذج
  const handleCloseModal = () => {
    setSelectedWorker(null);
  };

  // التحقق من الخبرة
  const checkExperience = (workerExperience, filter) => {
    const [min, max] = filter.split("-").map(Number);
    if (filter.endsWith("+")) return workerExperience >= min;
    return workerExperience >= min && workerExperience <= max;
  };

  // التحقق من الراتب
  const checkSalary = (workerSalary, filter) => {
    const [min, max] = filter.split("-").map(Number);
    if (filter.endsWith("+")) return workerSalary >= min;
    return workerSalary >= min && workerSalary <= max;
  };

  // إنشاء نجوم التقييم
  const generateStars = (rating) => {
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;
    const emptyStars = 5 - Math.ceil(rating);

    return (
      <>
        {"★".repeat(fullStars)}
        {hasHalfStar && "½"}
        {"☆".repeat(emptyStars)}
      </>
    );
  };

  return (
    <div className="search-results-section">
      <div className="container">
        <div className="search-header">
          <h1>نتائج البحث</h1>
          <div className="search-filters">
            <div className="row g-3 align-items-center">
              {/* نوع الخدمة */}
              <div className="col-md-2">
                <select
                  className="form-select"
                  id="serviceType"
                  value={filters.serviceType}
                  onChange={handleFilterChange}
                >
                  <option value="الكل">نوع الخدمة</option>
                  <option value="سائق">سائق</option>
                  <option value="عاملة منزلية">عاملة منزلية</option>
                  <option value="طباخ">طباخ/طباخة</option>
                  <option value="مربية">مربية أطفال</option>
                </select>
              </div>

              {/* الجنسية */}
              <div className="col-md-2">
                <select
                  className="form-select"
                  id="nationality"
                  value={filters.nationality}
                  onChange={handleFilterChange}
                >
                  <option value="الكل">الجنسية</option>
                  <option value="مصري">مصري</option>
                  <option value="فلبيني">فلبيني</option>
                  <option value="هندي">هندي</option>
                </select>
              </div>

              {/* الخبرة */}
              <div className="col-md-3">
                <select
                  className="form-select"
                  id="experience"
                  value={filters.experience}
                  onChange={handleFilterChange}
                >
                  <option value="الكل">الخبرة</option>
                  <option value="0-2">0-2 سنوات</option>
                  <option value="3-5">3-5 سنوات</option>
                  <option value="5+">أكثر من 5 سنوات</option>
                </select>
              </div>

              {/* الراتب */}
              <div className="col-md-3">
                <select
                  className="form-select"
                  id="salary"
                  value={filters.salary}
                  onChange={handleFilterChange}
                >
                  <option value="الكل">الراتب</option>
                  <option value="2000-">أقل من 2000 ريال</option>
                  <option value="2000-3000">2000-3000 ريال</option>
                  <option value="3000+">أكثر من 3000 ريال</option>
                </select>
              </div>

              {/* أيقونة مسح البحث */}
              <div className="col-md-2 d-flex justify-content-around">
                <button
                  className="btn btn-outline-secondary w-100"
                  onClick={clearFilters}
                >
                  <i className="fas fa-times"></i>
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* عرض العمال */}
        {isLoading ? (
          <div className="text-center mt-5">
            <div className="spinner-border text-primary" role="status">
              <span className="visually-hidden">جاري التحميل...</span>
            </div>
          </div>
        ) : filteredWorkers.length === 0 ? (
          <div className="no-results text-center mt-5">
            <i className="fas fa-search fa-3x text-muted mb-3"></i>
            <h3>لم يتم العثور على نتائج</h3>
            <p>جرب تغيير معايير البحث</p>
          </div>
        ) : (
          <div className="workers-grid">
            <div className="row g-4 d-flex" id="workersContainer">
              {filteredWorkers.map((worker) => (
                <div key={worker.id} className="col-md-6 col-lg-4">
                  <div className="worker-card">
                    <div className="worker-image">
                      <img src={`images/${worker.image}`} alt={worker.name} />
                      <span
                        className={`worker-status ${
                          worker.availability ? "available" : "busy"
                        }`}
                      >
                        {worker.availability ? "متاح" : "مشغول"}
                      </span>
                    </div>
                    <div className="worker-info">
                      <h3 className="worker-name">{worker.name}</h3>
                      <div className="worker-meta">
                        <span>
                          <i className="fas fa-flag"></i> {worker.nationality}
                        </span>
                        <span>
                          <i className="fas fa-briefcase"></i>{" "}
                          {worker.experience} سنوات خبرة
                        </span>
                      </div>
                      <div className="worker-rating">
                        <div className="rating-stars">
                          {generateStars(worker.rating)}
                        </div>
                        <span className="rating-count">
                          ({worker.reviews} تقييم)
                        </span>
                      </div>
                      <div className="worker-skills">
                        {worker.skills.slice(0, 3).map((skill, index) => (
                          <span key={index} className="skill-tag">
                            {skill}
                          </span>
                        ))}
                      </div>
                    </div>
                    <div className="worker-footer">
                      <span className="worker-salary">
                        {worker.salary} ريال
                      </span>
                      <button
                        className="btn btn-primary"
                        onClick={() => handleShowDetails(worker.id)}
                      >
                        عرض التفاصيل
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* نموذج تفاصيل العامل */}
        {selectedWorker && (
          <div
            className="modal fade show"
            style={{ display: "block", backgroundColor: "rgba(0,0,0,0.5)" }}
          >
            <div className="modal-dialog modal-lg">
              <div className="modal-content">
                <div className="modal-header">
                  <h5 className="modal-title">تفاصيل العامل</h5>
                  <button
                    type="button"
                    className="btn-close"
                    onClick={handleCloseModal}
                  ></button>
                </div>
                <div className="modal-body">
                  <div className="worker-modal-header">
                    <img
                      src={`images/${selectedWorker.image}`}
                      alt={selectedWorker.name}
                    />
                  </div>
                  <div className="worker-modal-info">
                    <h3 className="mb-4">{selectedWorker.name}</h3>
                    <div className="worker-modal-meta">
                      <div className="meta-item">
                        <i className="fas fa-flag"></i>
                        <div className="meta-item-content">
                          <span>الجنسية</span>
                          <strong>{selectedWorker.nationality}</strong>
                        </div>
                      </div>
                      <div className="meta-item">
                        <i className="fas fa-briefcase"></i>
                        <div className="meta-item-content">
                          <span>الخبرة</span>
                          <strong>{selectedWorker.experience} سنوات</strong>
                        </div>
                      </div>
                      <div className="meta-item">
                        <i className="fas fa-user"></i>
                        <div className="meta-item-content">
                          <span>العمر</span>
                          <strong>{selectedWorker.age} سنة</strong>
                        </div>
                      </div>
                      <div className="meta-item">
                        <i className="fas fa-money-bill-wave"></i>
                        <div className="meta-item-content">
                          <span>الراتب</span>
                          <strong>{selectedWorker.salary} ريال</strong>
                        </div>
                      </div>
                    </div>
                    <div className="booking-section">
                      <button
                        className="btn btn-primary w-100"
                        onClick={() => handleBookWorker(selectedWorker.id)}
                      >
                        احجز الآن
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Workers;
