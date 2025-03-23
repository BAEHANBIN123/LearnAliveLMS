package com.lms.attendance.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;

@Configuration
public class SecurityConfig {
    
    @Bean
    public BCryptPasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }
}


//package com.lms.attendance.config;
//
//import org.springframework.context.annotation.Bean;
//import org.springframework.context.annotation.Configuration;
//import org.springframework.security.config.annotation.web.builders.HttpSecurity;
//import org.springframework.security.config.Customizer;
//import org.springframework.security.web.SecurityFilterChain;
//import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
//
//@Configuration
//public class SecurityConfig {
//
//    @Bean
//    public BCryptPasswordEncoder passwordEncoder() {
//        return new BCryptPasswordEncoder();
//    }
//  
//    @Bean
//    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
//        http
//          // CSRF 보호를 비활성화 (필요에 따라 활성화할 수 있음)
//          .csrf(csrf -> csrf.disable())
//          .authorizeHttpRequests(authz -> authz
//              // 아래 두 엔드포인트는 인증 없이 접근 허용
//              .requestMatchers("/api/professors/find-id", "/api/professors/reset-password").permitAll()
//              // 나머지 모든 요청은 인증 필요
//              .anyRequest().authenticated()
//          )
//          .httpBasic(Customizer.withDefaults()); // 기본 HTTP 인증 사용
//        return http.build();
//    }
//}



//package com.lms.attendance.config;
//
//import org.springframework.context.annotation.Bean;
//import org.springframework.context.annotation.Configuration;
//import org.springframework.security.config.Customizer;
//import org.springframework.security.config.annotation.web.builders.HttpSecurity;
//import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
//import org.springframework.security.web.SecurityFilterChain;
//import org.springframework.web.cors.CorsConfiguration;
//import org.springframework.web.cors.CorsConfigurationSource;
//import org.springframework.web.cors.UrlBasedCorsConfigurationSource;
//
//@Configuration
//public class SecurityConfig {
//
//    @Bean
//    public BCryptPasswordEncoder passwordEncoder() {
//        return new BCryptPasswordEncoder();
//    }
//  
//    @Bean
//    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
//        http
//          .cors(Customizer.withDefaults())
//          .csrf(csrf -> csrf.disable())
//          .authorizeHttpRequests(authz -> authz
//              // 로그인·회원가입·ID 찾기·비밀번호 리셋은 인증 없이 접근 허용
//              .requestMatchers(
//                  "/api/auth/login",
//                  "/api/auth/register/**",
//                  "/api/professors/find-id",
//                  "/api/professors/reset-password"
//              ).permitAll()
//              // 그 외 모든 요청은 인증 필요
//              .anyRequest().authenticated()
//          )
//          .httpBasic(Customizer.withDefaults());
//        return http.build();
//    }
//    
//    @Bean
//    public CorsConfigurationSource corsConfigurationSource() {
//        CorsConfiguration config = new CorsConfiguration();
//        config.setAllowedOrigins(List.of("http://localhost:5173", "https://korea-attendance-96b0a03da0c9.herokuapp.com"));
//        config.setAllowedMethods(List.of("GET","POST","PUT","DELETE","OPTIONS"));
//        config.setAllowedHeaders(List.of("*"));
//        config.setAllowCredentials(true);
//        UrlBasedCorsConfigurationSource src = new UrlBasedCorsConfigurationSource();
//        src.registerCorsConfiguration("/api/**", config);
//        return src;
//    }
//}
