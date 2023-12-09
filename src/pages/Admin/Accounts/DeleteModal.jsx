import React from "react";
import { useTranslation } from "react-i18next";
import { Button, Form, Modal } from "react-bootstrap";

const DeleteModal = (props) => {
  const { t } = useTranslation("common");

  const onSubmit = (e) => {
    e.preventDefault();

    props.deleteaccount(props.account.id);

    props.onhide();
  };
  return (
    <Modal
      show={props.show}
      onHide={props.onhide}
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Form onSubmit={onSubmit}>
        <Modal.Header closeButton>
          <Modal.Title
            id="contained-modal-title-vcenter"
            className="w-100 text-center"
          >
            {t("admin.account.deleteAcc")}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>{t("admin.account.deleteMes")}</p>
        </Modal.Body>
        <Modal.Footer>
          <Button
            className="px-4"
            variant="outline-primary"
            onClick={props.onhide}
          >
            {t("admin.account.cancel")}
          </Button>
          <Button className="px-4" variant="primary" type="submit">
            {t("admin.account.del")}
          </Button>
        </Modal.Footer>
      </Form>
    </Modal>
  );
};

export default DeleteModal;
