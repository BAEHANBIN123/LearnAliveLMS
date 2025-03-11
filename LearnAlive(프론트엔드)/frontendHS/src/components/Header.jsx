import { useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import "../styles/Header.css";

const Header = () => {
  const { user, login, logout } = useAuth();
  const [userId, setUserId] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    console.log("현재 로그인한 사용자:", user); // ✅ 로그인 정보 확인
  }, [user]);

  const handleLogin = (e) => {
    e.preventDefault();
    if (!userId || !password) {
      alert("아이디와 비밀번호를 입력하세요.");
      return;
    }
    login(userId, password);  // 로그인 함수 호출
  };

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <header>
      {user ? (
        <div className="user-info">
          <button className="home-button" onClick={() => navigate("/")}>🏠 홈</button>

          <span className="user-message">
            환영합니다, {user.username || user.userId} 님! ({user.role})
          </span>

          {/* ✅ 관리자(admin) 계정일 때만 교수자 관리 버튼 표시 */}
          {user.role.toLowerCase() === "admin" && (
            <button className="admin-btn" onClick={() => navigate("/admin/professors")}>
              교수자 관리
            </button>
          )}

          <button className="logout-btn" onClick={handleLogout}>로그아웃</button>
          <button className="mypage-btn" onClick={() => navigate("/mypage")}>마이페이지</button>
        </div>
      ) : (
        <form onSubmit={handleLogin}>
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
          <button type="submit">로그인</button>
        </form>
      )}
    </header>
  );
};

export default Header;
