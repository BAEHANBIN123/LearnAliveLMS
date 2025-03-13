import { useState } from "react";

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
      const response = await fetch("http://localhost:5000/api/find-id", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email }),
      });
      const data = await response.json();
      if (data.success) {
        setUserId(data.userId);
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
      const response = await fetch("http://localhost:5000/api/find-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userId: idInput, name, phone }),
      });
      const data = await response.json();
      if (data.success) {
        setFoundPassword(data.password);
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
    padding: "20px",
    borderRadius: "8px",
    width: "400px",
    textAlign: "center",
  },
  closeButton: {
    position: "absolute",
    top: "10px",
    right: "10px",
    background: "none",
    border: "none",
    fontSize: "18px",
    cursor: "pointer",
  },
  section: {
    marginBottom: "15px",
  },
  input: {
    width: "100%",
    padding: "8px",
    margin: "5px 0",
  },
  button: {
    width: "100%",
    padding: "10px",
    marginTop: "10px",
    backgroundColor: "#007bff",
    color: "#fff",
    border: "none",
    cursor: "pointer",
  },
};
