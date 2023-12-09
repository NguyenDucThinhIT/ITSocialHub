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
  Button,
} from "react-bootstrap";
import { downloadResume, viewResume } from "@/services/resumes.api";
import Loading from "@/components/Loading/Loading";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faSearch,
  faFile,
  faPaperclip,
  faDownload,
} from "@fortawesome/free-solid-svg-icons";

import "./style.css";
import RichTextEditor from "@/components/RichTextEditor/RichTextEditor";
import {
  editApplications,
  postApplications,
  viewApplications,
} from "@/services/application";
import { useParams } from "react-router-dom";
import Swal from "sweetalert2";
import { useMutation } from "@tanstack/react-query";

const Application = () => {
  const { t } = useTranslation("common");
  const user = useSelector((state) => state.auth.user);
  const [hasJobApplied, setHasJobApplied] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [filterOption, setFilterOption] = useState("");
  const [filterOption2, setFilterOption2] = useState("");
  const [filteredData, setFilteredData] = useState([]);
  const [initialData, setInitialData] = useState([]);
  const [showForm, setShowForm] = useState(true);
  const [uploadedFile, setUploadedFile] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const [content, setContent] = useState("");
  const [feedback, setFeedback] = useState("");
  const [status, setStatus] = useState("");
  const [application, setApplication] = useState({});
  const [quantumCVs, setQuantumCVs] = useState(0);
  const [showCVButtons, setShowCVButtons] = useState(false);
  const { postId } = useParams();
  const selectedInfo = null;
  const checkJobAppliedAvailability = () => {
    setHasJobApplied(initialData.length > 0);
  };
  const getPostApplication = async () => {
    setIsLoading(true);
    await viewApplications(postId).then((res) => {
      setInitialData(res.data.items);
      if (application.id) {
        const info = res.data.items.find((item) => item.id === application.id);
        setApplication(info);
      }
    });

    setIsLoading(false);
  };
  useEffect(() => {
    getPostApplication();
  }, [postId]);
  const handleDownloadCV = () => {
    if (selectedInfo) {
      downloadResume(selectedInfo.id).then((res) => {
        const blobData = new Blob([res.data], { type: "application/pdf" });
        const url = URL.createObjectURL(blobData);
        const a = document.createElement("a");
        a.href = url;
        a.download = selectedInfo.fileName;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
      });
    }
    Swal.mixin({
      toast: true,
      position: "top-end",
      timer: 5000,
      timerProgressBar: true,
      showConfirmButton: false,
    }).fire({
      icon: "success",
      text: t("candidate.tags.downloadCV"),
    });
  };
  const handleFeedbackChange = (value) => {
    setFeedback(value);
  };

  const handleSearch = (query) => {
    setUploadedFile(null);
    getPostApplication();
    // getCandidateApplication(user.id, query, "")
    //   .then((res) => {
    //     setInitialData(res.data.data);
    //   })
    //   .finally(() => {
    //     setIsLoading(false);
    //   });
  };
  const checkEdit = (id) => {
    const info = initialData.find((item) => item.id === id);
    if (info.status != "NEW" && info.feedback != null) return false;
    return true;
  };

  const handleSave = () => {
    if (application == {} || !checkEdit(application.id)) return; //thongbao;
    const updatedApplicaton = {
      status: application.status,
      feedback: application.feedback,
    };
    editApplications(application.id, updatedApplicaton)
      .then(() => {
        //navigate("/dashboard");
        getPostApplication();
      })
      .catch((error) => {
        console.error("Error updating post:", error);
      });
    Swal.mixin({
      toast: true,
      position: "top-end",
      timer: 3000,
      timerProgressBar: true,
      showConfirmButton: false,
    }).fire({
      icon: "success",
      text: t("candidate.tags.updateRec"),
    });
  };
  const handleInputChange = (e) => {
    const query = e.target.value;
    setSearchQuery(query);
    handleSearch(query);
  };

  const handleInfoClick = (infoId) => {
    const info = initialData.find((item) => item.id === infoId);
    setApplication(info);
    // setUploadedFile(info.file_url);
    // setContent(info.content);
    // setFeedback(info.feedback);
    // setStatus(info.status);
    setShowForm(true);
    setShowCVButtons(true);
  };

  const handleFilterOptionChange = (option, filterNumber) => {
    setUploadedFile(null);
    if (filterNumber === 1) {
      setFilterOption(option);
    } else if (filterNumber === 2) {
      setFilterOption2(option);
    }
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
        (info.user.first_name + " " + info.user.last_name)
          .toLowerCase()
          .includes(searchQuery.toLowerCase())
      );
    }
    setFilteredData(filteredDataToShow);
    setQuantumCVs(filteredDataToShow.length);
  }, [initialData, filterOption, filterOption2, searchQuery]);

  return (
    <div className="mx-3 mb-3 pt-5 bg-white">
      <div className="container">
        <Row className="align-items-center">
          <Col sm={1}>
            <div className="info-count">{quantumCVs} CV</div>
          </Col>
          <Col sm={3}>
            <Form
              inline
              className="filter mr-3"
              onSubmit={(e) => e.preventDefault()}
            >
              <span>{t("candidate.appliedJob.status.status")} </span>
              <DropdownButton
                as={ButtonGroup}
                title={filterOption === "" ? "All Status" : filterOption}
                id="filter-dropdown-1"
                variant="outline-secondary"
                onSelect={(option) => handleFilterOptionChange(option, 1)}
                className="custom-dropdown-button"
              >
                <dropdown-menu className="custom-menu">
                  <Dropdown.Item eventKey="">
                    {t("candidate.appliedJob.status.allStatus")}
                  </Dropdown.Item>
                  <Dropdown.Item eventKey="NEW">
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
            </Form>
          </Col>
          <Col sm={8}>
            <Form
              inline
              className="filter mr-3"
              onSubmit={(e) => e.preventDefault()}
            >
              <div className="search-inputtt">
                <FormControl
                  type="text"
                  placeholder={t("candidate.appliedJob.searchCandidate")}
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
              <span className="mr-2">{t("button.evaluate")}</span>
              <DropdownButton
                as={ButtonGroup}
                title={application.status ?? "NEW"}
                id="filter-dropdown-2"
                variant="outline-secondary"
                onSelect={(value) =>
                  setApplication({ ...application, status: value })
                }
                className="custom-dropdown-button"
              >
                <dropdown-menu className="custom-menu">
                  <Dropdown.Item eventKey="NEW">
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
              <div className="button-send">
                <button onClick={handleSave}>{t("candidate.create.save")}</button>
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
                          {info.user.first_name + " " + info.user.last_name}
                        </div>
                        <div
                          className={`info-status ${info.status
                            .toLowerCase()
                            .replace(" ", "-")}${
                            filterOption === info.status
                              ? " selected-status"
                              : ""
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
                  <Loading />
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
                    dangerouslySetInnerHTML={{
                      __html: application.content ?? " ",
                    }}
                  />
                </Col>
                <Col sm={6}>
                  <h3>{t("interviewer.questionSheet.feedback")}</h3>
                  <RichTextEditor
                    className="cus-textt"
                    value={application.feedback}
                    handleChange={(value) =>
                      setApplication({ ...application, feedback: value })
                    }
                    placeholder="Nhập phản hồi ở đây"
                  />
                </Col>
              </Row>
            </Card>
            {showForm && (
              <Card>
                <Card.Body>
                  <div className="d-flex">
                    <div className="attached-cv">
                      <span>{t("candidate.appliedJob.attachedCV")}</span>
                    </div>
                    <div className="down-buttons">
                      <Button
                        variant="warning"
                        onClick={handleDownloadCV}
                        className={showCVButtons ? "" : "d-none"}
                      >
                        <FontAwesomeIcon icon={faDownload} />
                      </Button>
                    </div>
                  </div>
                  <div className="cv-description">
                    {application.file_url ? (
                      <>
                        <Worker workerUrl="https://unpkg.com/pdfjs-dist@3.8.162/build/pdf.worker.min.js">
                          <Viewer fileUrl={application.file_url} />
                        </Worker>
                      </>
                    ) : (
                      <div className="no-file-icon">
                        {isLoading ? (
                          <Loading />
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

export default Application;
