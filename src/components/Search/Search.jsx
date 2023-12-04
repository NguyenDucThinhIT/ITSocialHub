import React, {useState} from "react";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { useQuery } from "@tanstack/react-query";
import { createSearchParams, useNavigate } from "react-router-dom";
import { Button, Col, Container, Form, Row } from "react-bootstrap";

import "./style.css";

function Search() {
  const navigate = useNavigate();
  const { t } = useTranslation("common");
  const { register, handleSubmit } = useForm();
  const [filteredCities, setFilteredCities] = useState([]);
  const [selectedCity, setSelectedCity] = useState("");
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
  
  const handleCityChange = (e) => {
    const input = e.target.value;
    setSelectedCity(input);
    const filtered = cities.filter((city) =>
      city.toLowerCase().includes(input.toLowerCase())
    );
    setFilteredCities(filtered);
    if (filtered.length === 1 && filtered[0].toLowerCase() === input.toLowerCase()) {
      setFilteredCities([]);
    }
  };
  
  const handleCitySelect = (city) => {
    setSelectedCity(city);
    setFilteredCities([]);
  };
  const onSubmit = handleSubmit((data) => {
    navigate({
      pathname: "/joblist",
      search: `?page=1&keyword=${data.title}&location=${data.city}`,
    });
  });

  return (
    <div className="search-wrapped" >
      <div className="search-container">
        <div className="search-form">
          <div className="search-box mb-5">
            <Form onSubmit={onSubmit}>
              <Container>
                <Row className="gy-2">
                  <Col lg={3}>
                  <Form.Control
                      {...register("city", { required: true })}
                      className="search-height"
                      placeholder={t("jobPage.all")}
                      value={selectedCity}
                      onChange={handleCityChange}
                    />
                    <Form.Control.Feedback type="invalid">
                      {t("jobPage.invalidCity")}
                    </Form.Control.Feedback>
                    {filteredCities.length > 0 && (
                      <div className="autocomplete">
                        {filteredCities.map((city) => (
                          <div
                            key={city}
                            className="autocomplete-item"
                            onClick={() => handleCitySelect(city)}
                          >
                            {city}
                          </div>
                        ))}
                      </div>
                    )}
                  </Col>
                  <Col lg={6}>
                    <Form.Control
                      {...register("title")}
                      className="search-height"
                      type="text"
                      placeholder={t("jobPage.searchTitle")}
                    />
                  </Col>
                  <Col lg={3}>
                    <Button
                      type="submit"
                      variant="dark"
                      className="search-height w-100"
                    >
                      {t("landing.findJobs")}
                    </Button>
                  </Col>
                </Row>
              </Container>
            </Form>
          </div>
          
          
        </div>
      </div>
    </div>
  );
}

export default Search;
