import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useTranslation } from "react-i18next";
import { faGlobe, faChevronDown } from "@fortawesome/free-solid-svg-icons";
import "./index.css";
import { useSelector } from "react-redux";
import HeaderRecruiter from "../ManaHeader/HeaderRecruiter";

const ManageHeader = () => {
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const user = useSelector((state) => state.auth.user);
  const { t, i18n } = useTranslation("common");
  const [language, setLanguage] = useState("vi");
  const [showLanguage, setShowLanguage] = useState(false);
  const [showCV, setShowCV] = useState(false);
  const [isIconRotatedCV, setIsIconRotatedCV] = useState(false);
  const [isIconRotatedLanguage, setIsIconRotatedLanguage] = useState(false);
  const handleLanguageChange = (selectedLanguage) => {
    i18n.changeLanguage(selectedLanguage);
    setLanguage(selectedLanguage);
    setShowLanguage(false);
  };

  const dropdownLanguage = () => {
    setShowLanguage(!showLanguage);
    setShowCV(false);
    setIsIconRotatedCV(false);
    setIsIconRotatedLanguage(!showLanguage);
  };
  const dropdownCV = () => {
    setShowCV(!showCV);
    setShowLanguage(false);
    setIsIconRotatedCV(!showCV);
    setIsIconRotatedLanguage(false);
  };
  const handleContentCVClick = () => {
    setIsIconRotatedCV(!isIconRotatedCV);
  };

  const handleContentLanguageClick = () => {
    setIsIconRotatedLanguage(!isIconRotatedLanguage);
  };

  return (
    <header className="header-job">
      <div className="container">
        <div className="header-content">
          <Link to="/dashboard" className="header-logo">
            <img src='/assets/images/logo.png' alt="Logo" />
          </Link>
          <ul className="header-menu">
            <li className="header-menu-item">
              <Link to="/dashboard">Dashboard</Link>
            </li>
            <li className="header-menu-item">
              <Link to="/job/create">Đăng tin tuyển dụng</Link>
            </li>
            
          </ul>
          <div className="header-dropdown">
            <button className="header-dropbtn" onClick={dropdownLanguage}>
              <div className="header-dropdown-button">
                <FontAwesomeIcon icon={faGlobe} /> (
                {language === "vi" ? "VI" : "EN"}){" "}
                <FontAwesomeIcon
                  icon={faChevronDown}
                  className={`chevron-icon ${
                    isIconRotatedLanguage ? "rotate" : ""
                  }`}
                />
              </div>
            </button>
            {showLanguage && (
              <div
                className="header-dropdown-content"
                onClick={handleContentLanguageClick}
              >
                <a href="#" onClick={() => handleLanguageChange("vi")}>
                  {t("header.vi")}
                </a>
                <a href="#" onClick={() => handleLanguageChange("en")}>
                  {t("header.en")}
                </a>
              </div>
            )}
          </div>
          {!isAuthenticated && (
            <div className="header-buttons">
              <Link to="/login" className="header-btn">
                {t("header.login")}
              </Link>
              <Link to="/register" className="header-btn">
                {t("header.signUp")}
              </Link>
            </div>
          )}
          {isAuthenticated && (
            <div>
              <HeaderRecruiter />
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default ManageHeader;
