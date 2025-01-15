package com.scaler.student_management_system.services;

import com.scaler.student_management_system.models.StudentEntity;

import com.scaler.student_management_system.repositories.StudentRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
    public class StudentService {

        @Autowired
        private StudentRepository studentRepository;

        // Create operation
        public StudentEntity saveStudent(StudentEntity student) {
            return studentRepository.save(student);
        }

        // Read operation - Get all students
        public List<StudentEntity> getAllStudents() {
            return studentRepository.findAll();
        }

        // Read operation - Get student by ID
        public Optional<StudentEntity> getStudentById(Long id) {
            return studentRepository.findById(id);
        }

        // Delete operation
        public void deleteStudent(Long id) {
            studentRepository.deleteById(id);
        }

        // Update operation
        public StudentEntity updateStudent(StudentEntity student) {
            return studentRepository.save(student);
        }
}
