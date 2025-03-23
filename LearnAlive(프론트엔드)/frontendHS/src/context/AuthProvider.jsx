// // import { createContext, useContext, useState, useEffect } from "react";
// // import PropTypes from "prop-types";
// // import axios from "axios";

// // // ✅ AuthContext 생성
// // export const AuthContext = createContext(null);

// // export const AuthProvider = ({ children }) => {
// //   const [user, setUser] = useState(null);

// //   useEffect(() => {
// //     const storedUser = sessionStorage.getItem("user");
// //     if (storedUser) {
// //       setUser(JSON.parse(storedUser));
// //     }
// //   }, []);

// //   // ✅ 통합 로그인 (학생, 교수, 관리자)
// //   const login = async (userId, password) => {
// //     try {
// //       console.log("📌 로그인 요청:", { userId, password });

// //       const response = await axios.post("http://localhost:8080/api/auth/login", {
// //         userId,
// //         password,
// //       });

// //       const userData = response.data;
// //       setUser(userData);
// //       sessionStorage.setItem("user", JSON.stringify(userData));
// //       console.log("✅ 로그인 성공:", userData);
// //     } catch (error) {
// //       console.error("📌 로그인 실패:", error.response?.data || error.message);
// //       alert(error.response?.data?.message || "로그인 실패. 아이디와 비밀번호를 확인하세요.");
// //     }
// //   };

// //   // ✅ 로그아웃
// //   const logout = () => {
// //     setUser(null);
// //     sessionStorage.removeItem("user");
// //     console.log("✅ 로그아웃 완료");
// //   };

// //   console.log("📌 AuthProvider가 제공하는 값:", { user, login, logout });

// //   return (
// //     <AuthContext.Provider value={{ user, login, logout, setUser }}>
// //       {children}
// //     </AuthContext.Provider>
// //   );
// // };

// // export default AuthProvider;

// // AuthProvider.propTypes = {
// //   children: PropTypes.node.isRequired,
// // };

// // // ✅ useAuth 훅 제공
// // export const useAuth = () => useContext(AuthContext);


// // src/context/AuthProvider.jsx
// import { createContext, useContext, useState, useEffect } from "react";
// import PropTypes from "prop-types";
// import axios from "axios";

// // ✅ AuthContext 생성
// export const AuthContext = createContext(null);

// export const AuthProvider = ({ children }) => {
//   const [user, setUser] = useState(null);

//   // 페이지 로드 시 세션스토리지에 저장된 사용자 정보를 가져오기
//   useEffect(() => {
//     const storedUser = sessionStorage.getItem("user");
//     if (storedUser) {
//       setUser(JSON.parse(storedUser));
//     }
//   }, []);

//   // ✅ 통합 로그인 (학생, 교수, 관리자)
//   const login = async (userId, password) => {
//     try {
//       console.log("📌 로그인 요청:", { userId, password });
//       const response = await axios.post("http://localhost:8080/api/auth/login", {
//         userId,
//         password,
//       });
//       const userData = response.data;
//       setUser(userData);
//       sessionStorage.setItem("user", JSON.stringify(userData));
//       console.log("✅ 로그인 성공:", userData);
//     } catch (error) {
//       console.error("📌 로그인 실패:", error.response?.data || error.message);
//       alert(error.response?.data?.message || "로그인 실패. 아이디와 비밀번호를 확인하세요.");
//     }
//   };

//   // ✅ 로그아웃
//   const logout = () => {
//     setUser(null);
//     sessionStorage.removeItem("user");
//     console.log("✅ 로그아웃 완료");
//   };

//   console.log("📌 AuthProvider가 제공하는 값:", { user, login, logout });

//   return (
//     <AuthContext.Provider value={{ user, login, logout, setUser }}>
//       {children}
//     </AuthContext.Provider>
//   );
// };

// AuthProvider.propTypes = {
//   children: PropTypes.node.isRequired,
// };

// export const useAuth = () => useContext(AuthContext);

// export default AuthProvider;



// src/context/AuthProvider.jsx
import { createContext, useContext, useState, useEffect } from "react";
import PropTypes from "prop-types";
import axios from "axios";

// ✅ AuthContext 생성
export const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  // 페이지 로드 시 세션스토리지에 저장된 사용자 정보를 가져오기
  useEffect(() => {
    const storedUser = sessionStorage.getItem("user");
    if (storedUser) {
      const parsed = JSON.parse(storedUser);
      setUser(parsed);
      // axios 기본 auth 설정 복원
      axios.defaults.auth = { username: parsed.userId, password: parsed.password };
      axios.defaults.withCredentials = true;
    }
  }, []);

  // ✅ 통합 로그인 (학생, 교수, 관리자)
  const login = async (userId, password) => {
    try {
      console.log("📌 로그인 요청:", { userId, password });
      const response = await axios.post("http://localhost:8080/api/auth/login", { userId, password });

      const userData = response.data;
      // 비밀번호까지 저장 → Basic auth 용
      userData.password = password;
      setUser(userData);
      sessionStorage.setItem("user", JSON.stringify(userData));

      // 이후 axios 요청에 자동으로 Basic Auth 헤더 부착
      axios.defaults.auth = { username: userId, password };
      axios.defaults.withCredentials = true;

      console.log("✅ 로그인 성공:", userData);
    } catch (error) {
      console.error("📌 로그인 실패:", error.response?.data || error.message);
      alert(error.response?.data?.message || "로그인 실패. 아이디와 비밀번호를 확인하세요.");
    }
  };

  // ✅ 로그아웃
  const logout = () => {
    setUser(null);
    sessionStorage.removeItem("user");
    // axios 기본 auth 제거
    delete axios.defaults.auth;
    console.log("✅ 로그아웃 완료");
  };

  console.log("📌 AuthProvider가 제공하는 값:", { user, login, logout });

  return (
    <AuthContext.Provider value={{ user, login, logout, setUser }}>
      {children}
    </AuthContext.Provider>
  );
};

AuthProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export const useAuth = () => useContext(AuthContext);

export default AuthProvider;
