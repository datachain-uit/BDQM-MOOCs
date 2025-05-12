import { CCard, CCardBody, CCardHeader } from '@coreui/react';

const Overview = () => {
  return (
    <CCard>
      <CCardHeader>Overview</CCardHeader>
      <CCardBody>
        <h2 className="text-2xl">Chào mừng đến với Overview</h2>
        <p>Phần này cung cấp tổng quan về nền tảng.</p>
      </CCardBody>
    </CCard>
  );
};

export default Overview;