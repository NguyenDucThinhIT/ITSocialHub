import { useState } from "react";
import { useTranslation } from "react-i18next";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useDispatch } from "react-redux";
import { useMutation } from "@tanstack/react-query";
import { Link, useNavigate } from "react-router-dom";
import { loginSlice } from "@/redux/auth.slice";
import { registerAccount } from "@/services/auth.api";
import { validateEmail } from "@/components/Validated/Validated";
import Swal from "sweetalert2";
import {
  faUser,
  faEnvelope,
  faLock,
  faEye,
  faEyeSlash,
} from "@fortawesome/free-solid-svg-icons";

import "./index.css";

const Register = () => {
  const { t } = useTranslation("common");
  const [showPassword1, setShowPassword1] = useState(false);
  const [showPassword2, setShowPassword2] = useState(false);

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirmation, setPasswordConfirmation] = useState("");
  const [passwordMatch, setPasswordMatch] = useState(true);
  const [role, setRole] = useState("1");

  const togglePassword1 = () => {
    setShowPassword1(!showPassword1);
  };
  const togglePassword2 = () => {
    setShowPassword2(!showPassword2);
  };
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const registerAccountMutation = useMutation({
    mutationFn: (body) => registerAccount(body),
  });
  const handleSubmit = (event) => {
    event.preventDefault();
    if (!validateEmail(email)) {
      Swal.fire({
        icon: "error",
        title: t("jobPage.failed"),
        text: t("candidate.modal.email"),
      });
      return;
    }
    if (!firstName || !lastName || !password ||  !passwordConfirmation) {
      Swal.fire({
        icon: "error",
        title: t("jobPage.failed"),
        text: t("login.validate"),
      });
      return;
    }
    if (password !== passwordConfirmation) {
      Swal.fire({
        icon: "error",
        title: t("jobPage.failed"),
        text: t("login.errorPassword"),
      });
      setPasswordMatch(false);
      return;
    }
    setPasswordMatch(true);
    registerAccountMutation.mutate(
      {
        first_name: firstName,
        last_name: lastName,
        email: email,
        password: password,
        password_confirmation: passwordConfirmation,
        role: role,
      },
      {
        onSuccess: (data) => {
          navigate("/active-account");
          Swal.mixin({
            toast: true,
            position: "top-end",
            timer: 3000,
            timerProgressBar: true,
            showConfirmButton: false,
          }).fire({
            icon: "success",
            text: t("login.registerSuccess"),
          });
        },
        onError: (error) => {
          let errorText;
          if (error.response.data.errors?.email) {
            errorText = t("login.emailError");
            // } else if (error.response.data.errors?.password) {
            //   errorText = t("login.passwordError");
          } else {
            if (error.response.data.errors.includes("email")) {
              errorText = t("login.emailError");
            }
          }
          Swal.fire({
            icon: "error",
            title: t("jobPage.failed"),
            text: errorText,
          });
        },
      }
    );
  };
  return (
    <div className="row my-3 justify-content-center w-100 pt-5">
      <div className="col col-4 box-shadow px-5">
        <div className=" text-center pt-4">
          <h1>{t("login.titleR")}</h1>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="row">
            <div className="col my-3 input-group flex-nowrap">
              <span className="input-group-text">
                {" "}
                <FontAwesomeIcon icon={faUser} />
              </span>
              <input
                required
                type="text"
                className="form-control"
                id="floatingInput"
                placeholder={t("account.name")}
                onChange={(e) => {
                  setFirstName(e.target.value);
                }}
              />
            </div>
            <div className="col my-3 input-group flex-nowrap">
              <span className="input-group-text">
                {" "}
                <FontAwesomeIcon icon={faUser} />
              </span>
              <input
                required
                type="text"
                className="form-control"
                id="floatingPassword"
                placeholder={t("account.lastName")}
                onChange={(e) => {
                  setLastName(e.target.value);
                }}
              />
            </div>
          </div>
          <div className="row">
            <div className="col my-3 input-group flex-nowrap">
              <span className="input-group-text">
                {" "}
                <FontAwesomeIcon icon={faEnvelope} />
              </span>
              <input
                required
                type="email"
                className="form-control"
                id="floatingInput"
                placeholder={t("account.email")}
                onChange={(e) => {
                  setEmail(e.target.value);
                }}
              />
            </div>
          </div>
          <div className="row">
            <div className="col my-3 input-group flex-nowrap">
              <span className="input-group-text">
                {" "}
                <FontAwesomeIcon icon={faLock} />
              </span>
              <input
                required
                type={showPassword1 ? "text" : "password"}
                className="form-control"
                placeholder={t("account.password")}
                onChange={(e) => {
                  setPassword(e.target.value);
                }}
              />
              <span
                className="input-group-text cursor-pointer"
                onClick={togglePassword1}
              >
                <FontAwesomeIcon icon={showPassword1 ? faEyeSlash : faEye} />
              </span>
            </div>
          </div>
          <div className="row">
            <div className="col my-3 input-group flex-nowrap">
              <span className="input-group-text">
                {" "}
                <FontAwesomeIcon icon={faLock} />
              </span>
              <input
                required
                type={showPassword2 ? "text" : "password"}
                className="form-control"
                placeholder={t("account.passwordd")}
                onChange={(e) => {
                  setPasswordConfirmation(e.target.value);
                }}
              />
              <span
                className="input-group-text cursor-pointer"
                onClick={togglePassword2}
              >
                <FontAwesomeIcon icon={showPassword2 ? faEyeSlash : faEye} />
              </span>
            </div>
          </div>
          <div className="check_role pl-3">
            <div className="form-check">
              <input
                className="form-check-input"
                type="radio"
                name="exampleRadios"
                id="exampleRadios1"
                value={"1"}
                defaultChecked
                onChange={() => {
                  setRole(1);
                }}
              />
              <label className="form-check-label" htmlFor="exampleRadios1">
                {t("login.user")}
              </label>
            </div>
            <div className="form-check">
              <input
                className="form-check-input"
                type="radio"
                name="exampleRadios"
                id="exampleRadios2"
                value={"2"}
                onChange={() => {
                  setRole(2);
                }}
              />
              <label className="form-check-label" htmlFor="exampleRadios2">
                {t("login.employer")}
              </label>
            </div>
          </div>
          <div className="my-4">
            <button className="btn text-white w-100 signup">
              {t("account.signUp")}
            </button>
            <p className="small fw-bold mt-2 pt-1 mb-0">
              {t("account.haveAccount")}
              <Link to="/login" className="link-danger">
                {t("account.login")}
              </Link>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Register;
