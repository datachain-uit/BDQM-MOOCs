import { CCard, CCardBody, CCardHeader } from '@coreui/react';

const EducationManagement = () => {
  return (
    <CCard>
      <CCardHeader>Quản lý Giáo dục</CCardHeader>
      <CCardBody>
        <h2 className="text-2xl">Quản lý Giáo dục</h2>
        <p>Quản lý khóa học, lịch học và tài nguyên tại đây.</p>
      </CCardBody>
    </CCard>
  );
};

export default EducationManagement;