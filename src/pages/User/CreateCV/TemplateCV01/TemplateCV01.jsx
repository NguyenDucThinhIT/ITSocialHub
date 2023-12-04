import React, { useEffect, useRef, useState } from "react";
import Swal from "sweetalert2";
import { Button, Col, Container, Form, Row } from "react-bootstrap";
import { useTranslation } from "react-i18next";
import ConfirmModal from "../../../../components/ConfirmModal";
import AlertModal from "../../../../components/AlertModal";
import { useNavigate } from "react-router-dom";
import html2pdf from "html2pdf.js";
import ReactHTMLToPDF from "react-html2pdf";
import { Preview, print } from "react-html2pdf";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCalendarDays,
  faUser,
  faPhone,
  faEnvelope,
  faLink,
  faLocationDot,
  
} from "@fortawesome/free-solid-svg-icons";
import ProfilePic from "../../../../components/Avatar/ProfilePic";
import {
  validateGender,
  validateName,
  validateImage,
  validateJob,
  validateBirthday,
  validateEmail,
  validatePhone,
  validateAddress,
} from "../../../../components/Validated/Validated";
import Input from "../../../../components/InputFileds/InputFileds";
import "./style.css";

function TemplateCV01() {
  const navigate = useNavigate();
  const { t } = useTranslation("common");
  const imageFormControl = useRef();
  const [photo, setPhoto] = useState("");
  const [name, setName] = useState("");
  const [job, setJob] = useState("");
  const [birthday, setBirthday] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");
  const [gender, setGender] = useState("None");
  const [confirmSaveModal, setConfirmSaveModal] = useState(false);
  const [confirmCancelModal, setConfirmCancelModal] = useState(false);
  const [invalidImageModal, setInvalidImageModal] = useState(false);
  const [invalidNameModal, setInvalidNameModal] = useState(false);
  const [invalidJobModal, setInvalidJobModal] = useState(false);
  const [invalidBirthdayModal, setInvalidBirthdayModal] = useState(false);
  const [invalidEmailModal, setInvalidEmailModal] = useState(false);
  const [invalidPhoneModal, setInvalidPhoneModal] = useState(false);
  const [invalidAddressModal, setInvalidAddressModal] = useState(false);
  const [invalidGenderModal, setInvalidGenderModal] = useState(false);
  const openFileDialog = (e) => {
    e.preventDefault();
    imageFormControl.current.click();
  };
  const changeHandler = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    if (!validateImage(file)) {
      setInvalidImageModal(true);
      return;
    }
    reader.onloadend = () => {
      setPhoto(reader.result);
    };
    if (file) {
      reader.readAsDataURL(file);
    } else {
      setPhoto("assets/images/user.png");
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
  const exportPDF = async () => {
    const jobInput = document.getElementById("job");
    const jobValue = jobInput.value;
    const saveButton = document.getElementById("saveButton");
    const cancelButton = document.getElementById("cancelButton");
    saveButton.style.display = "none";
    cancelButton.style.display = "none";
    const element = document.getElementById("CV01");
    const opt = {
      margin: [10, 10, 10, 10],
      filename: `${jobValue}.pdf`,
      image: { type: "jpeg", quality: 0.98 },
      html2canvas: { scale: 2 },
      jsPDF: { unit: "mm", format: "a3", orientation: "portrait" },
    };
    const h2Elements = document.querySelectorAll("#CV01 h2");
    h2Elements.forEach((h2) => {
      h2.style.marginTop = "-20px";
    });
    await html2pdf().set(opt).from(element).save();
    setConfirmSaveModal(false);
    Swal.mixin({
      toast: true,
      position: "top-end",
      timer: 5000,
      timerProgressBar: true,
      showConfirmButton: false,
    }).fire({
      icon: "success",
      text: t("candidate.tags.createCV"),
    });
    navigate("/CVs");
  };
  const handleCancelSaveCV = () => {
    setConfirmSaveModal(false);
  };
  const handleCancellSaveCV = () => {
    setConfirmCancelModal(false);
  };
  const handleConfirmSaveCV = () => {
    setConfirmSaveModal(true);
  };
  const handleConfirmCancelCV = () => {
    setConfirmCancelModal(true);
  };

  function autoResizeTextarea(element) {
    element.style.height = "auto";
    element.style.height = element.scrollHeight + "px";
  }

  useEffect(() => {
    const textareas = document.querySelectorAll("textarea");
    textareas.forEach((textarea) => {
      autoResizeTextarea(textarea);
      textarea.addEventListener("input", () => {
        autoResizeTextarea(textarea);
      });
    });
  }, []);
  const onSubmit = (e) => {
    if (!photo) {
      Swal.fire({
        icon: "question",
        title: t("candidate.modal.error"),
        text: t("candidate.modal.image1"),
      });
      return;
    }
    e.preventDefault();
    if (
      !validateGender(gender)
    ) {
      setInvalidGenderModal(true);
      return;
    }
    if (!validateName(name)) {
      setInvalidNameModal(true);
      return;
    }
    if (!validateJob(job)) {
      setInvalidJobModal(true);
      return;
    }
    if (!validateJob(job)) {
      setInvalidJobModal(true);
      return;
    }
    if (!validateBirthday(birthday)) {
      setInvalidBirthdayModal(birthday);
      return;
    }
    if (!validatePhone(phone)) {
      setInvalidPhoneModal(true);
      return;
    }
    if (!validateEmail(email)) {
      setInvalidEmailModal(true);
      return;
    }
    if (!validateAddress(address)) {
      setInvalidAddressModal(true);
      return;
    }
    handleConfirmSaveCV();
  };
  const onCancel = () => {
    handleConfirmCancelCV();
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
    <>
      <Form onSubmit={onSubmit} className="pt-3">
        <div id="CV01" className="container cvs">
          <div className="row">
            <div className="col-md-5">
              <div className="infor-jobs">
                <div className="form-group names" style={{ height: "45px" }}>
                  <input
                    type="text"
                    className="no-border"
                    id="name"
                    placeholder={t("candidate.create.fullname")}
                    value={name}
                    onChange={(e) => {
                      setName(e.target.value);
                    }}
                    required
                  />
                </div>
                <div className="form-group">
                  <input
                    type="text"
                    className="no-border"
                    id="job"
                    placeholder={t("candidate.create.jobTitleP")}
                    value={job}
                    onChange={(e) => {
                      setJob(e.target.value);
                    }}
                    required
                  />
                </div>
              </div>
              <div
                className="image-container"
                style={{ marginTop: "15px", marginBottom: "20px" }}
              >
                <ProfilePic
                  photo={photo}
                  openFileDialog={openFileDialog}
                  changeHandler={changeHandler}
                  imageFormControl={imageFormControl}
                  showUploadButton={false}
                  required
                />
              </div>

              <h2>{t("candidate.profile.profile")}</h2>
              <div className="form-groupp information">
                <div className="icon">
                  <FontAwesomeIcon icon={faCalendarDays} />
                </div>
                <div className="infor">
                  <input
                    type="text"
                    className="no-border"
                    id="date"
                    placeholder={t("candidate.create.dateP")}
                    value={birthday}
                    onChange={(e) => {
                      setBirthday(e.target.value);
                    }}
                    required
                  />
                </div>
                <div className="icon">
                  <FontAwesomeIcon icon={faUser} />
                </div>
                <div className="infor">
                  <Input
                    className="gender"
                    inputType="gender"
                    classStyle="gender"
                    data={gender}
                    setData={setGender}
                    required
                  />
                </div>
                <div className="icon">
                  <FontAwesomeIcon icon={faPhone} />
                </div>
                <div className="infor">
                  <input
                    type="text"
                    className="no-border"
                    id="phone"
                    placeholder={t("candidate.create.phoneP")}
                    value={phone}
                    onChange={(e) => {
                      setPhone(e.target.value);
                    }}
                    required
                  />
                </div>
                <div className="icon">
                  <FontAwesomeIcon icon={faEnvelope} />
                </div>
                <div className="infor">
                  <input
                    type="text"
                    className="no-border"
                    id="email"
                    placeholder={t("candidate.create.emailP")}
                    value={email}
                    onChange={(e) => {
                      setEmail(e.target.value);
                    }}
                    required
                  />
                </div>
                <div className="icon">
                  <FontAwesomeIcon icon={faLink} />
                </div>
                <div className="infor">
                  <input
                    type="text"
                    className="no-border"
                    id="fb"
                    placeholder={t("candidate.create.linkFB")}
                    required
                  />
                </div>
                <div className="icon">
                  <FontAwesomeIcon icon={faLocationDot} />
                </div>
                <div className="infor">
                  <input
                    type="text"
                    className="no-border"
                    id="address"
                    placeholder={t("candidate.create.addressP")}
                    value={address}
                    onChange={(e) => {
                      setAddress(e.target.value);
                    }}
                    required
                  />
                </div>
              </div>
              <h2>{t("candidate.create.tools")}</h2>
              <div className="form-groupp tools">
                <textarea
                  className="no-border auto-resize-textarea"
                  id="careerObjective"
                  placeholder={t("candidate.create.toolsP")}
                  required
                ></textarea>
              </div>
              <h2>{t("candidate.create.language")}</h2>
              <div className="form-groupp language">
                <textarea
                  className="no-border"
                  id="language"
                  placeholder={t("candidate.create.languageP")}
                  required
                ></textarea>
              </div>
            </div>
            <div className="col-md-7" style={{ marginTop: "10px" }}>
              <h2>{t("candidate.create.shortBio")}</h2>
              <div className="form-groupp ">
                <textarea
                  className="no-border"
                  id="careerObjective"
                  placeholder={t("candidate.create.shortBioP")}
                  required
                ></textarea>
              </div>
              <h2>{t("candidate.create.academic")}</h2>
              <div className="form-groupp">
                <textarea
                  className="no-border"
                  id="education"
                  placeholder={t("candidate.create.academicP")}
                  required
                ></textarea>
              </div>
              <h2>{t("candidate.create.skill")}</h2>
              <div className="form-groupp">
                <textarea
                  className="no-border"
                  id="skills"
                  placeholder={t("candidate.create.skillDescriptionP")}
                  required
                ></textarea>
              </div>
              <h2>{t("candidate.create.project")}</h2>
              <div className="form-groupp">
                <textarea
                  className="no-border"
                  id="projects"
                  placeholder={t("candidate.create.projectP")}
                  required
                ></textarea>
              </div>
              <Row className="gutters" style={{ marginTop: "20px",marginBottom: "20px" }}>
                <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
                  <div className="d-flex justify-content-end">
                    <Button
                      id="cancelButton"
                      variant="secondary"
                      className="me-2 cancel-button"
                      onClick={onCancel}
                    >
                      {t("candidate.create.cancel")}
                    </Button>
                    <Button id="saveButton" type="submit">
                      {t("candidate.create.save")}
                    </Button>
                  </div>
                </div>
              </Row>
            </div>
          </div>
          {showAlert(
            invalidImageModal,
            setInvalidImageModal,
            "candidate.modal.error",
            "candidate.modal.image"
          )}
          {showAlert(
            invalidGenderModal,
            setInvalidGenderModal,
            "candidate.modal.error",
            "candidate.modal.gender"
          )}
          {showAlert(
            invalidNameModal,
            setInvalidNameModal,
            "candidate.modal.notiCV",
            "candidate.modal.fullName"
          )}
          {showAlert(
            invalidJobModal,
            setInvalidJobModal,
            "candidate.modal.notiCV",
            "candidate.modal.job"
          )}
          {showAlert(
            invalidBirthdayModal,
            setInvalidBirthdayModal,
            "candidate.modal.notiCV",
            "candidate.modal.date"
          )}
          {showAlert(
            invalidEmailModal,
            setInvalidEmailModal,
            "candidate.modal.notiCV",
            "candidate.modal.email"
          )}
          {showAlert(
            invalidPhoneModal,
            setInvalidPhoneModal,
            "candidate.modal.notiCV",
            "candidate.modal.phone"
          )}
          {showAlert(
            invalidAddressModal,
            setInvalidAddressModal,
            "candidate.modal.notiCV",
            "candidate.modal.address"
          )}
          <ConfirmModal
            visible={confirmSaveModal}
            setVisible={setConfirmSaveModal}
            messageTitle={t("candidate.notice.saveCV")}
            messageContent={t("candidate.notice.savePostContentCV")}
            action={exportPDF}
            onCancel={() => handleCancelSaveCV}
          />
          <ConfirmModal
            visible={confirmCancelModal}
            setVisible={setConfirmCancelModal}
            messageTitle={t("candidate.notice.cancel")}
            messageContent={t("candidate.notice.cancelPostContent")}
            action={() => {
              navigate("/createCV");
              setConfirmCancelModal(false);
            }}
            onCancel={() => handleCancellSaveCV}
          />
        </div>
      </Form>
    </>
  );
}

export default TemplateCV01;
