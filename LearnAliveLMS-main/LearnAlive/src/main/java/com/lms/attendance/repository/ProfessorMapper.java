package com.lms.attendance.repository;

import com.lms.attendance.model.Professor;
import org.apache.ibatis.annotations.*;

import java.util.List;

@Mapper
public interface ProfessorMapper {

    @Select("SELECT * FROM professor")
    List<Professor> getAllProfessors();

    @Select("SELECT * FROM professor WHERE prof_id = #{prof_id}")  // prof_id로 수정
    Professor getProfessorById(@Param("prof_id") String prof_id);  // prof_id로 수정

    @Insert("INSERT INTO professor (prof_id, name, department, email) VALUES (#{prof_id}, #{name}, #{department}, #{email)")  // prof_id로 수정
    void insertProfessor(Professor professor);

    @Update("UPDATE professor SET name = #{name}, department = #{department}, email = #{email} WHERE prof_id = #{prof_id}")  // prof_id로 수정
    void updateProfessor(Professor professor);

    @Delete("DELETE FROM professor WHERE prof_id = #{prof_id}")  // prof_id로 수정
    void deleteProfessor(@Param("prof_id") String prof_id);  // prof_id로 수정
}
