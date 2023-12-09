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
import Loading from "@/components/Loading/Loading";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faSearch,
  faFile,
  faPaperclip,
} from "@fortawesome/free-solid-svg-icons";

import "./style.css";
import { getApplications } from "@/services/application";

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
  const [content,setContent] = useState("");
  const [feedback, setFeedback] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [quantumCVs, setQuantumCVs] = useState(0);
  const selectedInfo = null;
  const checkJobAppliedAvailability = () => {
    setHasJobApplied(initialData.length > 0);
  };
  const getAllApplication = async () => {
    setIsLoading(false);
    await getApplications().then((res) => {
      setInitialData(res.data.items);
    });
    setIsLoading(true);
  };
  useEffect(() => {
    getAllApplication();
  }, []);
  const handleSearch = (query) => {
    setUploadedFile(null);
    getAllApplication();
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
    setUploadedFile(info.file_url);
    setContent(info.content);
    setFeedback(info.feedback || "Chưa được phản hồi");
    setShowForm(true);
    //setIsLoading(true);
  };

  const handleFilterOptionChange = (option) => {
    setUploadedFile(null);
    setFilterOption(option);
  };

  useEffect(() => {
    checkJobAppliedAvailability();
  }, [initialData]);

  useEffect(() => {
    let filteredDataToShow = initialData;
    if (filterOption !== "") {
      filteredDataToShow = filteredDataToShow.filter(
        (info) => info.status === filterOption
      );
    }
    if (searchQuery !== "") {
      filteredDataToShow = filteredDataToShow.filter((info) =>
        info.title.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }
    setFilteredData(filteredDataToShow);
    setQuantumCVs(filteredDataToShow.length);
  }, [initialData, filterOption, searchQuery]);

  return (
    <div className="mx-3 mb-3 pt-5">
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
                <Dropdown.Item eventKey="ACCEPT">
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
                      <div className="info-titlee">
                        {info.title &&
                          info.title.replace(".pdf", "")}
                      </div>
                      <div
                        className={`info-statuss ${info.status
                          .toLowerCase()
                          .replace(" ", "-")}${
                          filterOption === info.status ? " selected-status" : ""
                        }`}
                      >
                        <span>{info.status}</span>
                      </div>
                    </div>
                    <div className="d-flex infor-cty">
                      <div className="cus-logo-company"><img src={info.logo_url} alt="" /></div>
                    <div className="name-companyy">{info.company}</div>
                    </div>
                  </ListGroup.Item>
                ))}
              </ListGroup>
            </Card>
          ) : (
            <div className="no-job-applied">
              {!isLoading ? (
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
        <Card>
              <Row>
                <Col sm={6} className="line-design">
                  <h3>{t("interviewer.questionSheet.content")}</h3>
                  <div
                    dangerouslySetInnerHTML={{ __html: content }}
                  />
                </Col>
                <Col sm={6}>
                  <h3>{t("interviewer.questionSheet.feedback")}</h3>
                  <div
                    dangerouslySetInnerHTML={{ __html: feedback  }}
                  />
                </Col>
              </Row>
            </Card>
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
                        <Viewer fileUrl={uploadedFile} />
                      </Worker>
                    </>
                  ) : (
                    <div className="no-file-icon">
                      {!isLoading ? (
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
