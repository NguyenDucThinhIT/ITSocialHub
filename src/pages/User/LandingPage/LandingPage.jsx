import React, { useState } from "react";
import { Col, Container, Row, Image } from "react-bootstrap";
import { useTranslation } from "react-i18next";
import Search from "../../../components/Search/Search.jsx";
import { Link, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";
import "./style.css";
import { useEffect } from "react";
import { useSelector } from "react-redux";

function LandingPage() {
  const { t } = useTranslation("common");
  const user = useSelector((state) => state.auth.user);
  const [search, setSearch] = useState("");
  const navigate = useNavigate();
  const handleSearch = () => {
    navigate(`jobs?search=${search}`);
  };

  useEffect(() => {
    if(user?.role === 0){
      navigate(`admin/accounts`)
    } else if (user?.role === 2) {
      navigate(`dashboard`)
    }
  },[])
  return (
    <Container fluid className="landing-container gx-0">
        <div className="cus-search" >
      <div className="text-ld">{t("landing.title1")}</div>
      <Row>
      <Search search={search} setSearch={setSearch} onClick={handleSearch} />
      </Row>
      </div>
      <Row>
        <div className="landing-title text-center text-mid-ld pt-5">
        {t("landing.title2")}
        </div>
        <h5 className="landing-description text-center fw-light mb-5">
        {t("landing.title3")}
          <br />
          {t("landing.howDes2")}
        </h5>
      </Row>
      <Row className="mx-md-5 justify-content-center cus-list">
        <Col lg={4}>
          <Row className="no-pad">
            <Col xs={6} className="no-pad">
              <Link to="/jobs" className="cus-dec">
                <div className="landing-itemm cus-border image1">
                {t("landing.job1")}
                </div>
              </Link>
            </Col>
            <Col xs={6} className="no-pad">
              <Col xs={12}>
                <Link to="/jobs" className="cus-dec">
                  <div className="landing-item cus-border image2">
                  {t("landing.job2")}
                  </div>
                </Link>
              </Col>
              <Col xs={12}>
                <Link to="/jobs" className="cus-dec">
                  <div className="landing-item cus-border image3">
                  {t("landing.job3")}
                  </div>
                </Link>
              </Col>
            </Col>
          </Row>
          <Row>
            <Col xs={12} className="no-pad">
              <Link to="/jobs" className="cus-dec">
                <div className="landing-item cus-border image4">{t("landing.job4")}</div>
              </Link>
            </Col>
          </Row>
        </Col>
        <Col lg={4}>
          <Row>
            <Col xs={12} className="no-pad">
              <Link to="/jobs" className="cus-dec">
                <div className="landing-item cus-border image5">
                {t("landing.job5")}
                </div>
              </Link>
            </Col>
          </Row>
          <Row>
            <Col xs={6} className="no-pad">
              <Link to="/jobs" className="cus-dec">
                <div className="landing-item cus-border image6">
                {t("landing.job6")}
                </div>
              </Link>
            </Col>
            <Col xs={6} className="no-pad">
              <Link to="/jobs" className="cus-dec">
                <div className="landing-item cus-border image7">
                {t("landing.job7")}
                </div>
              </Link>
            </Col>
          </Row>
          <Row>
            <Col xs={12} className="no-pad">
              <Link to="/jobs" className="cus-dec">
                <div className="landing-item cus-border image8">
                {t("landing.job8")}
                </div>
              </Link>
            </Col>
          </Row>
        </Col>
        <Col lg={4}>
          <Row>
            <Col xs={6} className="no-pad">
              <Col xs={12}>
                <Link to="/jobs" className="cus-dec">
                  <div className="landing-item cus-border image9">
                  {t("landing.job9")}
                  </div>
                </Link>
              </Col>
              <Col xs={12}>
                <Link to="/jobs" className="cus-dec">
                  <div className="landing-item cus-border image10">
                  {t("landing.job10")}
                  </div>
                </Link>
              </Col>
            </Col>
            <Col xs={6} className="no-pad">
              <Link to="/jobs" className="cus-dec">
                <div className="landing-itemm cus-borderB image11">
                {t("landing.job11")}
                </div>
              </Link>
            </Col>
          </Row>
          <Row>
            <Col xs={12} className="no-pad">
              <Link to="/jobs" className="cus-dec">
                <div className="landing-item cus-borderB image12">
                {t("landing.job12")}
                </div>
              </Link>
            </Col>
          </Row>
        </Col>
        <Row className="no-pad">
          <Col xs={12} className="no-pad">
            <Link to="/jobs" className="cus-dec">
              <div className="landing-itemmm cus-borderB">
              {t("landing.job13")} <FontAwesomeIcon icon={faArrowRight} />
              </div>
            </Link>
          </Col>
        </Row>
        <Row className="mid-LP">
          <div className="text-mid-ld">
          {t("landing.content1")}
          </div>
          <Col xs={12} sm={6}>
          <Image src="assets/ldJob/a13.png" alt="#" className="image-lp" fluid />
          </Col>
          <Col xs={12} sm={6}>
            <div className="text-lp1">{t("landing.content2")}</div>
            <div className="text-lp2">
            {t("landing.content3")}
            </div>
            <div className="line-lp"></div>
            
            <div className="text-lp1">
            {t("landing.content4")}
            </div>
            <div className="text-lp2">
            {t("landing.content5")}
            </div>
            <div className="line-lp"></div>
          </Col>
        </Row>
        <Row className="mid-LP">
          <div className="text-mid-ld">{t("landing.content6")}</div>
          <Col xs={6} sm={3}>
            <img className="image-lp1" src="assets/ldJob/a16.png" alt="#" />
          </Col>
          <Col xs={6} sm={3}>
            <img className="image-lp2" src="assets/ldJob/a14.png" alt="#" />
          </Col>
          <Col xs={6} sm={3}>
            <img className="image-lp3" src="assets/ldJob/a15.png" alt="#" />
          </Col>
          <Col xs={6} sm={3}>
            <img className="image-lp4" src="assets/ldJob/a17.png" alt="#" />
          </Col>
        </Row>
      </Row>
    </Container>
  );
}

export default LandingPage;
