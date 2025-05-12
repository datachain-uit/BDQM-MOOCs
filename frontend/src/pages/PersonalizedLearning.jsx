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
  CProgress,
} from '@coreui/react';
import { CChart } from '@coreui/react-chartjs'
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

ChartJS.register(
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  BarElement,
  Title
);


// Dữ liệu mẫu cho Dataset Info
const datasetInfo = {
  row: 13,
  column: 16,
  uniqueRow: 8,
  missingValues: 10,
  dataTypes: 'float, int, category, datetime',
};

// Dữ liệu mẫu cho Descriptive Statistics (giả lập output của dataframe.describe())
const descriptiveStatistics = {
  column1: {
    count: 13,
    mean: 5.5,
    std: 2.1,
    min: 1.0,
    '25%': 4.0,
    '50%': 5.5,
    '75%': 7.0,
    max: 10.0,
  },
  column2: {
    count: 10,
    mean: 100.5,
    std: 15.3,
    min: 75.0,
    '25%': 90.0,
    '50%': 101.0,
    '75%': 112.0,
    max: 125.0,
  },
  column3: {
    count: 13,
    mean: 5.5,
    std: 2.1,
    min: 1.0,
    '25%': 4.0,
    '50%': 5.5,
    '75%': 7.0,
    max: 10.0,
  },
  column4: {
    count: 10,
    mean: 100.5,
    std: 15.3,
    min: 75.0,
    '25%': 90.0,
    '50%': 101.0,
    '75%': 112.0,
    max: 125.0,
  },
  // Thêm các cột khác nếu cần
};

// Dữ liệu mẫu cho Biểu đồ Giới tính
const genderData = {
  labels: ['Male', 'Female', 'Other'],
  datasets: [
    {
      data: [50, 45, 5],
      backgroundColor: ['#36A2EB', '#FF6384', '#FFCE56'],
      hoverBackgroundColor: ['#36A2EB', '#FF6384', '#FFCE56'],
    },
  ],
};

// Dữ liệu mẫu cho Biểu đồ Top 10 Lĩnh vực
const fieldsData = {
  labels: [
    'Data Science',
    'Web Dev',
    'Mobile Dev',
    'AI/ML',
    'Cybersecurity',
    'Cloud Computing',
    'DevOps',
    'UI/UX Design',
    'Networking',
    'Bus Analysis',
  ],
  datasets: [
    {
      label: 'Registrations',
      data: [120, 100, 80, 300, 60, 55, 700, 45, 40, 35],
      backgroundColor: '#4BC0C0',
      borderColor: '#4BC0C0',
      borderWidth: 1,
    },
  ],
};


