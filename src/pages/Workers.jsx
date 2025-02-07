import React, { useState, useEffect } from "react";
import "../assets/css/workers.css";
const Workers = () => {
  const [workers, setWorkers] = useState([]); // بيانات العمال
  const [filteredWorkers, setFilteredWorkers] = useState([]); // العمال بعد التصفية
  const [selectedWorker, setSelectedWorker] = useState(null); // العامل المحدد لعرض التفاصيل
  // const [filters, setFilters] = useState({
  //   serviceType: "الكل",
  //   nationality: "الكل",
  //   experience: "الكل",
  //   salary: "الكل",
  // });
  const [isLoading, setIsLoading] = useState(true); // حالة التحميل
  const [expandedWorkerId, setExpandedWorkerId] = useState(null);
  const [filters, setFilters] = useState({
    serviceType: "الكل", // نوع الخدمة
    skills: [], // المهارات المحددة
  });

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

  // useEffect(() => {
  //   const filtered = workers.filter((worker) => {
  //     return (
  //       (filters.serviceType === "الكل" ||
  //         worker.category === filters.serviceType) &&
  //       (filters.nationality === "الكل" ||
  //         worker.nationality === filters.nationality) &&
  //       (filters.experience === "الكل" ||
  //         checkExperience(worker.experience, filters.experience)) &&
  //       (filters.salary === "الكل" ||
  //         checkSalary(worker.salary, filters.salary))
  //     );
  //   });
  //   setFilteredWorkers(filtered);
  // }, [filters, workers]);

  useEffect(() => {
    const filtered = workers.filter((worker) => {
      const matchesServiceType =
        filters.serviceType === "الكل" ||
        worker.category === filters.serviceType;

      const matchesSkills =
        filters.skills.length === 0 ||
        filters.skills.every((skill) => worker.skills.includes(skill));

      return matchesServiceType && matchesSkills;
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

  const handleSkillChange = (e) => {
    const skill = e.target.value;
    setFilters((prevFilters) => {
      if (prevFilters.skills.includes(skill)) {
        return {
          ...prevFilters,
          skills: prevFilters.skills.filter((s) => s !== skill),
        };
      } else {
        return {
          ...prevFilters,
          skills: [...prevFilters.skills, skill],
        };
      }
    });
  };
  // عرض تفاصيل العامل
  const handleShowDetails = (workerId) => {
    setExpandedWorkerId(expandedWorkerId === workerId ? null : workerId);
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
              {/* Dropdown لتحديد نوع الخدمة */}
              <div className="col-md-3">
                <select
                  className="form-select"
                  id="serviceType"
                  value={filters.serviceType}
                  onChange={handleFilterChange}
                >
                  <option value="الكل">نوع الخدمة</option>
                  <option value="عاملة منزلية">عاملة منزلية</option>
                  <option value="سائق خاص">سائق خاص</option>
                  <option value="مربية">مربية</option>
                </select>
              </div>

              {/* Checkbox لتحديد المهارات */}
              <div className="col-md-9">
                <div className="skills-checkbox">
                  <label>
                    <input
                      type="checkbox"
                      value="تجيد الطبخ"
                      checked={filters.skills.includes("تجيد الطبخ")}
                      onChange={handleSkillChange}
                    />{" "}
                    تجيد الطبخ
                  </label>
                  <label>
                    <input
                      type="checkbox"
                      value="التدبير المنزلي"
                      checked={filters.skills.includes("التدبير المنزلي")}
                      onChange={handleSkillChange}
                    />{" "}
                    التدبير المنزلي
                  </label>
                  <label>
                    <input
                      type="checkbox"
                      value="الغسيل والكوي"
                      checked={filters.skills.includes("الغسيل والكوي")}
                      onChange={handleSkillChange}
                    />{" "}
                    الغسيل والكوي
                  </label>
                  <label>
                    <input
                      type="checkbox"
                      value="العناية بالأطفال"
                      checked={filters.skills.includes("العناية بالأطفال")}
                      onChange={handleSkillChange}
                    />{" "}
                    العناية بالأطفال
                  </label>
                  <label>
                    <input
                      type="checkbox"
                      value="تحمل رخصة قيادة"
                      checked={filters.skills.includes("تحمل رخصة قيادة")}
                      onChange={handleSkillChange}
                    />{" "}
                    تحمل رخصة قيادة
                  </label>
                  <label>
                    <input
                      type="checkbox"
                      value="سبق لها العمل"
                      checked={filters.skills.includes("سبق لها العمل")}
                      onChange={handleSkillChange}
                    />{" "}
                    سبق لها العمل
                  </label>
                </div>
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
                        {expandedWorkerId === worker.id
                          ? "إخفاء التفاصيل"
                          : "عرض التفاصيل"}
                      </button>
                    </div>
                    {expandedWorkerId === worker.id && (
                      <div
                        className={`worker-details ${
                          expandedWorkerId === worker.id ? "expanded" : ""
                        }`}
                      >
                        <div className="row">
                          <div className="col-md-6 mb-3">
                            <h6>الجنسية</h6>
                            <p className="text-muted">{worker.nationality}</p>
                          </div>
                          <div className="col-md-6 mb-3">
                            <h6>العمر</h6>
                            <p className="text-muted">{worker.age} سنة</p>
                          </div>
                          <div className="col-md-6 mb-3">
                            <h6>الخبرة</h6>
                            <p className="text-muted">
                              {worker.experience} سنوات
                            </p>
                          </div>
                          <div className="col-md-6 mb-3">
                            <h6>التقييم</h6>
                            <p className="text-muted">
                              {worker.rating} / 5 ({worker.reviews || 0}{" "}
                              تقييمات)
                            </p>
                          </div>
                          <div className="col-md-6 mb-3">
                            <h6>الراتب</h6>
                            <p className="text-muted">{worker.salary} ريال</p>
                          </div>
                          <div className="col-md-6 mb-3">
                            <h6>الموقع</h6>
                            <p className="text-muted">{worker.location}</p>
                          </div>
                          <div className="col-12 mb-3">
                            <h6>المهارات</h6>
                            <div className="d-flex flex-wrap gap-2">
                              {worker.skills.map((skill, index) => (
                                <span key={index} className="badge">
                                  {skill}
                                </span>
                              ))}
                            </div>
                          </div>
                          <div className="col-12 mb-3">
                            <h6>اللغات</h6>
                            <div className="d-flex flex-wrap gap-2">
                              {worker.languages.map((language, index) => (
                                <span key={index} className="badge">
                                  {language}
                                </span>
                              ))}
                            </div>
                          </div>
                        </div>
                      </div>
                    )}
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
                  <div className="row">
                    {/* الصورة */}
                    <div className="col-md-4 text-center">
                      <img
                        src={`images/${selectedWorker.image}`}
                        alt={selectedWorker.name}
                        className="img-fluid rounded-circle mb-3"
                        style={{
                          width: "150px",
                          height: "150px",
                          objectFit: "cover",
                        }}
                      />
                      <h4>{selectedWorker.name}</h4>
                      <p className="text-muted">{selectedWorker.category}</p>
                      <span
                        className={`badge ${
                          selectedWorker.availability
                            ? "bg-success"
                            : "bg-danger"
                        }`}
                      >
                        {selectedWorker.availability ? "متاح" : "مشغول"}
                      </span>
                    </div>

                    {/* التفاصيل */}
                    <div className="col-md-8">
                      <div className="row">
                        {/* الجنسية */}
                        <div className="col-md-6 mb-3">
                          <h6>الجنسية</h6>
                          <p className="text-muted">
                            {selectedWorker.nationality}
                          </p>
                        </div>

                        {/* العمر */}
                        <div className="col-md-6 mb-3">
                          <h6>العمر</h6>
                          <p className="text-muted">{selectedWorker.age} سنة</p>
                        </div>

                        {/* الخبرة */}
                        <div className="col-md-6 mb-3">
                          <h6>الخبرة</h6>
                          <p className="text-muted">
                            {selectedWorker.experience} سنوات
                          </p>
                        </div>

                        {/* التقييم */}
                        <div className="col-md-6 mb-3">
                          <h6>التقييم</h6>
                          <p className="text-muted">
                            {selectedWorker.rating} / 5 (
                            {selectedWorker.reviews || 0} تقييمات)
                          </p>
                        </div>

                        {/* الراتب */}
                        <div className="col-md-6 mb-3">
                          <h6>الراتب</h6>
                          <p className="text-muted">
                            {selectedWorker.salary} ريال
                          </p>
                        </div>

                        {/* الموقع */}
                        <div className="col-md-6 mb-3">
                          <h6>الموقع</h6>
                          <p className="text-muted">
                            {selectedWorker.location}
                          </p>
                        </div>

                        {/* المهارات */}
                        <div className="col-12 mb-3">
                          <h6>المهارات</h6>
                          <div className="d-flex flex-wrap gap-2">
                            {selectedWorker.skills.map((skill, index) => (
                              <span key={index} className="badge ">
                                {skill}
                              </span>
                            ))}
                          </div>
                        </div>

                        {/* اللغات */}
                        <div className="col-12 mb-3">
                          <h6>اللغات</h6>
                          <div className="d-flex flex-wrap gap-2">
                            {selectedWorker.languages.map((language, index) => (
                              <span key={index} className="badge ">
                                {language}
                              </span>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* زر الحجز */}
                <div className="modal-footer">
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
        )}
      </div>
    </div>
  );
};

export default Workers;
