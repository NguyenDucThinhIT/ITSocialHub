import React, { useState, useEffect } from "react";
import { Row, Col, Container, Image, Form } from "react-bootstrap";
import Swal from "sweetalert2";
import { useTranslation } from "react-i18next";
import Select from "react-select";
import RichTextEditor from "@/components/RichTextEditor/RichTextEditor";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUpload } from "@fortawesome/free-solid-svg-icons";
import { getProfileCompany, updateProfileCompany } from "@/services/company";
import { upload } from "@/services/upload.api";

import "./style.css";

const CompanyProfile = () => {
  const { t } = useTranslation("common");
  const [coverImage, setCoverImage] = useState(null);
  const [fileCover, setFileCover] = useState();
  const [logo, setLogo] = useState(null);
  const [fileLogo, setFileLogo] = useState();
  const [nameCompany, setNameCompany] = useState("");
  const [titleCompany, setTitleCompany] = useState("");
  const [addressCompany, setAddressCompany] = useState("");
  const [addressMainCompany, setAddressMainCompany] = useState("");
  const [scaleCompany, setScaleCompany] = useState("");
  const [fieldCompany, setFieldCompany] = useState("");
  const [webCompany, setWebCompany] = useState("");
  const [fbCompany, setFbCompany] = useState("");
  const [linkedInCompany, setLinkedInCompany] = useState("");
  const [descriptionCompany, setDescriptionCompany] = useState("");
  const [cultureCompany, setCultureCompany] = useState("");
  const cities = [
    "An Giang",
    "Bà Rịa Vũng Tàu",
    "Bắc Giang",
    "Bắc Kạn",
    "Bạc Liêu",
    "Bắc Ninh",
    "Bến Tre",
    "Bình Định",
    "Bình Dương",
    "Bình Phước",
    "Bình Thuận",
    "Cà Mau",
    "Cần Thơ",
    "Cao Bằng",
    "Đà Nẵng",
    "Đắk Lắk",
    "Đắk Nông",
    "Điện Biên",
    "Đồng Nai",
    "Đồng Tháp",
    "Gia Lai",
    "Hà Giang",
    "Hà Nam",
    "Hà Nội",
    "Hà Tĩnh",
    "Hải Dương",
    "Hải Phòng",
    "Hậu Giang",
    "Hòa Bình",
    "Hưng Yên",
    "Khánh Hòa",
    "Kiên Giang",
    "Kon Tum",
    "Lai Châu",
    "Lâm Đồng",
    "Lạng Sơn",
    "Lào Cai",
    "Long An",
    "Nam Định",
    "Nghệ An",
    "Ninh Bình",
    "Ninh Thuận",
    "Phú Thọ",
    "Phú Yên",
    "Quảng Bình",
    "Quảng Nam",
    "Quảng Ngãi",
    "Quảng Ninh",
    "Quảng Trị",
    "Sóc Trăng",
    "Sơn La",
    "Tây Ninh",
    "Thái Bình",
    "Thái Nguyên",
    "Thanh Hóa",
    "Thừa Thiên Huế",
    "Tiền Giang",
    "TP Hồ Chí Minh",
    "Trà Vinh",
    "Tuyên Quang",
    "Vĩnh Long",
    "Vĩnh Phúc",
    "Yên Bái",
  ];
  const handleCityChange = (selectedOption) => {
    setAddressMainCompany(selectedOption.value);
  };
  const handleDescriptionChange = (value) => {
    setDescriptionCompany(value);
  };
  const handleCultureChange = (value) => {
    setCultureCompany(value);
  };
  const isImageValid = (file) => {
    const allowedExtensions = ["jpg", "jpeg", "png"];
    const extension = file.name.split(".").pop().toLowerCase();
    return allowedExtensions.includes(extension);
  };

  const handleCoverImageChange = (event) => {
    const file = event.target.files[0];
    if (file && isImageValid(file)) {
      const reader = new FileReader();
      setFileCover(file)
      reader.onload = () => {
        setCoverImage(reader.result);
      };
      reader.readAsDataURL(file);
    } else {
      alert("Vui lòng chọn một tệp ảnh có định dạng .jpg, .jpeg hoặc .png");
    }
  };

  const handleLogoChange = (event) => {
    const file = event.target.files[0];
    if (file && isImageValid(file)) {
      const reader = new FileReader();
      setFileLogo(file)
      reader.onload = () => {
        setLogo(reader.result);
      };
      reader.readAsDataURL(file);
    } else {
      alert("Vui lòng chọn một tệp ảnh có định dạng .jpg, .jpeg hoặc .png");
    }
  };
  useEffect(() => {
    getProfileCompany()
      .then((res) => {
        setCoverImage(res.data.image_url);
        setLogo(res.data.logo_url);
        setNameCompany(res.data.name);
        setTitleCompany(res.data.title);
        setAddressCompany(res.data.address);
        setAddressMainCompany(res.data.address_main);
        setScaleCompany(res.data.scale);
        setFieldCompany(res.data.field);
        setWebCompany(res.data.web);
        setFbCompany(res.data.facebook);
        setLinkedInCompany(res.data.linkedIn);
        setDescriptionCompany(res.data.description);
        setCultureCompany(res.data.culture);
      })
      .catch((error) => {
        console.error("Error fetching post data:", error);
      });
  }, []);
  
  const handleSave = async ()=> {
    let logoUrl = {};
    if (fileLogo) {
      try {
        logoUrl = await upload(fileLogo);
        setLogo(logoUrl.url);
      } catch (error) {
        console.error("Error uploading image:", error);
        return;
      }
    }
    let imageUrl = {};
    if (fileCover) {
      try {
        imageUrl = await upload(fileCover);
        setCoverImage(imageUrl.url);
      } catch (error) {
        console.error("Error uploading image:", error);
        return;
      }
    }
    const updated = {
      logo_url: logoUrl.url,
      image_url: imageUrl.url,
      name: nameCompany,
      title: titleCompany,
      address: addressCompany,
      address_main: addressMainCompany,
      scale: scaleCompany,
      field: fieldCompany,
      web: webCompany,
      facebook: fbCompany,
      linkedIn: linkedInCompany,
      description: descriptionCompany,
      culture: cultureCompany,
      };
    updateProfileCompany(updated)
      .then(() => {
        Swal.mixin({
          toast: true,
          position: "top-end",
          timer: 3000,
          timerProgressBar: true,
          showConfirmButton: false,
        }).fire({
          icon: "success",
          text: t("recruiter.dashboard.profileCompany"),
        });
      })
      .catch((error) => {
        console.error("Error updating post:", error);
      });
      
  };
  const onSubmit = async (e)=> {
    e.preventDefault();
    handleSave();
  };
  return (
    <>
      <Form onSubmit={onSubmit} className=" bg-white">
        <Container className="p-5">
          <h2 className="pb-4 font-bold">Thông tin công ty</h2>
          <div>
            <div className="banner-container">
              {coverImage && (
                <Image src={coverImage} fluid className="cover-image" />
              )}
              <div className="upload">
                <Form.Group controlId="coverImage" className="d-none">
                  <Form.Control
                    type="file"
                    accept=".jpg, .jpeg, .png"
                    onChange={handleCoverImageChange}
                  />
                </Form.Group>
                <label htmlFor="coverImage">
                  <div className="upload-button">
                    <FontAwesomeIcon icon={faUpload} />
                    Upload Banner
                  </div>
                </label>
              </div>
            </div>
          </div>
          <Row className="mt-3 pl-12">
            <Col md={4}>
              <p>
                <span className="star">✻</span> Đây là phần bắt buộc
              </p>
            </Col>
            <Col md={4}>
              <p>Ảnh Banner: 800px x 300px</p>
            </Col>
            <Col md={4}>
              <p>Ảnh Logo: 120px x 120px</p>
            </Col>
          </Row>
          <Row className="mt-4">
            <Col md={4}>
              <div className="info-company mt-5">Logo Công Ty</div>
            </Col>
            <Col md={8} className="d-flex align-items-center">
              <Form.Group controlId="logo" className="d-none">
                <Form.Control
                  type="file"
                  accept=".jpg, .jpeg, .png"
                  onChange={handleLogoChange}
                />
              </Form.Group>
              <div className="ava-ima-container mr-2">
                {logo && <Image src={logo} className="company-logo" />}
              </div>
              <Row>
                <div>
                  <label htmlFor="logo" className="upload-label">
                    <div className="ava-upload-button">
                      <FontAwesomeIcon icon={faUpload} />
                      Upload logo
                    </div>
                  </label>
                </div>
              </Row>
            </Col>
          </Row>
          <Row className="mt-3">
            <Col md={4}>
              <div className="info-company">Tên Công Ty</div>
            </Col>
            <Col md={8}>
              <div className="name-company">
                <input
                  type="text"
                  className="input-form"
                  value={nameCompany}
                  placeholder="Nhập tên công ty"
                  onChange={(e) => {
                    setNameCompany(e.target.value);
                  }}
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
              <div className="info-company">Giới thiệu tóm tắt</div>
            </Col>
            <Col md={8}>
              <div className="title-company">
                <input
                  type="text"
                  className="input-form"
                  value={titleCompany}
                  placeholder="Nhập giới thiệu"
                  onChange={(e) => {
                    setTitleCompany(e.target.value);
                  }}
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
              <div className="info-company">Địa chỉ văn phòng</div>
            </Col>
            <Col md={8}>
              <div className="address-company">
                <input
                  type="text"
                  className="input-form"
                  value={addressCompany}
                  placeholder="Nhập địa chỉ văn phòng"
                  onChange={(e) => {
                    setAddressCompany(e.target.value);
                  }}
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
              <div className="info-company">Trụ sở chính</div>
            </Col>
            <Col md={8}>
              <div className="address-company">
                <Select
                  className="select-control"
                  value={{ value: addressMainCompany, label: addressMainCompany }}
                  onChange={handleCityChange}
                  options={cities.map(city => ({ value: city, label: city }))}
                  placeholder="Chọn thành phố"
                  
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
              <div className="info-company">Quy mô công ty</div>
            </Col>
            <Col md={8}>
              <div className="form-group">
                <select
                  className="input-form"
                  value={scaleCompany}
                  onChange={(e) => {
                    setScaleCompany(e.target.value);
                  }}
                >
                  <option>Tự kinh doanh</option>
                  <option>1-10 nhân viên</option>
                  <option>11-50 nhân viên</option>
                  <option>51-100 nhân viên</option>
                  <option>Hơn 500 nhân viên</option>
                </select>
              </div>
            </Col>
          </Row>
          <Row className="mt-3">
            <Col md={4}>
              <div className="info-company">Lĩnh vực kinh doanh</div>
            </Col>
            <Col md={8}>
              <div className="field-company">
                <input
                  type="text"
                  className="input-form"
                  value={fieldCompany}
                  placeholder="Nhập lĩnh vực kinh doanh"
                  onChange={(e) => {
                    setFieldCompany(e.target.value);
                  }}
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
          <div className="line-company"></div>
          <Row className="mt-3">
            <Col md={4}>
              <div className="info-company">Website Công Ty</div>
            </Col>
            <Col md={8}>
              <div className="web-company">
                <input
                  type="text"
                  className="input-form"
                  value={webCompany}
                  placeholder="Nhập link Web công ty"
                  onChange={(e) => {
                    setWebCompany(e.target.value);
                  }}
                />
              </div>
            </Col>
          </Row>
          <Row className="mt-3">
            <Col md={4}>
              <div className="info-company">Facebook</div>
            </Col>
            <Col md={8}>
              <div className="fb-company">
                <input
                  type="text"
                  className="input-form"
                  value={fbCompany}
                  placeholder="Nhập link Facebook"
                  onChange={(e) => {
                    setFbCompany(e.target.value);
                  }}
                />
              </div>
            </Col>
          </Row>
          <Row className="mt-3">
            <Col md={4}>
              <div className="info-company">LinkedIn</div>
            </Col>
            <Col md={8}>
              <div className="linkedIn-company">
                <input
                  type="text"
                  className="input-form"
                  value={linkedInCompany}
                  placeholder="Nhập link LinkedIn"
                  onChange={(e) => {
                    setLinkedInCompany(e.target.value);
                  }}
                />
              </div>
            </Col>
          </Row>
          <div className="line-company"></div>
          <div>
            <div className="description-company">
              Giới thiệu công ty <span className="star">✻</span>
            </div>
            <RichTextEditor
              className="text-edit"
              value={descriptionCompany}
              placeholder="Giới thiệu về công tyy"
              handleChange={handleDescriptionChange}
            />
          </div>
          <div>
            <div className="description-company">Văn hóa công ty</div>
            <RichTextEditor
              className="text-edit"
              value={cultureCompany}
              placeholder="Mô tả văn hóa công ty"
              handleChange={handleCultureChange}
            />
          </div>
          <div className="line-company"></div>
          <div className="save-info-company">
            <button type="button" onClick={handleSave}>Lưu</button>
          </div>
        </Container>
      </Form>
    </>
  );
};

export default CompanyProfile;