const PersonalizedLearning = () => {
  const [searchTerm, setSearchTerm] = useState('');

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
    // Logic lọc dữ liệu
  };

  const handleUpdateDataset = () => {
    alert('Đang cập nhật Dataset...');
    // API call hoặc logic xử lý
  }


  //indirect evaluation data giả định
  const [reliabilityMetric, setReliabilityMetric] = useState("@5");
  const [relevanceMetric, setRelevanceMetric] = useState("@5");

  const reliabilityData = {
    "@5": {
      labels: ["CBF", "DeepFM", "BPRMF", "KGAT"],
      datasets: [
        {
          label: "MAP",
          data: [65, 83, 87, 75],
          backgroundColor: "#0071BC",
        },
      ],
    },
    "@10": {
      labels: ["CBF", "DeepFM", "BPRMF", "KGAT"],
      datasets: [
        {
          label: "MAP",
          data: [70, 80, 85, 78],
          backgroundColor: "#0071BC",
        },
      ],
    },
  };

  const relevanceData = {
    "@5": {
      labels: ["CBF", "DeepFM", "BPRMF", "KGAT"],
      datasets: [
        {
          label: "Precision",
          data: [67, 84, 87, 75],
          backgroundColor: "#0071BC",
        },
        {
          label: "Recall",
          data: [82, 69, 71, 63],
          backgroundColor: "#34A853",
        },
        {
          label: "NDCG",
          data: [70, 72, 71, 69],
          backgroundColor: "#FF6600",
        },
      ],
    },
    "@10": {
      labels: ["CBF", "DeepFM", "BPRMF", "KGAT"],
      datasets: [
        {
          label: "Precision",
          data: [69, 81, 85, 77],
          backgroundColor: "#0071BC",
        },
        {
          label: "Recall",
          data: [84, 70, 72, 64],
          backgroundColor: "#34A853",
        },
        {
          label: "NDCG",
          data: [73, 74, 73, 71],
          backgroundColor: "#FF6600",
        },
      ],
    },
  };

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: { position: 'top' },
      title: { display: false },
    },
    scales: {
      y: {
        min: 0,
        max: 100,
        ticks: {
          callback: (v) => `${v}%`,
        },
      },
    },
  };

  const MetricSwitch = ({ current, onChange }) => (
    <div style={{ display: "flex", gap: "8px" }}>
      {["@5", "@10"].map((m) => (
        <CButton
          key={m}
          style={{
            width: 85,
            height: 25,
            fontSize: 16,
            backgroundColor: "#FC842F",
            opacity: current === m ? 1 : 0.7,
            border: "none",
            padding: 0,
          }}
          onClick={() => onChange(m)}
        >
          Metric{m}
        </CButton>
      ))}
    </div>
  );

  //direct evaluation data giả định: 
  const [selectedMetric, setSelectedMetric] = useState('completeness');

  // --- Data mẫu (Bạn sẽ thay thế bằng data thật) ---

  // Data cho Completeness
  const completenessData = {
    overallPassRate: 100,
    definition: {
      title: "Definition",
      text: {
        completeness: { term: "Completeness:", definition: "The dataset must contain all necessary information without missing any critical elements." },
        approach: { term: "Measurement approach:", definition: "Completeness is calculated as the ratio between the number of valid (non-missing) values and the total number of expected values." }
      }
    },
    errorLog: [
      "Row 2831: Missing value in `teacher_id`",
      "Row 1025: Missing value in `course_name`",
      "Row 1025: Missing value in `course_name`",
      "Row 2831: Missing value in `teacher_id`",
      "Row 1025: Missing value in `course_name`",
      "Row 1025: Missing value in `course_name`",
    ],
  };

  // Data cho Consistency (Ví dụ, bạn cần thay thế bằng cấu trúc data thật của mình)
  const consistencyData = {
    overallPassRate: 95, // Pass rate tổng
    criterionPassRates: [ // Pass rate từng tiêu chí
      { name: "Domain Range:", passRate: 100 },
      { name: "Non-null:", passRate: 85 },
      { name: "Data Type:", passRate: 60 },
      { name: "Logical Constraints:", passRate: 30 },
      { name: "Uniqueness:", passRate: 30 },
      { name: "Foreign Key Integrity:", passRate: 30 },
    ],
    definition: {
      title: "Definition",
      text: {
        // --- Cấu trúc mới cho Consistency Definition ---

        intro: "<strong style='font-weight: 600;'>Consistency:</strong> Data must be uniform across different sources and systems, with no conflicts or duplications.",
        heading: "Basic Validity Checks:",
        criteria: [
          { name: "Domain Range", description: "The value must fall within a predefined range." },
          { name: "Non-null", description: "The value must not be empty or missing." },
          { name: "Data Type", description: "The value must conform to a specified data type." },
          { name: "Logical Constraints", description: "The value must satisfy a logical condition." },
          { name: "Uniqueness", description: "The value must be unique within the dataset." },
          { name: "Foreign Key Integrity", description: "The value must exist in a valid reference list." },
        ]
        // ----------------------------------------------
      }
    },
    errorLog: [
      "Row 550: Inconsistent date format in `event_date`",
      "Row 1120: Conflict between `start_time` and `end_time`",
      "Row 1500: Inconsistent currency code",
    ],
  };

  // Chọn data dựa trên độ đo đang chọn
  const currentData = selectedMetric === 'completeness' ? completenessData : consistencyData;


  // Hàm xác định màu cho thanh progress
  const getProgressColor = (percentage) => {
    if (percentage < 40) return '#FF0000'; // Đỏ
    if (percentage < 80) return '#FFA500'; // Cam
    return '#34A853'; // Xanh lá cây
  };

  return (
    <div
      className="personalized-learning-page"
      style={{
        marginTop: '64px',
        paddingTop: '8px',
        paddingBottom: '12px',
      }}
    >
      <CRow className="align-items-center mb-3">
        <CCol xs="auto">
          <CButton
            onClick={handleUpdateDataset}
            style={{
              backgroundColor: '#009990',
              color: 'white',
              fontFamily: 'Inter, sans-serif',
              fontSize: '18px',
              fontWeight: '600',
              borderColor: '#009990',
            }}
          >
            <CIcon
              icon={cilLoopCircular}
              style={{ width: '25px', height: '25px' }}
              className="me-2"
            />
            Update dataset
          </CButton>
        </CCol>
        <CCol>
          <CInputGroup>
            <CFormInput
              type="text"
              placeholder="Search..."
              value={searchTerm}
              onChange={handleSearchChange}
            />
            <CButton type="button" color="secondary">
              <CIcon icon={cilMagnifyingGlass} />
            </CButton>
          </CInputGroup>
        </CCol>
      </CRow>

      <CCard
        // className="mb-4"
        style={{
          borderRadius: '20px',
          backgroundColor: 'rgba(0, 113, 188, 0.6)',
          fontFamily: 'Inter, sans-serif',
          fontSize: '18px',
          color: 'white',
          border: 'none',
          marginBottom: '8px'
        }}
      >
        <CCardHeader style={{ fontWeight: '500' }}>
          Dataset Information
        </CCardHeader>
        <CCardBody style={{ padding: '12px', paddingTop: '0px', paddingBottom: '0px' }}>
          <CTable responsive style={{
            borderRadius: '8px',
            overflow: 'hidden',
          }}>
            <CTableBody >
              <CTableRow>
                {/* CTableHeaderCell cho tên thuộc tính (cột trái), áp dụng font-weight 500 */}
                <CTableHeaderCell scope="row" style={{ fontWeight: '500' }}>Row:</CTableHeaderCell>
                {/* CTableDataCell cho giá trị (cột phải), dùng className text-end để căn phải */}
                <CTableDataCell className="text-end">{datasetInfo.row}</CTableDataCell>
              </CTableRow>
              <CTableRow>
                <CTableHeaderCell scope="row" style={{ fontWeight: '500' }}>Column:</CTableHeaderCell>
                <CTableDataCell className="text-end">{datasetInfo.column}</CTableDataCell>
              </CTableRow>
              <CTableRow>
                <CTableHeaderCell scope="row" style={{ fontWeight: '500' }}>Unique row:</CTableHeaderCell>
                <CTableDataCell className="text-end">{datasetInfo.uniqueRow}</CTableDataCell>
              </CTableRow>
              <CTableRow>
                <CTableHeaderCell scope="row" style={{ fontWeight: '500' }}>Missing values:</CTableHeaderCell>
                <CTableDataCell className="text-end">{datasetInfo.missingValues}</CTableDataCell>
              </CTableRow>
              <CTableRow>
                <CTableHeaderCell scope="row" style={{ fontWeight: '500' }}>Data types:</CTableHeaderCell>
                <CTableDataCell className="text-end">{datasetInfo.dataTypes}</CTableDataCell>
              </CTableRow>
            </CTableBody>
          </CTable>


          {/* Tiêu đề cho bảng Descriptive Statistics */}
          <h5 className="mb-3" style={{
            fontSize: '18px', fontWeight: '500', marginTop: '0px'
          }}>Descriptive Statistics</h5>
          {/* Bảng Descriptive Statistics */}
          <CTable striped bordered responsive style={{
            borderRadius: '8px', // Bo góc 8px
            overflow: 'hidden',
          }}>
            <CTableHead>
              <CTableRow>
                <CTableHeaderCell scope="col" style={{ fontWeight: '500' }}>Statistic</CTableHeaderCell>
                {Object.keys(descriptiveStatistics).map((colName) => (
                  <CTableHeaderCell key={colName} scope="col" style={{ fontWeight: '500' }}>{colName}</CTableHeaderCell>
                ))}
              </CTableRow>
            </CTableHead>
            <CTableBody>
              {['count', 'mean', 'std', 'min', '25%', '50%', '75%', 'max'].map((stat) => (
                <CTableRow key={stat}>
                  <CTableHeaderCell scope="row" style={{ fontWeight: '500' }}>{stat}</CTableHeaderCell>
                  {Object.values(descriptiveStatistics).map((colStats, index) => (
                    <CTableDataCell key={index}>{colStats[stat]?.toFixed(2) || '-'}</CTableDataCell>
                  ))}
                </CTableRow>
              ))}
            </CTableBody>
          </CTable>
        </CCardBody>
      </CCard>

      <CCard
        style={{
          borderRadius: '20px',
          backgroundColor: 'rgba(0, 113, 188, 0.6)',
          fontFamily: 'Inter, sans-serif',
          fontSize: '18px',
          color: 'white',
          border: 'none',
          height: '400px',
          overflow: 'hidden',
          marginTop: '0',
          marginBottom: '8px'
        }}
      >
        <CCardHeader style={{ fontWeight: '500' }}>Data Visualization</CCardHeader>
        <CCardBody
          style={{
            display: 'flex',
            gap: '8px',
            height: 'calc(100% - 56px)', // Trừ chiều cao của header
            overflow: 'hidden',
            padding: '12px',
            paddingTop: '0',

          }}
        >
          <div
            style={{
              flex: 1,
              backgroundColor: '#fff',
              borderRadius: '8px',
              padding: '8px',
              display: 'flex',
              flexDirection: 'column',
              overflow: 'hidden',
            }}
          >
            <h6 className="text-center" style={{ marginBottom: '4px', color: '#000' }}>
              Gender Distribution (%)
            </h6>
            <div style={{ flex: 1, position: 'relative' }}>
              <Pie
                data={genderData}
                options={{
                  maintainAspectRatio: false,
                  plugins: {
                    legend: {
                      position: 'bottom',
                    },
                  },
                }}
              />
            </div>
          </div>

          <div
            style={{
              flex: 1,
              backgroundColor: '#fff',
              borderRadius: '8px',
              padding: '8px',
              display: 'flex',
              flexDirection: 'column',
              overflow: 'hidden',
            }}
          >
            <h6 className="text-center" style={{ marginBottom: '4px', color: '#000' }}>
              Top 10 Popular Fields
            </h6>
            <div style={{ flex: 1, position: 'relative' }}>
              <Bar
                data={fieldsData}
                options={{
                  maintainAspectRatio: false,
                  plugins: {
                    legend: {
                      display: false,
                    },
                    tooltip: {
                      callbacks: {
                        label: function (context) {
                          return `${context.parsed.y} learners`;
                        },
                      },
                    },
                  },
                  scales: {
                    y: {
                      beginAtZero: true,
                      ticks: {
                        stepSize: 20,
                      },
                    },
                  },
                }}
              />
            </div>
          </div>
        </CCardBody>
      </CCard>


      {/* --- Khu vực chứa hai Card Evaluation --- */}
      {/* Sử dụng CRow để đặt hai Card cạnh nhau, gx="1" tạo khoảng cách ngang khoảng 8px */}
      <CRow gx="1">

        {/* --- Cột cho Card DIRECT EVALUATION --- */}
        <CCol xs="6" style={{paddingRight: '4px'}}> {/* Mỗi cột chiếm 50% chiều rộng */}
          <CCard
            style={{
              boxSizing: 'border-box',
              border: '1px solid #828282',
              boxShadow: '0px 4px 4px rgba(0, 0, 0, 0.25)',
              borderRadius: '16px',
              fontFamily: 'Inter, sans-serif',
              overflow: 'hidden', // Giữ cái này để bo góc container
              height: '800px', // <-- Set chiều cao cố định là 800px
              width: '100%',
              overflowY: 'auto', // <-- Thêm thanh cuộn dọc khi nội dung tràn
              // ------------------------------------------

            }}
          >
            <CCardHeader style={{ 
              fontSize: '18px', 
              fontWeight: 700, 
              color: "black", 
              textAlign: "center",
              }}>
              DIRECT EVALUATION
            </CCardHeader>

            <CCardBody style={{ padding: '15px 20px' }}> {/* Padding tổng thể cho body */}

              {/* Div 1: Metric Selectors (Buttons) và kết quả độ đo (%) */}
              <div
                style={{
                  display: 'flex',
                  flexDirection: 'column', // Xếp chồng các mục Completeness/Consistency
                  gap: '16px', // Khoảng cách giữa 2 mục
                  marginBottom: '20px', // Khoảng cách dưới khối này
                }}
              >
                {/* Mục Completeness */}
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center', // Căn giữa theo chiều dọc
                    gap: '15px', // Khoảng cách giữa label/button và thanh progress
                  }}
                >
                  {/* Button/Label Completeness */}
                  {/* Button Completeness - THAY THẾ THẺ DIV CLICKABLE TRƯỚC */}
                  <CButton
                    onClick={() => setSelectedMetric('completeness')}
                    style={{
                      // Style cho Button
                      backgroundColor: '#FC842F', // Màu cam từ Figma chấm tròn
                      color: '#000000', // Màu chữ đen từ Figma label text
                      border: 'none', // Bỏ viền mặc định của button
                      opacity: selectedMetric === 'completeness' ? 1 : 0.7, // Opacity theo trạng thái chọn
                      transition: 'opacity 0.3s ease', // Hiệu ứng chuyển đổi
                      cursor: 'pointer', // Hiển thị con trỏ click
                      // Font style từ Figma label text
                      fontWeight: 500,
                      fontSize: '16px',
                      lineHeight: '150%',
                      padding: '5px 10px', // Điều chỉnh padding cho cảm giác nút
                      borderRadius: '5px', // Bo góc cho nút
                      // Style flex để căn chỉnh với các cột kết quả bên cạnh (như bước trước)
                      flex: '0 0 160px', // Ví dụ flex-basis (có thể điều chỉnh)
                      // width: '160px', // Hoặc dùng width cố định
                      display: 'flex', // Dùng flex bên trong button để căn chỉnh text
                      alignItems: 'center', // Căn giữa text theo chiều dọc trong button
                      justifyContent: 'center', // Căn giữa text theo chiều ngang trong button (hoặc 'flex-start')
                    }}
                  >
                    {/* Bỏ chấm tròn */}
                    Completeness: {/* Text nằm trong nút */}
                  </CButton>
                  {/* Kết quả % và Thanh Progress cho Completeness */}
                  <div style={{ flexGrow: 1, display: 'flex', alignItems: 'center', gap: '8px' }}>
                    {/* Giá trị % (từ Figma "100%" Button) */}
                    <span
                      style={{
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        padding: '0px 8px',
                        fontWeight: 500,
                        fontSize: '16px',
                        lineHeight: '150%',
                        color: '#FFFFFF',
                        backgroundColor: getProgressColor(completenessData.overallPassRate), // Màu động
                        borderRadius: '8px',
                        flexShrink: 0,
                        minWidth: '50px', // Đảm bảo đủ chỗ cho 100%
                      }}
                    >
                      {completenessData.overallPassRate}%
                    </span>
                    {/* Thanh Progress */}
                    <div style={{ flexGrow: 1, height: '8px', backgroundColor: '#E0E0E0', borderRadius: '4px' }}>
                      <div
                        style={{
                          width: `${completenessData.overallPassRate}%`,
                          height: '100%',
                          backgroundColor: getProgressColor(completenessData.overallPassRate), // Màu động
                          borderRadius: '4px',
                        }}
                      ></div>
                    </div>
                  </div>
                </div>

                {/* Mục Consistency (Tương tự Completeness) */}
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '15px',
                  }}
                >
                  {/* Button Consistency - THAY THẾ THẺ DIV CLICKABLE TRƯỚC */}
                  <CButton
                    onClick={() => setSelectedMetric('consistency')}
                    style={{
                      // Style cho Button (Tương tự nút Completeness)
                      backgroundColor: '#FC842F', // Màu cam
                      color: '#000000', // Màu chữ đen
                      border: 'none',
                      opacity: selectedMetric === 'consistency' ? 1 : 0.7, // Opacity theo trạng thái chọn
                      transition: 'opacity 0.3s ease',
                      cursor: 'pointer',
                      fontWeight: 500,
                      fontSize: '16px',
                      lineHeight: '150%',
                      padding: '5px 10px',
                      borderRadius: '5px',
                      flex: '0 0 160px', // Phải giống với nút Completeness để thẳng hàng
                      // width: '160px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center', // Hoặc 'flex-start'
                    }}
                  >
                    {/* Bỏ chấm tròn */}
                    Consistency: {/* Text nằm trong nút */}
                  </CButton>
                  {/* Kết quả % và Thanh Progress cho Consistency */}
                  <div style={{ flexGrow: 1, display: 'flex', alignItems: 'center', gap: '8px' }}>
                    {/* Giá trị % */}
                    <span
                      style={{
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        padding: '0px 8px',
                        fontWeight: 500,
                        fontSize: '16px',
                        lineHeight: '150%',
                        color: '#FFFFFF',
                        backgroundColor: getProgressColor(consistencyData.overallPassRate), // Màu động
                        borderRadius: '8px',
                        flexShrink: 0,
                        minWidth: '50px',
                      }}
                    >
                      {consistencyData.overallPassRate}%
                    </span>
                    {/* Thanh Progress */}
                    <div style={{ flexGrow: 1, height: '8px', backgroundColor: '#E0E0E0', borderRadius: '4px' }}>
                      <div
                        style={{
                          width: `${consistencyData.overallPassRate}%`,
                          height: '100%',
                          backgroundColor: getProgressColor(consistencyData.overallPassRate), // Màu động
                          borderRadius: '4px',
                        }}
                      ></div>
                    </div>
                  </div>
                </div>

              </div> {/* End Div 1 */}

              {/* Div 2: Definition Box */}
              <div
                style={{
                  backgroundColor: 'rgba(0, 113, 188, 0.5)', // Từ Figma Rectangle 14
                  borderRadius: '8px', // Từ Figma Rectangle 14
                  padding: '15px', // Padding bên trong hộp
                  marginBottom: '20px', // Khoảng cách dưới hộp Definition
                }}
              >
                <h3
                  style={{
                    fontSize: '20px', // Từ Figma "Definition"
                    fontWeight: 600,
                    lineHeight: '150%',
                    color: '#000000',
                    textAlign: 'center',
                    margin: '0 0 10px 0',
                  }}
                >
                  {currentData.definition.title}
                </h3>
                {/* Hiển thị nội dung definition dựa trên metric */}
                {/* Hiển thị nội dung definition dựa trên metric */}
                {selectedMetric === 'completeness' ? (
                  // Nội dung cho Completeness (như cũ)
                  <> {/* Sử dụng Fragment để nhóm các elements */}
                    <p
                      style={{
                        fontSize: '18px',
                        fontWeight: 400,
                        lineHeight: '150%',
                        color: '#000000',
                        margin: '0 0 10px 0',
                      }}
                    >
                      <strong style={{ fontWeight: 600 }}>{currentData.definition.text.completeness.term}</strong> {currentData.definition.text.completeness.definition}
                    </p>
                    <p
                      style={{
                        fontSize: '18px',
                        fontWeight: 400,
                        lineHeight: '150%',
                        color: '#000000',
                        margin: 0,
                      }}
                    >
                      <strong style={{ fontWeight: 600 }}>{currentData.definition.text.approach.term}</strong> {currentData.definition.text.approach.definition}
                    </p>
                  </>
                ) : (
                  // Nội dung cho Consistency (cấu trúc mới với list)
                  <div>
                    <p
                      style={{
                        fontSize: '18px',
                        fontWeight: 400,
                        lineHeight: '150%',
                        color: '#000000',
                        margin: '0 0 10px 0',
                      }}
                    >
                      {/* Sử dụng dangerouslySetInnerHTML để render HTML string */}
                      <span dangerouslySetInnerHTML={{ __html: currentData.definition.text.intro }}></span>
                    </p>
                    <p
                      style={{ // Style cho tiêu đề phụ "Basic Validity Checks:"
                        fontSize: '18px',
                        fontWeight: 600, // Tiêu đề thường đậm hơn nội dung
                        lineHeight: '150%',
                        color: '#000000',
                        margin: '0 0 8px 0', // Khoảng cách dưới tiêu đề list
                      }}
                    >
                      {currentData.definition.text.heading}
                    </p>
                    <ul
                      style={{ // Style cho danh sách (bỏ default style)
                        listStyle: 'none',
                        padding: '0 0 0 20px', // Thêm padding trái để list hơi thụt vào
                        margin: 0,
                      }}
                    >
                      {currentData.definition.text.criteria.map((item, index) => (
                        <li
                          key={index} // Key cho mỗi mục list
                          style={{ // Style cho mỗi mục list item
                            fontSize: '18px', // Kích thước font giống nội dung
                            fontWeight: 400,
                            lineHeight: '150%',
                            color: '#000000',
                            marginBottom: '5px', // Khoảng cách giữa các mục list
                          }}
                        >
                          {/* Tên tiêu chí in nghiêng */}
                          <em style={{ fontStyle: 'italic', fontWeight: 600 }}>{item.name}</em>: {item.description}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div> {/* End Div 2 */}

              {/* Đường phân cách */}
              <div
                style={{
                  borderTop: '2px dashed #828282', // Từ Figma
                  margin: '20px 0', // Khoảng cách trên dưới
                }}
              ></div>

              {/* Div 3: Results Section */}
              <div> {/* Container cho Results và Error Log */}
                <h3
                  style={{
                    fontSize: '20px', // Từ Figma "Results"
                    fontWeight: 600,
                    lineHeight: '150%',
                    color: '#000000',
                    textAlign: 'center',
                    margin: '0 0 20px 0',
                  }}
                >
                  Results
                </h3>

                {/* Div nhỏ 1: Pass Rate(s) */}
                <div style={{ marginBottom: '20px' }}> {/* Khoảng cách dưới phần Pass Rate */}
                  {selectedMetric === 'completeness' ? (
                    // Hiển thị Pass Rate cho Completeness (chỉ 1 dòng tổng)
                    <div
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '15px',
                      }}
                    >
                      <span
                        style={{
                          fontSize: '18px', // Từ Figma "Pass Rate:"
                          fontWeight: 600,
                          lineHeight: '150%',
                          color: '#000000',
                          minWidth: '120px', // Đảm bảo đủ chỗ
                        }}
                      >
                        Pass Rate:
                      </span>
                      <span
                        style={{
                          display: 'flex',
                          justifyContent: 'center',
                          alignItems: 'center',
                          padding: '0px 8px',
                          fontWeight: 500,
                          fontSize: '16px',
                          lineHeight: '150%',
                          color: '#FFFFFF',
                          backgroundColor: getProgressColor(currentData.overallPassRate), // Màu động
                          borderRadius: '8px',
                          flexShrink: 0,
                          minWidth: '50px',
                        }}
                      >
                        {currentData.overallPassRate}%
                      </span>
                      {/* Thanh Progress */}
                      <div style={{ flexGrow: 1, height: '8px', backgroundColor: '#E0E0E0', borderRadius: '4px' }}>
                        <div
                          style={{
                            width: `${currentData.overallPassRate}%`,
                            height: '100%',
                            backgroundColor: getProgressColor(currentData.overallPassRate), // Màu động
                            borderRadius: '4px',
                          }}
                        ></div>
                      </div>
                    </div>
                  ) : (
                    // Hiển thị Pass Rate cho Consistency (tổng và từng tiêu chí)
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}> {/* Xếp chồng các dòng pass rate */}
                      {/* Dòng tổng Pass Rate */}
                      <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
                        <span
                          style={{
                            fontSize: '18px',
                            fontWeight: 600,
                            lineHeight: '150%',
                            color: '#000000',
                            minWidth: '120px',
                          }}
                        >
                          Total Pass Rate:
                        </span>
                        <span
                          style={{
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                            padding: '0px 8px',
                            fontWeight: 500,
                            fontSize: '16px',
                            lineHeight: '150%',
                            color: '#FFFFFF',
                            backgroundColor: getProgressColor(currentData.overallPassRate),
                            borderRadius: '8px',
                            flexShrink: 0,
                            minWidth: '50px',
                          }}
                        >
                          {currentData.overallPassRate}%
                        </span>
                        {/* Thanh Progress */}
                        <div style={{ flexGrow: 1, height: '8px', backgroundColor: '#E0E0E0', borderRadius: '4px' }}>
                          <div
                            style={{
                              width: `${currentData.overallPassRate}%`,
                              height: '100%',
                              backgroundColor: getProgressColor(currentData.overallPassRate),
                              borderRadius: '4px',
                            }}
                          ></div>
                        </div>
                      </div>
                      {/* Các dòng Pass Rate theo tiêu chí */}
                      {currentData.criterionPassRates.map((criterion, index) => (
                        <div
                          key={criterion.name}
                          style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: '15px', // Khoảng cách giữa các cột
                            paddingTop: '10px',
                            borderTop: '1px solid #E0E0E0',
                          }}
                        >
                          {/* Tên tiêu chí - CHỈNH SỬA STYLE NÀY */}
                          <span
                            style={{
                              fontSize: '16px',
                              fontWeight: 500,
                              lineHeight: '150%',
                              color: '#000000',
                              // Thay minWidth bằng flex-basis hoặc width cố định
                              flex: '0 0 140px', // Không co, không giãn, kích thước cơ sở 140px (ví dụ)
                              // width: '140px', // Cách khác dùng width cố định
                              // Bỏ minWidth: '120px',
                            }}
                          >
                            {criterion.name}
                          </span>
                          {/* Giá trị % - CHỈNH SỬA STYLE NÀY */}
                          <span
                            style={{
                              display: 'flex',
                              justifyContent: 'center', // Căn giữa nội dung bên trong ô %
                              alignItems: 'center',
                              padding: '0px 8px',
                              fontWeight: 500,
                              fontSize: '16px',
                              lineHeight: '150%',
                              color: '#FFFFFF',
                              backgroundColor: getProgressColor(criterion.passRate),
                              borderRadius: '8px',
                              // Thay flexShrink và minWidth bằng flex-basis hoặc width cố định
                              flex: '0 0 60px', // Không co, không giãn, kích thước cơ sở 60px (ví dụ)
                              // width: '60px', // Cách khác dùng width cố định
                              // Bỏ flexShrink: 0, minWidth: '50px',
                            }}
                          >
                            {criterion.passRate}%
                          </span>
                          {/* Thanh Progress - GIỮ flexGrow hoặc dùng flex: '1 1 auto' */}
                          <div style={{ flexGrow: 1, height: '8px', backgroundColor: '#E0E0E0', borderRadius: '4px' }}>
                            <div
                              style={{
                                width: `${criterion.passRate}%`,
                                height: '100%',
                                backgroundColor: getProgressColor(criterion.passRate),
                                borderRadius: '4px',
                              }}
                            ></div>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div> {/* End Div nhỏ 1: Pass Rate(s) */}

                {/* Div nhỏ 2: Error Log */}
                <div>
                  <h4
                    style={{
                      fontSize: '18px', // Từ Figma "Error Log:"
                      fontWeight: 600,
                      lineHeight: '150%',
                      color: '#000000',
                      margin: '0 0 10px 0',
                    }}
                  >
                    Error Log:
                  </h4>

                  <ul
                    style={{
                      listStyle: 'none',
                      padding: 0,
                      margin: 0,
                    }}
                  >
                    {currentData.errorLog.length > 0 ? (
                      currentData.errorLog.map((error, index) => (
                        <li
                          key={index}
                          style={{
                            // Style cho mỗi dòng lỗi (từ style "Task" trong Figma)
                            boxSizing: 'border-box',
                            display: 'flex', // Dùng flex để căn chỉnh nội dung
                            alignItems: 'center',
                            padding: '10px 0', // Thêm padding trên dưới
                            borderTop: index !== 0 ? '1px solid #E0E0E0' : 'none', // Border trên trừ dòng đầu
                            fontSize: '16px', // Từ Figma text lỗi
                            fontWeight: 400,
                            lineHeight: '150%',
                            color: '#000000',
                          }}
                        >
                          {error}
                        </li>
                      ))
                    ) : (
                      <li style={{ fontSize: '16px', fontWeight: 400, lineHeight: '150%', color: '#555', padding: '10px 0' }}>
                        No errors found for this metric.
                      </li>
                    )}
                  </ul>
                </div> {/* End Div nhỏ 2: Error Log */}

              </div> {/* End Div 3 */}

            </CCardBody>
          </CCard>
        </CCol>

        {/* --- Cột cho Card INDIRECT EVALUATION --- */}
        <CCol xs="6" style={{paddingLeft: '4px'}}> {/* Mỗi cột chiếm 50% chiều rộng */}
          <CCard style={{ boxShadow: '0px 4px 4px rgba(0, 0, 0, 0.25)', fontFamily: 'Inter', width: '100%', height: 800, backgroundColor: "#fff", border: '1px solid #828282', borderRadius: '16px' }}>
            <CCardHeader style={{ fontSize: '18px', fontWeight: 700, color: "black", textAlign: "center" }}>
              INDIRECT EVALUATION
            </CCardHeader>
            <CCardBody style={{ display: "flex", flexDirection: "column", gap: 12, alignItems: "center", padding: '12px' }}>
              {/* Reliability Chart */}
              <div
                style={{
                  width: '98%',
                  height: '50%',
                  margin: '0 auto',
                  backgroundColor: "rgba(0, 113, 188, 0.6)",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                  boxShadow: "0 0 4px rgba(0,0,0,0.1)",
                  // marginBottom: '20px',
                  borderRadius: '8px',
                  padding: '6px',
                }}
              >
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 8 }}>
                  <span style={{ fontSize: 18, fontWeight: 500 }}>Reliability:</span>
                  <MetricSwitch current={reliabilityMetric} onChange={setReliabilityMetric} />
                </div>
                <Bar data={reliabilityData[reliabilityMetric]} options={chartOptions} style={{ width: '100%', height: '98%', margin: '0 auto', borderRadius: '8px', backgroundColor: "white", }} />
              </div>

              {/* Relevance Chart */}
              <div
                style={{
                  width: '98%',
                  height: '50%',
                  margin: '0 auto',
                  backgroundColor: "rgba(0, 113, 188, 0.6)",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                  boxShadow: "0 0 4px rgba(0,0,0,0.1)",
                  padding: '6px',
                  borderRadius: '8px',
                  // marginTop: '20px',
                }}
              >
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 8 }}>
                  <span style={{ fontSize: 18, fontWeight: 500 }}>Relevance:</span>
                  <MetricSwitch current={relevanceMetric} onChange={setRelevanceMetric} />
                </div>
                <Bar data={relevanceData[relevanceMetric]} options={chartOptions} style={{ width: '100%', height: '98%', margin: '0 auto', borderRadius: '8px', backgroundColor: "white", }} />
              </div>
            </CCardBody>
          </CCard>
        </CCol>

      </CRow> {/* --- Đóng CRow chứa hai Card Evaluation --- */}

    </div>
  );
};

export default PersonalizedLearning;