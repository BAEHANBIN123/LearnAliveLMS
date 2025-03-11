//package com.lms.attendance.controller;
//
//import org.springframework.http.HttpStatus;
//import org.springframework.http.ResponseEntity;
//import org.springframework.web.bind.annotation.GetMapping;
//import org.springframework.web.bind.annotation.PathVariable;
//import org.springframework.web.bind.annotation.PostMapping;
//import org.springframework.web.bind.annotation.RequestBody;
//import org.springframework.web.bind.annotation.RequestMapping;
//import org.springframework.web.bind.annotation.RestController;
//
//import com.lms.attendance.model.LoginRequest;
//import com.lms.attendance.model.User;
//import com.lms.attendance.service.AuthService;
//
//@RestController
//@RequestMapping("/api/auth")
//public class AuthController {
//
//    private final AuthService authService;
//
//    public AuthController(AuthService authService) {
//        this.authService = authService;
//    }
//
//    //학생 로그인(비밀번호 없음)
//    @GetMapping("/{userId}")  // ✅ URL 매핑 수정
//    public User getUserRole(@PathVariable("userId") String userId) {
//        return authService.findUserById(userId)
//                .orElseThrow(() -> new RuntimeException("사용자를 찾을 수 없습니다."));
//    }
//    
// // ✅ 교수자 로그인 (비밀번호 검증)
//    @PostMapping("/professor-login")
//    public ResponseEntity<User> loginProfessor(@RequestBody LoginRequest request) {
//        User user = authService.loginProfessor(request.getUserId(), request.getPassword());
//        if (user != null) {
//            return ResponseEntity.ok(user);
//        } else {
//            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
//        }
//    }
//}


package com.lms.attendance.controller;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.lms.attendance.model.LoginRequest;
import com.lms.attendance.model.User;
import com.lms.attendance.service.AuthService;

import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/api/auth")
public class AuthController {

    private final AuthService authService;

    public AuthController(AuthService authService) {
        this.authService = authService;
    }


    // ✅ 통합 로그인 (학생, 교수, 관리자)
    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody LoginRequest request) {
        String role = authService.authenticate(request.getUserId(), request.getPassword());

        if (role == null) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                    .body(Map.of("success", false, "message", "잘못된 ID 또는 비밀번호입니다."));
        }

        // 사용자 이름 조회 (관리자는 이름 없음)
        String name = "ADMIN".equalsIgnoreCase(role) ? null : authService.getUserNameByIdAndRole(request.getUserId(), role);

        // 역할 한글 변환
        String roleInKorean = switch (role.toUpperCase()) {
            case "ADMIN" -> "관리자";
            case "PROFESSOR" -> "교수자";
            case "STUDENT" -> "학생";
            default -> "알 수 없음";
        };

        // 로그인 성공 응답
        return ResponseEntity.ok(Map.of(
                "success", true,
                "message", "로그인 성공",
                "role", role,
                "username", name != null ? name + " (" + roleInKorean + ")" : roleInKorean
        ));
    }
}
