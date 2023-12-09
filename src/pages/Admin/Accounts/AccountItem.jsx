import React, { useState } from "react";
import { useTranslation } from "react-i18next";

import DeleteModal from "./DeleteModal";
import DeleteButton from "./DeleteButton";

const AccountItem = (props) => {
  const { t } = useTranslation("common");
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const openDeleteModal = () => {
    setShowDeleteModal(true);
  };

  const hideDeleteModal = () => {
    setShowDeleteModal(false);
  };
  const getRoleText = () => {
    // Chuyển giá trị role thành chuỗi tương ứng
    switch (props.account.role) {
      case 1:
        return t('actors.candidate')
      case 2:
        return t('actors.recruiter')
      default:
        return t("common:unknownRole"); 
    }
  };

  return (
    <>
      <tr style={{ verticalAlign: "middle", backgroundColor: "white" }}>
        <td>{props.index + 1}</td>
        <td>{props.account.first_name + " " + props.account.last_name }</td>
        <td>{props.account.email}</td>
        <td>{getRoleText()}</td>
        <td>
          <DeleteButton opendeletemodal={openDeleteModal} />
        </td>
      </tr>
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
