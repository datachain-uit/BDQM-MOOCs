import React from 'react'
import AppLayout from '../components/AppLayout'
import {
  CRow, CCol, CButton, CFormInput, CBadge
} from '@coreui/react'
import EvaluationDashboard from '../components/EvaluationDashboard'
import LabelChart from '../components/LabelChart'
import PropertiesTable from '../components/PropertiesTable'
import "../styles/Education.css";
import ColumnsTable from '../components/ColumnsTable'
import LabelCountTable from '../components/LabelCountTable'

const labelCounts = {
  A: 23,
  B: 17,
  C: 9,
  D: 6,
  E: 2,
}



const Education = () => {
  return (
    <div className="main-education">
      {/* SECTION 1: Header */}
      <div className="header-education">
        <h2 className="education-title">EDUCATION MANAGEMENT</h2>
      </div>
      <div className="update-container">
          <CCol md={3}>
            <CButton className="text-end" color="success">
              <div className="update-text">Update dataset</div></CButton>
          </CCol>
          <input
              type="search"
              placeholder="Search..."
              className="search-input"
            />
      </div>

      {/* SECTION 2: Properties Table */}
      <div className="properties-container">
        <h2 className="title-properties">DATASET PROPERTIES</h2>
        <div className="data-table" style={{overflow:'auto'}}>
          <div className="properties-table">
              <PropertiesTable /> 
          </div>
          <div className="column-table">
            <ColumnsTable  />
          </div>
        </div >
      </div>

      {/* SECTION 3: Charts & Evaluation */}
      <div className="label-chart">
        <div  className="label-chart-container">
          <LabelChart />
        </div>
        <div className="label-table">
          <LabelCountTable labelCounts={labelCounts} />
        </div>
      </div>
      <CRow>
        
        <div className="eva-container">
          <EvaluationDashboard />
        </div>
      </CRow>
        
    </div>
  )
}

export default Education
