import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useState, useEffect } from "react";
import { fetchClassrooms, addClassroom, deleteClassroom } from "../api/classroomApi";
import AddClassroomModal from "../components/AddClassroomModal";
import StudentManagementModal from "../components/StudentManagementModal";
import "../styles/ClassroomList.css";

const ClassroomList = () => {
  const { user } = useAuth();
  const [classrooms, setClassrooms] = useState([]);
  const [showClassroomModal, setShowClassroomModal] = useState(false);
  const [showStudentModal, setShowStudentModal] = useState(false);

  useEffect(() => {
    console.log("Current user:", user); // user 상태 출력
    if (user && user.userId) {
      fetchClassrooms(user.userId).then((data) => {
        console.log("Fetched classrooms:", data);
        setClassrooms(data);
      });
    }
  }, [user]);

  if (!user) {
    return (
      <div className="login-container">
        <p className="login-message">
          먼저 로그인이 필요합니다.<br /><br />
          <span style={{ color: "gray", fontSize: "0.9rem" }}>로그인 아이디는 학번입니다.</span>
        </p>
      </div>
    );
  }


  const handleAddClassroom = async (className) => {
    try {
      console.log("📌 현재 로그인된 유저:", user);
      const profId = user?.userId;
      if (!profId) {
        console.error("❌ 교수 ID가 없음");
        return;
      }
  
      console.log("📌 강의실 추가 요청:", { className, profId });
      await addClassroom({ className, profId });
      const updatedClassrooms = await fetchClassrooms(profId);
      setClassrooms(updatedClassrooms);
      setShowClassroomModal(false);
    } catch (error) {
      console.error("강의실 추가 실패:", error);
    }
  };
  

  const handleDeleteClassroom = async (classId) => {
    const confirmDelete = window.confirm("정말로 삭제하시겠습니까?");
    if (!confirmDelete) return;

    try {
      await deleteClassroom(classId);
      setClassrooms((prevClassrooms) =>
        prevClassrooms.filter((classroom) => classroom.classId !== classId)
      );
    } catch (error) {
      console.error("강의실 삭제 실패:", error);
    }
  };

  return (
    <div className="classroom-container">
      <div className="classroom-title">내 강의실</div>

      {/* ✅ 교수자일 경우에만 강의실 추가 및 학생 관리 버튼 표시 */}
      {user.role?.toLowerCase() === "professor" && (
        <div className="button-group">
          <button onClick={() => setShowClassroomModal(true)}>강의실 추가</button>
          <button onClick={() => setShowStudentModal(true)}>수강생 관리</button>
        </div>
      )}

      <ul className="classroom-list">
        {classrooms.length > 0 ? (
          classrooms.map((classroom) => (
            <li key={classroom.classId} className="classroom-item">
              <Link to={`/classroom/${classroom.classId}/boards`} className="classroom-link">
                {classroom.className}
              </Link>

              {user.role?.toLowerCase() === "professor" && (
                <div className="button-group">
                  <Link to={`/classroom/${classroom.classId}/settings`}>
                    <button className="settings-button">⚙️ 출석 시간 설정</button>
                  </Link>
                  <button
                    className="delete-button"
                    onClick={() => handleDeleteClassroom(classroom.classId)}
                  >
                    삭제
                  </button>
                </div>
              )}
            </li>
          ))
        ) : (
          <p>강의실 정보가 없습니다.</p>
        )}
      </ul>

      {showClassroomModal && (
        <AddClassroomModal
          onClose={() => setShowClassroomModal(false)}
          onAddClassroom={handleAddClassroom}
        />
      )}

      {showStudentModal && (
        <StudentManagementModal onClose={() => setShowStudentModal(false)} />
      )}
    </div>
  );
};

export default ClassroomList;
