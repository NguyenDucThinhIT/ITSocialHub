import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import moment from "moment";
import { useSelector } from "react-redux";
import {
  Form,
  FormControl,
  Card,
  ListGroup,
  Col,
  Row,
  Container,
} from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import {
  deletePostRecruitment,
  getPostRecruitment,
} from "@/services/recruitment.api";
import Loading from "@/components/Loading/Loading";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faSearch,
  faFile,
  faClock,
  faLocationDot,
  faCalendarXmark,
  faCalendarDays,
} from "@fortawesome/free-solid-svg-icons";

import "./style.css";
import Swal from "sweetalert2";
import ConfirmModal from "@/components/ConfirmModal";

const Dashboard = () => {
  const { t } = useTranslation("common");
  const user = useSelector((state) => state.auth.user);
  const navigate = useNavigate();
  const [initialData, setInitialData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [quantumPosts, setQuantumPosts] = useState(0);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [postIdToDelete, setPostIdToDelete] = useState(null);
  const [deleteConfirmModal, setDeleteConfirmModal] = useState(false);
  const handleSearch = () => {
    const results = initialData.filter((post) =>
      Object.values(post).some((value) =>
        String(value).toLowerCase().includes(searchQuery.toLowerCase())
      )
    );
    setSearchResults(results);
    setQuantumPosts(results.length);
  };

  const handleInputChange = (e) => {
    setSearchQuery(e.target.value);
  };
  const getAllPosts = async () => {
    setIsLoading(true);
    await getPostRecruitment().then((res) => {
      const recruitmentPosts = res.data.items;
      setInitialData(recruitmentPosts);
      setQuantumPosts(recruitmentPosts.length);
      setIsLoading(false);
    });
  };

  useEffect(() => {
    getAllPosts();
  }, []);

  const handleEdit = (postId) => {
    navigate(`/job/edit/${postId}`);
  };
  const handleApplication = (postId) => {
    navigate(`/application/post/${postId}`);
  };
  const handleDeleteCV = (e,postId) => {
    e.preventDefault();
    setPostIdToDelete(postId);
    setDeleteConfirmModal(true);
  };
  const handleDelete = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    await deletePostRecruitment([postIdToDelete]);
    getAllPosts();
    setIsLoading(false);
    setPostIdToDelete(null);
    Swal.mixin({
      toast: true,
      position: "top-end",
      timer: 3000,
      timerProgressBar: true,
      showConfirmButton: false,
    }).fire({
      icon: "success",
      text: t("recruiter.jobs.information.modal.deletePostSuccess"),
    });
    setDeleteConfirmModal(false);
  };

  const handleCancelDeleteCV = () => setDeleteConfirmModal(false);
  const onSubmit = (e) => {
    e.preventDefault();
    handleSearch(searchQuery);
  };
  return (
    <Form className="bg-white" id="dashboard">
      <Container>
        <div className="mx-3 mb-3 pt-5">
          <div className="container">
            <Row className="align-items-center">
              <Col sm={4}>
                <div className="info-count">
                  {quantumPosts} {t("sidenav.Jobs")}
                </div>
              </Col>
              <Col sm={8}>
                <Form inline className="filter mr-3" onSubmit={onSubmit}>
                  <div className="search-inputt">
                    <FormControl
                      type="text"
                      placeholder={t("candidate.appliedJob.searchPost")}
                      value={searchQuery}
                      onChange={handleInputChange}
                      className="custom-input"
                    />
                    <FontAwesomeIcon
                      icon={faSearch}
                      className="right-icon"
                      onClick={handleSearch}
                    />
                  </div>
                </Form>
              </Col>
            </Row>
            <Row>
              <Col sm={12}>
                {quantumPosts > 0 ? (
                  <Card id="cardDashBoard">
                    <ListGroup variant="flush" className="cv-list px-2 pt-2 ">
                      {(searchResults.length > 0
                        ? searchResults
                        : initialData
                      ).map((post) => (
                        <ListGroup.Item key={post.id}>
                          <div className="info-jobPost">
                            <div className="info-title">{post.title}</div>
                            <div className="info-type">
                              <FontAwesomeIcon icon={faClock} />
                              {post.job_type}
                            </div>
                            <div className="info-address">
                              <FontAwesomeIcon icon={faLocationDot} />
                              {post.address}
                            </div>
                            <div className="info-address">
                              <FontAwesomeIcon icon={faCalendarXmark} />
                              Thời hạn tuyển dụng:{" "}
                              {moment(post.expired_at).format(
                                "HH:mm:ss DD/MM/YYYY "
                              )}
                            </div>
                            <div className="info-address">
                              <FontAwesomeIcon icon={faCalendarDays} />
                              Lịch chỉnh sửa:{" "}
                              {moment(post.updated_at).format(
                                "HH:mm:ss DD/MM/YYYY "
                              )}
                            </div>
                          </div>
                          <div className="info-actions">
                            <button
                              className="application-button mr-1"
                              onClick={() => handleApplication(post.id)}
                            >
                              {post.number_application} Hồ sơ ứng tuyển
                            </button>
                            <button
                              className="edit-button"
                              onClick={() => handleEdit(post.id)}
                            >
                              Chỉnh sửa
                            </button>
                            <button
                              className="delete-button"
                              onClick={(e) => handleDeleteCV(e,post.id)}
                            >
                              Xóa
                            </button>
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
                        <span>{t("candidate.appliedJob.noPost")}</span>
                      </>
                    )}
                  </div>
                )}
              </Col>
            </Row>
            <ConfirmModal
              visible={deleteConfirmModal}
              setVisible={setDeleteConfirmModal}
              messageTitle={t("recruiter.jobs.information.modal.deletePostTitle")}
              messageContent={t("recruiter.jobs.information.modal.deletePostContent")}
              action={(e) => handleDelete(e, postIdToDelete)}
              onCancel={handleCancelDeleteCV}
            />
          </div>
        </div>
      </Container>
    </Form>
  );
};

export default Dashboard;
