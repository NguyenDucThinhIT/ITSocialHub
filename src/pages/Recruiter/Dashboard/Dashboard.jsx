import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import moment from "moment";
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
  Container,
} from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { getPostRecruitment } from "@/services/recruitment.api";
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

const Dashboard = () => {
  const { t } = useTranslation("common");
  const user = useSelector((state) => state.auth.user);
  const navigate = useNavigate();
  const [initialData, setInitialData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [quantumPosts, setQuantumPosts] = useState(0);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);

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

  useEffect(() => {
    getPostRecruitment().then((res) => {
      const recruitmentPosts = res.data.items;
      setInitialData(recruitmentPosts);
      setQuantumPosts(recruitmentPosts.length);
      setIsLoading(false);
    });
  }, []);

  const handleEdit = (postId) => {
    navigate(`/job/edit/${postId}`);
  };

  const handleDelete = (postId) => {
    // Logic để xử lý chức năng xóa
  };
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
                <div className="info-count">{quantumPosts} Bài tuyển dụng</div>
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
                              className="edit-button"
                              onClick={() => handleEdit(post.id)}
                            >
                              Chỉnh sửa
                            </button>
                            <button
                              className="delete-button"
                              onClick={() => handleDelete(post.id)}
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
          </div>
        </div>
      </Container>
    </Form>
  );
};

export default Dashboard;
