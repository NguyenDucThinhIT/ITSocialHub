import React, { useEffect, useRef, useState } from "react";
import Swal from "sweetalert2";
import { Button, Col, Container, Form, Row } from "react-bootstrap";
import { useTranslation } from "react-i18next";
import ConfirmModal from "../../../components/ConfirmModal";
import AlertModal from "../../../components/AlertModal";
import { useNavigate } from "react-router-dom";
import html2pdf from "html2pdf.js";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCalendarDays,
  faUser,
  faPhone,
  faEnvelope,
  faLink,
  faLocationDot,
} from "@fortawesome/free-solid-svg-icons";
import ProfilePic from "../../../components/Avatar/ProfilePic";
import { validateImage } from "../../../components/Validated/Validated";
import "./style.css";

function TestCV() {
  const navigate = useNavigate();
  const { t } = useTranslation("common");
  const imageFormControl = useRef();
  const [photo, setPhoto] = useState("");
  const [confirmSaveModal, setConfirmSaveModal] = useState(false);
  const [confirmCancelModal, setConfirmCancelModal] = useState(false);
  const [invalidImageModal, setInvalidImageModal] = useState(false);
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
    const element = document.getElementById("testCV");
    const opt = {
      margin: [10, 10, 10, 10],
      filename: `${jobValue}.pdf`,
      image: { type: "jpeg", quality: 0.98 },
      html2canvas: { scale: 2 },
      jsPDF: { unit: "mm", format: "a3", orientation: "portrait" },
    };
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
    navigate("/candidate/viewCV");
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
        <div id="testCV" className="container cv">
          <div className="row">
            <div className="col-md-5">
              <div className="infor-jobs">
                <div className="form-group names" style={{height: "45px"}}>
                  <input
                    type="text"
                    className="no-border"
                    id="name"
                    placeholder="Nhập họ tên"
                    required
                  />
                </div>
                <div className="form-group">
                  <input
                    type="text"
                    className="no-border"
                    id="job"
                    placeholder="Nhập tên job"
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

              <h2>Thông tin cá nhân</h2>
              <div className="form-groupp information">
                <div className="icon">
                  <FontAwesomeIcon icon={faCalendarDays} />
                </div>
                <div className="infor">
                  <input
                    type="text"
                    className="no-border"
                    id="date"
                    placeholder="Nhập ngày sinh"
                    required
                  />
                </div>
                <div className="icon">
                  <FontAwesomeIcon icon={faUser} />
                </div>
                <div className="infor">
                  <input
                    type="text"
                    className="no-border"
                    id="gender"
                    placeholder="Nhập giới tính"
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
                    placeholder="Nhập sđt"
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
                    placeholder="Nhập email"
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
                    placeholder="Nhập link FB"
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
                    placeholder="Nhập địa chỉ"
                    required
                  />
                </div>
              </div>
              <h2>Các kỹ năng mềm</h2>
              <div className="form-groupp tools">
                <textarea
                  className="no-border auto-resize-textarea"
                  id="careerObjective"
                  placeholder="Nhập mục tiêu nghề nghiệp"
                  required
                ></textarea>
              </div>
              <h2>Ngoại ngữ</h2>
              <div className="form-groupp language">
                <textarea
                  className="no-border"
                  id="education"
                  placeholder="Nhập thông tin về học vấn"
                  required
                ></textarea>
              </div>
            </div>
            <div className="col-md-7" style={{ marginTop: "10px" }}>
              <h2>Mục tiêu nghề nghiệp</h2>
              <div className="form-groupp ">
                <textarea
                  className="no-border"
                  id="careerObjective"
                  placeholder="Nhập mục tiêu nghề nghiệp"
                  required
                ></textarea>
              </div>
              <h2>Học vấn</h2>
              <div className="form-groupp">
                <textarea
                  className="no-border"
                  id="education"
                  placeholder="Nhập thông tin về học vấn"
                  required
                ></textarea>
              </div>
              <h2>Kỹ năng</h2>
              <div className="form-groupp">
                <textarea
                  className="no-border"
                  id="skills"
                  placeholder="Nhập kỹ năng của bạn"
                  required
                ></textarea>
              </div>
              <h2>Dự án đã thực hiện</h2>
              <div className="form-groupp">
                <textarea
                  className="no-border"
                  id="projects"
                  placeholder="Nhập thông tin về dự án đã thực hiện"
                  required
                ></textarea>
              </div>
              <Row className="gutters" style={{ marginTop: "20px" }}>
                <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
                  <div className="d-flex">
                    <Button
                      id="cancelButton"
                      variant="secondary"
                      className="ms-auto me-2 cancel-button"
                      onClick={onCancel}
                    >
                      {t("candidate.create.cancel")}
                    </Button>
                    <Button id="saveButton" variant="secondary" type="submit">
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

export default TestCV;
