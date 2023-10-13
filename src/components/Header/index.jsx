import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useTranslation } from "react-i18next";
import { faGlobe, faChevronDown } from "@fortawesome/free-solid-svg-icons";
import "./index.css";

const Header = () => {
  const { t,i18n } = useTranslation("common");
  const [language, setLanguage] = useState("vi");
  const [showDropdown, setShowDropdown] = useState(false); 

  const handleLanguageChange = (selectedLanguage) => {
    i18n.changeLanguage(selectedLanguage); 
    setLanguage(selectedLanguage);
    setShowDropdown(false); 
  };

  const toggleDropdown = () => {
    setShowDropdown(!showDropdown); 
  };

  return (
    <header className="header">
      <div className="container">
        <div className="header-content">
          <Link to="/" className="header-logo">
            <img src="assets/images/logo.png" alt="Logo" />
          </Link>
          <ul className="header-menu">
            <li className="header-menu-item">
              <Link to="/category1">{t("header.findJob")}</Link>
            </li>
            <li className="header-menu-item">
              <Link to="/category2">{t("header.company")}</Link>
            </li>
            <li className="header-menu-item">
              <Link to="/category3">Blog</Link>
            </li>
            <li className="header-menu-item">
              <Link to="/createCV">{t("header.writeCV")}</Link>
            </li>
          </ul>
          <div className="header-dropdown">
            <button className="header-dropbtn" onClick={toggleDropdown}>
              <div className="header-dropdown-button">
                <FontAwesomeIcon icon={faGlobe} /> (
                {language === "vi" ? "VI" : "EN"}){" "}
                <FontAwesomeIcon icon={faChevronDown} />
              </div>
            </button>
            {showDropdown && (
              <div className="header-dropdown-content">
                <a href="#" onClick={() => handleLanguageChange("vi")}>
                {t("header.vi")}
                </a>
                <a href="#" onClick={() => handleLanguageChange("en")}>
                {t("header.en")}
                </a>
              </div>
            )}
          </div>
          <div className="header-buttons">
            <Link to="/login" className="header-btn">
            {t("header.login")}
            </Link>
            <Link to="/register" className="header-btn">
            {t("header.signUp")}
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
