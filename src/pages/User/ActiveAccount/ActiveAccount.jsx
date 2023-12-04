import { useState } from "react";
import Swal from "sweetalert2";
import { useTranslation } from "react-i18next";
import { useMutation } from "@tanstack/react-query";
import { useDispatch } from "react-redux";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faEnvelope,
  faAngleLeft,
  faKey,
} from "@fortawesome/free-solid-svg-icons";
import { activeAccount } from "@/services/auth.api";
import { validateEmail } from "@/components/Validated/Validated";
import "./index.css";

const ActiveAccount = () => {
  const [email, setEmail] = useState("");
  const [code, setCode] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const { t } = useTranslation("common");
  
  const activeMutation = useMutation({
    mutationFn: (body) => activeAccount(body),
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

    activeMutation.mutate(
      { email, verify_code : code },
      {
        onSuccess: (data) => {
          //dispatch(loginSlice(data.data.user));
          Swal.fire({
            icon: "success",
            //title: t("login.success"),
            text: t("login.activeSuccess"),
          });
          navigate("/login");
        },
        onError: (error) => {
          Swal.fire({
            icon: "error",
            title: t("jobPage.failed"),
            text: t("login.activeFail"),
          });
          console.log("Error during login:", error);
        },
      }
    );
  };
  return (
    <div className="row my-3 justify-content-center w-100 pt-5">
      <div className="col col-3 box-shadow px-5">
        <div className="social mt-5 align-items-center  justify-content-lg-start">
          <Link to="/register" className="btn btn-sm mb-3">
            <FontAwesomeIcon icon={faAngleLeft} />{" "}
            <span className="bold-text">{t("account.back")}</span>
          </Link>
          <p className="lead fw-normal mb-0 me-3">{t("account.active")} </p>
          <p className="mb-0 mt-2">{t("account.titleA")} </p>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="my-3 input-group flex-nowrap">
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
          <div className="my-3 input-group flex-nowrap">
            <span className="input-group-text">
              {" "}
              <FontAwesomeIcon icon={faKey} />
            </span>
            <input
              required
              type="text"
              className="form-control"
              id="floatingInput"
              placeholder={t("account.codeA")}
              onChange={(e) => {
                setCode(e.target.value);
              }}
            />
          </div>
          <div className="my-4">
            <button className="btn btn-dark text-white w-100">
              {t("account.activeA")}
            </button>
            <div className="text-center mt-2">
              <p className="small fw-bold mt-2 pt-1 mb-0">
                {t("account.noAccounts")}
                <Link to="/register" className="link-danger">
                  {t("account.signUp")}
                </Link>
              </p>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ActiveAccount;
