import { Row, Button, Col, Form } from "react-bootstrap";
import { useTranslation } from "react-i18next";

import "./style.css";

const ProfilePic = ({
  className,
  photo,
  openFileDialog,
  changeHandler,
  imageFormControl,
  showUploadButton = true,
}) => {
  const { t } = useTranslation("common");
  return (
    <>
      <Row className="justify-content-center align-items-center">
        <Col xl={6} lg={6} md={6} sm={8} xs={10}>
          <img
            className={`profile-pic image-avatar ${className}`} 
            src={photo || "/assets/images/user.png"}
            onClick={openFileDialog}
            alt=""
          />
          {showUploadButton && (
            <Button id="upAvatar" variant="secondary" onClick={openFileDialog}>
              {t("candidate.profile.uploadAvatar")}
            </Button>
          )}
        </Col>
      </Row>

      <Row>
        <Form className="image-form form-control" style={{ display: "none" }}>
          <input
            ref={imageFormControl}
            type="file"
            className="image-form--input"
            onChange={changeHandler}
          />
        </Form>
      </Row>
    </>
  );
};

export default ProfilePic;
