import { Row } from "react-bootstrap";
import { useTranslation } from "react-i18next";

import Input from "../../../components/InputFileds/InputFileds";

const PersonalInformation = ({
  firstname,
  lastname,
  job,
  shortBio,
  setFirstName,
  setLastName,
  setJob,
  setShortBio,
  isInvalidFN,
  isInvalidLN,
  isInvalidJob,
}) => {
  const { t } = useTranslation("common");
  return (
    <Row className="gutters">
      <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
        <h4 className="mb-3">
          <strong>{t("candidate.create.yourdetails")}</strong>
        </h4>
      </div>
      <div className="col-xl-6 col-lg-6 col-md-6 col-sm-12 col-12">
        <div className="form-group mb-3">
          <Input
            classStyle={`form-control ${isInvalidLN ? "is-invalid" : ""}`}
            label={t("candidate.create.lastname")}
            placeholder={t("candidate.create.lastnameP")}
            data={lastname}
            setData={setLastName}
            required
          />
        </div>
      </div>
      <div className="col-xl-6 col-lg-6 col-md-6 col-sm-12 col-12">
        <div className="form-group mb-3">
          <Input
            classStyle={`form-control ${isInvalidFN ? "is-invalid" : ""}`}
            label={t("candidate.create.firstname")}
            placeholder={t("candidate.create.firstnameP")}
            data={firstname}
            setData={setFirstName}
            required
          />
        </div>
      </div>
      <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
        <div className="form-group mb-3">
          <Input
            classStyle={`form-control ${isInvalidJob ? "is-invalid" : ""}`}
            label={t("candidate.create.jobTitle")}
            placeholder={t("candidate.create.jobTitleP")}
            data={job}
            setData={setJob}
            required
          />
        </div>
      </div>
      <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
        <div className="form-group mb-3">
          <Input
            inputType="textarea"
            classStyle="form-control"
            label={t("candidate.create.shortBio")}
            placeholder={t("candidate.create.shortBioP")}
            data={shortBio}
            setData={setShortBio}
            row={4}
            required
          />
        </div>
      </div>
    </Row>
  );
};

export default PersonalInformation;
