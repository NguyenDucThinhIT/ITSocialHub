import React, { useEffect, useState } from "react";
import Search from "../../../components/Search/Search.jsx";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import { Col, Container, Row, Dropdown } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faAngleLeft,
  faAngleRight,
  faLocationDot,
  faChevronUp,
} from "@fortawesome/free-solid-svg-icons";
import Loading from "@/components/Loading/Loading";
import TimeAgo from "@/components/TimeAgo";
import { getAllPostRecruitment } from "@/services/recruitment.api.js";
import "./style.css";
function FindJobs() {
  const { t } = useTranslation("common");
  const [postData, setPostData] = useState({});
  const [companies, setCompanies] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [search, setSearch] = useState("");
  const [jobTypeFilter, setJobTypeFilter] = useState([]);
  const [experienceFilter, setExperienceFilter] = useState([]);
  const [updateFilter, setUpdateFilter] = useState(null);
  const [showSortOptions, setShowSortOptions] = useState(true);
  const [showSortOption, setShowSortOption] = useState(true);
  const [showSortOptionz, setShowSortOptionz] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
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

  const [isIconRotatedType, setIsIconRotatedType] = useState(false);
  const [isIconRotatedExp, setIsIconRotatedExp] = useState(false);
  const [isIconRotatedTime, setIsIconRotatedTime] = useState(false);

  const getAllPost = async () => {
    setIsLoading(true);
    await getAllPostRecruitment(6, currentPage, null, null,jobTypeFilter,experienceFilter,updateFilter,search,companies)
    .then((res) => setPostData(res.data))
    setIsLoading(false);
  }
  useEffect(() => {
    getAllPost();
  }, [currentPage,jobTypeFilter,experienceFilter]);
  const handleToggleJobTypeFilter = (value) => {
    setJobTypeFilter((prevFilters) => {
      if (prevFilters.includes(value)) {
        return prevFilters.filter((filter) => filter !== value);
      } else {
        return [...prevFilters, value];
      }
    });
    
  };

  const handleToggleExperienceFilter = (value) => {
    setExperienceFilter((prevFilters) => {
      if (prevFilters.includes(value)) {
        return prevFilters.filter((filter) => filter !== value);
      } else {
        return [...prevFilters, value];
      }
    });
    
  };

  const handleToggleUpdateFilter = (value) => {
    setUpdateFilter(value);
  };
  
  const renderCompanies = () => {
    return (
      <>
        {isLoading ? (
          <Loading />
        ) : (
          <>
            {postData.items &&
              postData.items.map((data) => (
                <Col key={data.id} className="col-md-6">
        <div className="card card-lg border-1 search-categories">
          <Link
            className="name-job"
            to={`/jobs/${data.id}`}
            target="_blank"
          >
            {data.title}
          </Link>
          <div className="salary">
            <p>
              {t("findJob.salary")}: {data.salary}
            </p>
          </div>
          <div className="company-detai">
            <div className="job-type">{data.job_type}</div>
            <div className="experience">{data.experience_requirements}</div>
            <div className="education">{data.educational_requirements}</div>
          </div>
          <div className="d-flex">
            <img
              src={data.company.logo_url}
              alt={data.company.name}
              className="company-image"
            />
            <div className="company-info">
              <div className="cus-name-cty">
                <p>
                  <img
                    src="/assets/images/tichxanh.png"
                    alt="/assets/images/tichxanh.png"
                    className="icon-tichxanh"
                  />
                  <Link
                    className="link-cty"
                    to={`/companies/${data.company.id}`}
                    target="_blank"
                  >
                    {data.company.name}
                  </Link>
                </p>
              </div>
              <p>
                <FontAwesomeIcon icon={faLocationDot} /> {data.company.address_main}
              </p>
            </div>
          </div>
          <div className="line"></div>
          <div className="time-line">
            <TimeAgo createdAt={data.updated_at} />
          </div>
        </div>
      </Col>
              ))}
          </>
        )}
      </>
    );
  };
  

  const totalPages = postData.pagination?.lastPage;

  return (
    <>
      <Col>
        <Search />
      </Col>
      <Container>
        <div className="text-find">
        {t("findJob.titleNew")}
        </div>
        <Row>
          <Col className="col-sort" md={3}>
            <h2 id="toggleLabel" onClick={handleToggleSortOptions}>
              {t("findJob.jobType")}
              <FontAwesomeIcon
                icon={faChevronUp}
                className={`chevron-icon ${isIconRotatedType ? "rotate" : ""}`}
              />
            </h2>
            <div className={`sort-type-job ${showSortOptions ? "" : "hidden"}`}>
              <label>
                <input
                  type="checkbox"
                  onChange={() => handleToggleJobTypeFilter("Toàn thời gian")}
                  checked={jobTypeFilter.includes("Toàn thời gian")}
                />{" "}
                {t("findJob.fullTime")}
              </label>
              <label>
                <input
                  type="checkbox"
                  onChange={() => handleToggleJobTypeFilter("Bán thời gian")}
                  checked={jobTypeFilter.includes("Bán thời gian")}
                />{" "}
                {t("findJob.partTime")}
              </label>
              <label>
                <input
                  type="checkbox"
                  onChange={() => handleToggleJobTypeFilter("Theo ngày")}
                  checked={jobTypeFilter.includes("Theo ngày")}
                />{" "}
                {t("findJob.daily")}
              </label>
              <label>
                <input
                  type="checkbox"
                  onChange={() => handleToggleJobTypeFilter("Thực tập")}
                  checked={jobTypeFilter.includes("Thực tập")}
                />{" "}
                {t("findJob.internship")}
              </label>
              <label>
                <input
                  type="checkbox"
                  onChange={() => handleToggleJobTypeFilter("Theo dự án")}
                  checked={jobTypeFilter.includes("Theo dự án")}
                />{" "}
                {t("findJob.contract")}
              </label>
            </div>
           
            <div className="line"></div>
            <h2 id="toggleLabel" onClick={handleToggleSortOption}>
              {t("findJob.experience")}
              <FontAwesomeIcon
                icon={faChevronUp}
                className={`chevron-icon ${isIconRotatedExp ? "rotate" : ""}`}
              />
            </h2>
            <div className={`sort-type-job ${showSortOption ? "" : "hidden"}`}>
              <label>
                <input
                  type="checkbox"
                  onChange={() => handleToggleExperienceFilter("Ít hơn 1 năm")}
                  checked={experienceFilter.includes("Ít hơn 1 năm")}
                />{" "}
                {t("findJob.no")}
              </label>
              <label>
                <input
                  type="checkbox"
                  onChange={() => handleToggleExperienceFilter("1-3 năm")}
                  checked={experienceFilter.includes("1-3 năm")}
                />{" "}
                {t("findJob.no1")}
              </label>
              <label>
                <input
                  type="checkbox"
                  onChange={() => handleToggleExperienceFilter("3-5 năm")}
                  checked={experienceFilter.includes("3-5 năm")}
                />{" "}
                {t("findJob.no2")}
              </label>
              <label>
                <input
                  type="checkbox"
                  onChange={() => handleToggleExperienceFilter("5-10 năm")}
                  checked={experienceFilter.includes("5-10 năm")}
                />{" "}
                {t("findJob.no3")}
              </label>
              <label>
                <input
                  type="checkbox"
                  onChange={() => handleToggleExperienceFilter("Hơn 10 năm")}
                  checked={experienceFilter.includes("Hơn 10 năm")}
                />{" "}
                {t("findJob.no4")}
              </label>
            </div>
            <div className="line"></div>
            <h2 id="toggleLabel" onClick={handleToggleSortOptionz}>
              {t("findJob.lastUpdate")}
              <FontAwesomeIcon
                icon={faChevronUp}
                className={`chevron-icon ${isIconRotatedTime ? "rotate" : ""}`}
              />
            </h2>
            <div className={`sort-type-job ${showSortOptionz ? "" : "hidden"}`}>
            <label>
                <input type="radio" name="update-frequency" checked/>{" "}
                {t("findJob.time4")}
              </label>
              <label>
                <input type="radio" name="update-frequency" />{" "}
                {t("findJob.time1")}
              </label>
              <label>
                <input type="radio" name="update-frequency" />{" "}
                {t("findJob.time2")}
              </label>
              <label>
                <input type="radio" name="update-frequency" />{" "}
                {t("findJob.time3")}
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
