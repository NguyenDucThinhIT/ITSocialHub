import { useTranslation } from "react-i18next";
import {
  CModal,
  CModalHeader,
  CModalTitle,
  CModalBody,
  CModalFooter,
  CButton,
} from "@coreui/react";

export default function ConfirmModal({
  visible,
  setVisible,
  messageTitle = "Confirm Modal",
  messageContent = "An Confrim Modal has been raise",
  action,
}) {
  const { t } = useTranslation("common");

  return (
    <CModal visible={visible} onClose={() => setVisible(false)}>
      <CModalHeader onClose={() => setVisible(false)}>
        <CModalTitle>{messageTitle}</CModalTitle>
      </CModalHeader>
      <CModalBody>{messageContent}</CModalBody>
      <CModalFooter>
        <CButton
          color="danger"
          className="button-font"
          onClick={() => setVisible(false)}
        >
          {t("button.cancel")}
        </CButton>
        <CButton color="success" className="button-font" onClick={action}>
          {t("button.save")}
        </CButton>
      </CModalFooter>
    </CModal>
  );
}
