import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import { useEffect } from "react";
import { AuthProvider } from "./context/AuthContext";  
import Header from "./components/Header";
import Footer from "./components/Footer";
import Dashboard from "./components/Dashboard";  
import AttendancePage from "./pages/AttendancePage";
import ManageAttendancePage from "./pages/ManageAttendancePage";
import ClassSettings from "./pages/ClassSettings"; 
import SurveyList from "./pages/SurveyList";
import SurveyCreate from "./components/SurveyCreate";
import SurveyDetail from "./components/SurveyDetail";
import BoardPage from "./pages/BoardPage";
import AddPostPage from "./components/AddPostPage";
import ProfessorStatus from "./pages/ProfessorStatus";  
import ManageNotice from "./pages/ManageNotice";  
import NoticeDetail from "./pages/NoticeDetail";  // ✅ 공지사항 상세 페이지 추가
import MyPage from "./pages/MyPage";
import MyProfile from "./components/MyProfile";

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
      case "/survey/create":
        document.title = "[고려대학교] 설문 생성";
        break;
      case "/survey/:surveyId":
        document.title = "[고려대학교] 설문 상세 보기";
        break;
      case "/classroom/:classId/boards":
        document.title = "[고려대학교] 게시판";
        break;
      case "/admin/professors":
        document.title = "[고려대학교] 교수 관리";
        break;
      case "/notice/manage":
        document.title = "[고려대학교] 공지사항 관리";
        break;
        case location.pathname.startsWith("/notice/"):  // /notice/:noticeId 패턴에 맞는 경로
        document.title = "[고려대학교] 공지사항 상세 보기";
        break;
      case "/mypage":
        document.title = "[고려대학교] 마이페이지";
        break;
      case "/mypage/myprofile":
        document.title = "[고려대학교] 회원 정보";
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
              <Route path="/" element={<Dashboard />} />
              <Route path="/classroom/:classId/attendance" element={<AttendancePage />} />
              <Route path="/classroom/:classId/manage-attendance" element={<ManageAttendancePage />} />
              <Route path="/classroom/:classId/surveys" element={<SurveyList />} />
              <Route path="/survey/create" element={<SurveyCreate />} />
              <Route path="/survey/:surveyId" element={<SurveyDetail />} />
              <Route path="/classroom/:classId/boards" element={<BoardPage />} />
              <Route path="/classroom/:classId/boards/addpost/:boardId" element={<AddPostPage />} />
              <Route path="/classroom/:classId/settings" element={<ClassSettings />} />
              <Route path="/admin/professors" element={<ProfessorStatus />} />
              <Route path="/notice/manage" element={<ManageNotice />} />
              <Route path="/notice/:notice_id" element={<NoticeDetail />} />  {/* 공지사항 상세 페이지 경로 추가 */}
              <Route path="/mypage" element={<MyPage />}>
                <Route path="/mypage/myprofile" element={<MyProfile />} />
              </Route>
            </Routes>
          </div>
        </main>
        <Footer />
      </Router>
    </AuthProvider>
  );
}

export default App;
