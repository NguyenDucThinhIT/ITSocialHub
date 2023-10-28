import {
  CContainer,
  CCol,
  CRow,
  CSpinner
} from "@coreui/react";
import { useTranslation } from "react-i18next";
import "./index.css"

export default function LoadingScreen() {
  const { t } = useTranslation("common");
  return (
    <>
      <CContainer>
        <CRow className="align-items-center justify-content-center">
          <CCol xs={12} className="align-self-center filter-title text-align-center">
          {t("notification.onLoading")}
          </CCol>
        </CRow>
        <CRow className="align-items-center justify-content-center">
          <CCol xs={12} className="align-self-center filter-title text-align-center">
            <CSpinner color="info"/>
          </CCol>
        </CRow>
      </CContainer>
    </>
  );
}
