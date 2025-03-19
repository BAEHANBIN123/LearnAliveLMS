// import { useState, useEffect } from "react";
// import { useAuth } from "../context/AuthContext";
// import { useNavigate } from "react-router-dom";
// import FindAccountModal from "./FindAccountModal";
// import "../styles/Header.css";

// const Header = () => {
//   const { user, login, logout } = useAuth();
//   const [userId, setUserId] = useState("");
//   const [password, setPassword] = useState("");
//   const [isModalOpen, setIsModalOpen] = useState(false);
//   const navigate = useNavigate();

//   useEffect(() => {
//     console.log("현재 로그인한 사용자:", user);
//   }, [user]);

//   const handleLogin = (e) => {
//     e.preventDefault();
//     if (!userId || !password) {
//       alert("아이디와 비밀번호를 입력하세요.");
//       return;
//     }
//     login(userId, password);
//   };

//   const handleLogout = () => {
//     logout();
//     navigate("/");
//     setUserId(""); // ✅ 아이디 입력 필드 초기화
//   setPassword(""); // ✅ 비밀번호 입력 필드 초기화
//   };

//   return (
//     <header>
//       {user ? (
//         // 로그인 후 화면: 모든 버튼이 같은 부모(.user-info)의 형제 요소로 배치됨
//         <div className="user-info">
//           <button className="home-button" onClick={() => navigate("/")}>🏠 홈</button>
//           <span className="user-message">
//             환영합니다, {user.username || user.userId} 님! ({user.role})
//           </span>
//           {user.role.toLowerCase() === "admin" && (
//             <button className="admin-btn" onClick={() => navigate("/admin/professors")}>
//               교수자 관리
//             </button>
//           )}
//           <button className="logout-btn" onClick={handleLogout}>로그아웃</button>
//           <button className="mypage-btn" onClick={() => navigate("/mypage")}>마이페이지</button>
//         </div>
//       ) : (
//         // 로그인 전 화면: 로그인 폼과 회원정보 찾기 버튼이 같은 부모(.login-container)의 형제 요소로 배치됨
//         <div className="login-container">
//           <form onSubmit={handleLogin} className="login-form">
//             <input
//               type="text"
//               placeholder="아이디"
//               value={userId}
//               onChange={(e) => setUserId(e.target.value)}
//             />
//             <input
//               type="password"
//               placeholder="비밀번호"
//               value={password}
//               onChange={(e) => setPassword(e.target.value)}
//             />
//             <button type="submit" className="login-button">로그인</button>
//           </form>
//           <button 
//             type="button"
//             className="find-account-btn"
//             onClick={() => setIsModalOpen(true)}
//           >
//             회원정보 찾기
//           </button>
//         </div>
//       )}

//       {isModalOpen && <FindAccountModal onClose={() => setIsModalOpen(false)} />}
//     </header>
//   );
// };

// export default Header;

import { useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import FindAccountModal from "./FindAccountModal";
import "../styles/Header.css";

const Header = () => {
  const { user, login, logout } = useAuth();
  const [userId, setUserId] = useState("");
  const [password, setPassword] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    console.log("현재 로그인한 사용자:", user);
  }, [user]);

  const handleLogin = (e) => {
    e.preventDefault();
    if (!userId || !password) {
      alert("아이디와 비밀번호를 입력하세요.");
      return;
    }
    login(userId, password);
  };

  const handleLogout = () => {
    logout();
    navigate("/");
    setUserId(""); // 아이디 입력 필드 초기화
    setPassword(""); // 비밀번호 입력 필드 초기화
  };

  return (
    <header>
      {user ? (
        // 로그인 후 화면: 사용자 정보와 관련 메뉴 제공
        <div className="user-info">
          <button className="home-button" onClick={() => navigate("/")}>
            🏠 홈
          </button>
          <span className="user-message">
            환영합니다, {user.username || user.userId} 님! ({user.role})
          </span>
          {user.role.toLowerCase() === "admin" && (
            <button
              className="admin-btn"
              onClick={() => navigate("/admin/professors")}
            >
              교수자 관리
            </button>
          )}
          <button className="logout-btn" onClick={handleLogout}>
            로그아웃
          </button>
          <button
            className="mypage-btn"
            onClick={() => navigate("/mypage")}
          >
            마이페이지
          </button>
        </div>
      ) : (
        // 로그인 전 화면: 로그인 폼, 회원정보 찾기 및 회원가입 버튼 제공
        <div className="login-container">
          <form onSubmit={handleLogin} className="login-form">
            <input
              type="text"
              placeholder="아이디"
              value={userId}
              onChange={(e) => setUserId(e.target.value)}
            />
            <input
              type="password"
              placeholder="비밀번호"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <button type="submit" className="login-button">
              로그인
            </button>
          </form>
          <div className="login-actions">
            <button
              type="button"
              className="find-account-btn"
              onClick={() => setIsModalOpen(true)}
            >
              회원정보 찾기
            </button>
            <button
              type="button"
              className="register-btn"
              onClick={() => navigate("/register")}
            >
              회원가입
            </button>
          </div>
        </div>
      )}

      {isModalOpen && <FindAccountModal onClose={() => setIsModalOpen(false)} />}
    </header>
  );
};

export default Header;
