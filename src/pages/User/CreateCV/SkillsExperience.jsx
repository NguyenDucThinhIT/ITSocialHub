import { Row } from "react-bootstrap";
import { useTranslation } from "react-i18next";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";

import Input from "../../../components/InputFileds/InputFileds";

const SkillsExperience = ({
  skillDescription,
  tools,
  experJob,
  company,
  experIn,
  experOut,
  location,
  setSkillDescription,
  setTools,
  setExperJob,
  setCompany,
  setExperIn,
  setExperOut,
  setLocation,
  isInvalidExperJob,
  isInvalidCompany,
  isInvalidExperIn,
  isInvalidExperOut,
  isInvalidExperYR,
  isInvalidLocation,
}) => {
  const { t } = useTranslation("common");
  return (
    <>
      <h4 className="mb-2 mt-3">
        <strong>{t("candidate.create.skill")}</strong>
      </h4>
      <div className="form-group mb-3">
        <Input
          inputType="textarea"
          classStyle="form-control"
          label={t("candidate.create.skillDescription")}
          placeholder={t("candidate.create.skillDescriptionP")}
          data={skillDescription}
          setData={setSkillDescription}
          row={4}
        />
      </div>
      <div className="form-group mb-3">
        <Input
          inputType="textarea"
          classStyle="form-control"
          label={t("candidate.create.tools")}
          placeholder={t("candidate.create.toolsP")}
          data={tools}
          setData={setTools}
          row={4}
        />
      </div>
      <h4 className="mb-3">
        <strong>{t("candidate.create.experience")}</strong>
      </h4>
      <div className="form-group mb-3">
        <Input
          classStyle={`form-control ${isInvalidExperJob ? "is-invalid" : ""}`}
          label={t("candidate.create.jobTitleOld")}
          placeholder={t("candidate.create.jobTitleOldP")}
          data={experJob}
          setData={setExperJob}
        />
      </div>
      <div className="form-group mb-3">
        <Input
          classStyle={`form-control ${isInvalidCompany ? "is-invalid" : ""}`}
          label={t("candidate.create.company")}
          placeholder={t("candidate.create.companyP")}
          data={company}
          setData={setCompany}
        />
      </div>
      <Row>
        <div className="col-xl-7 col-lg-7 col-md-7 col-sm-12 col-12">
          <div className="form-group mb-3">
            <label htmlFor="experIn">{t("candidate.create.period")}</label>
            <div className="d-flex align-items-center">
              <Input
                classStyle={`form-control ${
                  isInvalidExperIn || isInvalidExperYR ? "is-invalid" : ""
                }`}
                placeholder={t("candidate.create.start")}
                data={experIn}
                setData={setExperIn}
              />
              <div className="input-group-append d-flex align-items-center gap-lg-3 gap-1">
                <div className="divider style={{ margin: '20px 10px' }}"></div>
                <FontAwesomeIcon icon={faArrowRight} />
                <div className="divider"></div>
              </div>
              <Input
                classStyle={`form-control ${
                  isInvalidExperOut || isInvalidExperYR ? "is-invalid" : ""
                }`}
                placeholder={t("candidate.create.end")}
                data={experOut}
                setData={setExperOut}
              />
            </div>
          </div>
        </div>
        <div className="col-xl-5 col-lg-5 col-sm-12 col-12">
          <div className="form-group mb-3">
            <Input
              classStyle={`form-control ${
                isInvalidLocation ? "is-invalid" : ""
              }`}
              label={t("candidate.create.location")}
              placeholder={t("candidate.create.locationP")}
              data={location}
              setData={setLocation}
            />
          </div>
        </div>
      </Row>
    </>
  );
};

export default SkillsExperience;
