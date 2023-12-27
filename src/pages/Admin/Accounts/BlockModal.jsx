import React from "react";
import { Modal, Button } from "react-bootstrap";
import { useTranslation } from "react-i18next";

const BlockModal = ({ show, onHide, onBlock,isBlocked  }) => {
  const { t } = useTranslation("common");

  const handleBlock = () => {
    onBlock();
    onHide();
  };

  return (
    <Modal show={show} onHide={onHide} centered>
      <Modal.Header closeButton>
        <Modal.Title>
          {isBlocked ? t("admin.account.activateAcc") : t("admin.account.blockAcc")}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p>
          {isBlocked
            ? t("admin.account.confirmActivate")
            : t("admin.account.confirmBlock")}
        </p>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onHide}>
          {t("admin.account.cancel")}
        </Button>
        <Button variant="primary" onClick={handleBlock}>
          {isBlocked ? t("admin.account.activate") : t("admin.account.block")}
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default BlockModal;
