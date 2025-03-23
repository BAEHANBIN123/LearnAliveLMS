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
import NoticeDetail from "./pages/NoticeDetail";  // 공지사항 상세 페이지
import MyPage from "./pages/MyPage";
import MyProfile from "./components/MyProfile";
import MyPost from "./components/MyPost";
import MyPostDetail from "./components/MyPostDetail";
import MyAttendance from "./components/MyAttendance";
import RegisterStudent from "./components/RegisterStudent";
import AdminUniversityDepartmentManagement from "./components/AdminUniversityDepartmentManagement";

function TitleUpdater() {
  const location = useLocation();

  useEffect(() => {
    // 기본 경로에 따른 타이틀 설정 및 동적 경로 처리
    switch (location.pathname) {
      case "/":
        document.title = "[고려대학교] 출결관리 시스템";
        break;
      case "/register":
        document.title = "[고려대학교] 회원가입";
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
      case "/mypage":
        document.title = "[고려대학교] 마이페이지";
        break;
      case "/mypage/myprofile":
        document.title = "[고려대학교] 회원 정보";
        break;
      default:
        // /notice/:notice_id 같은 동적 경로 처리
        if (location.pathname.startsWith("/notice/")) {
          document.title = "[고려대학교] 공지사항 상세 보기";
        } else {
          document.title = "[고려대학교] 출결관리 시스템";
        }
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
              {/* 학생 회원가입 페이지 */}
              <Route path="/register" element={<RegisterStudent />} />
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
              <Route path="/notice/:notice_id" element={<NoticeDetail />} />
              <Route path="/mypage" element={<MyPage />}>
                <Route path="/mypage/myprofile" element={<MyProfile />} />
                <Route path="/mypage/mypost" element={<MyPost />} />
                <Route path="/mypage/post/:postId" element={<MyPostDetail />} />
                <Route path="/mypage/myattendance" element={<MyAttendance />} />
              </Route>
              {/* admin 전용 대학/학과 관리 페이지 */}
              <Route path="/admin/university" element={<AdminUniversityDepartmentManagement />} />
            </Routes>
          </div>
        </main>
        <Footer />
      </Router>
    </AuthProvider>
  );
}

export default App;
