import {
  CModal,
  CModalHeader,
  CModalTitle,
  CModalBody,
} from "@coreui/react";

export default function AlertModal({ visible, setVisible, messageTitle = "Alert Modal", messageContent = "An Alert Modal has been raise" }) {
  return (
    <CModal visible={visible} onClose={() => setVisible(false)}>
      <CModalHeader onClose={() => setVisible(false)}>
        <CModalTitle>{messageTitle}</CModalTitle>
      </CModalHeader>
      <CModalBody>
        {messageContent}
      </CModalBody>
    </CModal>
  )
}
