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
} from "@fortawesome/free-solid-svg-icons";
import "./style.css";


function ListCompanies() {
  const { t } = useTranslation("common");
  const [companies, setCompanies] = useState([]); 
  const [currentPage, setCurrentPage] = useState(1); 
  const companiesPerPage = 15; 

  // Mock data
  const mockCompanies = [
    {
      id: 1,
      name: "Công ty CP Xuất nhập khẩu Thương mại Đài Linh",
      address: "Thành phố Hồ Chí Minh",
      description: "Import and Export",
      jobsAvailable: 2,
      image: "/assets/cty/1.png",
    },
    {
      id: 2,
      name: "ADVIETNAM ",
      address: "Thành phố Hồ Chí Minh",
      description: "Marketing and Advertising",
      jobsAvailable: 2,
      image: "/assets/cty/2.png",
    },
    {
        id: 3,
        name: "Công ty Cổ phần Công nghệ KiotViet",
        address: "Hà Nội",
        description: "Information Technology and Services",
        jobsAvailable: 2,
        image: "/assets/cty/3.png",
      },
      {
        id: 4,
        name: "Công ty TNHH Nature Story",
        address: "Long An",
        description: "Cosmetics",
        jobsAvailable: 2,
        image: "/assets/cty/4.png",
      },
      {
        id: 5,
        name: "Water Care",
        address: "Bình Dương",
        description: "Renewables & Environment",
        jobsAvailable: 2,
        image: "/assets/cty/5.png",
      },
      {
        id: 6,
        name: "Công Ty Cổ Phần BPO Mắt Bão",
        address: "Thành phố Hồ Chí Minh",
        description: "Staffing and Recruiting",
        jobsAvailable: 5,
        image: "/assets/cty/6.png",
      },
  ];

  useEffect(() => {
    // Giả lập việc gọi API để lấy danh sách công ty dựa trên currentPage
    const startIndex = (currentPage - 1) * companiesPerPage;
    const endIndex = startIndex + companiesPerPage;
    const currentCompanies = mockCompanies.slice(startIndex, endIndex);
    setCompanies(currentCompanies);
  }, [currentPage]);

  const renderCompanies = () => {
    return companies.map((company) => (
      <Col key={company.id} className="col-md-4">
        <div className="card border-0 search-categories">
          <div className="d-flex">
            <img src={company.image} alt={company.name} className="company-image" />
            <div className="company-info">
              <h4 className="card-title fw-bold">{company.name}</h4>
              <p>{company.address}</p>
            </div>
          </div>
          <div className="company-details">
            <p><FontAwesomeIcon icon={faBuilding} />{company.description}</p>
            <p><FontAwesomeIcon icon={faBriefcase} />{company.jobsAvailable} {t("candidate.appliedJob.active")}</p>
          </div>
        </div>
      </Col>
    ));
  };

  const totalPages = Math.ceil(mockCompanies.length / companiesPerPage);

  return (
    <>
      <Col>
        <Search />
      </Col>
      <Container>
        <Row className="justify-content-center">{renderCompanies()}</Row>
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
