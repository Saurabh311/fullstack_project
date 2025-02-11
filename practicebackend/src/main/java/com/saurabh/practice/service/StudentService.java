package com.saurabh.practice.service;

import com.saurabh.practice.model.Student;

import java.util.List;
import java.util.Optional;

public interface StudentService {
    public Student saveStudent (Student student);
    public List<Student> getAllStudents();
    public void deleteStudent(int id);
    public Optional<Student> getStudent(int id);
}

