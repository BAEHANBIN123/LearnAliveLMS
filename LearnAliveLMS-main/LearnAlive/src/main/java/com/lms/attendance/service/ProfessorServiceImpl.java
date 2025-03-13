//package com.lms.attendance.service;
//
//import com.lms.attendance.model.Professor;
//import com.lms.attendance.repository.ProfessorMapper;
//import lombok.RequiredArgsConstructor;
//import org.springframework.stereotype.Service;
//
//import java.util.List;
//
//@Service
//@RequiredArgsConstructor
//public class ProfessorServiceImpl implements ProfessorService {
//
//    private final ProfessorMapper professorMapper;
//
//    @Override
//    public List<Professor> getAllProfessors() {
//        return professorMapper.getAllProfessors();
//    }
//
//    @Override
//    public Professor getProfessorById(String prof_id) {
//        return professorMapper.getProfessorById(prof_id);
//    }
//
//    @Override
//    public void saveProfessor(Professor professor) {
//        // 교수 정보를 저장하기 전에 출력
//        System.out.println("Professor name: " + professor.getName());
//        System.out.println("Professor department: " + professor.getDepartment());
//        System.out.println("Professor email: " + professor.getEmail());
//        
//        professorMapper.insertProfessor(professor);
//    }
//
//    @Override
//    public void updateProfessor(Professor professor) {
//        professorMapper.updateProfessor(professor);
//    }
//
//    @Override
//    public void deleteProfessor(String prof_id) {
//        professorMapper.deleteProfessor(prof_id);
//    }
//}

package com.lms.attendance.service;

import com.lms.attendance.model.Professor;
import com.lms.attendance.repository.ProfessorMapper;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class ProfessorServiceImpl implements ProfessorService {

    private final ProfessorMapper professorMapper;
    private final BCryptPasswordEncoder passwordEncoder; // 자동 주입

    @Override
    public List<Professor> getAllProfessors() {
        return professorMapper.getAllProfessors();
    }

    @Override
    public Professor getProfessorById(String prof_id) {
        return professorMapper.getProfessorById(prof_id);
    }

    @Override
    public void saveProfessor(Professor professor) {
        // 비밀번호 암호화
        if (professor.getPassword() != null && !professor.getPassword().isEmpty()) {
            professor.setPassword(passwordEncoder.encode(professor.getPassword()));
        }
        
        professorMapper.insertProfessor(professor);
    }

    @Override
    public void updateProfessor(Professor professor) {
        // 비밀번호 변경 시 암호화
        if (professor.getPassword() != null && !professor.getPassword().isEmpty()) {
            professor.setPassword(passwordEncoder.encode(professor.getPassword()));
        }

        professorMapper.updateProfessor(professor);
    }

    @Override
    public void deleteProfessor(String prof_id) {
        professorMapper.deleteProfessor(prof_id);
    }

    @Override
    public Professor findByNameAndEmail(String name, String email) {
        return professorMapper.findByNameAndEmail(name, email);
    }

    @Override
    public Professor findByIdAndNameAndPhone(String userId, String name, String phone) {
        return professorMapper.findByIdAndNameAndPhone(userId, name, phone);
    }
}
