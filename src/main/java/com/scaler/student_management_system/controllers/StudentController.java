package com.scaler.student_management_system.controllers;

import com.scaler.student_management_system.models.StudentEntity;
import com.scaler.student_management_system.services.StudentService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@CrossOrigin(origins = "http://localhost:8080")
    @RequestMapping("/api/students")
    public class StudentController {

    @Autowired
    private StudentService studentService;

    // Create - POST request
    @PostMapping
    public StudentEntity createStudent(@Valid @RequestBody StudentEntity student) {
        return studentService.saveStudent(student);
    }

    // Read - GET request for all students
    @GetMapping
    public List<StudentEntity> getAllStudents() {
        return studentService.getAllStudents();
    }

    // Read - GET request for single student by ID
    @GetMapping("/{id}")
    public Optional<StudentEntity> getStudentById(@PathVariable Long id) {
        return studentService.getStudentById(id);
    }

    // Update - PUT request
    @PutMapping("/{id}")
    public StudentEntity updateStudent(@PathVariable Long id, @RequestBody StudentEntity student) {
        student.setId(id);
        return studentService.updateStudent(student);
    }

    // Delete - DELETE request
    @DeleteMapping("/{id}")
    public void deleteStudent(@PathVariable Long id) {
        studentService.deleteStudent(id);
    }

}
