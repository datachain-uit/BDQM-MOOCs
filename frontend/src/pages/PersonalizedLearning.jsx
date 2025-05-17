/* PersonalizedLearning.jsx
 * Displays a dashboard for analyzing learning dataset with visualizations and evaluation metrics.
 * Includes dataset information, descriptive statistics, gender/field distributions, and direct/indirect evaluations.
 */

import React, { useState ,useEffect} from 'react';
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
import { cilMagnifyingGlass, cilLoopCircular, cilSpreadsheet } from '@coreui/icons';
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
  'Column': 'col',
  'Unique row': 'unique_row',
  'Missing values': 'missing_value_rate',
  'Data types': 'datatype',
};


// Main component for the personalized learning dashboard
const PersonalizedLearning = () => {
  // State for search input and evaluation metric selection
  const [searchTerm, setSearchTerm] = useState('');
  const [reliabilityMetric, setReliabilityMetric] = useState('@5');
  const [relevanceMetric, setRelevanceMetric] = useState('@5');
  const [selectedMetric, setSelectedMetric] = useState('completeness');
  const [datasetInfo, setDatasetInfo] = useState({});
  const [gender, setGender] = useState([]);
  const [data, setData] = useState({});
  const [models, setModels] = useState([]);
  const [relevance5precision, setRelevance5Precision] = useState([]);
  const [relevance10precision, setRelevance10Precision] = useState([]);
  const [relevance5recall, setRelevance5Recall] = useState([]);
  const [relevance10recall, setRelevance10Recall] = useState([]);
  const [relevance5ndcg, setRelevance5NDCG] = useState([]);
  const [relevance10ndcg, setRelevance10NDCG] = useState([]);
  const [reliability10map, setReliability10MAP] = useState([]);
  const [reliability5map, setReliability5MAP] = useState([]);
  const [consistencyPassRate, setConsistencyPassRate] = useState(0);
  const [completenessPassRate, setCompletenessPassRate] = useState(0);
  const [statistics1, setDescriptiveStatistics1] = useState({});
  const [statistics2, setDescriptiveStatistics2] = useState({});
  const [statistics3, setDescriptiveStatistics3] = useState({});
  const [statistics4, setDescriptiveStatistics4] = useState({});
  const [statistics5, setDescriptiveStatistics5] = useState({});

  useEffect(() => {
      const fetchData = async () => {
        try {
          const response = await fetch("http://localhost:8000/api/recommender_datainfo/");
          const result = await response.json(); 
          console.log("API result:", result); 
          const new_data = {
            dataset_name: result.data[0].dataset_name,
            dataset_info: result.data[0].dataset_info,
            gender_rate: result.data[0].gender_rate,
            top10fields: result.data[0].top10field.fields,
            top10fields_count: result.data[0].top10field.count,
          };
          setData(new_data);
          setDatasetInfo(result.data[0].dataset_info); // Assuming the API returns an array of objects
          setGender(result.data[0].gender_rate); // Assuming the API returns an array of objects
          setModels(result.data[0].evaluation.model); // Assuming the API returns an array of objects
          setRelevance5Precision(result.data[0].evaluation.relevanceData.at5.precision)
          setRelevance10Precision(result.data[0].evaluation.relevanceData.at10.precision)
          setRelevance5Recall(result.data[0].evaluation.relevanceData.at5.recall)
          setRelevance10Recall(result.data[0].evaluation.relevanceData.at10.recall)
          setRelevance5NDCG(result.data[0].evaluation.relevanceData.at5.NDCG)
          setRelevance10NDCG(result.data[0].evaluation.relevanceData.at10.NDCG)
          setReliability5MAP(result.data[0].evaluation.reliabilityData.at5.MAP); // Assuming the API returns an array of objects
          setReliability10MAP(result.data[0].evaluation.reliabilityData.at10.MAP); // Assuming the API returns an array of objects
          setConsistencyPassRate(result.data[0].evaluation.consistencyData.overallPassRate); // Assuming the API returns an array of objects
          setCompletenessPassRate(result.data[0].evaluation.completenessData.overallPaseRate); // Assuming the API returns an array of objects
          setDescriptiveStatistics1(result.data[0].descriptiveStatistics.enroll_time);
          setDescriptiveStatistics2(result.data[0].descriptiveStatistics.user_gender);
          setDescriptiveStatistics3(result.data[0].descriptiveStatistics.course_total_comments);
          setDescriptiveStatistics4(result.data[0].descriptiveStatistics.user_course_num_comment);
          setDescriptiveStatistics5(result.data[0].descriptiveStatistics.user_course_num_replies);
          console.log("API result:", result);
          // console.log("data:", data);
        } catch (error) {
          console.error("Error fetching data:", error);
        }
      };
  
      fetchData();
    }, []);
  // Descriptive statistics for sample columns
  const descriptiveStatistics = {
    enroll_time: { count: statistics1[0], mean: statistics1[1], std: statistics1[2], min: statistics1[3], '25%': statistics1[4], '50%': statistics1[5], '75%': statistics1[6], max: statistics1[7] },
    user_gender: { count: statistics2[0], mean: statistics2[1], std: statistics2[2], min: statistics2[3], '25%': statistics2[4], '50%': statistics2[5], '75%': statistics2[6], max: statistics2[7] },
    course_total_comments: { count: statistics3[0], mean: statistics3[1], std: statistics3[3], min: statistics3[3], '25%': statistics3[4], '50%': statistics3[5], '75%': statistics3[6], max: statistics3[7] },
    user_course_num_comment: { count: statistics4[0], mean: statistics4[1], std: statistics4[2], min: statistics4[3], '25%': statistics4[4], '50%': statistics4[5], '75%': statistics4[6], max: statistics4[7] },
    user_course_num_replies: { count: statistics5[0], mean: statistics5[1], std: statistics5[2], min: statistics5[3], '25%': statistics5[4], '50%': statistics5[5], '75%': statistics5[6], max: statistics5[7] },
  };

  // Gender distribution pie chart data
  const genderData = {
    labels: ['Male', 'Female', 'Other'],
    datasets: [{
      data: data.gender_rate,
      backgroundColor: ['#36A2EB', '#FF6384', '#FFCE56'],
      hoverBackgroundColor: ['#36A2EB', '#FF6384', '#FFCE56'],
    }],
  };


  // Top 10 popular fields bar chart data
  const fieldsData = {
    labels: data.top10fields,
    datasets: [{
      label: 'Registrations',
      data: data.top10fields_count,
      backgroundColor: '#4BC0C0',
      borderColor: '#4BC0C0',
      borderWidth: 1,
    }],
  };

  // Reliability evaluation bar chart data
  const reliabilityData = {
    '@5': { labels: models, datasets: [{ label: 'MAP', data: reliability5map, backgroundColor: '#0071BC' }] },
    '@10': { labels: models, datasets: [{ label: 'MAP', data: reliability10map, backgroundColor: '#0071BC' }] },
  };

  // Relevance evaluation bar chart data
  const relevanceData = {
    '@5': {
      labels: models,
      datasets: [
        { label: 'Precision', data: relevance5precision, backgroundColor: '#0071BC' },
        { label: 'Recall', data: relevance5recall, backgroundColor: '#34A853' },
        { label: 'NDCG', data: relevance5ndcg, backgroundColor: '#FF6600' },
      ],
    },
    '@10': {
      labels: ['CBF', 'DeepFM', 'BPRMF', 'KGAT'],
      datasets: [
        { label: 'Precision', data: relevance10precision, backgroundColor: '#0071BC' },
        { label: 'Recall', data: relevance10recall, backgroundColor: '#34A853' },
        { label: 'NDCG', data: relevance10ndcg, backgroundColor: '#FF6600' },
      ],
    },
  };

  // Completeness evaluation data
  const completenessData = {
    overallPassRate: completenessPassRate,
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
    overallPassRate: consistencyPassRate,
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

  const handleExportReport = () => alert('Exporting Report...')

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
            {/* Header with dataset update button and search bar */}
      <CRow className="align-items-center mb-3">
        <CCol xs="auto">
          <CButton
            onClick={handleUpdateDataset}
            style={{ backgroundColor: '#009990', color: 'white', fontFamily: 'Inter, sans-serif', fontSize: 18, fontWeight: 600, borderColor: '#009990', display: 'flex', alignItems: 'center', }}
          >
            <CIcon icon={cilLoopCircular} style={{ width: 25, height: 25 }} className="me-2" />
            Update dataset
          </CButton>
        </CCol>
        <CCol xs="auto">
          <CButton
            onClick={handleExportReport}
            style={{
              backgroundColor: '#0066cc', color: 'white', fontFamily: 'Inter, sans-serif', fontSize: 18,fontWeight: 600,borderColor: '#0066cc',display: 'flex',alignItems: 'center',
            }}
          >
            <CIcon icon={cilSpreadsheet} style={{ width: 25, height: 25 }} className="me-2" />
            Export Report
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