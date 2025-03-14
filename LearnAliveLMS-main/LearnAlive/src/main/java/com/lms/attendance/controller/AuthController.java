//
//
//package com.lms.attendance.controller;
//
//import org.springframework.http.HttpStatus;
//import org.springframework.http.ResponseEntity;
//import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
//import org.springframework.web.bind.annotation.*;
//
//import com.lms.attendance.model.LoginRequest;
//import com.lms.attendance.service.AuthService;
//
//import java.util.Map;
//
//@RestController
//@RequestMapping("/api/auth")
//public class AuthController {
//
//    private final AuthService authService;
//    private final BCryptPasswordEncoder passwordEncoder;  // BCryptPasswordEncoder 추가
//
//    public AuthController(AuthService authService, BCryptPasswordEncoder passwordEncoder) {
//        this.authService = authService;
//        this.passwordEncoder = passwordEncoder;
//    }
//
//    // ✅ 통합 로그인 (학생, 교수, 관리자)
//    @PostMapping("/login")
//    public ResponseEntity<?> login(@RequestBody LoginRequest request) {
//        // 관리자 계정에 대해서는 비밀번호 확인을 추가
//        if ("admin".equalsIgnoreCase(request.getUserId())) {
//            // 관리자 계정 비밀번호 확인 (DB에서 가져오기)
//            String adminPassword = authService.getAdminPasswordById(request.getUserId()); // DB에서 비밀번호 가져오기
//
//            // DB에서 비밀번호를 가져오지 못했거나 비밀번호가 일치하지 않으면 로그인 실패
//            if (adminPassword == null || !passwordEncoder.matches(request.getPassword(), adminPassword)) {
//                return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
//                        .body(Map.of("success", false, "message", "잘못된 관리자 비밀번호입니다."));
//            }
//
//            // 관리자 로그인의 경우 역할을 "ADMIN"으로 설정
//            String role = "ADMIN";
//            String roleInKorean = "관리자";
//            return ResponseEntity.ok(Map.of(
//                    "success", true,
//                    "message", "로그인 성공",
//                    "role", role,
//                    "username", roleInKorean
//            ));
//        }
//
//        // 일반 사용자 로그인 처리
//        String role = authService.authenticate(request.getUserId(), request.getPassword());
//
//        if (role == null) {
//            return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
//                    .body(Map.of("success", false, "message", "잘못된 ID 또는 비밀번호입니다."));
//        }
//
//        // 사용자 이름 조회 (관리자는 이름 없음)
//        String name = "ADMIN".equalsIgnoreCase(role) ? null : authService.getUserNameByIdAndRole(request.getUserId(), role);
//
//        // 역할 한글 변환
//        String roleInKorean = switch (role.toUpperCase()) {
//            case "ADMIN" -> "관리자";
//            case "PROFESSOR" -> "교수자";
//            case "STUDENT" -> "학생";
//            default -> "알 수 없음";
//        };
//
//        // 로그인 성공 응답
//        return ResponseEntity.ok(Map.of(
//                "success", true,
//                "message", "로그인 성공",
//                "role", role,
//                "username", name != null ? name + " (" + roleInKorean + ")" : roleInKorean
//        ));
//    }
//}
//
//비밀번호 암호화까지 성공한 코드(하지만 암호화 되지 않는 비밀번호는 로그인이 안되는 문제가 있음.)

//평문화된 비밀번호도 로그인 되도록 구현시작 (3.14)
package com.lms.attendance.controller;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.lms.attendance.model.LoginRequest;
import com.lms.attendance.service.AuthService;

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
        // 관리자 계정에 대해서는 비밀번호 확인을 추가
        if ("admin".equalsIgnoreCase(request.getUserId())) {
            // 관리자 계정 비밀번호 확인 (DB에서 가져오기)
            String adminPassword = authService.getAdminPasswordById(request.getUserId()); // DB에서 비밀번호 가져오기

            // DB에서 비밀번호를 가져오지 못했거나 비밀번호가 일치하지 않으면 로그인 실패
            if (adminPassword == null || !authService.isPasswordValid(request.getPassword(), adminPassword)) {
                return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                        .body(Map.of("success", false, "message", "잘못된 관리자 비밀번호입니다."));
            }

            // 관리자 로그인의 경우 역할을 "ADMIN"으로 설정
            String role = "ADMIN";
            String roleInKorean = "관리자";
            return ResponseEntity.ok(Map.of(
                    "success", true,
                    "message", "로그인 성공",
                    "role", role,
                    "username", roleInKorean
            ));
        }

        // 일반 사용자 로그인 처리
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
