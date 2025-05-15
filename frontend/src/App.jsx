import React from "react";
import AppSidebar from "./components/AppSidebar";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Overview from "./pages/Overview";
import './App.css'
import Education from "./pages/Education";
import { color } from "chart.js/helpers";
import PersonalizedLearning from './pages/PersonalizedLearning';

const App = () => {
  return (
    <Router>
      <div className="flex h-screen">
        {/* Sidebar */}
        <div
          style={{
            position: 'fixed',
            backgroundColor: '#C3DBED',
            top: 0,
            left: 0,
            width: '255px', // Đảm bảo sidebar có chiều rộng cố định
            height: '100vh', // Chiều cao 100% của màn hình
            zIndex: 1000, // Để sidebar luôn ở trên
          }}
        >
          <AppSidebar />
        </div>

        {/* Main content */}
        <div
          style={{
            marginLeft: '250px', // Đẩy nội dung ra ngoài khi sidebar có sẵn
            transition: 'margin-left 0.3s ease', // Thêm hiệu ứng khi sidebar mở/đóng
            flex: 1,
            paddingTop: 0, // Đảm bảo không bị che chắn bởi header
            paddingLeft: '10px',
            paddingRight: '10px',
            paddingBottom: '10px',
          }}
        >
          <Routes>
            <Route path="/" element={<Overview/>} />
            <Route path="/education" element={<Education />} />
            <Route path="/learning" element={<PersonalizedLearning />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
};
export default App;
