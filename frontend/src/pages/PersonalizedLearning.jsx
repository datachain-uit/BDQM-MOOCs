/* PersonalizedLearning.jsx
 * Displays a dashboard for analyzing learning dataset with visualizations and evaluation metrics.
 * Includes dataset information, descriptive statistics, gender/field distributions, and direct/indirect evaluations.
 */

import React, { useState } from 'react';
import {
  CButton,
  CRow,
  CCol,
  CInputGroup,
  CFormInput,
  CCard,
  CCardHeader,
  CCardBody,
  CTable,
  CTableBody,
  CTableDataCell,
  CTableHead,
  CTableHeaderCell,
  CTableRow,
} from '@coreui/react';
import CIcon from '@coreui/icons-react';
import { cilMagnifyingGlass, cilLoopCircular } from '@coreui/icons';
import { Pie, Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
} from 'chart.js';

// Register Chart.js components for pie and bar charts
ChartJS.register(ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement, Title);

// Chart options for bar charts
const chartOptions = {
  responsive: true,
  plugins: { legend: { position: 'top' }, title: { display: false } },
  scales: { y: { min: 0, max: 100, ticks: { callback: (v) => `${v}%` } } },
};

// Memoized Pie chart to optimize performance
const MemoizedPie = React.memo(({ data }) => (
  <Pie
    data={data}
    options={{ maintainAspectRatio: false, plugins: { legend: { position: 'bottom' } } }}
  />
));

// Memoized Bar chart to optimize performance
const MemoizedBar = React.memo(({ data, options }) => <Bar data={data} options={options} />);



// Map display keys to datasetInfo keys
const keyMap = {
  'Row': 'row',
  'Column': 'column',
  'Unique row': 'uniqueRow',
  'Missing values': 'missingValues',
  'Data types': 'dataTypes',
};


