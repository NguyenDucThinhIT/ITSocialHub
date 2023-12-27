import React, { useState } from "react";
import { useTranslation } from "react-i18next";

import DeleteModal from "./DeleteModal";
import DeleteButton from "./DeleteButton";
import { Form } from "react-bootstrap";
import BlockModal from "./BlockModal";

const AccountItem = (props) => {
  const { t } = useTranslation("common");
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [accountStatus, setAccountStatus] = useState(props.account.status);
  const [showBlockModal, setShowBlockModal] = useState(false);
  const [isBlocked, setIsBlocked] = useState(props.account.status === 2);
  const toggleStatus = () => {
    openBlockModal();
  };

  const openDeleteModal = () => {
    setShowDeleteModal(true);
  };

  const hideDeleteModal = () => {
    setShowDeleteModal(false);
  };
  const openBlockModal = () => {
    setShowBlockModal(true);
  };

  const hideBlockModal = () => {
    setShowBlockModal(false);
  };
  const getRoleText = () => {
    switch (props.account.role) {
      case 0:
        return t("actors.deactivate");
      case 1:
        return t("actors.candidate");
      case 2:
        return t("actors.recruiter");
      default:
        return t("common:deactivate");
    }
  };
  const getStatusText = () => {
    switch (props.account.status) {
      case 0:
        return t("actors.deactivate");
      case 1:
        return t("actors.active");
      case 2:
        return t("actors.block");
      default:
        return t("actors.block");
    }
  };

  return (
    <>
      <tr style={{ verticalAlign: "middle", backgroundColor: "white" }}>
        <td>{props.index + 1}</td>
        <td>{props.account.last_name + " " + props.account.first_name}</td>
        <td>{props.account.email}</td>
        <td>{getRoleText()}</td>
        {/* <td>{getStatusText()}</td> */}
        <td>
          {accountStatus === 1 || accountStatus === 2 ? (
            <Form.Check
              type="switch"
              id={`switch-status-${props.account.id}`}
              label={
                accountStatus === 1
                  ? t("actors.active")
                  : accountStatus === 2
                  ? t("actors.block")
                  : t("actors.deactivate")
              }
              checked={accountStatus === 1}
              onChange={toggleStatus}
            />
          ) : (
            <div className="deactivate ml-12">
              {t("actors.deactivate")}
            </div>
          )}
        </td>
        <td>
          <DeleteButton opendeletemodal={openDeleteModal} />
        </td>
      </tr>
      <BlockModal
        show={showBlockModal}
        onHide={hideBlockModal}
        onBlock={() => {
          props.toggleStatus(props.account.id, props.account.status);
          hideBlockModal();
          setAccountStatus((prevStatus) => (prevStatus === 1 ? 2 : 1));
          setIsBlocked(prevStatus === 1);
        }}
        isBlocked={isBlocked}
      />

      <DeleteModal
        account={props.account}
        show={showDeleteModal}
        onhide={hideDeleteModal}
        deleteaccount={props.deleteaccount}
      />
    </>
  );
};

export default AccountItem;
