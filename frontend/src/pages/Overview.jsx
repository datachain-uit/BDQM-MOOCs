import React from "react";
import FileTable from "../components/FileTable";
import FileDetails from "../components/FileDetails";
import DataChart from "../components/DataChart";
import Header from "../components/Header";
import SearchBar from "../components/Search";
// import "./Overview.css"; 
import "../styles/Overview.css"

const Overview = () => {
  const datasetFiles = [
    { file: "website.net", missing: "84%", rows: 4321, cols: 13, duplicates: 13 },
    { file: "website.net", missing: "8%", rows: 4033, cols: 16, duplicates: 14 },
    { file: "website.net", missing: "8%", rows: 3128, cols: 8, duplicates: 8 },
    { file: "website.net", missing: "8%", rows: 2104, cols: 7, duplicates: 7 },
    { file: "website.net", missing: "8%", rows: 2003, cols: 10, duplicates: 10 },
    { file: "website.net", missing: "8%", rows: 1894, cols: 11, duplicates: 11 },
    { file: "website.net", missing: "8%", rows: 405, cols: 9, duplicates: 9 },
    { file: "website.net", missing: "84%", rows: 4321, cols: 13, duplicates: 13 },
    { file: "website.net", missing: "8%", rows: 4033, cols: 16, duplicates: 14 },
    { file: "website.net", missing: "8%", rows: 3128, cols: 8, duplicates: 8 },
    { file: "website.net", missing: "8%", rows: 2104, cols: 7, duplicates: 7 },
    { file: "website.net", missing: "8%", rows: 2003, cols: 10, duplicates: 10 },
    { file: "website.net", missing: "8%", rows: 1894, cols: 11, duplicates: 11 },
    { file: "website.net", missing: "8%", rows: 405, cols: 9, duplicates: 9 },
  ];

  const detailData = [
    ["Rows", 13],
    ["Columns", 16],
    ["Duplications", 8],
    ["Label", 7],
    ["Missing values", 10],
    ["Datatype", "float, int, category, datetime"],
    ["Descriptive Statistics", "N/A"],
  ];

  const chartData = {
    labels: Array(13).fill(null).map((_, i) => `Cột ${i + 1}`),
    datasets: [
      {
        label: "Missing values",
        data: [60, 65, 65, 70, 80, 90, 95, 85, 70, 65, 60, 55, 5],
        backgroundColor: "rgba(54, 162, 235, 0.6)",
        borderRadius: 5,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: { display: false },
    },
    scales: {
      y: {
        ticks: { color: "#1e3a8a" },
      },
      x: {
        ticks: { color: "#1e3a8a" },
      },
    },
  };

  return (
    <div className="content">
      <div className="header-container">
          <Header/>
      </div>
      <div className="main-content-container">
        <div className="file-summary-container">
          <div className="title-file-summary">
            <h2 className="text-file-summary">FILE SUMMARY</h2>
            <input
              type="search"
              placeholder="Search..."
              className="search-input"
            />
          </div>
          <div className="table-dataset">
          <FileTable datasetFiles={datasetFiles} />
          </div>
          
        </div>

        {/* Detail Section */}
        <div className="file-details-container">
          <div className = 'detail-dataset'>
            <div className="title-detail-dataset">
            <h2 className="title-text-dataset">DETAIL OF FILE_NAME</h2>
            </div>
            
            <FileDetails detailData={detailData} />
          </div>
          
          <div className='missing-values'>
          <h3 className="title-chart-text">
            DATA VISUALIZATION CHART
          </h3>
          <div className="chart-container">
            <DataChart chartData={chartData} chartOptions={chartOptions} />
          </div>
          </div>
        </div>
    </div>

    </div>
  );
};

export default Overview;
