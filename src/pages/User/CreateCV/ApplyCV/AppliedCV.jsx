import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { Viewer, Worker } from "@react-pdf-viewer/core";
import { useSelector } from "react-redux";
import {
  Form,
  FormControl,
  Card,
  ListGroup,
  DropdownButton,
  Dropdown,
  ButtonGroup,
  Col,
  Row,
} from "react-bootstrap";
//import { getCandidateApplication } from "@/services/applications.api";
import { viewResume } from "@/services/resumes.api";
import Loading from "@/components/Loading/Loading";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faSearch,
  faFile,
  faPaperclip,
} from "@fortawesome/free-solid-svg-icons";

import "./style.css";

const AppliedCV= () => {
  const { t } = useTranslation("common");
  const user = useSelector((state) => state.auth.user);
  const [hasJobApplied, setHasJobApplied] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [filterOption, setFilterOption] = useState("");
  const [filteredData, setFilteredData] = useState([]);
  const [initialData, setInitialData] = useState([]);
  const [showForm, setShowForm] = useState(true);
  const [uploadedFile, setUploadedFile] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const [quantumCVs, setQuantumCVs] = useState(0);
  const selectedInfo = null;
  const checkJobAppliedAvailability = () => {
    setHasJobApplied(initialData.length > 0);
  };

  const handleSearch = (query) => {
    setUploadedFile(null);
    // getCandidateApplication(user.id, query, "")
    //   .then((res) => {
    //     setInitialData(res.data.data);
    //   })
    //   .finally(() => {
    //     setIsLoading(false);
    //   });
  };

  const handleInputChange = (e) => {
    const query = e.target.value;
    setSearchQuery(query);
    handleSearch(query);
  };

  const handleInfoClick = (infoId) => {
    const info = initialData.find((item) => item.id === infoId);
    setUploadedFile(info.file);
    setShowForm(true);
    setIsLoading(true);
    viewResume(info.resume.id)
      .then((res) => {
        setUploadedFile(res.data);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  const handleFilterOptionChange = (option) => {
    setUploadedFile(null);
    setFilterOption(option);
  };

  useEffect(() => {
    checkJobAppliedAvailability();
  }, [initialData]);

  // useEffect(() => {
  //   getCandidateApplication(user.id).then((res) => {
  //     setInitialData(res.data.data);
  //     setIsLoading(false);
  //     setShowForm(true);
  //   });
  // }, [user.id]);

  useEffect(() => {
    let filteredDataToShow = initialData;
    if (filterOption !== "") {
      filteredDataToShow = filteredDataToShow.filter(
        (info) => info.status === filterOption
      );
    }
    if (searchQuery !== "") {
      filteredDataToShow = filteredDataToShow.filter((info) =>
        info.resume.fileName.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }
    setFilteredData(filteredDataToShow);
    setQuantumCVs(filteredDataToShow.length);
  }, [initialData, filterOption, searchQuery]);

  return (
    <div className="mx-3 mb-3">
      <div className="container">
      <Row className="align-items-center">
        <Col sm={4}>
          <div className="info-count">
            {quantumCVs} {t("candidate.appliedJob.appliedJob")}
          </div>
        </Col>
        <Col sm={8}>
          <Form inline className="filter mr-3" onSubmit={(e) => e.preventDefault()}>
            <span>{t("candidate.appliedJob.status.status")} </span>
            <DropdownButton
              as={ButtonGroup}
              title={filterOption === "" ? "All Status" : filterOption}
              id="filter-dropdown"
              variant="outline-secondary"
              onSelect={handleFilterOptionChange}
              className="custom-dropdown-button"
            >
              <dropdown-menu className="custom-menu">
                <Dropdown.Item eventKey="">
                  {t("candidate.appliedJob.status.allStatus")}
                </Dropdown.Item>
                <Dropdown.Item eventKey="NEW" f>
                  {t("candidate.appliedJob.status.NEW")}
                </Dropdown.Item>
                <Dropdown.Item eventKey="REVIEWED">
                  {t("candidate.appliedJob.status.REVIEWED")}
                </Dropdown.Item>
                <Dropdown.Item eventKey="IN_PROGRESS">
                  {t("candidate.appliedJob.status.IN_PROGRESS")}
                </Dropdown.Item>
                <Dropdown.Item eventKey="HIRED">
                  {t("candidate.appliedJob.status.ACCEPTED")}
                </Dropdown.Item>
                <Dropdown.Item eventKey="REJECTED">
                  {t("candidate.appliedJob.status.REJECTED")}
                </Dropdown.Item>
              </dropdown-menu>
            </DropdownButton>
            <div className="search-inputt">
              <FormControl
                type="text"
                placeholder={t("candidate.appliedJob.searchJob")}
                value={searchQuery}
                onChange={handleInputChange}
                className="custom-input"
              />
              <FontAwesomeIcon
                icon={faSearch}
                className="search-icon"
                onClick={() => handleSearch(searchQuery)}
              />
            </div>
          </Form>
        </Col>
      </Row>
      <Row>
        <Col sm={4}>
          {hasJobApplied && filteredData.length > 0 ? (
            <Card id="cardForm">
              <ListGroup variant="flush" className="cv-list px-2 pt-2 ">
                {filteredData.map((info) => (
                  <ListGroup.Item
                    style={{ minHeight: "96px" }}
                    key={info.id}
                    action
                    onClick={() => handleInfoClick(info.id)}
                    className={
                      selectedInfo && selectedInfo.id === info.id
                        ? "active"
                        : ""
                    }
                  >
                    <div className="info-content">
                      <div className="info-title">
                        {info.resume.fileName &&
                          info.resume.fileName.replace(".pdf", "")}
                      </div>
                      <div
                        className={`info-status ${info.status
                          .toLowerCase()
                          .replace(" ", "-")}${
                          filterOption === info.status ? " selected-status" : ""
                        }`}
                      >
                        <span>{info.status}</span>
                      </div>
                    </div>
                  </ListGroup.Item>
                ))}
              </ListGroup>
            </Card>
          ) : (
            <div className="no-job-applied">
              {isLoading ? (
                <Loading/>
              ) : (
                <>
                  <FontAwesomeIcon
                    icon={faFile}
                    className="no-job-applied-icon"
                  />
                  <span>{t("candidate.appliedJob.noJob")}</span>
                </>
              )}
            </div>
          )}
        </Col>
        <Col sm={8} style={{ marginBottom: "30px" }}>
          {showForm && (
            <Card>
              <Card.Body>
                <div className="attached-cv">
                  <span>{t("candidate.appliedJob.attachedCV")}</span>
                </div>
                <div className="cv-description">
                  {uploadedFile ? (
                    <>
                      <Worker workerUrl="https://unpkg.com/pdfjs-dist@3.8.162/build/pdf.worker.min.js">
                        <Viewer fileUrl={URL.createObjectURL(uploadedFile)} />
                      </Worker>
                    </>
                  ) : (
                    <div className="no-file-icon">
                      {isLoading ? (
                        <Loading/>
                      ) : (
                        <>
                          <FontAwesomeIcon icon={faPaperclip} />
                          <span>{t("candidate.appliedJob.noFile")}</span>
                        </>
                      )}
                    </div>
                  )}
                </div>
              </Card.Body>
            </Card>
          )}
        </Col>
      </Row>
      </div>
    </div>
  );
};

export default AppliedCV;
