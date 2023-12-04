import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { Link, useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser,faArrowRightFromBracket, faBuilding } from '@fortawesome/free-solid-svg-icons';
import { logoutSlice } from '@/redux/auth.slice';
import { Dropdown } from 'react-bootstrap';
import './style.css';

const HeaderRecruiter = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { t } = useTranslation('common');
  const user = useSelector((state) => state.auth.user);

  return (
    <Dropdown>
      <Dropdown.Toggle className="custom-dropdown-toggle">
        <img
          src={user?.image_url || '/assets/images/user.png'}
          alt="User Avatar"
          className="ava-user avatarr-image"
        />
      </Dropdown.Toggle>
      <Dropdown.Menu className="cus-text pt-lg-0">
        <Link className="dropdown-item" to="/profile">
          <FontAwesomeIcon icon={faUser} className="me-2" />
          {t('header.profile')}
        </Link>
        <Link className="dropdown-item" to="/company/edit">
          <FontAwesomeIcon icon={faBuilding} className="me-2" />
          COMPANY PROFILE
        </Link>
        <Dropdown.Divider />
        <button
          className="dropdown-item"
          onClick={() => {
            dispatch(logoutSlice());
            navigate('/');
          }}
        >
          <FontAwesomeIcon icon={faArrowRightFromBracket} className="me-2" />
          {t('header.logout')}
        </button>
      </Dropdown.Menu>
    </Dropdown>
  );
};

export default HeaderRecruiter;
