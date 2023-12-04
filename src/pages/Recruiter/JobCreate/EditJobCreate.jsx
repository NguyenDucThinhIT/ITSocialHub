import React, { useState, useEffect } from "react";
import Swal from "sweetalert2";
import Select from "react-select";
import { Row, Col, Container, Image, Form } from "react-bootstrap";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import RichTextEditor from "@/components/RichTextEditor/RichTextEditor";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useMutation } from "@tanstack/react-query";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { validateDateExpired } from "@/components/Validated/Validated";
import { useParams } from "react-router-dom";
import {
  getIdPostRecruitment,
  editRecruitment,
} from "@/services/recruitment.api";
import Big from "big.js";
import "./style.css";

const EditJobCreate = () => {
  const { t } = useTranslation("common");
  const [roleJob, setRoleJob] = useState("");
  const [titleJob, setTitleJob] = useState("");
  const [addressJob, setAddressJob] = useState("");
  const [typeJob, setTypeJob] = useState("");
  const [salaryJob, setSalaryJob] = useState("");
  const [isSalaryAgreed, setIsSalaryAgreed] = useState(false);
  const [descriptionJob, setDescriptionJob] = useState("");
  const [requestJob, setRequestJob] = useState("");
  const [education, setEducation] = useState("");
  const [experience, setExperience] = useState("");
  const [expired, setExpired] = useState("");
  const { postId } = useParams();
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    getIdPostRecruitment(postId)
      .then((res) => {
        setRoleJob(res.data.post.role);
        setTitleJob(res.data.post.title);
        setAddressJob(res.data.post.address);
        setTypeJob(res.data.post.job_type);
        setSalaryJob(res.data.post.salary);
        setDescriptionJob((prevDescription) => {
          return String(res.data.post.description);
        });
        setRequestJob((prevRequirements) => {
          return String(res.data.post.job_requirements);
        });
        setEducation(res.data.post.educational_requirements);
        setExperience(res.data.post.experience_requirements);
        setExpired(new Date(res.data.post.expired_at));
      })
      .catch((error) => {
        console.error("Error fetching post data:", error);
        setIsLoading(false);
      });
  }, [postId]);
  const handleSave = () => {
    const updatedPost = {
      role: roleJob,
      title: titleJob,
      address: addressJob,
      job_type: typeJob,
      salary: isSalaryAgreed ? "Thỏa thuận" : salaryJob,
      description: descriptionJob,
      job_requirements: requestJob,
      educational_requirements: education,
      experience_requirements: experience,
      expired_at: expired.toISOString(),
    };
    editRecruitment(postId, updatedPost)
      .then(() => {
        navigate("/dashboard");
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
      text: t("candidate.tags.editPost"),
    });
  };
  const handleCancel = () => {
    navigate("/dashboard");
  };
  const roleAllJob = [
    {
      danhMuc: "Công nghệ thông tin",
      ngheNghiep: [
        "Chuyên viên kiểm toán nội bộ",
        "Thực tập sinh công nghệ thông tin",
        "Nhân viên quản trị dự án công nghệ thông tin",
        "Nhân viên công nghệ thông tin",
        "Kỹ sư công nghệ thông tin",
        "Chuyên viên thanh tra",
        "Nhân viên IT",
        "Kỹ sư hệ thống công nghệ thông tin",
        "Giảng viên công nghệ thông tin",
        "Trưởng phòng kinh doanh dịch vụ công nghệ thông tin",
        "Quản trị cơ sở dữ liệu",
        "Chuyên viên phân tích bảo mật dữ liệu",
        "Kỹ sư bảo mật",
        "Kỹ sư an toàn thông tin",
        "Chuyên gia bảo mật thông tin",
        "Kỹ sư an ninh mạng",
        "Kiến trúc sư điện toán đám mây",
        "Chuyên viên tư vấn giải pháp điện toán đám mây",
        "Quản lý dự án và sản phẩm điện toán đám mây",
        "Quản trị viên hệ thống đám mây",
        "Kỹ sư hệ thống điện toán đám mây",
        "Frontend Developer",
        "Backend Developer",
        "Fullstack Developer",
        "Business Analyst",
      ],
    },
    {
      danhMuc: "Truyền Thông & Sự Kiện",
      ngheNghiep: [
        "Truyền thông báo chí",
        "Truyền thông multimedia",
        "Truyền thông thực hành",
        "Nghiên cứu truyền thông",
      ],
    },
    {
      danhMuc: "Quan Hệ Công Chúng",
      ngheNghiep: [
        "Xây dựng chiến lược truyền thông",
        "Viết và phát hành tuyên bố báo chí",
        "Quản lý quan hệ với truyền thông",
        "Tổ chức sự kiện",
      ],
    },
    {
      danhMuc: "Hành Chính Nhân Sự",
      ngheNghiep: [
        "Quản lý hồ sơ nhân viên",
        "Tuyển dụng và tuyển chọn",
        "Đào tạo và phát triển nhân sự",
        "Quản lý hiệu suất làm việc",
        "Quản lý lợi ích và bảo hiểm cho nhân viên",
      ],
    },
    {
      danhMuc: "Logistics",
      ngheNghiep: [
        "Quản lý chuỗi cung ứng",
        "Quản lý kho và tồn kho",
        "Vận chuyển và phân phối hàng hóa",
      ],
    },
    {
      danhMuc: "Thiết Kế Đồ Họa",
      ngheNghiep: [
        "Tạo và chỉnh sửa hình ảnh",
        "Phát triển giao diện và trải nghiệm người dùng",
        "Sản xuất nội dung đa phương tiện",
        "Đảm bảo tuân thủ tiêu chuẩn thiết kế",
      ],
    },
    {
      danhMuc: "Digital Marketing",
      ngheNghiep: [
        "Quảng cáo trực tuyến",
        "Tối ưu hóa SEO",
        "Quản lý nội dung trên mạng xã hội",
        "Email Marketing",
        "Theo dõi hiệu suất chiến dịch",
      ],
    },
    {
      danhMuc: "Trí Tuệ Nhân Tạo",
      ngheNghiep: [
        "Phát triển mô hình Machine Learning",
        "Xử lý và phân tích dữ liệu",
        "Phân loại và dự đoán",
      ],
    },
    {
      danhMuc: "Tài Chính & Kế Toán",
      ngheNghiep: [
        "Quản lý tài chính",
        "Lập báo cáo kế toán",
        "Chuyên viên kế toán",
      ],
    },
    {
      danhMuc: "Quản Lý Nhân Sự",
      ngheNghiep: [
        "Tuyển dụng và đào tạo",
        "Quản lý hiệu suất",
        "Quản lý lợi ích và bảo hiểm cho nhân viên",
      ],
    },
    {
      danhMuc: "Marketing",
      ngheNghiep: [
        "Nghiên cứu thị trường",
        "Phát triển chiến lược tiếp thị",
        "Quảng cáo và quan hệ công chúng",
      ],
    },
    {
      danhMuc: "Phân Tích Kinh Doanh & Bán Hàng",
      ngheNghiep: [
        "Tìm kiếm khách hàng mới",
        "Quản lý mối quan hệ khách hàng",
        "Thực hiện chiến lược bán hàng",
      ],
    },
  ];

  const convertToOptions = (roleAllJob) => {
    return roleAllJob.flatMap((category) => {
      return category.ngheNghiep.map((job) => ({
        value: job,
        label: (
          <div>
            <div>{job}</div>
            <div style={{ fontSize: "0.9rem", color: "gray" }}>
              {category.danhMuc}
            </div>
          </div>
        ),
      }));
    });
  };
  const handleRoleJobChange = (selectedOption) => {
    setRoleJob(selectedOption.value);
  };
  const handleDescriptionChange = (value) => {
    setDescriptionJob(value);
  };
  const handleRequestChange = (value) => {
    setRequestJob(value);
  };
  const formatNumber = (value) => {
    const bnValue = new Big(value);
    const integerPart = bnValue.toFixed(0);
    const parts = integerPart.split("").reverse();
    let result = "";
    for (let i = 0; i < parts.length; i++) {
      result = parts[i] + result;
      if ((i + 1) % 3 === 0 && i !== parts.length - 1) {
        result = "." + result;
      }
    }
    return result;
  };

  const handleSalaryChange = (e) => {
    const value = e.target.value;
    const sanitizedValue = value.replace(/[^0-9]/g, "");

    if (isSalaryAgreed) {
      setSalaryJob("Thỏa thuận");
    } else {
      if (sanitizedValue === "") {
        setSalaryJob("");
      } else if (sanitizedValue.length <= 12) {
        const formattedValue = formatNumber(sanitizedValue);
        setSalaryJob(formattedValue);
      }
    }
  };

  const handleSwitchChange = () => {
    setIsSalaryAgreed((prev) => !prev);
    setSalaryJob("Thỏa thuận");
  };
  const onSubmit = () => {
    handleSave();
  };
  return (
    <>
      <Form onSubmit={onSubmit} className="bg-white">
        <Container className="p-5 body-job">
          <h2 className="pb-4 font-bold">Đăng tin tuyển dụng</h2>
          <Row className="mt-3 pl-12">
            <Col md={4}>
              <p>
                <span className="star">✻</span> Đây là phần bắt buộc
              </p>
            </Col>
          </Row>
          <Row className="mt-3">
            <Col md={4}>
              <div className="info-company">Vai trò công việc</div>
            </Col>
            <Col md={8}>
              <div className="role-job">
                <Select
                  className="select-control"
                  value={{ value: roleJob, label: roleJob }}
                  onChange={handleRoleJobChange}
                  options={convertToOptions(roleAllJob)}
                  placeholder="Chọn vai trò công việc"
                  disabled={true}
                />
                <span className="required-icon">
                  <img
                    src="/assets/images/form-icon-required.png"
                    alt="Required"
                  />
                </span>
              </div>
            </Col>
          </Row>
          <Row className="mt-3">
            <Col md={4}>
              <div className="info-company">Tiêu đề công việc</div>
            </Col>
            <Col md={8}>
              <div className="title-job">
                <input
                  type="text"
                  className="input-form"
                  value={titleJob}
                  placeholder="Nhập tiêu đề công việc"
                  onChange={(e) => {
                    setTitleJob(e.target.value);
                  }}
                  required
                />
                <span className="required-icon">
                  <img
                    src="/assets/images/form-icon-required.png"
                    alt="Required"
                  />
                </span>
              </div>
            </Col>
          </Row>
          <Row className="mt-3">
            <Col md={4}>
              <div className="info-company">Địa chỉ làm việc</div>
            </Col>
            <Col md={8}>
              <div className="address-job">
                <input
                  type="text"
                  className="input-form"
                  value={addressJob}
                  placeholder="Nhập địa chỉ làm việc"
                  onChange={(e) => {
                    setAddressJob(e.target.value);
                  }}
                  required
                />
                <span className="required-icon">
                  <img
                    src="/assets/images/form-icon-required.png"
                    alt="Required"
                  />
                </span>
              </div>
            </Col>
          </Row>
          <Row className="mt-3">
            <Col md={4}>
              <div className="info-company">Loại hình công việc</div>
            </Col>
            <Col md={8}>
              <div className="form-group">
                <select
                  className="input-form"
                  value={typeJob}
                  onChange={(e) => {
                    setTypeJob(e.target.value);
                  }}
                >
                  <option>Toàn thời gian</option>
                  <option>Bán thời gian</option>
                  <option>Thực tập</option>
                  <option>Theo dự án</option>
                  <option>Theo ngày</option>
                </select>
              </div>
            </Col>
          </Row>
          <Row className="mt-3">
            <Col md={4}>
              <div className="info-company">Lương (VND)</div>
            </Col>
            <Col md={4}>
              <div className="salary-job">
                <input
                  type="text"
                  className="input-form"
                  value={salaryJob}
                  maxLength="12"
                  placeholder="0"
                  onChange={handleSalaryChange}
                  disabled={isSalaryAgreed}
                  required
                />
                <span className="required-icon">
                  <img
                    src="/assets/images/form-icon-required.png"
                    alt="Required"
                  />
                </span>
              </div>
            </Col>
            <Col md={4}>
              <div className="switch-salary">
                <Form.Check
                  type="switch"
                  id="salarySwitch"
                  label="Lương thỏa thuận"
                  onChange={handleSwitchChange}
                  checked={isSalaryAgreed}
                />
              </div>
            </Col>
          </Row>
          <div className="line-company"></div>
          <div>
            <div className="description-job">
              Mô tả công việc <span className="star">✻</span>
            </div>
            <RichTextEditor
              className="text-edit"
              value={descriptionJob}
              handleChange={handleDescriptionChange}
              placeholder="Mô tả loại công việc ở vị trí này"
            />
          </div>
          <div>
            <div className="description-job">
              Yêu cầu công việc <span className="star">✻</span>
            </div>
            <RichTextEditor
              className="text-edit"
              value={requestJob}
              handleChange={handleRequestChange}
              placeholder="Mô tả yêu cầu và trách nhiệm của vị trí này"
            />
          </div>
          <div className="line-company"></div>
          <Row className="mt-3">
            <Col md={4}>
              <div className="info-company">Yêu Cầu Trình Độ Học Vấn</div>
            </Col>
            <Col md={8}>
              <div className="form-group">
                <select
                  className="input-form"
                  value={education}
                  onChange={(e) => {
                    setEducation(e.target.value);
                  }}
                >
                  <option>Không yêu cầu</option>
                  <option>Tiểu Học</option>
                  <option>Trung Học Cơ Sở</option>
                  <option>Trung Học Phổ Thông</option>
                  <option>Bằng Liên Kết</option>
                  <option>Cử Nhân</option>
                  <option>Thạc Sĩ</option>
                  <option>Tiến Sĩ</option>
                </select>
              </div>
            </Col>
          </Row>
          <Row className="mt-3">
            <Col md={4}>
              <div className="info-company">Yêu cầu kinh nghiệm</div>
            </Col>
            <Col md={8}>
              <div className="form-group">
                <select
                  className="input-form"
                  value={experience}
                  onChange={(e) => {
                    setExperience(e.target.value);
                  }}
                  required
                >
                  <option>Không yêu cầu</option>
                  <option>Ít hơn 1 năm</option>
                  <option>1-3 năm</option>
                  <option>3-5 năm</option>
                  <option>5-10 năm</option>
                  <option>Hơn 10 năm</option>
                </select>
              </div>
            </Col>
          </Row>
          <div className="line-company"></div>
          <Row className="mt-3">
            <Col md={4}>
              <div className="info-company">Thời hạn ứng tuyển</div>
            </Col>
            <Col md={5}>
              <div className="expired-job">
                <DatePicker
                  className="input-form"
                  selected={expired}
                  onChange={(date) => setExpired(date)}
                  dateFormat="dd-MM-yyyy"
                  showYearDropdown
                  scrollableYearDropdown
                  yearDropdownItemNumber={30}
                />
                <span className="required-icon">
                  <img
                    src="/assets/images/form-icon-required.png"
                    alt="Required"
                  />
                </span>
              </div>
            </Col>
            <Col md={3}>
              <div className="text-expired">Thời hạn tối thiểu 3 ngày</div>
            </Col>
          </Row>
          <div className="line-company"></div>
          <div className="info-actions">
            <div className="cancel-info-company">
              <button type="button" onClick={handleCancel}>
                Hủy
              </button>
            </div>
            <div className="save-info-company">
              <button type="button" onClick={handleSave}>
                Lưu
              </button>
            </div>
          </div>
        </Container>
      </Form>
    </>
  );
};

export default EditJobCreate;
