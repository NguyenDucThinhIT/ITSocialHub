import React from "react";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { useQuery } from "@tanstack/react-query";
import { createSearchParams, useNavigate } from "react-router-dom";
import { Button, Col, Container, Form, Row } from "react-bootstrap";

//import { getLocations } from "@/services/locations.api";
//import useQueryConfigJob from "@/hooks/useQueryConfigJob";
import "./style.css";

function Search() {
  const navigate = useNavigate();
  //const queryConfig = useQueryConfigJob();
  const { t } = useTranslation("common");
  const { register, handleSubmit } = useForm();

  // const { data: locations } = useQuery({
  //   queryKey: ["locations"],
  //   queryFn: () => {
  //     return getLocations();
  //   },
  //   keepPreviousData: true,
  // });

  const onSubmit = handleSubmit((data) => {
    navigate({
      pathname: "/joblist",
      search: createSearchParams({
        ...queryConfig,
        page: 1,
        keyword: data.title,
        location: data.city,
      }).toString(),
    });
  });

  return (
    <div className="search-wrapped">
      <div className="search-container">
        <div className="search-form">
          <div className="search-box mb-5">
            <Form onSubmit={onSubmit}>
              <Container>
                <Row className="gy-2">
                  <Col lg={3}>
                    <Form.Select
                      {...register("city")}
                      className="search-height"
                      defaultValue="Choose..."
                    >
                      {/* <option value="">{t("jobPage.all")}</option>
                      {locations &&
                        locations.data.data.map((location) => (
                          <option key={location.id} value={location.city}>
                            {location.city}
                          </option> */}
                        ))}
                    </Form.Select>
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
