import React, { useEffect, useState } from "react";
import Search from "../../../components/Search/Search.jsx";
import { useTranslation } from "react-i18next";
import { Col, Container, Row, Dropdown } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faAngleLeft,
  faAngleRight,
  faLocationDot,
  faChevronUp,
} from "@fortawesome/free-solid-svg-icons";
import "./style.css";

function FindJobs() {
  const { t } = useTranslation("common");
  const [companies, setCompanies] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const companiesPerPage = 10;
  const [jobTypeOptions, setJobTypeOptions] = useState({
    fullTime: false,
    partTime: false,
    daily: false,
    internship: false,
    contract: false,
    experience1: false,
    experience2: false,
    experience3: false,
    experience4: false,
    experience5: false,
  });
  const [showSortOptions, setShowSortOptions] = useState(true);
  const [showSortOption, setShowSortOption] = useState(true);
  const [showSortOptionz, setShowSortOptionz] = useState(true);
  const handleToggleSortOptions = () => {
    setShowSortOptions(!showSortOptions);
    setIsIconRotatedType(!isIconRotatedType);
  };
  const handleToggleSortOption = () => {
    setShowSortOption(!showSortOption);
    setIsIconRotatedExp(!isIconRotatedExp);
  };
  const handleToggleSortOptionz = () => {
    setShowSortOptionz(!showSortOptionz);
    setIsIconRotatedTime(!isIconRotatedTime);
  };
  // Mock data
  const mockFindJobs = [
    {
      id: 1,
      nameJob: "Nhân viên tư vấn khách hàng",
      name: "Công ty CP Xuất nhập khẩu Thương mại Đài Linh",
      address: "Thành phố Hồ Chí Minh",
      experience: "Từ 1-3 năm",
      salary: "10.000.000 VND",
      jobType: "Full-Time",
      education: "Tối thiểu Trung Học Phổ Thông",
      image: "/assets/cty/1.png",
      time:"55 phút trước",
    },
    {
      id: 2,
      nameJob: "Nhân viên chăm sóc khách hàng",
      name: "ADVIETNAM",
      address: "Thành phố Hồ Chí Minh",
      experience: "Ít hơn 1 năm",
      salary: "4.000.000 VND",
      jobType: "Daily",
      education: "Tối thiểu Trung Học Phổ Thông",
      image: "/assets/cty/2.png",
      time:"15 phút trước",
    },
    {
      id: 3,
      nameJob: "Việc làm thêm parttime/Fulltime tại quận Cầu Giấy",
      name: "Công ty Cổ phần Công nghệ KiotViet",
      address: "Hà Nội",
      experience: "Ít hơn 1 năm",
      salary: "5.000.000 VND",
      jobType: "Internship",
      education: "Tối thiểu Trung Học Phổ Thông",
      image: "/assets/cty/3.png",
      time:"4 giờ trước",
    },
    {
      id: 4,
      nameJob: "Content Creator/Livestream Host",
      name: "Công ty TNHH Nature Story",
      address: "Long An",
      experience: "Ít hơn 1 năm",
      salary: "6.000.000 VND",
      jobType: "Part-Time",
      education: "Tối thiểu Cử nhân",
      image: "/assets/cty/4.png",
      time:"10 giờ trước",
    },
    {
      id: 5,
      nameJob: "Nhân viên tư vấn khách hàng",
      name: "Công ty CP Xuất nhập khẩu Thương mại Đài Linh",
      address: "Thành phố Hồ Chí Minh",
      experience: "Từ 1-3 năm",
      salary: "10.000.000 VND",
      jobType: "Full-Time",
      education: "Tối thiểu Trung Học Phổ Thông",
      image: "/assets/cty/1.png",
      time:"2 ngày trước",
    },
    {
      id: 6,
      nameJob: "Nhân viên chăm sóc khách hàng",
      name: "ADVIETNAM",
      address: "Thành phố Hồ Chí Minh",
      experience: "Ít hơn 1 năm",
      salary: "4.000.000 VND",
      jobType: "Daily",
      education: "Tối thiểu Trung Học Phổ Thông",
      image: "/assets/cty/2.png",
      time:"1 ngày trước",
    },
    {
      id: 7,
      nameJob: "Việc làm thêm parttime/Fulltime tại quận Cầu Giấy",
      name: "Công ty Cổ phần Công nghệ KiotViet",
      address: "Hà Nội",
      experience: "Ít hơn 1 năm",
      salary: "5.000.000 VND",
      jobType: "Internship",
      education: "Tối thiểu Trung Học Phổ Thông",
      image: "/assets/cty/3.png",
      time:"14 giờ trước",
    },
    {
      id: 8,
      nameJob: "Content Creator/Livestream Host",
      name: "Công ty TNHH Nature Story",
      address: "Long An",
      experience: "Từ 3-5 năm",
      salary: "6.000.000 VND",
      jobType: "Part-Time",
      education: "Tối thiểu Cử nhân",
      image: "/assets/cty/4.png",
      time:"7 phút trước",
    },
    {
      id: 9,
      nameJob: "Nhân viên tư vấn khách hàng",
      name: "Công ty CP Xuất nhập khẩu Thương mại Đài Linh",
      address: "Thành phố Hồ Chí Minh",
      experience: "Từ 5-10 năm",
      salary: "10.000.000 VND",
      jobType: "Full-Time",
      education: "Tối thiểu Trung Học Phổ Thông",
      image: "/assets/cty/1.png",
      time:"3 ngày trước",
    },
      {
      id: 10,
      nameJob: "Nhân viên chăm sóc khách hàng",
      name: "ADVIETNAM",
      address: "Thành phố Hồ Chí Minh",
      experience: "Ít hơn 1 năm",
      salary: "4.000.000 VND",
      jobType: "Daily",
      education: "Tối thiểu Trung Học Phổ Thông",
      image: "/assets/cty/2.png",
      time:"25 phút trước",
    },
    {
      id: 11,
      nameJob: "Việc làm thêm parttime/Fulltime tại quận Cầu Giấy",
      name: "Công ty Cổ phần Công nghệ KiotViet",
      address: "Hà Nội",
      experience: "Hơn 10 năm",
      salary: "5.000.000 VND",
      jobType: "Internship",
      education: "Tối thiểu Trung Học Phổ Thông",
      image: "/assets/cty/3.png",
      time:"4 giờ trước",
    },
    {
      id: 12,
      nameJob: "Content Creator/Livestream Host",
      name: "Công ty TNHH Nature Story",
      address: "Long An",
      experience: "Ít hơn 1 năm",
      salary: "6.000.000 VND",
      jobType: "Contract",
      education: "Tối thiểu Cử nhân",
      image: "/assets/cty/4.png",
      time:"10 ngày trước",
    },
  ];

  useEffect(() => {
    // Giả lập việc gọi API để lấy danh sách công ty dựa trên currentPage
    const startIndex = (currentPage - 1) * companiesPerPage;
    const endIndex = startIndex + companiesPerPage;
    let currentCompanies = mockFindJobs.slice(startIndex, endIndex);

    // Lọc dữ liệu dựa trên giá trị của jobType
    let filteredCompanies = [...currentCompanies];
    if (jobTypeOptions.fullTime) {
      filteredCompanies = filteredCompanies.filter(
        (company) => company.jobType === "Full-Time"
      );
    }
    if (jobTypeOptions.partTime) {
      filteredCompanies = filteredCompanies.filter(
        (company) => company.jobType === "Part-Time"
      );
    }
    if (jobTypeOptions.daily) {
      filteredCompanies = filteredCompanies.filter(
        (company) => company.jobType === "Daily"
      );
    }
    if (jobTypeOptions.internship) {
      filteredCompanies = filteredCompanies.filter(
        (company) => company.jobType === "Internship"
      );
    }
    if (jobTypeOptions.contract) {
      filteredCompanies = filteredCompanies.filter(
        (company) => company.jobType === "Contract"
      );
    }
    if (jobTypeOptions.experience1) {
      filteredCompanies = filteredCompanies.filter(
        (company) => company.experience === "Ít hơn 1 năm"
      );
    }
    if (jobTypeOptions.experience2) {
      filteredCompanies = filteredCompanies.filter(
        (company) => company.experience === "Từ 1-3 năm"
      );
    }
    if (jobTypeOptions.experience3) {
      filteredCompanies = filteredCompanies.filter(
        (company) => company.experience === "Từ 3-5 năm"
      );
    }
    if (jobTypeOptions.experience4) {
      filteredCompanies = filteredCompanies.filter(
        (company) => company.experience === "Từ 5-10 năm"
      );
    }
    if (jobTypeOptions.experience5) {
      filteredCompanies = filteredCompanies.filter(
        (company) => company.experience === "Hơn 10 năm"
      );
    }

    setCompanies(filteredCompanies);
  }, [currentPage, jobTypeOptions]);

  const handleJobTypeChange = (option) => {
    setJobTypeOptions({ ...jobTypeOptions, [option]: !jobTypeOptions[option] });
  };
  const [isIconRotatedType, setIsIconRotatedType] = useState(false);
  const [isIconRotatedExp, setIsIconRotatedExp] = useState(false);
  const [isIconRotatedTime, setIsIconRotatedTime] = useState(false);
  const renderCompanies = () => {
    return companies.map((company) => (
      <Col key={company.id} className="col-md-6">
        <div className="card card-lg border-1 search-categories">
          <div className="name-job">{company.nameJob}</div>
          <div className="salary">
            <p>
              {t("findJob.salary")}: {company.salary}
            </p>
          </div>
          <div className="company-detail">
            <div className="job-type">{company.jobType}</div>
            <div className="experience">{company.experience}</div>
            <div className="education">{company.education}</div>
          </div>

          <div className="d-flex">
            <img
              src={company.image}
              alt={company.name}
              className="company-image"
            />
            <div className="company-info">
              <p>{company.name}</p>
              <p>
                <FontAwesomeIcon icon={faLocationDot} /> {company.address}
              </p>
            </div>
          </div>
          <div className="line"></div>
          <div className="time-line">{company.time}</div>
        </div>
      </Col>
    ));
  };

  const totalPages = Math.ceil(mockFindJobs.length / companiesPerPage);

  return (
    <>
      <Col>
        <Search />
      </Col>
      <Container>
        <Row>
          <Col className="col-sort" md={3}>
            <h2 id="toggleLabel" onClick={handleToggleSortOptions}>
            {t("findJob.jobType")}
              <FontAwesomeIcon icon={faChevronUp} className={`chevron-icon ${isIconRotatedType ? "rotate" : ""}`}/>
            </h2>
            <div className={`sort-type-job ${showSortOptions ? "" : "hidden"}`}>
              <label>
                <input
                  type="checkbox"
                  checked={jobTypeOptions.byJobType}
                  onChange={() => handleJobTypeChange("fullTime")}
                />{" "}
                {t("findJob.fullTime")}
              </label>
              <label>
                <input
                  type="checkbox"
                  checked={jobTypeOptions.byJobType}
                  onChange={() => handleJobTypeChange("partTime")}
                />{" "}
                {t("findJob.partTime")}
              </label>
              <label>
                <input
                  type="checkbox"
                  checked={jobTypeOptions.byJobType}
                  onChange={() => handleJobTypeChange("daily")}
                />{" "}
                {t("findJob.daily")}
              </label>
              <label>
                <input
                  type="checkbox"
                  checked={jobTypeOptions.byJobType}
                  onChange={() => handleJobTypeChange("internship")}
                />{" "}
                {t("findJob.internship")}
              </label>
              <label>
                <input
                  type="checkbox"
                  checked={jobTypeOptions.byJobType}
                  onChange={() => handleJobTypeChange("contract")}
                />{" "}
                {t("findJob.contract")}
              </label>
            </div>
            <div className="line"></div>
            <h2 id="toggleLabel" onClick={handleToggleSortOption}>
            {t("findJob.experience")}
              <FontAwesomeIcon icon={faChevronUp} className={`chevron-icon ${isIconRotatedExp ? "rotate" : ""}`}/>
            </h2>
            <div className={`sort-type-job ${showSortOption ? "" : "hidden"}`}>
              <label>
                <input
                  type="checkbox"
                  checked={jobTypeOptions.byJobType}
                  onChange={() => handleJobTypeChange("experience1")}
                />{" "}
                {t("findJob.no")}
              </label>
              <label>
                <input
                  type="checkbox"
                  checked={jobTypeOptions.byJobType}
                  onChange={() => handleJobTypeChange("experience2")}
                />{" "}
                {t("findJob.no1")}
              </label>
              <label>
                <input
                  type="checkbox"
                  checked={jobTypeOptions.byJobType}
                  onChange={() => handleJobTypeChange("experience3")}
                />{" "}
                {t("findJob.no2")}
              </label>
              <label>
                <input
                  type="checkbox"
                  checked={jobTypeOptions.byJobType}
                  onChange={() => handleJobTypeChange("experience4")}
                />{" "}
                {t("findJob.no3")}
              </label>
              <label>
                <input
                  type="checkbox"
                  checked={jobTypeOptions.byJobType}
                  onChange={() => handleJobTypeChange("experience5")}
                />{" "}
                {t("findJob.no4")}
              </label>
            </div>
            <div className="line"></div>
            <h2 id="toggleLabel" onClick={handleToggleSortOptionz}>
            {t("findJob.lastUpdate")}
              <FontAwesomeIcon icon={faChevronUp} className={`chevron-icon ${isIconRotatedTime ? "rotate" : ""}`}/>
            </h2>
            <div className={`sort-type-job ${showSortOptionz ? "" : "hidden"}`}>
              <label>
                <input
                  type="radio"
                  name="update-frequency"
                />{" "}
                {t("findJob.time1")}
              </label>
              <label>
                <input
                  type="radio"
                  name="update-frequency"
                />{" "}
                {t("findJob.time2")}
              </label>
              <label>
                <input
                  type="radio"
                  name="update-frequency"
                />{" "}
                {t("findJob.time3")}
              </label>
              <label>
                <input
                  type="radio"
                  name="update-frequency"
                />{" "}
                {t("findJob.time4")}
              </label>
            </div>
            <div className="line"></div>
          </Col>
          <Col md={9}>
            <Row>{renderCompanies()}</Row>
            <div className="text-center">
              <button
                className="cus-pre-next"
                onClick={() => setCurrentPage(currentPage - 1)}
                disabled={currentPage === 1}
              >
                <FontAwesomeIcon icon={faAngleLeft} />
              </button>
              <span className="mx-2">
                {t("jobPage.page")} {currentPage} {t("jobPage.of")} {totalPages}
              </span>
              <button
                className="cus-pre-next"
                onClick={() => setCurrentPage(currentPage + 1)}
                disabled={currentPage === totalPages}
              >
                <FontAwesomeIcon icon={faAngleRight} />
              </button>
            </div>
          </Col>
        </Row>
      </Container>
    </>
  );
}

export default FindJobs;
