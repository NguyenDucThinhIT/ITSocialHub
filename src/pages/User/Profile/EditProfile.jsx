import { useEffect, useRef, useState } from "react";
import { Button, Card, Col, Container, Form, Row } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import { useTranslation } from "react-i18next";
import Swal from "sweetalert2";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Input from "@/components/InputFileds/InputFileds";
import AlertModal from "@/components/AlertModal";
import ProfilePic from "@/components/Avatar/ProfilePic";
import { upload } from "@/services/upload.api";
import { editProfile } from "@/services/profile.api";
import { setEdit, editSlice } from "@/redux/auth.slice";
import {
  validateName,
  validatePhone,
  validateImage,
  validateRequiredFields,
} from "@/components/Validated/Validated";

import "./styles.css";

const EditProfile = () => {
  const { t } = useTranslation("common");
  const user = useSelector((state) => state.auth.user);
  const dispatch = useDispatch();
  const email = user.email;
  const [firstName, setFirstName] = useState(user.first_name);
  const [lastName, setLastName] = useState(user.last_name);
  const [birthday, setBirthday] = useState(user.date_of_birth ? new Date(user.date_of_birth) : null);
  const [gender, setGender] = useState(user.gender);
  const [phone, setPhone] = useState(user.phonenumber);
  const [photo, setPhoto] = useState(user.image_url);
  const [fileImg, setFileImg] = useState();
  const imageFormControl = useRef();
  const isEmailDisabled = true;
  const [invalidFirstNameModal, setInvalidFirstNameModal] = useState(false);
  const [invalidLastNameModal, setInvalidLastNameModal] = useState(false);
  const [invalidBirthdayModal, setInvalidBirthdayModal] = useState(false);
  const [invalidPhoneModal, setInvalidPhoneModal] = useState(false);
  const [invalidImageModal, setInvalidImageModal] = useState(false);
  const [fillRequiredFieldsModal, setFillRequiredFieldsModal] = useState(false);
  const changeHandler = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    if (!validateImage(file)) {
      setInvalidImageModal(true);
      return;
    }
    setFileImg(file);
    reader.onloadend = () => {
      setPhoto(reader.result);
    };
    if (file) {
      reader.readAsDataURL(file);
    } else {
      setPhoto("/assets/images/ava.png");
    }
    Swal.mixin({
      toast: true,
      position: "top-end",
      timer: 5000,
      timerProgressBar: true,
      showConfirmButton: false,
    }).fire({
      icon: "success",
      text: t("candidate.tags.uploadAvatar"),
    });
  };
  const openFileDialog = (e) => {
    e.preventDefault();
    imageFormControl.current.click();
  };
  const onSubmit = async (e) => {
    e.preventDefault();
    if (
      !validateRequiredFields([firstName, lastName, birthday, gender, phone])
    ) {
      setFillRequiredFieldsModal(true);
      return;
    }
    if (!validateName(firstName)) {
      setInvalidFirstNameModal(true);
      return;
    }

    if (!validateName(lastName)) {
      setInvalidLastNameModal(true);
      return;
    }

    if (!validatePhone(phone)) {
      setInvalidPhoneModal(true);
      return;
    }
    dispatch(setEdit(false));
    let imageUrl = {};
    if (fileImg) {
      try {
        imageUrl = await upload(fileImg);
        setPhoto(imageUrl.url);
      } catch (error) {
        console.error("Error uploading image:", error);
        return;
      }
    }
    const updatedUser = {
      first_name: firstName,
      last_name: lastName,
      date_of_birth: birthday,
      gender: gender,
      phonenumber: phone,
      image_url: imageUrl.url, 
    };
    console.log(updatedUser);
    editProfile(updatedUser)
      .then((res) => {
        dispatch(editSlice(res.data));
        console.log(res.data);
      })
      .catch((error) => {
        console.log(error.response.data);
      });
    Swal.mixin({
      toast: true,
      position: "top-end",
      timer: 3000,
      timerProgressBar: true,
      showConfirmButton: false,
    }).fire({
      icon: "success",
      text: t("candidate.tags.saveInformation"),
    });
  };
  
  const handleCancel = () => {
    dispatch(setEdit(false));
  };
  const showAlert = (visible, setVisible, messageTitle, messageContent) => (
    <AlertModal
      visible={visible}
      setVisible={setVisible}
      messageTitle={t(messageTitle)}
      messageContent={t(messageContent)}
    />
  );
  return (
    <div className="full-height">
      <Container style={{ marginTop: "30px", marginBottom: "30px" }}>
        <Form onSubmit={onSubmit}>
          <Row className="align-items-center">
            <Col xl={6} lg={6} md={6}>
              <ProfilePic
                className="ava-profile"
                photo={photo}
                openFileDialog={openFileDialog}
                changeHandler={changeHandler}
                imageFormControl={imageFormControl}
              />
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
                          <Input
                            classStyle={`form-control ${
                              invalidLastNameModal ? "is-invalid" : ""
                            }${!lastName ? "is-invalid" : ""}`}
                            label={t("candidate.profile.lastName")}
                            data={lastName}
                            setData={setLastName}
                          />
                        </div>
                      </Col>
                      <Col xl={4} lg={4} md={4} sm={12} xs={12}>
                        <div className="form-group mb-3">
                          <Input
                            classStyle={`form-control ${
                              invalidFirstNameModal ? "is-invalid" : ""
                            }${!firstName ? "is-invalid" : ""}`}
                            label={t("candidate.profile.firstName")}
                            data={firstName}
                            setData={setFirstName}
                          />
                        </div>
                      </Col>
                      <Col xl={8} lg={8} md={8} sm={12} xs={12}>
                        <div className="form-group mb-3">
                          <label>{t("candidate.profile.date")}</label>
                          <DatePicker
                            selected={birthday} 
                            onChange={(date) => setBirthday(date)} 
                            dateFormat="dd-MM-yyyy" 
                            showYearDropdown
                            scrollableYearDropdown
                            yearDropdownItemNumber={30}
                            className={`form-control ${
                              invalidBirthdayModal ? "is-invalid" : ""
                            }${!birthday ? "is-invalid" : ""}`}
                          />
                        </div>
                      </Col>
                      <Col xl={4} lg={4} md={4} sm={12} xs={12}>
                        <div className="form-group mb-3">
                          <Input
                            classStyle="form-control"
                            label={t("candidate.profile.gender")}
                            data={gender}
                            setData={setGender}
                            inputType="gender"
                          />
                        </div>
                      </Col>
                      <Col xl={12} lg={12} md={12} sm={12} xs={12}>
                        <div className="form-group mb-3">
                          <Input
                            classStyle="form-control"
                            label={t("candidate.profile.email")}
                            data={email}
                            disabled={isEmailDisabled}
                          />
                        </div>
                      </Col>
                      <Col xl={12} lg={12} md={12} sm={12} xs={12}>
                        <div className="form-group">
                          <Input
                            classStyle={`form-control ${
                              invalidPhoneModal ? "is-invalid" : ""
                            } ${!phone ? "is-invalid" : ""}`}
                            label={t("candidate.profile.phone")}
                            data={phone}
                            setData={setPhone}
                          />
                        </div>
                      </Col>
                    </Row>
                    <Row className="gutters" style={{ marginTop: "20px" }}>
                      <Col xl={12} lg={12} md={12} sm={12} xs={12}>
                        <div className="d-flex">
                          <Button
                            variant="secondary"
                            className="ms-auto me-2 cancel-button"
                            onClick={handleCancel}
                            style={{
                              padding: "5px 10px",
                              backgroundColor: "red",
                              border: "1px solid red",
                              marginTop: "20px",
                              borderRadius: "20px",
                              width: "auto",
                              fontWeight: "bold",
                              color: "#ffffff",
                            }}
                          >
                            {t("candidate.profile.cancel")}
                          </Button>
                          <Button
                            variant="primary"
                            className="save-button"
                            type="submit"
                            style={{
                              padding: "5px 10px",
                              backgroundColor: "green",
                              border: "1px solid green",
                              marginTop: "20px",
                              borderRadius: "20px",
                              width: "auto",
                              fontWeight: "bold",
                              color: "#ffffff",
                            }}
                          >
                            {t("candidate.profile.save")}
                          </Button>
                        </div>
                      </Col>
                    </Row>
                  </Card.Body>
                </Card>
              </Row>
            </Col>
          </Row>
        </Form>
      </Container>
      {showAlert(
        invalidFirstNameModal,
        setInvalidFirstNameModal,
        "candidate.modal.noti",
        "candidate.modal.firstName"
      )}
      {showAlert(
        invalidLastNameModal,
        setInvalidLastNameModal,
        "candidate.modal.noti",
        "candidate.modal.lastName"
      )}
      {showAlert(
        invalidBirthdayModal,
        setInvalidBirthdayModal,
        "candidate.modal.noti",
        "candidate.modal.date"
      )}
      {showAlert(
        invalidPhoneModal,
        setInvalidPhoneModal,
        "candidate.modal.noti",
        "candidate.modal.phone"
      )}
      {showAlert(
        invalidImageModal,
        setInvalidImageModal,
        "candidate.modal.error",
        "candidate.modal.image"
      )}
      {showAlert(
        fillRequiredFieldsModal,
        setFillRequiredFieldsModal,
        "candidate.modal.noti",
        "candidate.modal.all"
      )}
    </div>
  );
};

export default EditProfile;
