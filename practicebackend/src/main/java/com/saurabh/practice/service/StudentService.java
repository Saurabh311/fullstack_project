package com.saurabh.practice.service;

import com.saurabh.practice.model.Student;

import java.util.List;

public interface StudentService {
    public Student saveStudent (Student student);
    public List<Student> getAllStudents();
}

