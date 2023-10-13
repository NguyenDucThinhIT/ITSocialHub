import { useRef, useState } from "react";
import { Button, Col, Container, Form, Row } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import html2pdf from "html2pdf.js";
import Swal from "sweetalert2";
import ConfirmModal from "../../../components/ConfirmModal";
import ProfilePic from "../../../components/Avatar/ProfilePic";
import AlertModal from "../../../components/AlertModal";
import {
  validateName,
  validateImage,
  validateJob,
  validateBirthday,
  validateEmail,
  validatePhone,
  validateAddress,
  validateMajor,
  validateUniversity,
  validateBeginYear,
  validateEndYear,
  validateYearRange,
  validateGPA,
  validateRequiredFields,
} from "../../../components/Validated/Validated";

import PersonalInformation from "./PersonalInfor";
import PersonalAcademic from "./PersonalAcademic";
import SkillsExperience from "./SkillsExperience";
import "./style.css";

const CreateCV = () => {
  const navigate = useNavigate();
  const { t } = useTranslation("common");
  const [photo, setPhoto] = useState("");
  const [firstname, setFirstName] = useState("");
  const [lastname, setLastName] = useState("");
  const [job, setJob] = useState("");
  const [shortBio, setShortBio] = useState("");
  const [birthday, setBirthday] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [majors, setMajors] = useState("");
  const [university, setUniversity] = useState("");
  const [graduationIn, setGraduationIn] = useState("");
  const [graduationOut, setGraduationOut] = useState("");
  const [gpa, setGpa] = useState("");
  const [language, setLanguage] = useState("");
  const [skillDescription, setSkillDescription] = useState("");
  const [tools, setTools] = useState("");
  const [experJob, setExperJob] = useState("");
  const [company, setCompany] = useState("");
  const [experIn, setExperIn] = useState("");
  const [experOut, setExperOut] = useState("");
  const [location, setLocation] = useState("");
  const imageFormControl = useRef();
  const [confirmSaveModal, setConfirmSaveModal] = useState(false);
  const [confirmCancelModal, setConfirmCancelModal] = useState(false);
  const [invalidFirstNameModal, setInvalidFirstNameModal] = useState(false);
  const [invalidLastNameModal, setInvalidLastNameModal] = useState(false);
  const [invalidImageModal, setInvalidImageModal] = useState(false);
  const [invalidJobModal, setInvalidJobModal] = useState(false);
  const [invalidBirthdayModal, setInvalidBirthdayModal] = useState(false);
  const [invalidEmailModal, setInvalidEmailModal] = useState(false);
  const [invalidPhoneModal, setInvalidPhoneModal] = useState(false);
  const [invalidAddressModal, setInvalidAddressModal] = useState(false);
  const [invalidMajorModal, setInvalidMajorModal] = useState(false);
  const [invalidUniversityModal, setInvalidUniversityModal] = useState(false);
  const [invalidBeginYearModal, setInvalidBeginYearModal] = useState(false);
  const [invalidEndYearModal, setInvalidEndYearModal] = useState(false);
  const [invalidYearRangeModal, setInvalidYearRangeModal] = useState(false);
  const [invalidGPAModal, setInvalidGPAModal] = useState(false);
  const [invalidExperJobModal, setInvalidExperJobModal] = useState(false);
  const [invalidCompanyModal, setInvalidCompanyModal] = useState(false);
  const [invalidExperInModal, setInvalidExperInModal] = useState(false);
  const [invalidExperOutModal, setInvalidExperOutModal] = useState(false);
  const [invalidExperYearRangeModal, setInvalidExperYearRangeModal] =
    useState(false);
  const [invalidLocationModal, setInvalidLocationModal] = useState(false);
  const [fillRequiredFieldsModal, setFillRequiredFieldsModal] = useState(false);

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

  const openFileDialog = (e) => {
    e.preventDefault();
    imageFormControl.current.click();
  };
  const handleConfirmSaveCV = () => {
    setConfirmSaveModal(true);
  };
  const handleConfirmCancelCV = () => {
    setConfirmCancelModal(true);
  };
  const exportPDF = async () => {
    const saveButton = document.getElementById("saveButton");
    const cancelButton = document.getElementById("cancelButton");
    saveButton.style.display = "none";
    cancelButton.style.display = "none";
    const element = document.getElementById("createCV");
    const opt = {
      margin: [10, 10, 10, 10],
      filename: `${job}.pdf`,
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

  const onSubmit = (e) => {
    e.preventDefault();
    if (
      !validateRequiredFields([
        firstname,
        lastname,
        job,
        birthday,
        email,
        phone,
        address,
        majors,
        university,
        graduationIn,
        graduationOut,
        gpa,
        experJob,
        company,
        experIn,
        experOut,
        location,
      ])
    ) {
      setFillRequiredFieldsModal(true);
      setFirstName((prev) => (prev.trim() === "" ? prev : prev.trim()));
      setLastName((prev) => (prev.trim() === "" ? prev : prev.trim()));
      setJob((prev) => (prev.trim() === "" ? prev : prev.trim()));
      setBirthday((prev) => (prev.trim() === "" ? prev : prev.trim()));
      setEmail((prev) => (prev.trim() === "" ? prev : prev.trim()));
      setPhone((prev) => (prev.trim() === "" ? prev : prev.trim()));
      setAddress((prev) => (prev.trim() === "" ? prev : prev.trim()));
      setMajors((prev) => (prev.trim() === "" ? prev : prev.trim()));
      setUniversity((prev) => (prev.trim() === "" ? prev : prev.trim()));
      setGraduationIn((prev) => (prev.trim() === "" ? prev : prev.trim()));
      setGraduationOut((prev) => (prev.trim() === "" ? prev : prev.trim()));
      setGpa((prev) => (prev.trim() === "" ? prev : prev.trim()));
      setExperJob((prev) => (prev.trim() === "" ? prev : prev.trim()));
      setCompany((prev) => (prev.trim() === "" ? prev : prev.trim()));
      setExperIn((prev) => (prev.trim() === "" ? prev : prev.trim()));
      setExperOut((prev) => (prev.trim() === "" ? prev : prev.trim()));
      setLocation((prev) => (prev.trim() === "" ? prev : prev.trim()));
      return;
    }
    if (!validateName(firstname)) {
      setInvalidFirstNameModal(true);
      return;
    }

    if (!validateName(lastname)) {
      setInvalidLastNameModal(true);
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

    if (!validateEmail(email)) {
      setInvalidEmailModal(true);
      return;
    }
    if (!validatePhone(phone)) {
      setInvalidPhoneModal(true);
      return;
    }
    if (!validateAddress(address)) {
      setInvalidAddressModal(true);
      return;
    }
    if (!validateMajor(majors)) {
      setInvalidMajorModal(true);
      return;
    }
    if (!validateUniversity(university)) {
      setInvalidUniversityModal(true);
      return;
    }
    if (!validateBeginYear(graduationIn)) {
      setInvalidBeginYearModal(true);
      return;
    }
    if (!validateEndYear(graduationOut)) {
      setInvalidEndYearModal(true);
      return;
    }
    if (!validateYearRange(graduationIn, graduationOut)) {
      setInvalidYearRangeModal(true);
      return;
    }
    if (!validateGPA(gpa)) {
      setInvalidGPAModal(true);
      return;
    }
    if (!validateJob(experJob)) {
      setInvalidExperJobModal(true);
      return;
    }
    if (!validateUniversity(company)) {
      setInvalidCompanyModal(true);
      return;
    }
    if (!validateBeginYear(experIn)) {
      setInvalidExperInModal(true);
      return;
    }
    if (!validateEndYear(experOut)) {
      setInvalidExperOutModal(true);
      return;
    }
    if (!validateYearRange(experIn, experOut)) {
      setInvalidExperYearRangeModal(true);
      return;
    }
    if (!validateAddress(location)) {
      setInvalidLocationModal(true);
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
    <div id="createCV" className="form-container">
      <Container style={{ marginTop: "30px", marginBottom: "30px" }}>
        <Form onSubmit={onSubmit}>
          <Row>
            <Col xl={6} lg={6} md={6} sm={12} xs={12}>
              <div className="image-container" style={{ marginTop: "65px" }}>
                <ProfilePic
                  photo={photo}
                  openFileDialog={openFileDialog}
                  changeHandler={changeHandler}
                  imageFormControl={imageFormControl}
                  showUploadButton={false}
                />
              </div>
            </Col>
            <Col xl={6} lg={6} md={6} sm={12} xs={12}>
              <PersonalInformation
                firstname={firstname}
                lastname={lastname}
                job={job}
                shortBio={shortBio}
                setFirstName={setFirstName}
                setLastName={setLastName}
                setJob={setJob}
                setShortBio={setShortBio}
                isInvalidFN={invalidFirstNameModal}
                isInvalidLN={invalidLastNameModal}
                isInvalidJob={invalidJobModal}
              />
            </Col>
            <Col xl={6} lg={6} md={6} sm={12} xs={12}>
              <PersonalAcademic
                birthday={birthday}
                email={email}
                phone={phone}
                address={address}
                majors={majors}
                university={university}
                graduationIn={graduationIn}
                graduationOut={graduationOut}
                gpa={gpa}
                language={language}
                setBirthday={setBirthday}
                setEmail={setEmail}
                setPhone={setPhone}
                setAddress={setAddress}
                setMajors={setMajors}
                setUniversity={setUniversity}
                setGraduationIn={setGraduationIn}
                setGraduationOut={setGraduationOut}
                setGpa={setGpa}
                setLanguage={setLanguage}
                isInvalidBirth={invalidBirthdayModal}
                isInvalidEmail={invalidEmailModal}
                isInvalidPhone={invalidPhoneModal}
                isInvalidAddress={invalidAddressModal}
                isInvalidMajor={invalidMajorModal}
                isInvalidUniversity={invalidUniversityModal}
                isInvalidBY={invalidBeginYearModal}
                isInvalidEY={invalidEndYearModal}
                isInvalidYR={invalidYearRangeModal}
                isInvalidGPA={invalidGPAModal}
              />
            </Col>
            <Col xl={6} lg={6} md={6} sm={12} xs={12}>
              <SkillsExperience
                skillDescription={skillDescription}
                tools={tools}
                experJob={experJob}
                company={company}
                experIn={experIn}
                experOut={experOut}
                location={location}
                setSkillDescription={setSkillDescription}
                setTools={setTools}
                setExperJob={setExperJob}
                setCompany={setCompany}
                setExperIn={setExperIn}
                setExperOut={setExperOut}
                setLocation={setLocation}
                isInvalidExperJob={invalidExperJobModal}
                isInvalidCompany={invalidCompanyModal}
                isInvalidExperIn={invalidExperInModal}
                isInvalidExperOut={invalidExperOutModal}
                isInvalidExperYR={invalidExperYearRangeModal}
                isInvalidLocation={invalidLocationModal}
              />
            </Col>
          </Row>
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
        </Form>
      </Container>
      {showAlert(
        invalidFirstNameModal,
        setInvalidFirstNameModal,
        "candidate.modal.notiCV",
        "candidate.modal.firstName"
      )}
      {showAlert(
        invalidLastNameModal,
        setInvalidLastNameModal,
        "candidate.modal.notiCV",
        "candidate.modal.lastName"
      )}
      {showAlert(
        invalidImageModal,
        setInvalidImageModal,
        "candidate.modal.error",
        "candidate.modal.image"
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
      {showAlert(
        invalidMajorModal,
        setInvalidMajorModal,
        "candidate.modal.notiCV",
        "candidate.modal.major"
      )}
      {showAlert(
        invalidUniversityModal,
        setInvalidUniversityModal,
        "candidate.modal.notiCV",
        "candidate.modal.university"
      )}
      {showAlert(
        invalidBeginYearModal,
        setInvalidBeginYearModal,
        "candidate.modal.notiCV",
        "candidate.modal.BY"
      )}
      {showAlert(
        invalidEndYearModal,
        setInvalidEndYearModal,
        "candidate.modal.notiCV",
        "candidate.modal.EY"
      )}
      {showAlert(
        invalidYearRangeModal,
        setInvalidYearRangeModal,
        "candidate.modal.notiCV",
        "candidate.modal.YR"
      )}
      {showAlert(
        invalidGPAModal,
        setInvalidGPAModal,
        "candidate.modal.notiCV",
        "candidate.modal.gpa"
      )}
      {showAlert(
        invalidExperJobModal,
        setInvalidExperJobModal,
        "candidate.modal.notiCV",
        "candidate.modal.job"
      )}
      {showAlert(
        invalidCompanyModal,
        setInvalidCompanyModal,
        "candidate.modal.notiCV",
        "candidate.modal.company"
      )}
      {showAlert(
        invalidExperInModal,
        setInvalidExperInModal,
        "candidate.modal.notiCV",
        "candidate.modal.EBY"
      )}
      {showAlert(
        invalidExperOutModal,
        setInvalidExperOutModal,
        "candidate.modal.notiCV",
        "candidate.modal.EEY"
      )}
      {showAlert(
        invalidExperYearRangeModal,
        setInvalidExperYearRangeModal,
        "candidate.modal.notiCV",
        "candidate.modal.EYR"
      )}
      {showAlert(
        invalidLocationModal,
        setInvalidLocationModal,
        "candidate.modal.notiCV",
        "candidate.modal.address"
      )}
      {showAlert(
        fillRequiredFieldsModal,
        setFillRequiredFieldsModal,
        "candidate.modal.notiCV",
        "candidate.modal.all"
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
  );
};

export default CreateCV;
