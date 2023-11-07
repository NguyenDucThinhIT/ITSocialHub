import React, { useEffect, useRef, useState } from "react";
import Swal from "sweetalert2";
import { Button, Col, Container, Form, Row } from "react-bootstrap";
import { useTranslation } from "react-i18next";
import ConfirmModal from "../../../../components/ConfirmModal";
import AlertModal from "../../../../components/AlertModal";
import { useNavigate } from "react-router-dom";
import html2pdf from "html2pdf.js";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCalendarDays,
  faUser,
  faPhone,
  faEnvelope,
  faLink,
  
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
import { faSquareFacebook } from "@fortawesome/free-brands-svg-icons";

function TemplateCV03() {
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
    const element = document.getElementById("CV03");
    const opt = {
      margin: [5, 5, 10, 5],
      filename: `${jobValue}.pdf`,
      image: { type: "jpeg", quality: 0.98 },
      html2canvas: { scale: 2 },
      jsPDF: { unit: "mm", format: "a3", orientation: "portrait" },
    };
    const h2Elements = document.querySelectorAll("#CV03 h2");
    h2Elements.forEach((h2) => {
      h2.style.marginBottom = "35px";
    });
    const headerCusElements = document.querySelectorAll("#CV03 .header-cus");
    headerCusElements.forEach((headerCusElement) => {
      headerCusElement.style.backgroundPosition = "center 5px";
    });
    const textareaElements = document.querySelectorAll("#CV03 textarea");
    textareaElements.forEach((textarea) => {
      textarea.style.marginTop = "-20px";
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
    e.preventDefault();
    // if (!validateGender(gender)) {
    //   setInvalidGenderModal(true);
    //   return;
    // }
    if (!photo) {
      Swal.fire({
        icon: "question",
        title: t("candidate.modal.error"),
        text: t("candidate.modal.image1"),
      });
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
    // if (!validateBirthday(birthday)) {
    //   setInvalidBirthdayModal(birthday);
    //   return;
    // }
    if (!validatePhone(phone)) {
      setInvalidPhoneModal(true);
      return;
    }
    if (!validateEmail(email)) {
      setInvalidEmailModal(true);
      return;
    }
    // if (!validateAddress(address)) {
    //   setInvalidAddressModal(true);
    //   return;
    // }
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
      <Form onSubmit={onSubmit}>
        <div id="CV03" className="container cvs">
          <div className="row">
            <div className="col-md-5">
              <div className="image-container">
                <ProfilePic
                  photo={photo}
                  openFileDialog={openFileDialog}
                  changeHandler={changeHandler}
                  imageFormControl={imageFormControl}
                  showUploadButton={false}
                  required
                />
              </div>
            </div>
            <div className="col-md-7">
              <div className="name-job">
                <div className="form-group names">
                  <input
                    type="text"
                    className="no-border textarea-80-percent"
                    id="name"
                    placeholder={t("candidate.create.fullname")}
                    value={name}
                    onChange={(e) => {
                      setName(e.target.value);
                    }}
                    required
                  />
                </div>
                <div className="form-groupp">
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
              <div className="contact">
                <div className="infor">
                  <FontAwesomeIcon icon={faPhone} />
                  <input
                    type="text"
                    className="no-border textarea-30-percent"
                    id="phone"
                    placeholder={t("candidate.create.phoneP")}
                    value={phone}
                    onChange={(e) => {
                      setPhone(e.target.value);
                    }}
                    required
                  />
                  <FontAwesomeIcon icon={faEnvelope} />
                  <input
                    type="text"
                    className="no-border textarea-40-percent"
                    id="email"
                    placeholder={t("candidate.create.emailP")}
                    value={email}
                    onChange={(e) => {
                      setEmail(e.target.value);
                    }}
                    required
                  />
                </div>
               
                <div>
                <FontAwesomeIcon icon={faSquareFacebook} />
                  <input
                    type="text"
                    className="no-border textarea-60-percent"
                    id="fb"
                    placeholder={t("candidate.create.linkFB")}
                    required
                  />
                </div>
              </div>
              
            </div>
            <div className="line"></div>            
            <div className="col-md-4 header-custom">
              <h2 className="header-cus">{t("candidate.create.academic")}</h2>
                <div className="form-groupp educations">
                  <textarea
                    className="no-border textarea-80-percent"
                    id="education"
                    placeholder={t("candidate.create.academicP")}
                    required
                  ></textarea>
                </div>
                <h2 className="header-cus">{t("candidate.create.skill")}</h2>
                <div className="form-groupp ">
                  <textarea
                    className="no-border textarea-80-percent"
                    id="skills"
                    placeholder={t("candidate.create.skillDescriptionP")}
                    required
                  ></textarea>
                </div>
                <h2 className="header-cus">{t("candidate.create.language")}</h2>
              <div className="form-groupp ">
                <textarea
                  className="no-border textarea-80-percent"
                  id="language"
                  placeholder={t("candidate.create.languageP")}
                  required
                ></textarea>
              </div>
              
            </div>
            <div className="col-md-1 line-right"></div>
            <div className="col-md-7 header-tom">
              
            <h2 className="bio">{t("candidate.create.shortBio")}</h2>
              <div className="form-groupp careerObjective">
                <textarea
                  className="no-border textarea-80-percent"
                  id="careerObjective"
                  placeholder={t("candidate.create.shortBioP")}
                  required
                ></textarea>
              </div>
              <div className="text-line">
                <h2 className="bt-cus">{t("candidate.create.tools")}</h2>
              </div>
              <div className="form-groupp tools">
                <textarea
                  className="no-border auto-resize-textarea"
                  id="careerObjective"
                  placeholder={t("candidate.create.toolsP")}
                  required
                ></textarea>
              </div>
              <div className="text-line">
                <h2 className="bt-cus">{t("candidate.create.project")}</h2>
              </div>
              <div className="form-groupp">
                <textarea
                  className="no-border"
                  id="projects"
                  placeholder={t("candidate.create.projectP")}
                  required
                ></textarea>
              </div>
              
              </div>          
            <Row className="gutters" style={{ marginTop: "20px", marginBottom: "20px" }}>
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
          {showAlert(
            invalidImageModal,
            setInvalidImageModal,
            "candidate.modal.error",
            "candidate.modal.image"
          )}
          {/* {showAlert(
            invalidGenderModal,
            setInvalidGenderModal,
            "candidate.modal.error",
            "candidate.modal.gender"
          )} */}
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
          {/* {showAlert(
            invalidAddressModal,
            setInvalidAddressModal,
            "candidate.modal.notiCV",
            "candidate.modal.address"
          )} */}
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

export default TemplateCV03;
