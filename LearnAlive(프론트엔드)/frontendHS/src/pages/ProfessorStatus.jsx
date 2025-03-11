import React, { useEffect, useState } from "react";
import axios from "axios";
import { useAuth } from "../context/AuthContext"; // AuthContext 가져오기
import CreateProfessor from "../components/CreateProfessor"; // CreateProfessor 컴포넌트 임포트
import { useNavigate } from "react-router-dom"; // useNavigate로 변경

const ProfessorStatus = () => {
  const { user } = useAuth(); // AuthContext에서 user 가져오기
  const navigate = useNavigate(); // useNavigate 훅을 이용한 페이지 리디렉션
  const [professors, setProfessors] = useState([]);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState("");
  const [role, setRole] = useState("");
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [editingProfessor, setEditingProfessor] = useState(null); // 수정할 교수자 상태

  useEffect(() => {
    if (!user) {
      navigate("/login"); // 로그인되어 있지 않으면 로그인 페이지로 리디렉션
    } else if (user.role === "ADMIN") {
      const fetchProfessors = async () => {
        try {
          const response = await axios.get("http://localhost:8080/api/professors", {
            headers: {
              Authorization: `Bearer ${user.token}`, // 템플릿 리터럴에서 backtick 사용
            },
          });
          setProfessors(response.data);
          setIsLoggedIn(true);
          setUsername(user.username);
          setRole(user.role);
        } catch (error) {
          console.error("교수 목록을 불러오는 데 실패했습니다.", error);
        }
      };

      fetchProfessors();
    }
  }, [user, navigate]); // user가 변경될 때마다 다시 실행

  const handleCreateProfessorClick = () => {
    setEditingProfessor(null); // 수정 모드 초기화
    setShowCreateModal(true); // 교수자 생성 모달 열기
  };

  const handleCloseModal = () => {
    setShowCreateModal(false);
    setEditingProfessor(null); // 모달을 닫을 때 편집 상태 초기화
  };

  const handleEditProfessor = (professor) => {
    setEditingProfessor(professor); // 수정할 교수자 정보를 상태에 저장
    setShowCreateModal(true); // 모달을 열어서 수정할 수 있도록
  };

  const handleDeleteProfessor = async (prof_id) => {
    try {
      const response = await axios.delete(`http://localhost:8080/api/professors/${prof_id}`, { // 템플릿 리터럴에서 backtick 사용
        headers: {
          Authorization: `Bearer ${user.token}`, // 템플릿 리터럴에서 backtick 사용
        },
      });

      if (response.data.success) {
        alert(response.data.message);
        setProfessors(professors.filter((professor) => professor.prof_id !== prof_id)); // 삭제된 교수자를 상태에서 제거
      } else {
        alert(response.data.message);
      }
    } catch (error) {
      console.error("교수 삭제 실패", error);
      alert("교수 삭제에 실패했습니다.");
    }
  };

  const handleProfessorAdded = (newProfessor) => {
    setProfessors((prevProfessors) => [...prevProfessors, newProfessor]);
  };

  const handleProfessorUpdated = (updatedProfessor) => {
    setProfessors((prevProfessors) =>
      prevProfessors.map((professor) =>
        professor.prof_id === updatedProfessor.prof_id ? updatedProfessor : professor
      )
    );
  };

  if (!user || user.role !== "ADMIN") {
    return <p>관리자 권한이 필요합니다. <a href="/login">로그인 페이지로 가기</a></p>; // 관리자 권한이 없으면 로그인 페이지로 유도
  }

  return (
    <div className="container mt-5">
      <h2>교수자 현황</h2>
      {isLoggedIn ? (
        <>
          <p>안녕하세요, {username}님! ({role})</p>
          <button className="btn btn-primary" onClick={handleCreateProfessorClick}>
            교수자 생성
          </button>
          <table className="table mt-3">
            <thead>
              <tr>
                <th>교수자 ID</th>
                <th>이름</th>
                <th>학과</th>
                <th>이메일</th>
                <th>수정</th>
                <th>삭제</th>
              </tr>
            </thead>
            <tbody>
              {professors.map((professor) => (
                <tr key={professor.prof_id}>
                  <td>{professor.prof_id}</td>
                  <td>{professor.name}</td>
                  <td>{professor.department}</td>
                  <td>{professor.email}</td>
                  <td>
                    <button
                      className="btn btn-warning"
                      onClick={() => handleEditProfessor(professor)}
                    >
                      수정
                    </button>
                  </td>
                  <td>
                    <button
                      className="btn btn-danger"
                      onClick={() => handleDeleteProfessor(professor.prof_id)}
                    >
                      삭제
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {showCreateModal && (
            <div className="modal fade show" style={{ display: "block" }} tabIndex="-1" aria-hidden="true">
              <div className="modal-dialog">
                <div className="modal-content">
                  <div className="modal-header">
                    <h5 className="modal-title">
                      {editingProfessor ? "교수자 수정" : "교수자 계정 생성"}
                    </h5>
                    <button type="button" className="btn-close" onClick={handleCloseModal}></button>
                  </div>
                  <div className="modal-body">
                    <CreateProfessor
                      professor={editingProfessor}
                      onClose={handleCloseModal}
                      onProfessorAdded={handleProfessorAdded}
                      onProfessorUpdated={handleProfessorUpdated}
                    />
                  </div>
                </div>
              </div>
            </div>
          )}
        </>
      ) : (
        <p>로그인 후 교수자 현황을 확인할 수 있습니다.</p>
      )}
    </div>
  );
};

export default ProfessorStatus;
