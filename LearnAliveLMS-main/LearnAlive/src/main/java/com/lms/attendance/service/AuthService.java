////bcrypt 암호화된거랑 평문 된거까지 넣을 수 있게 만듦
//
//package com.lms.attendance.service;
//
//import com.lms.attendance.model.User;
//import com.lms.attendance.repository.AuthMapper;
//import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
//import org.springframework.stereotype.Service;
//
//@Service
//public class AuthService {
//
//    private final AuthMapper authMapper;
//    private final BCryptPasswordEncoder passwordEncoder; // BCryptPasswordEncoder 추가
//
//    public AuthService(AuthMapper authMapper, BCryptPasswordEncoder passwordEncoder) {
//        this.authMapper = authMapper;
//        this.passwordEncoder = passwordEncoder;  // BCryptPasswordEncoder 초기화
//    }
//
//    // ✅ 사용자 인증 (학생, 교수, 관리자)
//    public String authenticate(String userId, String password) {
//        User user = authMapper.findUserById(userId);
//        if (user == null) return null; // 사용자가 존재하지 않음
//
//        // 교수자인 경우 비밀번호 검증
//        if ("PROFESSOR".equalsIgnoreCase(user.getRole())) {
//            System.out.println("Stored password: " + user.getPassword());  // 저장된 비밀번호
//            System.out.println("Input password: " + password);  // 입력된 비밀번호
//
//            // 평문과 bcrypt 암호화된 비밀번호 비교
//            if (!isPasswordValid(password, user.getPassword())) {
//                return null; // 비밀번호 틀림
//            }
//        }
//
//        return user.getRole(); // 인증 성공 → 역할 반환
//    }
//
//    // 평문 비밀번호와 bcrypt 암호화된 비밀번호 비교하는 메서드
//    public boolean isPasswordValid(String inputPassword, String storedPassword) {
//        // 만약 저장된 비밀번호가 bcrypt로 암호화된 것이라면 bcrypt 비교
//        if (storedPassword.startsWith("$2a$")) {
//            return passwordEncoder.matches(inputPassword, storedPassword);
//        }
//        // 저장된 비밀번호가 평문이라면 평문 비교
//        return storedPassword.equals(inputPassword);
//    }
//
//    // ✅ 사용자 이름 조회 (학생, 교수, 관리자)
//    public String getUserNameByIdAndRole(String userId, String role) {
//        return authMapper.findUserNameByIdAndRole(userId, role);
//    }
//
//    // ✅ 관리자 비밀번호 조회 (DB에서 admin 비밀번호 가져오기)
//    public String getAdminPasswordById(String adminId) {
//        return authMapper.findAdminPasswordById(adminId); // DB에서 관리자 비밀번호 조회
//    }
//
//    // ✅ 새 사용자 비밀번호 저장 (회원 가입시 bcrypt로 암호화된 비밀번호 저장)
//    public String saveUserPassword(String password) {
//        return passwordEncoder.encode(password); // 비밀번호 암호화
//    }
//}
//


package com.lms.attendance.service;

import com.lms.attendance.model.Student;
import com.lms.attendance.model.User;
import com.lms.attendance.repository.AuthMapper;
import com.lms.attendance.repository.StudentMapper;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class AuthService {

    private final AuthMapper authMapper;
    private final StudentMapper studentMapper;
    private final BCryptPasswordEncoder passwordEncoder;

    public AuthService(AuthMapper authMapper, StudentMapper studentMapper, BCryptPasswordEncoder passwordEncoder) {
        this.authMapper = authMapper;
        this.studentMapper = studentMapper;
        this.passwordEncoder = passwordEncoder;
    }

    // ✅ 통합 로그인 (학생, 교수, 관리자)
    public String authenticate(String userId, String password) {
        // 1. 학생 로그인 시도
        Student student = studentMapper.findStudentById(userId);
        if (student != null) {
            // 비밀번호 검증 (암호화 여부 고려)
            if (isPasswordValid(password, student.getPassword())) {
                return "STUDENT";  // 학생 로그인 성공 시 "STUDENT" 반환
            }
            return null; // 비밀번호 틀림
        }

        // 2. 교수자 및 관리자 로그인 시도
        User user = authMapper.findUserById(userId);
        if (user == null) return null; // 사용자 존재하지 않음

        // 교수자인 경우 비밀번호 검증
        if ("PROFESSOR".equalsIgnoreCase(user.getRole())) {
            if (!isPasswordValid(password, user.getPassword())) {
                return null; // 비밀번호 틀림
            }
        }

        return user.getRole(); // 로그인 성공 → 역할 반환
    }

    // ✅ 평문 및 암호화된 비밀번호 비교
    public boolean isPasswordValid(String inputPassword, String storedPassword) {
        // bcrypt 암호화된 비밀번호인지 확인 후 비교
        if (storedPassword.startsWith("$2a$")) {
            return passwordEncoder.matches(inputPassword, storedPassword);
        }
        return storedPassword.equals(inputPassword); // 평문 비교
    }

    // ✅ 사용자 이름 조회
    public String getUserNameByIdAndRole(String userId, String role) {
        return authMapper.findUserNameByIdAndRole(userId, role);
    }

    // ✅ 관리자 비밀번호 조회
    public String getAdminPasswordById(String adminId) {
        return authMapper.findAdminPasswordById(adminId);
    }

    // ✅ 비밀번호 암호화하여 저장
    public String saveUserPassword(String password) {
        return passwordEncoder.encode(password);
    }
}
