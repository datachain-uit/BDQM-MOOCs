import React from "react";
import AppSidebar from "./components/AppSidebar";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Overview from "./pages/Overview";
import './App.css'
import { color } from "chart.js/helpers";

// function App() {
//  return (
//    <Router>
//      <div className="flex h-screen">
//       <AppSidebar />
//        <div className="flex-1 overflow-auto p-4">
//          <Routes>
//           <Route path="/" element={<Overview />} />
//          </Routes>
//        </div>
//      </div>
//    </Router>
//  );
// }
// function App() {
//   const dummyFiles = [ /* ... */ ]

//   return (
//     <AppLayout>
//       <FileTable datasetFiles={dummyFiles} />
//     </AppLayout>
//   )
// }
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
            <Route path="/" element={<Overview />} />
            {/* Các Route khác có thể thêm vào đây */}
          </Routes>
        </div>
      </div>
    </Router>
  );
};
export default App;
