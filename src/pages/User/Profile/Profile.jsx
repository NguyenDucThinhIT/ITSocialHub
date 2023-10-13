import { Button, Card, Col, Container, Row } from "react-bootstrap";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";


import "./styles.css";

const Profile = () => {
  const { t } = useTranslation("common");
  //const user = useSelector((state) => state.auth.user);

  
  return (
    <div className="full-height">
      <Container style={{ marginTop: "30px", marginBottom: "30px" }}>
        <Row>
          <Col>
            <Row className="justify-content-center">
              <img
                className="profile-pic p-0"
                src={"assets/images/user.png"}
                alt=""
                id="imgAvatar"
              />
            </Row>
          </Col>
          <Col>
            <Row className="justify-content-center">
              <Card className="h-100 profile-card">
                <Card.Body>
                  <Row className="gutters">
                    <Col xl={12} lg={12} md={12} sm={12} xs={12}>
                      <h4 className="mb-3">{t("candidate.profile.profile")}</h4>
                    </Col>
                    <Col xl={8} lg={8} md={8} sm={12} xs={12}>
                      <div className="form-group mb-3">
                        <label htmlFor="lastName">
                        {t("candidate.profile.lastName")}
                        </label>
                        <input
                          type="text"
                          className="form-control"
                          name="lastName"
                          id="lastName"
                          value={"Nguyễn Đức"}
                          disabled
                        />
                      </div>
                    </Col>
                    <Col xl={4} lg={4} md={4} sm={12} xs={12}>
                      <div className="form-group mb-3">
                        <label htmlFor="firstName">
                        {t("candidate.profile.firstName")}
                        </label>
                        <input
                          type="text"
                          className="form-control"
                          name="firstName"
                          id="firstName"
                          value={"Thịnh"}
                          disabled
                        />
                      </div>
                    </Col>
                    <Col xl={8} lg={8} md={8} sm={12} xs={12}>
                      <div className="form-group mb-3">
                        <label htmlFor="birthday">
                        {t("candidate.profile.date")}
                        </label>
                        <input
                          type="text"
                          className="form-control"
                          name="birthday"
                          id="birthday"
                          value={"24/05/2002"}
                          disabled
                        />
                      </div>
                    </Col>
                    <Col xl={4} lg={4} md={4} sm={12} xs={12}>
                      <div className="form-group mb-3">
                        <label htmlFor="gender">
                        {t("candidate.profile.gender")}
                        </label>
                        <input
                          type="text"
                          className="form-control"
                          name="gender"
                          id="gender"
                          value={"Nam"}
                          disabled
                        />
                      </div>
                    </Col>
                    <Col xl={12} lg={12} md={12} sm={12} xs={12}>
                      <div className="form-group mb-3">
                        <label htmlFor="email">
                        {t("candidate.profile.email")}
                        </label>
                        <input
                          type="email"
                          className="form-control"
                          name="email"
                          id="email"
                          value={"thinhbeo@gmail.com"}
                          disabled
                        />
                      </div>
                    </Col>
                    <Col xl={12} lg={12} md={12} sm={12} xs={12}>
                      <div className="form-group">
                        <label htmlFor="phone">
                        {t("candidate.profile.phone")}
                        </label>
                        <input
                          type="tel"
                          className="form-control"
                          name="phone"
                          id="phone"
                          value={"0123456789"}
                          disabled
                        />
                      </div>
                    </Col>
                  </Row>
                  <Row className="gutters" style={{ marginTop: "20px" }}>
                    <Col xl={12} lg={12} md={12} sm={12} xs={12}>
                      <div className="d-flex justify-content-end">
                        <Button
                          variant="primary"
                          id="editButton"
                          //onClick={handleEdit}
                        >
                          <strong>{t("candidate.profile.edit")}</strong>
                        </Button>
                      </div>
                    </Col>
                  </Row>
                </Card.Body>
              </Card>
            </Row>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default Profile;
