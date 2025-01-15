package com.scaler.student_management_system.repositories;

import org.springframework.stereotype.Repository;
import org.springframework.data.jpa.repository.JpaRepository;
import com.scaler.student_management_system.models.StudentEntity;


@Repository
public interface StudentRepository extends JpaRepository<StudentEntity, Long> {
    // JpaRepository provides all basic CRUD operations
    // <Student, Long> -> Student is the entity type, Long is the type of primary key
}