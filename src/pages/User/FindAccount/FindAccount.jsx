import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope, faAngleLeft } from '@fortawesome/free-solid-svg-icons';
import { Link, useNavigate } from 'react-router-dom';
import { postEmail } from '@/services/password';
import './index.css';
import Swal from 'sweetalert2';


const FindAccount = () => {
  const { t } = useTranslation('common');
  const [email, setEmail] = useState('');
  const navigate = useNavigate()
  

  const handleEmailSubmit = async (e) => {
    e.preventDefault();
    try {
      await postEmail({ email });
      navigate("/reset-password", { state: { email } })
      Swal.mixin({
        toast: true,
        position: "top-end",
        timer: 3000,
        timerProgressBar: true,
        showConfirmButton: false,
      }).fire({
        icon: "success",
        text: t("account.mailVery"),
      });
    } catch (error) {
      console.error('Lỗi khi gửi yêu cầu xác nhận qua email:', error);
    }
    
  };

  return (
    <div className="row my-3 justify-content-center w-100 pt-5">
      <div className="col col-4 box-shadow px-5">
        <div className="social mt-5 align-items-center  justify-content-lg-start">
          <Link to="/login" className="btn btn-sm mb-3">
            <FontAwesomeIcon icon={faAngleLeft} />{' '}
            <span className="bold-text">{t('account.back')}</span>
          </Link>
          <p className="lead fw-normal mb-0 me-3">{t('account.forgot')} </p>
          <p className="mb-0 mt-2">{t('account.titleP')} </p>
        </div>

        <form onSubmit={handleEmailSubmit}>
          <div className="my-3 input-group flex-nowrap">
            <span className="input-group-text">
              {' '}
              <FontAwesomeIcon icon={faEnvelope} />
            </span>
            <input
              required
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="form-control"
              id="floatingInput"
              placeholder={t('account.email')}
            />
          </div>
          <div className="my-4">
            <button type="submit" className="btn btn-dark text-white w-100">
              {t('account.recover')}
            </button>
            <div className="text-center mt-2">
              <p className="small fw-bold mt-2 pt-1 mb-0">
                {t('account.noAccounts')}
                <Link to="/register" className="link-danger">
                  {t('account.signUp')}
                </Link>
              </p>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default FindAccount;
