import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { Viewer, Worker } from "@react-pdf-viewer/core";
import { useQuery } from "@tanstack/react-query";
import Swal from "sweetalert2";
import {
  Form,
  FormControl,
  Card,
  ListGroup,
  Col,
  Row,
  Button,
} from "react-bootstrap";
import {
  getResume,
  viewResume,
  postResume,
  downloadResume,
  deleteResume,
} from "../../../../services/resumes.api";
import Loading from "../../../../components/Loading/Loading";
import ConfirmModal from "../../../../components/ConfirmModal";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faSearch,
  faTrashAlt,
  faDownload,
  faFile,
  faPaperclip,
} from "@fortawesome/free-solid-svg-icons";

import "@react-pdf-viewer/core/lib/styles/index.css";
import "@react-pdf-viewer/default-layout/lib/styles/index.css";
import "./style.css";

const MyCV = () => {
  const { t } = useTranslation("common");
  const navigate = useNavigate();
  const user = useSelector((state) => state.auth.user);
  const [hasCV, setHasCV] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [initialData, setInitialData] = useState([]);
  const [selectedInfo, setSelectedInfo] = useState(null);
  const [showForm, setShowForm] = useState(true);
  const [uploadedFile, setUploadedFile] = useState();
  const [deleteConfirmModal, setDeleteConfirmModal] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [filteredData, setFilteredData] = useState([]);
  const [quantumCVs, setQuantumCVs] = useState(0);

  const { refetch } = useQuery({
    queryKey: ["resumes"],
    queryFn: () => getResume(user.id),
    onSuccess: (res) => setInitialData(res.data.data),
    onSettled: () => setIsLoading(false),
  });
  const checkCVAvailability = () => setHasCV(initialData.length > 0);

  const handleSearch = (query) => {
    setIsLoading(true);
    setSearchQuery(query);
    setUploadedFile(null);
    getResume(query, "")
      .then((res) => setInitialData(res.data.data))
      .finally(() => setIsLoading(false));
  };

  const handleInputChange = (e) => {
    const query = e.target.value;
    setSearchQuery(query);
    handleSearch(query);
  };

  const handleInfoClick = (infoId) => {
    const info = initialData.find((item) => item.id === infoId);
    setSelectedInfo(info);
    setUploadedFile(info.file);
    setShowForm(true);
    setIsLoading(true);
    viewResume(infoId)
      .then((res) => setUploadedFile(res.data))
      .finally(() => setIsLoading(false));
  };

  const handleCreateCV = () => navigate("/templateCV");

  const handleUploadCV = () => {
    const fileInput = document.createElement("input");
    fileInput.type = "file";
    fileInput.accept = "application/pdf";

    fileInput.onchange = (e) => {
      const file = e.target.files[0];
      postResume(file).then(() => refetch());
      const fileName = file.name.replace(/\.[^/.]+$/, "");
      const newCV = { id: initialData.length + 1, title: fileName, file: file };
      const updatedData = [...initialData, newCV];
      setInitialData(updatedData);
      setUploadedFile(file);
      setShowForm(true);
      Swal.mixin({
        toast: true,
        position: "top-end",
        timer: 3000,
        timerProgressBar: true,
        showConfirmButton: false,
      }).fire({
        icon: "success",
        text: t("candidate.tags.uploadCV"),
      });
    };

    fileInput.click();
  };

  const handleDeleteCV = () => {
    if (selectedInfo) {
      setDeleteConfirmModal(true);
    }
  };

  const handleConfirmDeleteCV = () => {
    if (selectedInfo) {
      const updatedData = initialData.filter(
        (info) => info.id !== selectedInfo.id
      );
      deleteResume(selectedInfo.id);
      setInitialData(updatedData);
      setSelectedInfo(null);
      setUploadedFile(null);
      setDeleteConfirmModal(false);
    }
    Swal.mixin({
      toast: true,
      position: "top-end",
      timer: 3000,
      timerProgressBar: true,
      showConfirmButton: false,
    }).fire({
      icon: "success",
      text: t("candidate.tags.deleteCV"),
    });
  };

  const handleCancelDeleteCV = () => setDeleteConfirmModal(false);

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

  useEffect(() => {
    checkCVAvailability();
  }, [initialData]);

  useEffect(() => {
    let filteredDataToShow = initialData;
    if (searchQuery !== "") {
      filteredDataToShow = filteredDataToShow.filter((info) =>
        info.fileName.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }
    setFilteredData(filteredDataToShow);
    setQuantumCVs(filteredDataToShow.length);
  }, [initialData, searchQuery]);

  return (
    <div className="mx-3 mb-3">
        <div className="container">
      <Row className="align-items-center">
        <Col sm={4}>
          <div className="info-count">{quantumCVs} CV</div>
        </Col>
        <Col sm={8}>
          <div className="d-flex align-items-center justify-content-end">
            <Form className="mr-3" onSubmit={(e) => e.preventDefault()}>
              <div className="search-input">
                <FormControl
                  type="text"
                  placeholder={t("candidate.view.searchCV")}
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
            <div className="cv">
              {/* <Button
                id="upAndCreateButton"
                variant="primary"
                onClick={handleCreateCV}
              >
                {t("candidate.view.createCV")}
              </Button> */}
              <Button
                id="upAndCreateButton"
                variant="secondary"
                onClick={handleUploadCV}
              >
                {t("candidate.view.uploadCV")}
              </Button>
            </div>
          </div>
        </Col>
      </Row>
      <Row>
        <Col sm={4}>
          {hasCV && filteredData.length > 0 ? (
            <Card id="cardForm">
              <ListGroup variant="flush" className="cv-list px-2 pt-2">
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
                        {info.fileName && info.fileName.replace(".pdf", "")}
                      </div>
                    </div>
                  </ListGroup.Item>
                ))}
              </ListGroup>
            </Card>
          ) : (
            <div className="no-cv">
              {isLoading ? (
                <Loading />
              ) : (
                <>
                  <FontAwesomeIcon icon={faFile} className="no-cv-icon" />
                  <span>{t("candidate.view.noCV")}</span>
                </>
              )}
            </div>
          )}
        </Col>
        <Col sm={8}>
          {showForm && (
            <Card>
              <Card.Body>
                <div className="attached-cv">
                  <span>{t("candidate.view.detailCV")}</span>
                  {selectedInfo && (
                    <div className="cv-buttons">
                      <Button variant="danger" onClick={handleDeleteCV}>
                        <FontAwesomeIcon
                          icon={faTrashAlt}
                          className="delete-button"
                        />
                      </Button>
                      <Button variant="warning" onClick={handleDownloadCV}>
                        <FontAwesomeIcon icon={faDownload} />
                      </Button>
                    </div>
                  )}
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
      <ConfirmModal
        visible={deleteConfirmModal}
        setVisible={setDeleteConfirmModal}
        messageTitle={t("candidate.notice.deleteCV")}
        messageContent={t("candidate.notice.deletePostContentCV")}
        action={handleConfirmDeleteCV}
        onCancel={handleCancelDeleteCV}
      />
      </div>
    </div>
  );
};

export default MyCV;
