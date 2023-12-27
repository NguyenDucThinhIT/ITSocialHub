import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import { Viewer, Worker } from "@react-pdf-viewer/core";
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
  postResume,
  downloadResume,
  deleteResume,
  editResume,
} from "../../../../services/resumes.api";
import Loading from "../../../../components/Loading/Loading";
import ConfirmModal from "../../../../components/ConfirmModal";
import { useMutation } from "@tanstack/react-query";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faTrashAlt,
  faDownload,
  faFile,
  faPaperclip,
} from "@fortawesome/free-solid-svg-icons";
import { upload } from "@/services/upload.api";
import "@react-pdf-viewer/core/lib/styles/index.css";
import "@react-pdf-viewer/default-layout/lib/styles/index.css";
import "./style.css";

const MyCV = () => {
  const { t } = useTranslation("common");
  const user = useSelector((state) => state.auth.user);
  const [hasCV, setHasCV] = useState(false);
  const [initialData, setInitialData] = useState([]);
  const [selectedInfo, setSelectedInfo] = useState({});
  const [showForm, setShowForm] = useState(true);
  const [uploadedFile, setUploadedFile] = useState();
  const [deleteConfirmModal, setDeleteConfirmModal] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [filteredData, setFilteredData] = useState([]);
  const [quantumCVs, setQuantumCVs] = useState(0);
  const [selectedCVTitle, setSelectedCVTitle] = useState("");
  const [editedCVTitle, setEditedCVTitle] = useState("");
  const [showCVButtons, setShowCVButtons] = useState(false);


  const getAllCV = async () => {
    setIsLoading(false);
    await getResume().then((res) => {
      setInitialData(res.data.items);
    });
    setIsLoading(true);
  };

  useEffect(() => {
    getAllCV();
  }, []);

  const checkCVAvailability = () => setHasCV(initialData.length > 0);

  const handleInputChange = (e) => {
    const query = e.target.value;
    if (selectedInfo) {
      setEditedCVTitle(query);
      const updatedData = initialData.map((info) =>
        info.id === selectedInfo.id ? { ...info, title: query } : info
      );
      setInitialData(updatedData);
    }
  };

  const handleInfoClick = (infoId) => {
    const info = initialData.find((item) => item.id === infoId);
    setSelectedInfo(info);
    setSelectedCVTitle(info.name);
    setUploadedFile(info.file_url);
    setShowForm(true);
    setShowCVButtons(true);
  };
  const postResumeMutation = useMutation({
    mutationFn: (body) => postResume(body),
  });
  const handleSaveCV = async () => {
    if (!selectedInfo.name) {
      Swal.fire({
        icon: "error",
        title: t("candidate.modal.error"),
        text: t("candidate.tags.errorName"),
      });
      return;
    }
    if (selectedInfo.id) {
      setIsLoading(true);
      await editResume(selectedInfo.id,selectedInfo);
      getAllCV();
    } else {
      setIsLoading(true);
      if (selectedInfo.file_url) {
        const urlCV = await upload(selectedInfo.file_url)
          .then((response) => {
            return response.url;
          })
          .catch((error) => {
            console.error("Lỗi khi tải lên:", error);
            return false;
          });
        if (urlCV) {
          postResumeMutation.mutate(
            {
              name: selectedInfo.name,
              file_url: urlCV,
            },
            {
              onSuccess: () => {
                getAllCV();
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
              },
              onError: () => {
                let errorText;
                Swal.fire({
                  icon: "error",
                  title: t("jobPage.failed"),
                  text: errorText,
                });
              },
            }
          );
        }
      }
    }
    setIsLoading(false);
  };
  const handleUploadCV = () => {
    const fileInput = document.createElement("input");
    fileInput.type = "file";
    fileInput.accept = "application/pdf";
    fileInput.onchange = (e) => {
      const file = e.target.files[0];
      const fileName = file.name.replace(/\.[^/.]+$/, "");
      setSelectedCVTitle(fileName);
      const newCV = { id: null, name: fileName, file_url: file };
      const updatedData = [...initialData, newCV];
      setInitialData(updatedData);
      setUploadedFile(URL.createObjectURL(file));
      setSelectedInfo(newCV);
      setShowForm(true);
    };
    fileInput.click();
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    const fileName = file ? file.name : "";
    setSelectedCVTitle(fileName);
  };
  const handleDeleteCV = () => {
    if (selectedInfo) {
      setDeleteConfirmModal(true);
    }
  };

  const handleConfirmDeleteCV = () => {
    if (selectedInfo) {
      deleteResume(selectedInfo.id);
      //setSelectedInfo(null);
      getAllCV();
      
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
    setFilteredData(filteredDataToShow);
    setQuantumCVs(filteredDataToShow.length);
  }, [initialData]);

  return (
    <div className="mx-3 mb-3 pt-5">
      <div className="container">
        <Row className="align-items-center">
          <Col sm={4}>
            <div className="info-count">{quantumCVs} CV</div>
          </Col>
          <Col sm={8}>
            <div className="d-flex align-items-center justify-content-end">
              <Form
                className="mr-3 d-flex"
                onSubmit={(e) => e.preventDefault()}
              >
                <div className="input-name">
                  <FormControl
                    type="text"
                    //placeholder={t("candidate.view.searchCV")}
                    value={selectedInfo.name}
                    onChange={(e) => setSelectedInfo({...selectedInfo, name: e.target.value})}
                    className="custom-input"
                  />
                </div>
                <button className="save-button-cv ml-3" onClick={handleSaveCV}>
                {t("candidate.create.save")}
                </button>
              </Form>
              <div className="cv">
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
                          {editedCVTitle ||
                            (info.name && info.name.replace(".pdf", ""))}
                        </div>
                      </div>
                    </ListGroup.Item>
                  ))}
                </ListGroup>
              </Card>
            ) : (
              <div className="no-cv">
                {!isLoading ? (
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
              <Card id="cardFormCV">
                <Card.Body>
                  <div className="attached-cv">
                    <span>{t("candidate.view.detailCV")}</span>
                    {showCVButtons && selectedInfo && (
                      <div className="cv-buttons">
                        <Button variant="danger" onClick={handleDeleteCV}>
                          <FontAwesomeIcon
                            icon={faTrashAlt}
                            className="delete-cv"
                          />
                        </Button>
                        <Button variant="warning" onClick={handleDownloadCV}>
                          <FontAwesomeIcon icon={faDownload} />
                        </Button>
                      </div>
                    )}
                  </div>
                  <div className="cv-description">
                    {!isLoading ? (
                      <Loading />
                    ) : (
                      <>
                        {uploadedFile ? (
                          <>
                            <Worker workerUrl="https://unpkg.com/pdfjs-dist@3.8.162/build/pdf.worker.min.js">
                              <Viewer fileUrl={uploadedFile} />
                            </Worker>
                          </>
                        ) : (
                          <div className="no-file-icon">
                            <>
                              <FontAwesomeIcon icon={faPaperclip} />
                              <span>{t("candidate.appliedJob.noFile")}</span>
                            </>
                          </div>
                        )}
                      </>
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
