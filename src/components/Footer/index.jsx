import { useState } from "react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFacebook,
  faTwitter,
  faGoogle,
  faInstagram,
  faLinkedin,
} from "@fortawesome/free-brands-svg-icons";
import {
  faMapMarkerAlt,
  faEnvelope,
  faPhone,
  faFax,
} from "@fortawesome/free-solid-svg-icons";
import "./index.css";

function Footer() {
  const { t, i18n } = useTranslation("common");
  return (
    <footer className="footer-job">
      <div className="container">
        <div className="row">
          <div className="col-lg-3 col-md-6">
            <h4>Talent Harbor</h4>
            <p>{t("footer.detail")}</p>
          </div>
          <div className={`col-lg-${i18n.language === "vi" ? "2" : "3"} col-md-6`}>
            <h4>{t("footer.company")}</h4>
            <ul className="list-unstyled">
              <li>
                <Link to="/about">{t("footer.aboutUs")}</Link>
              </li>
              <li>
                <Link to="/techBlog">Tech Blog</Link>
              </li>
              <li>
                <Link to="/careers">{t("footer.career")}</Link>
              </li>
              <li>
                <Link to="/term">{t("footer.term")}</Link>
              </li>
            </ul>
          </div>
          <div className={`col-lg-${i18n.language === "vi" ? "4" : "3"} col-md-6`}>
            <h4>{t("footer.seek")}</h4>
            <ul className="list-unstyled">
              <li>
                <Link to="/hc">{t("footer.help")}</Link>
              </li>
              <li>
                <Link to="/browse/location">{t("footer.location")}</Link>
              </li>
              <li>
                <Link to="/browse/company">{t("footer.name")}</Link>
              </li>
              <li>
                <Link to="/browse/job-category">{t("footer.category")}</Link>
              </li>
              <li>
                <Link to="/browse/find-jobs">{t("footer.popular")}</Link>
              </li>
            </ul>
          </div>
          <div className="col-lg-3 col-md-6">
            <h4>{t("footer.contact")}</h4>
            <ul className="list-unstyled">
              <li>
                <FontAwesomeIcon icon={faMapMarkerAlt} />
                {t("footer.located")}
              </li>
              <li>
                <FontAwesomeIcon icon={faEnvelope} /> khangthinh@gmail.com
              </li>
              <li>
                <FontAwesomeIcon icon={faPhone} /> +01 234 567 88
              </li>
              <li>
                <FontAwesomeIcon icon={faFax} /> +01 234 567 89
              </li>
            </ul>
            <h4>{t("footer.social")}</h4>
            <div className="social-icons">
              
              <ul className="social-list">
                <li>
                  <a href="#">
                    <FontAwesomeIcon icon={faFacebook} />
                  </a>
                </li>
                <li>
                  <a href="#">
                    <FontAwesomeIcon icon={faTwitter} />
                  </a>
                </li>
                <li>
                  <a href="#">
                    <FontAwesomeIcon icon={faGoogle} />
                  </a>
                </li>
                <li>
                  <a href="#">
                    <FontAwesomeIcon icon={faInstagram} />
                  </a>
                </li>
                <li>
                  <a href="#">
                    <FontAwesomeIcon icon={faLinkedin} />
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
      <div className="footer-bottom">
        <div className="container">
          <div className="row">
            <div className="col">
              © 2023 {t("footer.copyright")} - KhangThinhMedia
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
