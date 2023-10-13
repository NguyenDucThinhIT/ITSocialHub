import { Row } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";
import { useTranslation } from "react-i18next";

import Input from "../../../components/InputFileds/InputFileds";

const PersonalAcademic = ({
  birthday,
  email,
  phone,
  address,
  majors,
  university,
  graduationIn,
  graduationOut,
  gpa,
  language,
  setBirthday,
  setEmail,
  setPhone,
  setAddress,
  setMajors,
  setUniversity,
  setGraduationIn,
  setGraduationOut,
  setGpa,
  setLanguage,
  isInvalidBirth,
  isInvalidPhone,
  isInvalidEmail,
  isInvalidAddress,
  isInvalidMajor,
  isInvalidUniversity,
  isInvalidBY,
  isInvalidEY,
  isInvalidYR,
  isInvalidGPA,
}) => {
  const { t } = useTranslation("common");
  return (
    <>
      <h4 className="mb-3 mt-3">
        <strong>{t("candidate.create.personal")}</strong>
      </h4>
      <div className="form-group mb-3">
        <Input
          classStyle={`form-control ${isInvalidBirth ? "is-invalid" : ""}`}
          inputType="text"
          label={t("candidate.create.date")}
          placeholder={t("candidate.create.dateP")}
          data={birthday}
          setData={setBirthday}
        />
      </div>
      <div className="form-group mb-3">
        <Input
          classStyle={`form-control ${isInvalidEmail ? "is-invalid" : ""}`}
          label={t("candidate.create.email")}
          placeholder={t("candidate.create.emailP")}
          data={email}
          setData={setEmail}
        />
      </div>
      <div className="form-group mb-3">
        <Input
          classStyle={`form-control ${isInvalidPhone ? "is-invalid" : ""}`}
          label={t("candidate.create.phone")}
          placeholder={t("candidate.create.phoneP")}
          data={phone}
          setData={setPhone}
        />
      </div>
      <div className="form-group mb-3">
        <Input
          classStyle={`form-control ${isInvalidAddress ? "is-invalid" : ""}`}
          label={t("candidate.create.address")}
          placeholder={t("candidate.create.addressP")}
          data={address}
          setData={setAddress}
        />
      </div>
      <h4 className="mb-3">
        <strong>{t("candidate.create.academic")}</strong>
      </h4>
      <div className="form-group mb-3">
        <Input
          classStyle={`form-control ${isInvalidMajor ? "is-invalid" : ""}`}
          label={t("candidate.create.major")}
          placeholder={t("candidate.create.majorP")}
          data={majors}
          setData={setMajors}
        />
      </div>
      <div className="form-group mb-3">
        <Input
          classStyle={`form-control ${isInvalidUniversity ? "is-invalid" : ""}`}
          label={t("candidate.create.university")}
          placeholder={t("candidate.create.universityP")}
          data={university}
          setData={setUniversity}
        />
      </div>
      <Row>
        <div className="col-xl-7 col-lg-7 col-md-7 col-sm-12 col-12">
          <div className="form-group mb-3">
            <label htmlFor="graduationIn">{t("candidate.create.period")}</label>
            <div className="d-flex align-items-center">
              <Input
                classStyle={`form-control ${
                  isInvalidBY || isInvalidYR ? "is-invalid" : ""
                }`}
                placeholder={t("candidate.create.start")}
                data={graduationIn}
                setData={setGraduationIn}
              />
              <div className="input-group-append d-flex align-items-center gap-lg-3 gap-1">
                <div className="divider style={{ margin: '20px 10px' }}"></div>
                <FontAwesomeIcon icon={faArrowRight} />
                <div className="divider"></div>
              </div>
              <Input
                classStyle={`form-control ${
                  isInvalidEY || isInvalidYR ? "is-invalid" : ""
                }`}
                placeholder={t("candidate.create.end")}
                data={graduationOut}
                setData={setGraduationOut}
              />
            </div>
          </div>
        </div>
        <div className="col-xl-5 col-lg-5 col-sm-12 col-12">
          <div className="form-group mb-3">
            <Input
              classStyle={`form-control ${isInvalidGPA ? "is-invalid" : ""}`}
              label={t("candidate.create.gpa")}
              placeholder={t("candidate.create.gpaP")}
              data={gpa}
              setData={setGpa}
            />
          </div>
        </div>
      </Row>
      <div className="form-group mb-3">
        <Input
          inputType="textarea"
          classStyle="form-control"
          label={t("candidate.create.language")}
          placeholder={t("candidate.create.languageP")}
          data={language}
          setData={setLanguage}
          row={4}
        />
      </div>
    </>
  );
};

export default PersonalAcademic;
