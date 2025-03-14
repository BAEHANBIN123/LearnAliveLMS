import { useState } from "react";
import axios from "axios"; // axios 추가

const FindAccountModal = ({ onClose }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [userId, setUserId] = useState("");
  const [phone, setPhone] = useState("");
  const [foundPassword, setFoundPassword] = useState("");
  const [idInput, setIdInput] = useState("");

  const handleFindId = async () => {
    if (!name || !email) {
      alert("이름과 이메일을 입력하세요.");
      return;
    }
    try {
      const response = await axios.post("http://localhost:8080/api/professors/find-id", {
        name,
        email,
      });
      const { success, userId } = response.data;
      if (success) {
        setUserId(userId);
      } else {
        alert("해당 정보로 아이디를 찾을 수 없습니다.");
      }
    } catch (error) {
      console.error("아이디 찾기 오류:", error);
    }
  };

  const handleFindPassword = async () => {
    if (!idInput || !name || !phone) {
      alert("아이디, 이름, 전화번호를 입력하세요.");
      return;
    }
    try {
      const response = await axios.post("http://localhost:8080/api/professors/find-password", {
        userId: idInput,
        name,
        phone,
      });
      const { success, password } = response.data;
      if (success) {
        setFoundPassword(password);
      } else {
        alert("해당 정보로 비밀번호를 찾을 수 없습니다.");
      }
    } catch (error) {
      console.error("비밀번호 찾기 오류:", error);
    }
  };

  return (
    <div style={styles.modalOverlay}>
      <div style={styles.modalContent}>
        <button onClick={onClose} style={styles.closeButton}>✖</button>
        <h2>회원정보 찾기</h2>

        {/* 아이디 찾기 */}
        <div style={styles.section}>
          <h3>아이디 찾기</h3>
          <input
            type="text"
            placeholder="이름"
            value={name}
            onChange={(e) => setName(e.target.value)}
            style={styles.input}
          />
          <input
            type="email"
            placeholder="이메일"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            style={styles.input}
          />
          <button onClick={handleFindId} style={styles.button}>아이디 찾기</button>
          {userId && <p>찾은 아이디: <strong>{userId}</strong></p>}
        </div>

        {/* 비밀번호 찾기 */}
        <div style={styles.section}>
          <h3>비밀번호 찾기</h3>
          <input
            type="text"
            placeholder="아이디"
            value={idInput}
            onChange={(e) => setIdInput(e.target.value)}
            style={styles.input}
          />
          <input
            type="text"
            placeholder="이름"
            value={name}
            onChange={(e) => setName(e.target.value)}
            style={styles.input}
          />
          <input
            type="text"
            placeholder="전화번호"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            style={styles.input}
          />
          <button onClick={handleFindPassword} style={styles.button}>비밀번호 찾기</button>
          {foundPassword && <p>찾은 비밀번호: <strong>{foundPassword}</strong></p>}
        </div>
      </div>
    </div>
  );
};

export default FindAccountModal;

// 스타일 추가 (모달 스타일)
const styles = {
  modalOverlay: {
    position: "fixed",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  modalContent: {
    backgroundColor: "#fff",
    padding: "15px",
    borderRadius: "8px",
    width: "320px",
    textAlign: "center",
    position: "relative",
  },
  closeButton: {
    position: "absolute",
    top: "5px",
    right: "5px",
    background: "none",
    border: "none",
    fontSize: "16px",
    cursor: "pointer",
  },
  section: {
    marginBottom: "12px",
  },
  input: {
    width: "100%",
    padding: "6px",
    margin: "4px 0",
  },
  button: {
    width: "100%",
    padding: "8px",
    marginTop: "8px",
    backgroundColor: "#007bff",
    color: "#fff",
    border: "none",
    cursor: "pointer",
  },
};
