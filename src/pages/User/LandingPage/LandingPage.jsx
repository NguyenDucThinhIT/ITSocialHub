import React from "react";
import { Col, Container, Row, Image } from "react-bootstrap";
import { useTranslation } from "react-i18next";
import Search from "../../../components/Search/Search.jsx";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";
import "./style.css";

function LandingPage() {
  const { t } = useTranslation("common");
  return (
    <Container fluid className="landing-container gx-0">
        <div className="cus-search" >
      <div className="text-ld">Khám phá 15000+ việc làm mới hằng tháng!</div>
      <Row>
        <Search/>
      </Row>
      </div>
      <Row>
        <div className="landing-title text-center text-mid-ld pt-5">
          Tìm kiếm công việc mơ ước{" "}
        </div>
        <h5 className="landing-description text-center fw-light mb-5">
          Lựa chọn ngành nghề liên quan tới công việc của bạn
          <br />
          {t("landing.howDes2")}
        </h5>
      </Row>
      <Row className="mx-md-5 justify-content-center cus-list">
        <Col lg={4}>
          <Row className="no-pad">
            <Col xs={6} className="no-pad">
              <Link to="/profile" className="cus-dec">
                <div className="landing-itemm cus-border image1">
                  Phát Triển Kinh Doanh & Bán Hàng
                </div>
              </Link>
            </Col>
            <Col xs={6} className="no-pad">
              <Col xs={12}>
                <Link to="/profile" className="cus-dec">
                  <div className="landing-item cus-border image2">
                    Tài Chính & Kế Toán
                  </div>
                </Link>
              </Col>
              <Col xs={12}>
                <Link to="/profile" className="cus-dec">
                  <div className="landing-item cus-border image3">
                    Quản Lý Nhân Sự
                  </div>
                </Link>
              </Col>
            </Col>
          </Row>
          <Row>
            <Col xs={12} className="no-pad">
              <Link to="/profile" className="cus-dec">
                <div className="landing-item cus-border image4">Marketing</div>
              </Link>
            </Col>
          </Row>
        </Col>
        <Col lg={4}>
          <Row>
            <Col xs={12} className="no-pad">
              <Link to="/profile" className="cus-dec">
                <div className="landing-item cus-border image5">
                  Công Nghệ Thông Tin
                </div>
              </Link>
            </Col>
          </Row>
          <Row>
            <Col xs={6} className="no-pad">
              <Link to="/profile" className="cus-dec">
                <div className="landing-item cus-border image6">
                  Trí Tuệ Nhân Tạo
                </div>
              </Link>
            </Col>
            <Col xs={6} className="no-pad">
              <Link to="/profile" className="cus-dec">
                <div className="landing-item cus-border image7">
                  Digital Marketing
                </div>
              </Link>
            </Col>
          </Row>
          <Row>
            <Col xs={12} className="no-pad">
              <Link to="/profile" className="cus-dec">
                <div className="landing-item cus-border image8">
                  Thiết Kế Đồ Họa
                </div>
              </Link>
            </Col>
          </Row>
        </Col>
        <Col lg={4}>
          <Row>
            <Col xs={6} className="no-pad">
              <Col xs={12}>
                <Link to="/profile" className="cus-dec">
                  <div className="landing-item cus-border image9">
                    Quan Hệ Công Chúng
                  </div>
                </Link>
              </Col>
              <Col xs={12}>
                <Link to="/profile" className="cus-dec">
                  <div className="landing-item cus-border image10">
                    Truyền Thông & Sự Kiện
                  </div>
                </Link>
              </Col>
            </Col>
            <Col xs={6} className="no-pad">
              <Link to="/profile" className="cus-dec">
                <div className="landing-itemm cus-borderB image11">
                  Hành Chính Nhân Sự
                </div>
              </Link>
            </Col>
          </Row>
          <Row>
            <Col xs={12} className="no-pad">
              <Link to="/profile" className="cus-dec">
                <div className="landing-item cus-borderB image12">
                  Logistics
                </div>
              </Link>
            </Col>
          </Row>
        </Col>
        <Row className="no-pad">
          <Col xs={12} className="no-pad">
            <Link to="/jobs" className="cus-dec">
              <div className="landing-itemmm cus-borderB">
                Tìm hiểu thêm <FontAwesomeIcon icon={faArrowRight} />
              </div>
            </Link>
          </Col>
        </Row>
        <Row className="mid-LP">
          <div className="text-mid-ld">
            Tham gia cộng đồng của Talent Harbor
          </div>
          <Col xs={12} sm={6}>
          <Image src="assets/ldJob/a13.png" alt="#" className="image-lp" fluid />
          </Col>
          <Col xs={12} sm={6}>
            <div className="text-lp1">Khám phá nghề nghiệp mơ ước</div>
            <div className="text-lp2">
              Khám phá nghề nghiệp mơ ước và ứng tuyển hàng ngàn việc làm nổi
              bật nhất hiện nay!
            </div>
            <div className="line-lp"></div>
            
            <div className="text-lp1">
              Giao lưu với cộng đồng
            </div>
            <div className="text-lp2">
              Có cơ hội kết nối với 1.000.000+ ứng viên tài năng và nắm bắt
              cơ hội việc làm mới nhất
            </div>
            <div className="line-lp"></div>
          </Col>
        </Row>
        <Row className="mid-LP">
          <div className="text-mid-ld">Talent Harbor trên truyền thông</div>
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
