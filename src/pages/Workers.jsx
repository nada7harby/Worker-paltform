import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom"; // استيراد useNavigate للتوجيه
import "../assets/css/workers.css";

const Workers = () => {
  const [workers, setWorkers] = useState([]);
  const [filteredWorkers, setFilteredWorkers] = useState([]);
  const [selectedWorker, setSelectedWorker] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [expandedWorkerId, setExpandedWorkerId] = useState(null);
  const [filters, setFilters] = useState({
    serviceType: "الكل",
    skills: [],
  });

  const navigate = useNavigate(); // تهيئة useNavigate

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

  const handleFilterChange = (e) => {
    const { id, value } = e.target;
    setFilters({ ...filters, [id]: value });
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

  const handleShowDetails = (workerId) => {
    setExpandedWorkerId(expandedWorkerId === workerId ? null : workerId);
  };

  // دالة حجز العامل
  const handleBookWorker = (workerId) => {
    const worker = workers.find((w) => w.id === workerId);
    navigate("/booking", { state: { worker } }); // توجيه إلى صفحة الحجز مع تفاصيل العامل
  };

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
                      {/* زر الحجز */}
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
                          {/* زر الحجز بعد اللغات */}
                          <div className="col-12 text-center">
                            <button
                              className="btn btn-success"
                              onClick={() => handleBookWorker(worker.id)}
                            >
                              حجز
                            </button>
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
      </div>
    </div>
  );
};

export default Workers;
