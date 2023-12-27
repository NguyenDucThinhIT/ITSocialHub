import React, { useState, useEffect } from "react";
import { Row, Col, Container, Image, Form, ListGroup } from "react-bootstrap";
import Swal from "sweetalert2";
import { useTranslation } from "react-i18next";
import moment from "moment";
import TimeAgo from "@/components/TimeAgo";
import { Link } from "react-router-dom";
import Select from "react-select";
import RichTextEditor from "@/components/RichTextEditor/RichTextEditor";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUpload } from "@fortawesome/free-solid-svg-icons";
import { getIdCompany } from "@/services/company";
import { useParams } from "react-router-dom";

import "./stylee.css";

const ProfileCompany = () => {
  const { t } = useTranslation("common");
  const [coverImage, setCoverImage] = useState(null);
  const [logo, setLogo] = useState(null);
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
  const [initialData, setInitialData] = useState([]);
  const { postId } = useParams();
  useEffect(() => {
    getIdCompany(postId)
      .then((res) => {
        setCoverImage(res.data.company.image_url);
        setLogo(res.data.company.logo_url);
        setNameCompany(res.data.company.name);
        setTitleCompany(res.data.company.title);
        setAddressCompany(res.data.company.address);
        setAddressMainCompany(res.data.company.address_main);
        setScaleCompany(res.data.company.scale);
        setFieldCompany(res.data.company.field);
        setWebCompany(res.data.company.web);
        setFbCompany(res.data.facebook);
        setLinkedInCompany(res.data.linkedIn);
        setDescriptionCompany(res.data.company.description);
        setCultureCompany(res.data.company.culture);
        setInitialData(res.data.recruitment_posts);
      })
      .catch((error) => {
        console.error("Error fetching post data:", error);
      });
  }, [postId]);
  const onSubmit = async (e) => {
    e.preventDefault();
  };
  return (
    <>
      <Form onSubmit={onSubmit} className=" bg-white">
        <Container className="p-5">
          <Col className="col-12">
            <div>
              <div className="banner-container">
                {coverImage && (
                  <Image src={coverImage} fluid className="cover-image" />
                )}
              </div>
            </div>
            <div className="card border-1">
              <Row>
                <Col md={12} lg={2}>
                  <div className="company-profile-image">
                    {<Image src={logo} />}
                  </div>
                </Col>
                <Col md={12} lg={8}>
                  <div className=" ml-2">
                    <h1 className="font-bold">{nameCompany}</h1>
                    <h4 className="card-title pb-2">{titleCompany}</h4>
                    <Row>
                      <Col>
                        <div className="d-flex">
                          <div className="mr-3">Website:</div>
                          <div>{webCompany}</div>
                        </div>
                      </Col>
                      <Col>
                        <div className="d-flex">
                          <div className="mr-1 abcd">{t("company.businessAreas")}</div>
                          <div className="abc">{fieldCompany}</div>
                        </div>
                      </Col>
                    </Row>
                    <Row>
                      <Col>
                        <div className="d-flex">
                          <div className="mr-1">{t("company.location")}</div>
                          <div>{addressMainCompany}</div>
                        </div>
                      </Col>
                      <Col>
                        <div className="d-flex">
                          <div className="mr-10 abcd">{t("company.size")}</div>
                          <div className="abc">{scaleCompany}</div>
                        </div>
                      </Col>
                    </Row>
                  </div>
                </Col>
              </Row>
            </div>
          </Col>

          <div className="card border-1">
            <Row>
              <Row>
                <h2 className="info-cityy ml-2">{t("company.information")}</h2>
              </Row>
              <div className=" ml-2">
                <Row>
                  <Row>
                    <h3 className="info-cty">{t("company.introduction")}</h3>
                  </Row>
                  <div
                    dangerouslySetInnerHTML={{ __html: descriptionCompany }}
                  />
                </Row>
                <Row>
                  <Row>
                    <h3 className="info-cty">{t("company.address")}</h3>
                  </Row>
                  <div>{addressCompany}</div>
                </Row>
                <Row>
                  <Row>
                    <h3 className="info-cty">{t("company.culture")}</h3>
                  </Row>
                  <div dangerouslySetInnerHTML={{ __html: cultureCompany }} />
                </Row>
              </div>
            </Row>
          </div>
          <div className="card border-1">
            <h2 className="info-cty ml-2">{t("company.jobs")}</h2>
            <div className="ml-2">
              {initialData.map((post) => (
                <ListGroup.Item key={post.id}>
                  <div className="info-jobPost">
                    <Link
                      className="name-jobbb"
                      to={`/jobs/${post.id}`}
                      target="_blank"
                    >
                      {post.title}
                    </Link>
                    <div className="info-create">
                      {t("recruiter.time.posted")}
                      <TimeAgo createdAt={post.updated_at} />
                    </div>
                    <div className="line-cty"></div>
                  </div>
                </ListGroup.Item>
              ))}
            </div>
          </div>
        </Container>
      </Form>
    </>
  );
};

export default ProfileCompany;
