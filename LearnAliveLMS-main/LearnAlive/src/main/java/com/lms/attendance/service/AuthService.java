//package com.lms.attendance.service;
//
//import com.lms.attendance.model.User;
//import com.lms.attendance.repository.AuthMapper;
//import org.springframework.stereotype.Service;
//
//@Service
//public class AuthService {
//
//    private final AuthMapper authMapper;
//
//    public AuthService(AuthMapper authMapper) {
//        this.authMapper = authMapper;
//    }
//
//    // ✅ 사용자 인증 (학생, 교수, 관리자)
//    public String authenticate(String userId, String password) {
//        User user = authMapper.findUserById(userId);
//        if (user == null) return null; // 사용자가 존재하지 않음
//
//        // 교수자인 경우 비밀번호 검증
//        if ("PROFESSOR".equalsIgnoreCase(user.getRole()) && !user.getPassword().equals(password)) {
//            return null; // 비밀번호 틀림
//        }
//
//        return user.getRole(); // 인증 성공 → 역할 반환
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
//}
//admin 모든 기능까지 다 구현한 코드


package com.lms.attendance.service;

import com.lms.attendance.model.User;
import com.lms.attendance.repository.AuthMapper;
import org.springframework.stereotype.Service;

@Service
public class AuthService {

    private final AuthMapper authMapper;

    public AuthService(AuthMapper authMapper) {
        this.authMapper = authMapper;
    }

    // ✅ 사용자 인증 (학생, 교수, 관리자)
    public String authenticate(String userId, String password) {
        User user = authMapper.findUserById(userId);
        if (user == null) return null; // 사용자가 존재하지 않음

        // 교수자인 경우 비밀번호 검증
        if ("PROFESSOR".equalsIgnoreCase(user.getRole())) {
            System.out.println("Stored password: " + user.getPassword());
            System.out.println("Input password: " + password);
            if (!user.getPassword().equals(password)) {
                return null; // 비밀번호 틀림
            }
        }

        return user.getRole(); // 인증 성공 → 역할 반환
    }

    // ✅ 사용자 이름 조회 (학생, 교수, 관리자)
    public String getUserNameByIdAndRole(String userId, String role) {
        return authMapper.findUserNameByIdAndRole(userId, role);
    }

    // ✅ 관리자 비밀번호 조회 (DB에서 admin 비밀번호 가져오기)
    public String getAdminPasswordById(String adminId) {
        return authMapper.findAdminPasswordById(adminId); // DB에서 관리자 비밀번호 조회
    }
}

