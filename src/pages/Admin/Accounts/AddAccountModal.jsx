import React from "react";
import Swal from "sweetalert2";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { Button, Form, Modal } from "react-bootstrap";

const AddAccountModal = (props) => {
  const { register, handleSubmit } = useForm();
  const { t } = useTranslation("common");

  const onSubmit = handleSubmit((data) => {
    if (!data.email || !data.username || !data.password) {
      Swal.fire({
        icon: "error",
        title: t("admin.account.failed"),
        text: t("login.validate"),
      });
      return;
    }
    const body = {
      ...data,
      roles: [props.role],
    };
    props.addaccount(body);
  });

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
            {`${t("admin.account.add")} ${t(`admin.account.${props.role}`)}`}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Email</Form.Label>
            <Form.Control
              type="email"
              placeholder={t("admin.account.eEmail")}
              {...register("email")}
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicName">
            <Form.Label>{t("admin.account.user")}</Form.Label>
            <Form.Control
              type="text"
              placeholder={t("admin.account.eUsername")}
              {...register("username")}
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>{t("admin.account.password")}</Form.Label>
            <Form.Control
              type="password"
              placeholder={t("admin.account.ePassword")}
              autoComplete="password"
              {...register("password")}
            />
          </Form.Group>
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
            {t("admin.account.create")}
          </Button>
        </Modal.Footer>
      </Form>
    </Modal>
  );
};

export default AddAccountModal;