// Main component for the personalized learning dashboard
const PersonalizedLearning = () => {
  // State for search input and evaluation metric selection
  const [searchTerm, setSearchTerm] = useState('');
  const [reliabilityMetric, setReliabilityMetric] = useState('@5');
  const [relevanceMetric, setRelevanceMetric] = useState('@5');
  const [selectedMetric, setSelectedMetric] = useState('completeness');

  // Static dataset information
  const datasetInfo = {
    row: 130000,
    column: 16,
    uniqueRow: 8,
    missingValues: 10,
    dataTypes: 'float, int, category, datetime',
  };

  // Descriptive statistics for sample columns
  const descriptiveStatistics = {
    column1: { count: 13, mean: 5.5, std: 2.1, min: 1.0, '25%': 4.0, '50%': 5.5, '75%': 7.0, max: 10.0 },
    column2: { count: 10, mean: 100.5, std: 15.3, min: 75.0, '25%': 90.0, '50%': 101.0, '75%': 112.0, max: 125.0 },
    column3: { count: 13, mean: 5.5, std: 2.1, min: 1.0, '25%': 4.0, '50%': 5.5, '75%': 7.0, max: 10.0 },
    column4: { count: 10, mean: 100.5, std: 15.3, min: 75.0, '25%': 90.0, '50%': 101.0, '75%': 112.0, max: 125.0 },
  };

  // Gender distribution pie chart data
  const genderData = {
    labels: ['Male', 'Female', 'Other'],
    datasets: [{
      data: [50, 45, 5],
      backgroundColor: ['#36A2EB', '#FF6384', '#FFCE56'],
      hoverBackgroundColor: ['#36A2EB', '#FF6384', '#FFCE56'],
    }],
  };


  // Top 10 popular fields bar chart data
  const fieldsData = {
    labels: ['Data Science', 'Web Dev', 'Mobile Dev', 'AI/ML', 'Cybersecurity', 'Cloud Computing', 'DevOps', 'UI/UX Design', 'Networking', 'Bus Analysis'],
    datasets: [{
      label: 'Registrations',
      data: [120, 100, 80, 300, 60, 55, 700, 45, 40, 35],
      backgroundColor: '#4BC0C0',
      borderColor: '#4BC0C0',
      borderWidth: 1,
    }],
  };

  // Reliability evaluation bar chart data
  const reliabilityData = {
    '@5': { labels: ['CBF', 'DeepFM', 'BPRMF', 'KGAT'], datasets: [{ label: 'MAP', data: [65, 83, 87, 75], backgroundColor: '#0071BC' }] },
    '@10': { labels: ['CBF', 'DeepFM', 'BPRMF', 'KGAT'], datasets: [{ label: 'MAP', data: [70, 80, 85, 78], backgroundColor: '#0071BC' }] },
  };

  // Relevance evaluation bar chart data
  const relevanceData = {
    '@5': {
      labels: ['CBF', 'DeepFM', 'BPRMF', 'KGAT'],
      datasets: [
        { label: 'Precision', data: [67, 84, 87, 75], backgroundColor: '#0071BC' },
        { label: 'Recall', data: [82, 69, 71, 63], backgroundColor: '#34A853' },
        { label: 'NDCG', data: [70, 72, 71, 69], backgroundColor: '#FF6600' },
      ],
    },
    '@10': {
      labels: ['CBF', 'DeepFM', 'BPRMF', 'KGAT'],
      datasets: [
        { label: 'Precision', data: [69, 81, 85, 77], backgroundColor: '#0071BC' },
        { label: 'Recall', data: [84, 70, 72, 64], backgroundColor: '#34A853' },
        { label: 'NDCG', data: [73, 74, 73, 71], backgroundColor: '#FF6600' },
      ],
    },
  };

  // Completeness evaluation data
  const completenessData = {
    overallPassRate: 100,
    definition: {
      title: 'Definition',
      text: {
        completeness: { term: 'Completeness:', definition: 'The dataset must contain all necessary information without missing any critical elements.' },
        approach: { term: 'Measurement approach:', definition: 'Completeness is calculated as the ratio between the number of valid (non-missing) values and the total number of expected values.' },
      },
    },
    errorLog: [
      'Row 2831: Missing value in `teacher_id`',
      'Row 1025: Missing value in `course_name`',
      'Row 1025: Missing value in `course_name`',
      'Row 2831: Missing value in `teacher_id`',
      'Row 1025: Missing value in `course_name`',
      'Row 1025: Missing value in `course_name`',
    ],
  };

  // Consistency evaluation data
  const consistencyData = {
    overallPassRate: 95,
    criterionPassRates: [
      { name: 'Domain Range:', passRate: 100 },
      { name: 'Non-null:', passRate: 85 },
      { name: 'Data Type:', passRate: 60 },
      { name: 'Logical Constraints:', passRate: 30 },
      { name: 'Uniqueness:', passRate: 30 },
      { name: 'Foreign Key Integrity:', passRate: 30 },
    ],
    definition: {
      title: 'Definition',
      text: {
        intro: "<strong style='font-weight: 600;'>Consistency:</strong> Data must be uniform across different sources and systems, with no conflicts or duplications.",
        heading: 'Basic Validity Checks:',
        criteria: [
          { name: 'Domain Range', description: 'The value must fall within a predefined range.' },
          { name: 'Non-null', description: 'The value must not be empty or missing.' },
          { name: 'Data Type', description: 'The value must conform to a specified data type.' },
          { name: 'Logical Constraints', description: 'The value must satisfy a logical condition.' },
          { name: 'Uniqueness', description: 'The value must be unique within the dataset.' },
          { name: 'Foreign Key Integrity', description: 'The value must exist in a valid reference list.' },
        ],
      },
    },
    errorLog: [
      'Row 550: Inconsistent date format in `event_date`',
      'Row 1120: Conflict between `start_time` and `end_time`',
      'Row 1500: Inconsistent currency code',
    ],
  };

  // Handle search input changes
  const handleSearchChange = (event) => setSearchTerm(event.target.value);

  // Trigger dataset update (placeholder for API call)
  const handleUpdateDataset = () => alert('Đang cập nhật Dataset...');

  // Determine progress bar color based on percentage
  const getProgressColor = (percentage) => {
    if (percentage < 40) return '#FF0000';
    if (percentage < 80) return '#FFA500';
    return '#34A853';
  };

  // Component to toggle between @5 and @10 metrics
  const MetricSwitch = ({ current, onChange }) => (
    <div style={{ display: 'flex', gap: 8 }}>
      {['@5', '@10'].map((m) => (
        <CButton
          key={m}
          style={{
            width: 85,
            height: 25,
            fontSize: 16,
            backgroundColor: '#FC842F',
            opacity: current === m ? 1 : 0.7,
            border: 'none',
            padding: 0,
          }}
          onClick={() => onChange(m)}
        >
          Metric{m}
        </CButton>
      ))}
    </div>
  );

  // Select evaluation data based on current metric
  const currentData = selectedMetric === 'completeness' ? completenessData : consistencyData;

  // Common styles
  const commonStyles = {
    card: { borderRadius: 20, backgroundColor: 'rgba(0, 113, 188, 0.6)', fontFamily: 'Inter, sans-serif', fontSize: 18, color: 'white', border: 'none', marginBottom: 8 },
    table: { borderRadius: 8, overflow: 'hidden' },
    textBold: { fontWeight: 500 },
    flexRow: { display: 'flex', alignItems: 'center', gap: 15 },
    progressContainer: { flexGrow: 1, display: 'flex', alignItems: 'center', gap: 8 },
    progressValue: { display: 'flex', justifyContent: 'center', alignItems: 'center', padding: '0 8px', fontWeight: 500, fontSize: 16, lineHeight: '150%', color: '#FFFFFF', borderRadius: 8, flexShrink: 0, minWidth: 50 },
    progressBar: { flexGrow: 1, height: 8, backgroundColor: '#E0E0E0', borderRadius: 4 },
    progressFill: { height: '100%', borderRadius: 4 },
  };

  // Render dashboard layout
  return (
    <div style={{ marginTop: 64, paddingTop: 8, paddingBottom: 12, fontFamily: 'Inter, sans-serif' }}>
      {/* Header with dataset update button and search bar */}
      <CRow className="align-items-center mb-3">
        <CCol xs="auto">
          <CButton
            onClick={handleUpdateDataset}
            style={{ backgroundColor: '#009990', color: 'white', fontFamily: 'Inter, sans-serif', fontSize: 18, fontWeight: 600, borderColor: '#009990' }}
          >
            <CIcon icon={cilLoopCircular} style={{ width: 25, height: 25 }} className="me-2" />
            Update dataset
          </CButton>
        </CCol>
        <CCol>
          <CInputGroup>
            <CFormInput type="text" placeholder="Search..." value={searchTerm} onChange={handleSearchChange} />
            <CButton type="button" color="secondary">
              <CIcon icon={cilMagnifyingGlass} />
            </CButton>
          </CInputGroup>
        </CCol>
      </CRow>

      {/* Dataset Information and Descriptive Statistics */}
      <CCard style={commonStyles.card}>
        <CCardHeader style={commonStyles.textBold}>Dataset Information</CCardHeader>
        <CCardBody style={{ padding: 12, paddingTop: 0, paddingBottom: 0 }}>
          {/* Dataset metrics table with mapped keys */}
          <CTable responsive style={commonStyles.table}>
            <CTableBody>
              {Object.keys(keyMap).map((key) => (
                <CTableRow key={key}>
                  <CTableHeaderCell scope="row" style={commonStyles.textBold}>{key}:</CTableHeaderCell>
                  <CTableDataCell className="text-end">{datasetInfo[keyMap[key]]}</CTableDataCell>
                </CTableRow>
              ))}
            </CTableBody>
          </CTable>
          <h5 style={{ fontSize: 18, fontWeight: 500, marginTop: 0, marginBottom: 12 }}>Descriptive Statistics</h5>
          <CTable striped bordered responsive style={commonStyles.table}>
            <CTableHead>
              <CTableRow>
                <CTableHeaderCell scope="col" style={commonStyles.textBold}>Statistic</CTableHeaderCell>
                {Object.keys(descriptiveStatistics).map((colName) => (
                  <CTableHeaderCell key={colName} scope="col" style={commonStyles.textBold}>{colName}</CTableHeaderCell>
                ))}
              </CTableRow>
            </CTableHead>
            <CTableBody>
              {['count', 'mean', 'std', 'min', '25%', '50%', '75%', 'max'].map((stat) => (
                <CTableRow key={stat}>
                  <CTableHeaderCell scope="row" style={commonStyles.textBold}>{stat}</CTableHeaderCell>
                  {Object.values(descriptiveStatistics).map((colStats, i) => (
                    <CTableDataCell key={i}>{colStats[stat]?.toFixed(2) || '-'}</CTableDataCell>
                  ))}
                </CTableRow>
              ))}
            </CTableBody>
          </CTable>
        </CCardBody>
      </CCard>

      {/* Data Visualization Section */}
      <CCard style={{ ...commonStyles.card, height: 400, overflow: 'hidden', marginTop: 0 }}>
        <CCardHeader style={commonStyles.textBold}>Data Visualization</CCardHeader>
        <CCardBody style={{ display: 'flex', gap: 8, height: 'calc(100% - 56px)', overflow: 'hidden', padding: 12, paddingTop: 0 }}>
          {[
            { title: 'Gender Distribution (%)', data: genderData, Component: MemoizedPie },
            {
              title: 'Top 10 Popular Fields',
              data: fieldsData,
              Component: MemoizedBar,
              options: {
                maintainAspectRatio: false,
                plugins: { legend: { display: false }, tooltip: { callbacks: { label: (ctx) => `${ctx.parsed.y} learners` } } },
                scales: { y: { beginAtZero: true, ticks: { stepSize: 20 } } },
              },
            },
          ].map(({ title, data, Component, options }, i) => (
            <div key={i} style={{ flex: 1, backgroundColor: '#fff', borderRadius: 8, padding: 8, display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
              <h6 style={{ marginBottom: 4, color: '#000', textAlign: 'center' }}>{title}</h6>
              <div style={{ flex: 1, position: 'relative' }}>
                <Component data={data} options={options} />
              </div>
            </div>
          ))}
        </CCardBody>
      </CCard>

      {/* Direct and Indirect Evaluation Sections */}
      <CRow style={{ '--bs-gutter-x': '0.25rem' }}>
        {/* Direct Evaluation: Completeness and Consistency */}
        <CCol xs={6} style={{ paddingRight: 4 }}>
          <CCard style={{ border: '1px solid #828282', boxShadow: '0 4px 4px rgba(0, 0, 0, 0.25)', borderRadius: 16, height: 800, overflowY: 'auto', width: '100%' }}>
            {/* Sticky header for Direct Evaluation */}
            <CCardHeader style={{ fontSize: 18, fontWeight: 700, color: 'black', textAlign: 'center', position: 'sticky', top: 0, zIndex: 1, backgroundColor: '#fff' }}>
              DIRECT EVALUATION
            </CCardHeader>
            <CCardBody style={{ padding: '20px 20px 15px' }}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 16, marginBottom: 20 }}>
                {[
                  { metric: 'completeness', label: 'Completeness:', data: completenessData },
                  { metric: 'consistency', label: 'Consistency:', data: consistencyData },
                ].map(({ metric, label, data }) => (
                  <div key={metric} style={commonStyles.flexRow}>
                    <CButton
                      onClick={() => setSelectedMetric(metric)}
                      style={{
                        backgroundColor: '#FC842F',
                        color: '#000',
                        border: 'none',
                        opacity: selectedMetric === metric ? 1 : 0.7,
                        transition: 'opacity 0.3s ease',
                        fontWeight: 500,
                        fontSize: 16,
                        lineHeight: '150%',
                        padding: '5px 10px',
                        borderRadius: 5,
                        flex: '0 0 160px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                      }}
                    >
                      {label}
                    </CButton>
                    <div style={commonStyles.progressContainer}>
                      <span style={{ ...commonStyles.progressValue, backgroundColor: getProgressColor(data.overallPassRate) }}>
                        {data.overallPassRate}%
                      </span>
                      <div style={commonStyles.progressBar}>
                        <div style={{ ...commonStyles.progressFill, width: `${data.overallPassRate}%`, backgroundColor: getProgressColor(data.overallPassRate) }}></div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Definition of selected metric */}
              <div style={{ backgroundColor: 'rgba(0, 113, 188, 0.5)', borderRadius: 8, padding: 15, marginBottom: 20 }}>
                <h3 style={{ fontSize: 20, fontWeight: 600, lineHeight: '150%', color: '#000', textAlign: 'center', margin: '0 0 10px' }}>
                  {currentData.definition.title}
                </h3>
                {selectedMetric === 'completeness' ? (
                  <>
                    <p style={{ fontSize: 18, fontWeight: 400, lineHeight: '150%', color: '#000', margin: '0 0 10px' }}>
                      <strong style={{ fontWeight: 600 }}>{currentData.definition.text.completeness.term}</strong> {currentData.definition.text.completeness.definition}
                    </p>
                    <p style={{ fontSize: 18, fontWeight: 400, lineHeight: '150%', color: '#000', margin: 0 }}>
                      <strong style={{ fontWeight: 600 }}>{currentData.definition.text.approach.term}</strong> {currentData.definition.text.approach.definition}
                    </p>
                  </>
                ) : (
                  <div>
                    <p style={{ fontSize: 18, fontWeight: 400, lineHeight: '150%', color: '#000', margin: '0 0 10px' }} dangerouslySetInnerHTML={{ __html: currentData.definition.text.intro }} />
                    <p style={{ fontSize: 18, fontWeight: 600, lineHeight: '150%', color: '#000', margin: '0 0 8px' }}>{currentData.definition.text.heading}</p>
                    <ul style={{ listStyle: 'none', padding: '0 0 0 20px', margin: 0 }}>
                      {currentData.definition.text.criteria.map((item, i) => (
                        <li key={i} style={{ fontSize: 18, fontWeight: 400, lineHeight: '150%', color: '#000', marginBottom: 5 }}>
                          <em style={{ fontStyle: 'italic', fontWeight: 600 }}>{item.name}</em>: {item.description}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>

              <div style={{ borderTop: '2px dashed #828282', margin: '20px 0' }} />

              {/* Evaluation results and error log */}
              <div>
                <h3 style={{ fontSize: 20, fontWeight: 600, lineHeight: '150%', color: '#000', textAlign: 'center', margin: '0 0 20px' }}>Results</h3>
                <div style={{ marginBottom: 20 }}>
                  {selectedMetric === 'completeness' ? (
                    <div style={commonStyles.flexRow}>
                      <span style={{ fontSize: 18, fontWeight: 600, lineHeight: '150%', color: '#000', minWidth: 120 }}>Pass Rate:</span>
                      <span style={{ ...commonStyles.progressValue, backgroundColor: getProgressColor(currentData.overallPassRate) }}>
                        {currentData.overallPassRate}%
                      </span>
                      <div style={commonStyles.progressBar}>
                        <div style={{ ...commonStyles.progressFill, width: `${currentData.overallPassRate}%`, backgroundColor: getProgressColor(currentData.overallPassRate) }}></div>
                      </div>
                    </div>
                  ) : (
                    <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                      <div style={commonStyles.flexRow}>
                        <span style={{ fontSize: 18, fontWeight: 600, lineHeight: '150%', color: '#000', minWidth: 120 }}>Total Pass Rate:</span>
                        <span style={{ ...commonStyles.progressValue, backgroundColor: getProgressColor(currentData.overallPassRate) }}>
                          {currentData.overallPassRate}%
                        </span>
                        <div style={commonStyles.progressBar}>
                          <div style={{ ...commonStyles.progressFill, width: `${currentData.overallPassRate}%`, backgroundColor: getProgressColor(currentData.overallPassRate) }}></div>
                        </div>
                      </div>
                      {currentData.criterionPassRates.map((criterion) => (
                        <div key={criterion.name} style={{ display: 'flex', alignItems: 'center', gap: 15, paddingTop: 10, borderTop: '1px solid #E0E0E0' }}>
                          <span style={{ fontSize: 16, fontWeight: 500, lineHeight: '150%', color: '#000', flex: '0 0 140px' }}>{criterion.name}</span>
                          <span style={{ ...commonStyles.progressValue, backgroundColor: getProgressColor(criterion.passRate) }}>
                            {criterion.passRate}%
                          </span>
                          <div style={commonStyles.progressBar}>
                            <div style={{ ...commonStyles.progressFill, width: `${criterion.passRate}%`, backgroundColor: getProgressColor(criterion.passRate) }}></div>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
                <h4 style={{ fontSize: 18, fontWeight: 600, lineHeight: '150%', color: '#000', margin: '0 0 10px' }}>Error Log:</h4>
                <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
                  {currentData.errorLog.length > 0 ? (
                    currentData.errorLog.map((error, i) => (
                      <li
                        key={i}
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          padding: '10px 0',
                          borderTop: i !== 0 ? '1px solid #E0E0E0' : 'none',
                          fontSize: 16,
                          fontWeight: 400,
                          lineHeight: '150%',
                          color: '#000',
                        }}
                      >
                        {error}
                      </li>
                    ))
                  ) : (
                    <li style={{ fontSize: 16, fontWeight: 400, lineHeight: '150%', color: '#555', padding: '10px 0' }}>
                      No errors found for this metric.
                    </li>
                  )}
                </ul>
              </div>
            </CCardBody>
          </CCard>
        </CCol>

        {/* Indirect Evaluation: Reliability and Relevance */}
        <CCol xs={6} style={{ paddingLeft: 4 }}>
          <CCard style={{ boxShadow: '0 4px 4px rgba(0, 0, 0, 0.25)', fontFamily: 'Inter', width: '100%', height: 800, backgroundColor: '#fff', border: '1px solid #828282', borderRadius: 16 }}>
            <CCardHeader style={{ fontSize: 18, fontWeight: 700, color: 'black', textAlign: 'center' }}>INDIRECT EVALUATION</CCardHeader>
            <CCardBody style={{ display: 'flex', flexDirection: 'column', gap: 12, alignItems: 'center', padding: 12 }}>
              {[
                { label: 'Reliability', metric: reliabilityMetric, setMetric: setReliabilityMetric, data: reliabilityData },
                { label: 'Relevance', metric: relevanceMetric, setMetric: setRelevanceMetric, data: relevanceData },
              ].map(({ label, metric, setMetric, data }, i) => (
                <div
                  key={i}
                  style={{
                    width: '98%',
                    height: '50%',
                    margin: '0 auto',
                    backgroundColor: 'rgba(0, 113, 188, 0.6)',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    boxShadow: '0 0 4px rgba(0,0,0,0.1)',
                    borderRadius: 8,
                    padding: 6,
                  }}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }}>
                    <span style={{ fontSize: 18, fontWeight: 500, color: 'black' }}>{label}:</span>
                    <MetricSwitch current={metric} onChange={setMetric} />
                  </div>
                  <div style={{ width: '100%', height: '98%', margin: '0 auto', borderRadius: 8, backgroundColor: 'white' }}>
                    <MemoizedBar data={data[metric]} options={chartOptions} />
                  </div>
                </div>
              ))}
            </CCardBody>
          </CCard>
        </CCol>
      </CRow>
    </div>
  );
};

export default PersonalizedLearning;