import React from "react";
import { Dropdown } from "react-bootstrap";
import { useTranslation } from "react-i18next";

const DropDownButton = ({
  text,
  className,
  startLogo,
  openRecruiterModal,
  openInterviewerModal,
}) => {
  const { t } = useTranslation("common");

  return (
    <Dropdown>
      <Dropdown.Toggle
        className={className}
        variant="primary"
        id="dropdown-basic"
      >
        {startLogo}
        {text}
      </Dropdown.Toggle>

      <Dropdown.Menu>
        <Dropdown.Item href="" onClick={openRecruiterModal}>
          {t("admin.account.addRecruiter")}
        </Dropdown.Item>
        <Dropdown.Item href="" onClick={openInterviewerModal}>
          {t("admin.account.addInterviewer")}
        </Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>
  );
};

export default DropDownButton;
