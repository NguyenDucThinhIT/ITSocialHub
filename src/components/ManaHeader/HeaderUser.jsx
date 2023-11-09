import React from "react";
import CIcon from "@coreui/icons-react";
import { useDispatch, useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import { useNavigate, Link } from "react-router-dom";
import {
  cilUser,
  cilAccountLogout,
  cilTranslate,
  cifVn,
  cifGb,
  cilFile,
} from "@coreui/icons";
import {
  CAvatar,
  CDropdown,
  CDropdownDivider,
  CDropdownHeader,
  CDropdownItem,
  CDropdownMenu,
  CDropdownToggle,
} from "@coreui/react";
import "./style.css"
import { logoutSlice } from "@/redux/auth.slice";

const AppHeaderDropdown = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { t } = useTranslation("common");
  const user = useSelector((state) => state.auth.user);
  return (
    <CDropdown variant="nav-item">
      <CDropdownToggle className="py-0" caret={false}>
        <CAvatar src={user?.avatarImageUrl || "/assets/images/user.png"} size="md" />
      </CDropdownToggle>
      <CDropdownMenu className="cus-text pt-lg-0">
        <Link
          className="dropdown-item"
          to="/profile"
        >
          <CIcon icon={cilUser} className="me-2" />
          {t("header.profile")}
        </Link>
        <Link
          className="dropdown-item"
          to="/applications"
        >
          <CIcon icon={cilFile} className="me-2" />
          {t("header.apply")}
        </Link>
        
        
        <button
          onClick={() => {
            dispatch(logoutSlice());
            navigate("/");
          }}
          className="dropdown-item"
        >
          <CIcon icon={cilAccountLogout} className="me-2" />
          {t("header.logout")}
        </button>
      </CDropdownMenu>
    </CDropdown>
  );
};

export default AppHeaderDropdown;
