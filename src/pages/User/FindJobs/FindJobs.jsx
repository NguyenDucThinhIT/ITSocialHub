import React, { useEffect, useState } from "react";
import Search from "../../../components/Search/Search.jsx";
import { useTranslation } from "react-i18next";
import { Link, useLocation } from "react-router-dom";
import { Col, Container, Row } from "react-bootstrap";
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
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const searchQuery = searchParams.get("search");

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
  const [noResults, setNoResults] = useState(false);
  const [selectedFilters, setSelectedFilters] = useState([]);
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

  const getAllPost = async (searchDefault = null) => {
    setIsLoading(true);
    await getAllPostRecruitment(
      6,
      currentPage,
      null,
      null,
      jobTypeFilter,
      experienceFilter,
      updateFilter,
      searchDefault ?? search,
      companies
    ).then((res) => {
      setPostData(res.data);
      setNoResults(res.data.items.length === 0);
    });
    setIsLoading(false);
  };
  useEffect(() => {
    if (searchQuery) {
      getAllPost(searchQuery);
    } else {
      getAllPost();
    }
  }, [currentPage, jobTypeFilter, experienceFilter, updateFilter]);

  const handleToggleJobTypeFilter = (value) => {
    setJobTypeFilter((prevFilters) => {
      const updatedFilters = prevFilters.includes(value)
        ? prevFilters.filter((filter) => filter !== value)
        : [...prevFilters, value];
      setSelectedFilters(updatedFilters);
      return updatedFilters;
    });
  };
  const handleSearch = () => {
    getAllPost();
  };
  const handleToggleExperienceFilter = (value) => {
    setExperienceFilter((prevFilters) => {
      const updatedFilters = prevFilters.includes(value)
        ? prevFilters.filter((filter) => filter !== value)
        : [...prevFilters, value];
      setSelectedFilters(updatedFilters);

      return updatedFilters;
    });
  };
  const handleClearAllFilters = () => {
    setJobTypeFilter([]);
    setExperienceFilter([]);
    setSelectedFilters([]);
  };
  const renderClearAllButton = () => {
    if (selectedFilters.length >= 2 || (jobTypeFilter.length + experienceFilter.length) >= 2) {
      return (
        <button className="clear-all-button" onClick={handleClearAllFilters}>
          {t("findJob.clear")}
        </button>
      );
    }
    return null;
  };

  const handleToggleUpdateFilter = (value) => {
    const now = new Date();

    switch (value) {
      case "anytime":
        setUpdateFilter(null);
        break;
      case "24h":
        setUpdateFilter(now);
        break;
      case "week":
        setUpdateFilter(new Date(now - 7 * 24 * 60 * 60 * 1000));
        break;
      case "month":
        setUpdateFilter(
          new Date(now.getFullYear(), now.getMonth() - 1, now.getDate())
        );
        break;
      default:
        break;
    }
  };

  const renderCompanies = () => {
    return (
      <>
        {isLoading ? (
          <Loading />
        ) : (
          <>
            {postData.items && postData.items.length > 0 ? (
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
                      <div className="experience">
                        {data.experience_requirements}
                      </div>
                      <div className="education">
                        {data.educational_requirements}
                      </div>
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
                        <p className="location-job">
                          <FontAwesomeIcon icon={faLocationDot} />{" "}
                          {data.address}
                        </p>
                      </div>
                    </div>
                    <div className="line"></div>
                    <div className="time-line">
                      <TimeAgo createdAt={data.updated_at} />
                    </div>
                  </div>
                </Col>
              ))
            ) : (
              <div className="no-results-container">
                <img
                  src="/assets/images/notFound.png"
                  alt="No results found"
                  className="no-results-image"
                />
                <p className="no-results-message">
                  {t("interviewer.interviewList.notFound")}
                </p>
              </div>
            )}
          </>
        )}
      </>
    );
  };

  const totalPages = postData.pagination?.lastPage;
  return (
    <>
      <Col>
        <Search search={search} setSearch={setSearch} onClick={handleSearch} />
      </Col>
      <Container className="z-0">
        <div className="text-find">{t("findJob.titleNew")}</div>
        <Row className="z-0">
          <Col className="col-sort z-0" md={3}>
            <div className="clear-button">{renderClearAllButton()}</div>
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
                <input
                  type="radio"
                  name="update-frequency"
                  checked={updateFilter === null}
                  onChange={() => handleToggleUpdateFilter("anytime")}
                />{" "}
                {t("findJob.time4")}
              </label>

              <label>
                <input
                  type="radio"
                  name="update-frequency"
                  onChange={() => handleToggleUpdateFilter("24h")}
                />{" "}
                {t("findJob.time1")}
              </label>

              <label>
                <input
                  type="radio"
                  name="update-frequency"
                  onChange={() => handleToggleUpdateFilter("week")}
                />{" "}
                {t("findJob.time2")}
              </label>

              <label>
                <input
                  type="radio"
                  name="update-frequency"
                  onChange={() => handleToggleUpdateFilter("month")}
                />{" "}
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
