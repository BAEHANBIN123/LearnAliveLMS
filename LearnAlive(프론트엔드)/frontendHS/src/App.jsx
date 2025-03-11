// import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
// import { useEffect } from "react";
// import { AuthProvider } from "./context/AuthContext";  
// import Header from "./components/Header";
// import Footer from "./components/Footer";
// import Dashboard from "./components/Dashboard";  // ✅ 대시보드 추가
// import AttendancePage from "./pages/AttendancePage";
// import ManageAttendancePage from "./pages/ManageAttendancePage";
// import ClassSettings from "./pages/ClassSettings"; 
// import SurveyList from "./pages/SurveyList";
// import SurveyCreate from "./components/SurveyCreate";
// import SurveyDetail from "./components/SurveyDetail";
// import BoardPage from "./pages/BoardPage";
// import AddPostPage from "./components/AddPostPage";

// function TitleUpdater() {
//   const location = useLocation();

//   useEffect(() => {
//     switch (location.pathname) {
//       case "/":
//         document.title = "[고려대학교] 출결관리 시스템";
//         break;
//       case "/classroom/:classId":
//         document.title = "[고려대학교] 강의실 상세보기";
//         break;
//       case "/classroom/:classId/attendance":
//         document.title = "[고려대학교] 출석하기";
//         break;
//       case "/classroom/:classId/manage-attendance":
//         document.title = "[고려대학교] 출결 관리 페이지";
//         break;
//       case "/classroom/:classId/settings":
//         document.title = "[고려대학교] 강의실 설정";
//         break;
//       default:
//         document.title = "[고려대학교] 출결관리 시스템";
//     }
//   }, [location]);

//   return null;
// }

// function App() {
//   return (
//     <AuthProvider>
//       <Router>
//         <TitleUpdater />
//         <Header />
//         <main className="main-container">
//           <div className="content-container">
//             <Routes>
//               <Route path="/" element={<Dashboard />} /> {/* 대시보드로 변경 */}
//               <Route path="/classroom/:classId/attendance" element={<AttendancePage />} />
//               <Route path="/classroom/:classId/manage-attendance" element={<ManageAttendancePage />} />
//               <Route path="/classroom/:classId/surveys" element={<SurveyList />} />
//               <Route path="/survey/create" element={<SurveyCreate />} />
//               <Route path="/survey/:surveyId" element={<SurveyDetail />} />
//               <Route path="/classroom/:classId/boards" element={<BoardPage />} />
//               <Route path="/classroom/:classId/boards/addpost/:boardId" element={<AddPostPage />} />
//               <Route path="/classroom/:classId/settings" element={<ClassSettings />} />
//             </Routes>
//           </div>
//         </main>
//         <Footer />
//       </Router>
//     </AuthProvider>
//   );
// }

// export default App;


import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import { useEffect } from "react";
import { AuthProvider } from "./context/AuthContext";  
import Header from "./components/Header";
import Footer from "./components/Footer";
import Dashboard from "./components/Dashboard";  // ✅ 대시보드 추가
import AttendancePage from "./pages/AttendancePage";
import ManageAttendancePage from "./pages/ManageAttendancePage";
import ClassSettings from "./pages/ClassSettings"; 
import SurveyList from "./pages/SurveyList";
import SurveyCreate from "./components/SurveyCreate";
import SurveyDetail from "./components/SurveyDetail";
import BoardPage from "./pages/BoardPage";
import AddPostPage from "./components/AddPostPage";
import ProfessorStatus from "./pages/ProfessorStatus";  // 추가된 컴포넌트

function TitleUpdater() {
  const location = useLocation();

  useEffect(() => {
    switch (location.pathname) {
      case "/":
        document.title = "[고려대학교] 출결관리 시스템";
        break;
      case "/classroom/:classId":
        document.title = "[고려대학교] 강의실 상세보기";
        break;
      case "/classroom/:classId/attendance":
        document.title = "[고려대학교] 출석하기";
        break;
      case "/classroom/:classId/manage-attendance":
        document.title = "[고려대학교] 출결 관리 페이지";
        break;
      case "/classroom/:classId/settings":
        document.title = "[고려대학교] 강의실 설정";
        break;
      default:
        document.title = "[고려대학교] 출결관리 시스템";
    }
  }, [location]);

  return null;
}

function App() {
  return (
    <AuthProvider>
      <Router>
        <TitleUpdater />
        <Header />
        <main className="main-container">
          <div className="content-container">
            <Routes>
              <Route path="/" element={<Dashboard />} /> {/* 대시보드로 변경 */}
              <Route path="/classroom/:classId/attendance" element={<AttendancePage />} />
              <Route path="/classroom/:classId/manage-attendance" element={<ManageAttendancePage />} />
              <Route path="/classroom/:classId/surveys" element={<SurveyList />} />
              <Route path="/survey/create" element={<SurveyCreate />} />
              <Route path="/survey/:surveyId" element={<SurveyDetail />} />
              <Route path="/classroom/:classId/boards" element={<BoardPage />} />
              <Route path="/classroom/:classId/boards/addpost/:boardId" element={<AddPostPage />} />
              <Route path="/classroom/:classId/settings" element={<ClassSettings />} />
              <Route path="/admin/professors" element={<ProfessorStatus />} />  {/* 추가된 경로 */}
            </Routes>
          </div>
        </main>
        <Footer />
      </Router>
    </AuthProvider>
  );
}

export default App;
