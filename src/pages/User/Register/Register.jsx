import { useState } from "react"; 
import { useTranslation } from "react-i18next";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Link } from 'react-router-dom';
import { faFacebookF, faGoogle } from '@fortawesome/free-brands-svg-icons';
import { faUser, faEnvelope, faPhone, faLock, faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";

import "./index.css"

const Register = () => {
    const { t } = useTranslation("common");
    const [showPassword1, setShowPassword1] = useState(false);
    const [showPassword2, setShowPassword2] = useState(false);

    const togglePassword1 = () => {
        setShowPassword1(!showPassword1);
    };
    const togglePassword2 = () => {
        setShowPassword2(!showPassword2);
    };
    return (
        <div className="row my-3 justify-content-center w-100">
            <div className="col col-4 box-shadow px-5">
                 <div className="social mt-5  d-flex flex-row align-items-center  justify-content-lg-start">
                            <p className="lead mb-0 me-3 fw-bold">{t("account.signUpW")} </p>
                            <button type="button" className="btn btn-floating mx-1">
                                <FontAwesomeIcon icon={faFacebookF} className="img-fb"/>
                            </button>
                            <button type="button" className="btn btn-floating mx-1">
                                <FontAwesomeIcon icon={faGoogle} className="img-gg"/>
                            </button>
                        </div>
                        <div className="divider d-flex align-items-center my-4">
                            <p className="cus-or text-center fw-bold mx-3">{t("account.or")}</p>
                        </div>
                <form action="#">
                    <div className="row">
                        <div className="col my-3 input-group flex-nowrap">
                            <span className="input-group-text"> <FontAwesomeIcon icon={faUser} /></span>
                            <input required type="text" className="form-control" id="floatingInput" placeholder={t("account.name")} />
                        </div>
                        <div className="col my-3 input-group flex-nowrap" >
                            <span className="input-group-text"> <FontAwesomeIcon icon={faUser} /></span>
                            <input required type="text" className="form-control" id="floatingPassword" placeholder={t("account.lastName")} />
                        </div>
                    </div>
                    <div className="row">
                        <div className="col my-3 input-group flex-nowrap">
                            <span className="input-group-text"> <FontAwesomeIcon icon={faEnvelope} /></span>
                            <input required type="email" className="form-control" id="floatingInput" placeholder={t("account.email")} />
                        </div>


                    </div>
                    <div className="row">
                        <div className="col my-3 input-group flex-nowrap">
                            <span className="input-group-text"> <FontAwesomeIcon icon={faPhone} /></span>
                            <input required type="phone" className="form-control" id="floatingInput" placeholder={t("account.phone")} />
                        </div>

                    </div>
                    <div className="row">
                        <div className="col my-3 input-group flex-nowrap">
                            <span className="input-group-text"> <FontAwesomeIcon icon={faLock} /></span>
                            <input
                                required
                                type={showPassword1 ? "text" : "password"}
                                className="form-control"
                                placeholder={t("account.password")}
                            />
                            <span
                                className="input-group-text cursor-pointer"
                                onClick={togglePassword1}
                            >
                                <FontAwesomeIcon
                                    icon={showPassword1 ? faEyeSlash : faEye}
                                />
                            </span>
                        </div>
                        </div>
                        <div className="row">
                        <div className="col my-3 input-group flex-nowrap">
                            <span className="input-group-text"> <FontAwesomeIcon icon={faLock} /></span>
                            <input
                                required
                                type={showPassword2 ? "text" : "password"}
                                className="form-control"
                                placeholder={t("account.passwordd")}
                            />
                            <span
                                className="input-group-text cursor-pointer"
                                onClick={togglePassword2}
                            >
                                <FontAwesomeIcon
                                    icon={showPassword2 ? faEyeSlash : faEye}
                                />
                            </span>
                        </div>
                    </div>
                    <div className="my-4">
                            <button className="btn text-white w-100 signup">{t("account.signUp")}</button>
                            <p className="small fw-bold mt-2 pt-1 mb-0">{t("account.haveAccount")}
                            <Link to="/login" className="link-danger">{t("account.login")}</Link></p>
                        </div>
                </form>

            </div>
        </div>

    )
}

export default Register