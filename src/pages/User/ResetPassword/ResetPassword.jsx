import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faLock,
  faKey,
  faEye,
  faEyeSlash,
} from "@fortawesome/free-solid-svg-icons";
import "./index.css";
import { postChangePass } from "@/services/password";
import { useLocation, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

const ResetPassword = () => {
    const navigate = useNavigate();
  const { t } = useTranslation("common");
  const { state } = useLocation();
  const emailFromFindAccount = state?.email || '';
  const [verifyCode, setVerifyCode] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [newPasswordConfirmation, setNewPasswordConfirmation] = useState("");
  const [showPassword1, setShowPassword1] = useState(false);
  const [showPassword2, setShowPassword2] = useState(false);

  const handleChangePassword = async (e) => {
    e.preventDefault();

    try {
        if (newPassword !== newPasswordConfirmation) {
            Swal.fire({
                icon: "error",
                title: t("jobPage.failed"),
                text: t("login.errorPassword"),
              });
              return;
          }
      await postChangePass({
        verify_code: verifyCode,
        new_password: newPassword,
        new_password_confirmation: newPasswordConfirmation,
      });
      Swal.fire({
        icon: "success",
        title: t("jobPage.successfully"),
        text: t("account.tittle3"),
      });
      navigate("/login");
    } catch (error) {
      console.error("Lỗi khi gửi yêu cầu đổi mật khẩu:", error);
    }
  };

  return (
    <div className="row my-3 justify-content-center w-100 pt-5">
      <div className="col col-4 box-shadow px-5">
        <div className="social mt-5 align-items-center  justify-content-lg-start">
          <p className="lead fw-normal mb-0">{t("account.tittle1")} {emailFromFindAccount}</p>
          <p className="mb-0 mt-2">{t("account.tittle2")}</p>
        </div>
        <form onSubmit={handleChangePassword}>
          <div className="my-3 input-group flex-nowrap">
            <span className="input-group-text">
              {" "}
              <FontAwesomeIcon icon={faKey} />
            </span>
            <input
              required
              type="password"
              value={verifyCode}
              onChange={(e) => setVerifyCode(e.target.value)}
              className="form-control"
              id="floatingInput"
              placeholder={t("account.code")}
            />
          </div>

          <div className="my-3 input-group flex-nowrap">
            <span className="input-group-text">
              {" "}
              <FontAwesomeIcon icon={faLock} />
            </span>
            <input
              required
              type={showPassword1 ? "text" : "password"}
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              className="form-control"
              id="floatingInput"
              placeholder={t("account.passNew")}
            />
            <span
              className="input-group-text cursor-pointer"
              onClick={() => setShowPassword1(!showPassword1)}
            >
              <FontAwesomeIcon icon={showPassword1 ? faEyeSlash : faEye} />
            </span>
          </div>

          <div className="my-3 input-group flex-nowrap">
            <span className="input-group-text">
              {" "}
              <FontAwesomeIcon icon={faLock} />
            </span>
            <input
              required
              type={showPassword2 ? "text" : "password"}
              value={newPasswordConfirmation}
              onChange={(e) => setNewPasswordConfirmation(e.target.value)}
              className="form-control"
              id="floatingInput"
              placeholder={t("account.passNewConfirmation")}
            />
            <span
              className="input-group-text cursor-pointer"
              onClick={() => setShowPassword2(!showPassword2)}
            >
              <FontAwesomeIcon icon={showPassword2 ? faEyeSlash : faEye} />
            </span>
          </div>

          <div className="my-4">
            <button type="submit" className="btn btn-dark text-white w-100 ">
              {t("account.changePass")}
            </button>
            <div className="text-center mt-2">
              <p className="small fw-bold mt-2 pt-1 mb-0">
                {t("account.noAccounts")}
                <a href="/register" className="link-danger">
                  {" "}
                  {t("account.signUp")}
                </a>
              </p>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ResetPassword;
