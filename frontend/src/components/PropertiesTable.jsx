import React from 'react';
import { CCard, CCardBody, CTable, CTableBody, CTableRow, CTableHeaderCell, CTableDataCell, CTableHead } from '@coreui/react';

const PropertiesTable = () => {
  const data = [
    { label: 'Row', value: '13' },
    { label: 'Column', value: '16' },
    { label: 'Unique row', value: '8' },
    { label: 'Label', value: '7' },
    { label: 'Missing values', value: '10' },
    { label: 'Data types', value: 'float, int, category, datetime' },
    { label: 'Descriptive statistics', value: '' },
  ];

  return (
    <CCard className="border-primary border-2 rounded-3" >
      <CCardBody className="p-3">
        <CTable align="middle" className="mb-0" hover responsive style={{ width: '100%' }} >
          <CTableHead className="table-header">
            <CTableRow>
              <CTableHeaderCell scope="col">Properties</CTableHeaderCell>
              <CTableHeaderCell scope="col"></CTableHeaderCell>
            </CTableRow>
          </CTableHead>
          <CTableBody className="table-body">
            {data.map((item, index) => (
              <CTableRow key={index}>
                <CTableDataCell>{item.label}</CTableDataCell>
                <CTableDataCell className="text-end fw-semibold">{item.value}</CTableDataCell>
              </CTableRow>
            ))}
          </CTableBody>
        </CTable>
      </CCardBody>
    </CCard>
  );
};

export default PropertiesTable;