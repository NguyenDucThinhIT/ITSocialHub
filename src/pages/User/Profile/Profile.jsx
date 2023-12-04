import { Button, Card, Col, Container, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useTranslation } from "react-i18next";
import { setEdit } from "@/redux/auth.slice";

import "./styles.css";

const Profile = () => {
  const { t } = useTranslation("common");

  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.user);

  const handleEdit = () => {
    dispatch(setEdit(true));
  };
  return (
    <div className="full-height">
      <Container style={{ marginTop: "30px", marginBottom: "30px" }}>
        <Row>
          <Col>
            <Row className="justify-content-center">
              <img
                className="profile-pic p-0"
                src={user?.image_url || "assets/images/user.png"}
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
                      <h2 className="mb-3 font-bold">{t("candidate.profile.profile")}</h2>
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
                          value={user?.last_name || "None"}
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
                          value={user?.first_name || "None"}
                          disabled
                        />
                      </div>
                    </Col>
                    <Col xl={8} lg={8} md={8} sm={12} xs={12}>
                      <div className="form-group mb-3">
                        <label htmlFor="birthday">
                          {t("candidate.profile.date")}
                        </label>
                        <DatePicker
                          selected={
                            user?.date_of_birth
                              ? new Date(user.date_of_birth)
                              : null
                          }
                          className="form-control"
                          dateFormat="dd-MM-yyyy"
                          showYearDropdown
                          scrollableYearDropdown
                          yearDropdownItemNumber={15}
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
                          value={user?.gender || "None"}
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
                          value={user?.email || "None"}
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
                          value={user?.phonenumber || "None"}
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
                          onClick={handleEdit}
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
