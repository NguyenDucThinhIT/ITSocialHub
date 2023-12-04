import React, { useState, useEffect } from "react";
import Swal from "sweetalert2";
import { Row, Col, Container, Image, Form } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import TimeAgo from "@/components/TimeAgo";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faDollarSign,
  faBuilding,
  faHourglassHalf,
  faGraduationCap,
  faBriefcase,
  faClock,
  faCircle,
  faShareNodes,
} from "@fortawesome/free-solid-svg-icons";

import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import "./style.css";
import { getIdPostRecruitment } from "@/services/recruitment.api";
import UploadCVModal from "@/components/UploadCVModal";

const InforJobs = () => {
  const { t } = useTranslation("common");
  const navigate = useNavigate();
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const { postId } = useParams();
  const [companyID, setCompanyID] = useState("");
  const [logo, setLogo] = useState("");
  const [title, setTitle] = useState("");
  const [create, setCreate] = useState("");
  const [update, setUpdate] = useState("");
  const [expired, setExpired] = useState("");
  const [addressCompany, setAddressCompany] = useState("");
  const [name, setName] = useState("");
  const [salary, setSalary] = useState("");
  const [field, setField] = useState("");
  const [avatar, setAvatar] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [jobType, setJobType] = useState("");
  const [description, setDescription] = useState("");
  const [request, setRequest] = useState("");
  const [education, setEducation] = useState("");
  const [experience, setExperience] = useState("");
  const [applied, setApplied] = useState(false);
  const [isExpired, setIsExpired] = useState(false);
  const [showModal, setShowModal] = useState(false);
  useEffect(() => {
    handleGetJobInfor();
  }, []);
  const handleGetJobInfor = () => {
    getIdPostRecruitment(postId)
      .then((res) => {
        setCompanyID(res.data.company.id);
        setLogo(res.data.company.logo_url);
        setName(res.data.company.name);
        setTitle(res.data.post.title);
        setSalary(res.data.post.salary);
        setJobType(res.data.post.job_type);
        setExperience(res.data.post.experience_requirements);
        setEducation(res.data.post.educational_requirements);
        setAvatar(res.data.user.image_url);
        setFirstName(res.data.user.first_name);
        setLastName(res.data.user.last_name);
        setCreate(res.data.post.created_at);
        setUpdate(res.data.post.updated_at);
        setExpired(res.data.post.expired_at);
        setAddressCompany(res.data.company.address);
        setField(res.data.company.field);
        setDescription(res.data.post.description);
        setRequest(res.data.post.job_requirements);
        setApplied(res.data.post.applied);
        //check
        const currentDate = new Date();
        const expirationDate = new Date(expired);
        const hasExpired = currentDate > expirationDate;
        setIsExpired(hasExpired);
      })
      .catch((error) => {
        console.error("Error fetching post data:", error);
      });
  }
  const isApplicationExpired = () => {
    const currentDate = new Date();
    const expirationDate = new Date(expired);
    return currentDate > expirationDate;
  };
  const handleOpenModal = () => {
    setShowModal(true);
  };
  const handleClose = () => {
    setShowModal(false);
    handleGetJobInfor();
  };
  const handleApplyClick = (e) => {
    e.preventDefault();
    if (isAuthenticated) {
      if (!isApplicationExpired() && !applied) {
        // Nếu chưa ứng tuyển và chưa hết hạn, mở modal
        handleOpenModal();
      }
    } else {
      Swal.fire({
        icon: "info",
        title: "Thông báo",
        text: "Bạn cần đăng nhập để ứng tuyển.",
      }).then(() => {
        navigate("/login")();
      });
    }
  };
  const handleShareClick = () => {
    const currentURL = window.location.href;
    navigator.clipboard.writeText(currentURL);
    Swal.mixin({
      toast: true,
      position: "top-end",
      timer: 3000,
      timerProgressBar: true,
      showConfirmButton: false,
    }).fire({
      icon: "success",
      text: "Đã sao chép liên kết",
    });
  };
  return (
    <>
      <Form className=" bg-white">
        <Container className="p-5">
          <Col className="col-12">
            <div className={`card border-1`}>
              <Row>
                <Col md={12} lg={2}>
                  <div className="company-profile-image">
                    {
                      <Image
                        src={logo || "/assets/images/user.png"}
                        className="log0"
                      />
                    }
                  </div>
                </Col>
                <Col md={12} lg={8}>
                  <div className=" ml-2">
                    <h2 className="font-bold">
                      {title} {isExpired && "(Hết hạn)"}
                    </h2>
                    <div className="cus-namee-cty">
                      <p>
                        <img
                          src="/assets/images/tichxanh.png"
                          alt="/assets/images/tichxanh.png"
                          className="icon-tichxanhh"
                        />
                        <Link
                          className="link-cty"
                          to={`/companies/${companyID}`}
                          target="_blank"
                        >
                          {name}
                        </Link>
                      </p>
                    </div>
                    <Row>
                      <div className="d-flex">
                        <div className="mr-3">
                          <FontAwesomeIcon icon={faDollarSign} />
                        </div>
                        <div>{salary} VND</div>
                      </div>
                    </Row>
                    <Row>
                      <div className="d-flex">
                        <div className="mr-1 fa-build">
                          <FontAwesomeIcon icon={faBuilding} />
                        </div>
                        <div>{field}</div>
                      </div>
                    </Row>
                    <Row>
                      <div className="d-flex">
                        <div className="mr-3">
                          <FontAwesomeIcon icon={faHourglassHalf} />
                        </div>
                        <div>{jobType}</div>
                      </div>
                    </Row>
                    <Row>
                      <div className="d-flex">
                        <div className="mr-1">
                          <FontAwesomeIcon icon={faGraduationCap} />
                          Tối thiểu
                        </div>
                        <div>{education}</div>
                      </div>
                    </Row>
                    <Row>
                      <div className="d-flex">
                        <div className="mr-1 fa-brie">
                          <FontAwesomeIcon icon={faBriefcase} />
                        </div>
                        <div>{experience}</div>
                      </div>
                    </Row>
                    <Row>
                      <div className="d-flex text-time">
                        <div className="text-timee">
                          <FontAwesomeIcon icon={faClock} className="fa-time" />
                          Đăng
                        </div>
                        <div className="mr-2">
                          <TimeAgo createdAt={create} />
                        </div>
                        <div>
                          <FontAwesomeIcon icon={faCircle} />
                          Cập nhật
                        </div>
                        <div>
                          <TimeAgo createdAt={update} />
                        </div>
                      </div>
                    </Row>
                    <Row>
                      <div className="d-flex">
                        <button
                          className="button-apply"
                          onClick={(e) => handleApplyClick(e)}
                          disabled={isApplicationExpired() || applied}
                        >
                          {applied ? "Đã ứng tuyển" : "Ứng tuyển ngay"}
                        </button>
                        <UploadCVModal
                          show={showModal}
                          handleClose={handleClose}
                          postId={postId}
                        />
                        <div
                          className="button-share"
                          onClick={handleShareClick}
                        >
                          <FontAwesomeIcon icon={faShareNodes} />
                          Chia sẻ
                        </div>
                      </div>
                    </Row>
                  </div>
                </Col>
              </Row>
            </div>
          </Col>

          <div className="card border-1">
            <Row>
              <Row>
                <h3 className="info-cityy ml-2">Tin này được quản lý bởi</h3>
                <div className="d-flex">
                  <img
                    src={avatar || "/assets/images/user.png"}
                    alt=""
                    className="avatar-hr"
                  />
                  <div>
                    <div className="name-hr">
                      {firstName} {lastName}
                    </div>
                    <div className="name-hr">Recruitment of {name}</div>
                  </div>
                </div>
              </Row>
              <div className=" ml-2">
                <Row>
                  <Row>
                    <h3 className="info-cty description-text">
                      Mô tả công việc
                    </h3>
                  </Row>
                  <div dangerouslySetInnerHTML={{ __html: description }} />
                </Row>
                <Row>
                  <Row>
                    <h3 className="info-cty">Yêu cầu công việc</h3>
                  </Row>
                  <div dangerouslySetInnerHTML={{ __html: request }} />
                </Row>
                <Row>
                  <Row>
                    <h3 className="info-cty">Địa điểm làm việc</h3>
                  </Row>
                  <div>{addressCompany}</div>
                </Row>
              </div>
            </Row>
          </div>
          <div className="card border-1">
            <div className="d-flex ">
              <img
                src="/assets/images/protect.png"
                alt=""
                className="protect"
              />
              <div className="protect-text ">
                An Toàn khi tìm việc trên TalentHarbor
              </div>
            </div>
            <div className="protect-title info-cty">
              KHÔNG cung cấp thông tin ngân hàng hoặc thẻ tín dụng khi ứng
              tuyển. Nhà tuyển dụng KHÔNG bao giờ yêu cầu chi phí ứng tuyển hoặc
              phí đào tạo.
            </div>
          </div>
        </Container>
      </Form>
    </>
  );
};

export default InforJobs;
