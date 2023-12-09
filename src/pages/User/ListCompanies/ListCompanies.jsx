import React, { useEffect, useState } from "react";
import Search from "../../../components/Search/Search.jsx";
import { useTranslation } from "react-i18next";
import { Col, Container, Row } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faAngleLeft,
  faAngleRight,
  faBriefcase,
  faBuilding,
  faLocationDot,
} from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";
import Loading from "@/components/Loading/Loading";
import { getAllCompany } from "@/services/company.js";
import "./style.css";

function ListCompanies() {
  const { t } = useTranslation("common");
  const navigate = useNavigate();
  const [currentPage, setCurrentPage] = useState(1);
  const [companies, setCompanies] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [noResults, setNoResults] = useState(false);
  const [search, setSearch] = useState("");

  const getAllCompanies = async () => {
    setIsLoading(true);
    await getAllCompany(6, currentPage, null, null, search)
      .then((res) => {
        setCompanies(res.data);
        setNoResults(res.data.items.length === 0);
        console.log(noResults);
      })
      .catch((error) => {
        console.error("Error fetching company data:", error);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  useEffect(() => {
    getAllCompanies();
  }, [currentPage]);
  const handleInfo = (postId) => {
    navigate(`${postId}`);
  };
  const handleSearch = () => {
    setNoResults(false);
    getAllCompanies();
  };
  const renderCompanies = () => {
    return (
      <>
        {isLoading ? (
          <Loading />
        ) : (
          <>
            {companies?.items.length === 0 ? (
              <p className="no-results-message">
                {t("interviewer.interviewList.notFound")}
              </p>
            ) : (
              companies?.items.map((company) => (
                <Col
                  key={company.id}
                  className="col-lg-4 col-md-6 col-sm-12 col-12"
                >
                  <div className="card border-1 search-categories">
                    <div
                      className="d-flex company-detail"
                      role="button"
                      onClick={() => handleInfo(company.id)}
                    >
                      <img
                        src={company.logo_url}
                        alt={company.logo_url}
                        className="company-image"
                      />
                      <div className="company-info">
                        <h4 className="card-title fw-bold">{company.name}</h4>
                        <p>
                          <FontAwesomeIcon icon={faLocationDot} />
                          {company.address_main}
                        </p>
                      </div>
                    </div>
                    <div className="company-details">
                      <p>
                        <FontAwesomeIcon
                          icon={faBuilding}
                          className="building-icon"
                        />
                        {company.field}
                      </p>
                      <p>
                        <FontAwesomeIcon
                          icon={faBriefcase}
                          className="brief-icon"
                        />
                        {company.number_of_recruitment_post_hiring}{" "}
                        {t("candidate.appliedJob.active")}
                      </p>
                    </div>
                  </div>
                </Col>
              ))
            )}
          </>
        )}
      </>
    );
  };

  const totalPages = companies.pagination?.lastPage;

  return (
    <>
      <Col>
        <Search search={search} setSearch={setSearch} onClick={handleSearch} />
      </Col>
      <Container>
        <Row className="justify-content-center">
          {noResults ? (
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
          ) : (
            renderCompanies()
          )}
        </Row>
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
      </Container>
    </>
  );
}

export default ListCompanies;
