import React, { useState, useEffect } from "react";
import axios from "axios";

const CreateProfessor = ({ professor, onClose, onProfessorAdded, onProfessorUpdated }) => {
  const [name, setName] = useState("");
  const [department, setDepartment] = useState("");
  const [email, setEmail] = useState("");
  const [profId, setProfId] = useState("");
  const [currentPassword, setCurrentPassword] = useState(""); // 현재 비밀번호 입력 상태
  const [newPassword, setNewPassword] = useState(""); // 새로운 비밀번호 입력 상태
  const [isPasswordVerified, setIsPasswordVerified] = useState(false); // 비밀번호 인증 상태

  useEffect(() => {
    if (professor) {
      setProfId(professor.prof_id);
      setName(professor.name);
      setDepartment(professor.department);
      setEmail(professor.email);
    } else {
      setProfId("");
      setName("");
      setDepartment("");
      setEmail("");
    }
  }, [professor]);

  // 비밀번호 인증 함수
  const handleVerifyPassword = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.post(
        "http://localhost:8080/api/professors/verify-password",
        { prof_id: profId, password: currentPassword },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      if (response.data.verified) {
        setIsPasswordVerified(true);
      } else {
        alert("현재 비밀번호가 올바르지 않습니다.");
      }
    } catch (error) {
      console.error("비밀번호 인증 실패", error.response ? error.response.data : error.message);
    }
  };

  // 교수자 정보 저장 함수
  const handleSubmit = async (e) => {
    e.preventDefault();
    const professorData = {
      prof_id: profId,
      name,
      department,
      email,
      password: newPassword || currentPassword, // 새 비밀번호가 있으면 변경, 없으면 기존 유지
    };

    try {
      const token = localStorage.getItem("token");
      const headers = { Authorization: `Bearer ${token}` };

      let response;
      if (professor) {
        response = await axios.put(
          `http://localhost:8080/api/professors/${professor.prof_id}`,
          professorData,
          { headers }
        );
        onProfessorUpdated(response.data);
      } else {
        response = await axios.post(
          "http://localhost:8080/api/professors/add",
          professorData,
          { headers }
        );
        onProfessorAdded(response.data);
      }

      onClose();
    } catch (error) {
      console.error("교수자 생성/수정 실패", error.response ? error.response.data : error.message);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="form-group">
        <label htmlFor="profId">교수자 ID</label>
        <input
          type="text"
          className="form-control"
          id="profId"
          value={profId}
          onChange={(e) => setProfId(e.target.value)}
          disabled={!!professor}
        />
      </div>
      <div className="form-group">
        <label htmlFor="name">이름</label>
        <input
          type="text"
          className="form-control"
          id="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
      </div>
      <div className="form-group">
        <label htmlFor="department">학과</label>
        <input
          type="text"
          className="form-control"
          id="department"
          value={department}
          onChange={(e) => setDepartment(e.target.value)}
          required
        />
      </div>
      <div className="form-group">
        <label htmlFor="email">이메일</label>
        <input
          type="email"
          className="form-control"
          id="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
      </div>

      {professor && (
        <>
          <div className="form-group">
            <label htmlFor="currentPassword">현재 비밀번호</label>
            <input
              type="password"
              className="form-control"
              id="currentPassword"
              value={currentPassword}
              onChange={(e) => setCurrentPassword(e.target.value)}
              required
              disabled={isPasswordVerified}
            />
          </div>
          {!isPasswordVerified ? (
            <button type="button" className="btn btn-info mt-2" onClick={handleVerifyPassword}>
              비밀번호 인증
            </button>
          ) : (
            <div className="form-group">
              <label htmlFor="newPassword">새 비밀번호</label>
              <input
                type="password"
                className="form-control"
                id="newPassword"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                required
              />
            </div>
          )}
        </>
      )}

      <button type="submit" className="btn btn-primary mt-3">
        {professor ? "수정하기" : "교수자 생성"}
      </button>
      <button type="button" className="btn btn-secondary mt-3" onClick={onClose}>
        취소
      </button>
    </form>
  );
};

export default CreateProfessor;
