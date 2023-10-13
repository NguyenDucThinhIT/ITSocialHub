import {
  CContainer,
  CCol,
  CRow,
  CSpinner
} from "@coreui/react";
import "./index.css"

export default function LoadingScreen() {
  return (
    <>
      <CContainer>
        <CRow className="align-items-center justify-content-center">
          <CCol xs={12} className="align-self-center filter-title text-align-center">
            Đang tải
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
