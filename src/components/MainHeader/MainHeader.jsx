import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useTranslation } from "react-i18next";
import { faGlobe, faChevronDown } from "@fortawesome/free-solid-svg-icons";
import "./index.css";
import  { HeaderUser, HeaderAdmin } from "../ManaHeader";
import { useSelector } from "react-redux";
import HeaderRecruiter from "../ManaHeader/HeaderRecruiter";

const MainHeader = () => {
  const navigate = useNavigate();
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
          {isAuthenticated && user.role === 2 ? (
            <>
              <Link to="/dashboard" className="header-logo">
                <img src="/assets/images/logo.png" alt="Logo" />
              </Link>
              
              <ul className="header-menu">
                <li className="header-menu-item">
                  <Link to="/dashboard">Dashboard</Link>
                </li>
                <li className="header-menu-item">
                  <Link to="/job/create">{t("header.recruitment")}</Link>
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
            </>
          ): isAuthenticated && user.role === 0 ?(
            <>
              <Link to="/admin/accounts" className="header-logo">
                <img src="/assets/images/logo.png" alt="Logo" />
              </Link>
              
              <ul className="header-menu">
                <li className="header-menu-item">
                  <Link to="/admin/accounts">{t("header.account")}</Link>
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
                  <HeaderAdmin />
                </div>
              )}
            </>
          ) : (
            <>
              <Link to="/" className="header-logo">
                <img src="/assets/images/logo.png" alt="Logo" />
              </Link>
              
              <ul className="header-menu">
                <li className="header-menu-item">
                  <Link to="/jobs">{t("header.findJob")}</Link>
                </li>
                <li className="header-menu-item">
                  <Link to="/companies">{t("header.company")}</Link>
                </li>
                <li className="header-menu-item">
                  <Link to="/blog">Blog</Link>
                </li>
                {isAuthenticated && (
                  <div className="header-dropdown">
                    <button className="header-dropbtn" onClick={dropdownCV}>
                      <div className="header-dropdown-button">
                        {t("header.writeCV")}{" "}
                        <FontAwesomeIcon
                          icon={faChevronDown}
                          className={`chevron-icon ${
                            isIconRotatedCV ? "rotate" : ""
                          }`}
                        />
                      </div>
                    </button>
                    {showCV && (
                      <div
                        className="header-dropdown-content"
                        onClick={handleContentCVClick}
                      >
                        <Link to="/create/templateCV">
                          {t("header.templates")}
                        </Link>
                        <Link to="/CVs">{t("header.management")}</Link>
                      </div>
                    )}
                  </div>
                )}
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
                  <HeaderUser />
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </header>
  );
};

export default MainHeader;
