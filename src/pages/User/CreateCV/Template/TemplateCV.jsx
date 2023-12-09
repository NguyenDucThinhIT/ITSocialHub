import { useState } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate  } from "react-router-dom";
import { useSelector } from "react-redux";
import { Viewer, Worker } from "@react-pdf-viewer/core";
import Swal from "sweetalert2";
import {
  Card,
  ListGroup,
  Col,
  Row,
  Button,
} from "react-bootstrap";
import Loading from "../../../../components/Loading/Loading";
import ConfirmModal from "../../../../components/ConfirmModal";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFile,
  faPaperclip,
} from "@fortawesome/free-solid-svg-icons";

import "@react-pdf-viewer/core/lib/styles/index.css";
import "@react-pdf-viewer/default-layout/lib/styles/index.css";
import "./style.css";

const MockCV = [
  { id:"01" ,name: "CV 1", file_url: "https://res.cloudinary.com/dsrtzowwc/image/upload/v1702046249/files/pvpqkymphbcafbn7yqnv.pdf" },
  { id:"02" ,name: "CV 2", file_url: "https://res.cloudinary.com/dsrtzowwc/image/upload/v1702046229/files/g01prektvuwd2fesjeoc.pdf" },
  { id:"03" ,name: "CV 3", file_url: "https://res.cloudinary.com/dsrtzowwc/image/upload/v1702046170/files/kujs1kqga3rqcytsagmb.pdf" },
];

const TemplateCV = () => {
  const { t } = useTranslation("common");
  const navigate = useNavigate();
  const user = useSelector((state) => state.auth.user);
  const [initialData, setInitialData] = useState(MockCV);
  const [selectedInfo, setSelectedInfo] = useState(null);
  const [showForm, setShowForm] = useState(true);
  const [uploadedFile, setUploadedFile] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const [quantumCVs, setQuantumCVs] = useState(3);
  

  const handleInfoClick = (infoId) => {
    const info = initialData.find((item) => item.id === infoId);
    setSelectedInfo(info);
    setUploadedFile(info.file_url);
    setShowForm(true);
    setIsLoading(true);
  };

  const handleCreateCV = (id) => {
    navigate(`/create/templateCV/${id}`);
  };

  

  return (
    <div className="mx-3 mb-3 pt-5">
      <div className="container">
        <Row className="align-items-center">
          <Col sm={4}>
            <div className="info-count">{quantumCVs} CV</div>
          </Col>
          <Col sm={8}>
            <div className="d-flex align-items-center justify-content-end">
              <div className="cv">
              </div>
            </div>
          </Col>
        </Row>
        <Row>
          <Col sm={4}>
            {initialData.length > 0 ? (
              <Card id="cardForm">
                <ListGroup variant="flush" className="cv-list px-2 pt-2">
                  {initialData.map((info) => (
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
                          {info.name && info.name.replace(".pdf", "")}
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
                        <Button variant="warning" onClick={() => handleCreateCV(selectedInfo.id)}>
                          Tạo CV
                        </Button>
                      </div>
                    )}
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

export default TemplateCV;
