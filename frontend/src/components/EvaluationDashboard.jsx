import React from 'react';
import { CCard, CCardBody, CProgress, CRow, CCol, CCardHeader, CBadge,CButton, CListGroup, CListGroupItem } from '@coreui/react';
import { CChartBar } from '@coreui/react-chartjs';
import jsPDF from 'jspdf'
import html2canvas from 'html2canvas'

const EvaluationDashboard = () => {
  const models = ['4-layer-stacked LSTM', 'BiLSTM', 'GRU', 'RNN'];

  const handleExportPDF = () => {
      const input = pdfRef.current
      html2canvas(input).then((canvas) => {
        const imgData = canvas.toDataURL('image/png')
        const pdf = new jsPDF()
        const imgProps = pdf.getImageProperties(imgData)
        const pdfWidth = pdf.internal.pageSize.getWidth()
        const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width
        pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight)
        pdf.save('evaluation.pdf')
      })
    }
  const reliabilityData = {
    labels: models,
    datasets: [
      {
        label: 'Accuracy',
        backgroundColor: '#4BC0C0',
        data: [75, 85, 90, 70],
      },
      {
        label: 'F1-score',
        backgroundColor: '#36A2EB',
        data: [70, 80, 88, 60],
      },
    ],
  };

  const relevanceData = {
    labels: models,
    datasets: [
      {
        label: 'AUC-ROC',
        backgroundColor: '#007bff',
        data: [65, 78, 92, 68],
      },
    ],
  };

  return (
    <CRow>
      {/* DIRECT EVALUATION */}
      <CCol md={6}>
        <CCard className="mb-4">
      <CCardHeader className="direct-evaluation">
        <strong>DIRECT EVALUATION</strong>
      </CCardHeader>

      <CCardBody>
        {/* Progress Bars */}
        <div className="progress-bar">
          <div className="proportion">
            <span className="left">
              <CBadge color="warning" shape="rounded-pill" className="dot-evaluation">●</CBadge>
              <strong className="complete-title">Completeness:</strong>
            </span>
            <span className="right">100%</span>
          </div>
          <CProgress value={100} color="success" className="proportion-bar" />

          <div className="proportion">
            <span className="left">
              <CBadge color="danger" shape="rounded-pill" className="dot-evaluation">●</CBadge>
              <strong className="complete-title">Consistency:</strong>
            </span>
            <span className="right">100%</span>
          </div>
          <CProgress value={100} color="success" className="proportion-bar" />
        </div>

        {/* Definition Block */}
        <div className="bg-light p-3 rounded border mb-4">
          <h6 className="definition-title"><strong>Definition</strong></h6>
          <p className="definition-detail"style={{ marginBottom: '0.5rem' }}>
            <strong>Completeness:</strong> The dataset must contain all necessary information without missing any critical elements.
          </p>
          <p className="definition-detail">
            <strong>Measurement approach:</strong> Completeness is calculated as the ratio between the number of valid (non-missing) values and the total number of expected values.
          </p>
        </div>

        {/* Results Block */}
        <div className="bg-light p-3 rounded border">
          <h6 className="result-title"><strong>Results</strong></h6>
          <p className="result-detail">
            <strong>Pass Rate: </strong>
            <CBadge color="success" shape="rounded-pill">100%</CBadge>
          </p>
          <div className="result-detail">
            <strong>Error Log:</strong>
            <CListGroup flush>
              <CListGroupItem>Row 2831: Missing value in <code className="id-col">teacher_id</code></CListGroupItem>
              <CListGroupItem>Row 1025: Missing value in <code className="id-col">course_name</code></CListGroupItem>
              <CListGroupItem>Row 1025: Missing value in <code className="id-col">course_name</code></CListGroupItem>
              <CListGroupItem>Row 1025: Missing value in <code className="id-col">course_name</code></CListGroupItem>
              <CListGroupItem>Row 2831: Missing value in <code className="id-col">teacher_id</code></CListGroupItem>
              <CListGroupItem>Row 1025: Missing value in <code className="id-col">course_name</code></CListGroupItem>
              <CListGroupItem>Row 1025: Missing value in <code className="id-col">course_name</code></CListGroupItem>
              <CListGroupItem>Row 1025: Missing value in <code className="id-col">course_name</code></CListGroupItem>
            </CListGroup>
          </div>
        </div>
        <div className="export-pdf-container">
                    <CButton color="primary" size="lg" onClick={handleExportPDF} className="button-pdf">
                      Export to PDF
                    </CButton>
        </div>

      </CCardBody>
    </CCard>
      </CCol>

      {/* INDIRECT EVALUATION */}
      <CCol className="indirect-container">
        <CCard className="reliability-chart">
          <CCardHeader className="indirect-header">INDIRECT EVALUATION - Reliability</CCardHeader>
          <CCardBody className="indirect-body">
            <CChartBar
              data={reliabilityData}
              options={{
                responsive: true,
                plugins: { legend: { position: 'top' } },
                scales: { y: { min: 0, max: 100 } },
              }}
            />
          </CCardBody>
        </CCard>

        <CCard className="relevance-chart">
          <CCardHeader className="indirect-header">INDIRECT EVALUATION - Relevance</CCardHeader>
          <CCardBody className="indirect-body">
            <CChartBar
              data={relevanceData}
              options={{
                responsive: true,
                plugins: { legend: { position: 'top' } },
                scales: { y: { min: 0, max: 100 } },
              }}
            />
          </CCardBody>
        </CCard>
      </CCol>
    </CRow>
  );
};

export default EvaluationDashboard;
