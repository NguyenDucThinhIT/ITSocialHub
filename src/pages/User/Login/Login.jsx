import { useState } from "react";
import { useTranslation } from "react-i18next";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";
import { faFacebookF, faGoogle } from "@fortawesome/free-brands-svg-icons";
import {
  faEnvelope,
  faLock,
  faEye,
  faEyeSlash,
} from "@fortawesome/free-solid-svg-icons";

import "./index.css";

const Login = () => {
  const { t } = useTranslation("common");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handlePasswordToggle = () => {
    setShowPassword(!showPassword);
  };

  const handleSubmit = () => {};

  return (
    <div className="row my-3 justify-content-center w-100">
      <div className="col col-4 box-shadow px-5">
        <div className="social mt-5 d-flex flex-row align-items-center justify-content-lg-start">
          <p className="lead fw-normal mb-0 me-3">{t("account.loginW")}</p>
          <button type="button" className="btn btn-floating mx-1">
            <FontAwesomeIcon icon={faFacebookF} className="img-fb" />
          </button>
          <button type="button" className="btn btn-floating mx-1">
            <FontAwesomeIcon icon={faGoogle} className="img-gg" />
          </button>
        </div>
        <div className="divider d-flex align-items-center my-4">
          <p className="text-center fw-bold mx-3 mb-0">{t("account.or")}</p>
        </div>

        <form action="#">
          <div className="my-3 input-group flex-nowrap">
            <span className="input-group-text">
              <FontAwesomeIcon icon={faEnvelope} />
            </span>
            <input
              required
              type="email"
              className="form-control"
              id="floatingInput"
              placeholder={t("account.email")}
            />
          </div>
          <div className="my-3 input-group flex-nowrap">
            <span className="input-group-text">
              <FontAwesomeIcon icon={faLock} />
            </span>
            <input
              required
              type={showPassword ? "text" : "password"}
              className="form-control"
              id="floatingPassword"
              placeholder={t("account.password")}
            />
            <span
              className="input-group-text cursor-pointer"
              onClick={handlePasswordToggle}
            >
              <FontAwesomeIcon icon={showPassword ? faEye : faEyeSlash} />
            </span>
          </div>

          <div className="d-flex justify-content-between align-items-center">
            <div className="form-check mb-0">
              <input
                className="form-check-input me-2"
                type="checkbox"
                defaultValue
                id="form2Example3"
              />
              <label className="form-check-label" htmlFor="form2Example3">
                {t("account.remember")}
              </label>
            </div>
            <Link
              to="/find-account"
              style={{ textDecoration: "none" }}
              className="pass"
            >
              {t("account.forgotten")}
            </Link>
          </div>

          <div className="my-4">
            <button className="btn text-white w-100 login">
              {t("account.login")}
            </button>
            <p className="small fw-bold mt-2 pt-1 mb-0">
              {t("account.noAccounts")}
              <Link to="/register" className="link-danger">
                <span>{t("account.signUp")}</span>
              </Link>
            </p>
          </div>
        </form>
      </div>
      <div className="col col-1"></div>
      <div className="col col-4 text-center">
        <h1>{t("account.title")}</h1>
        <p className="font-italic text-muted mb-0">{t("account.titleL")}</p>
        <img src="assets/images/login.gif" alt="Image" className="img-fluid" />
      </div>
    </div>
  );
};

export default Login;
