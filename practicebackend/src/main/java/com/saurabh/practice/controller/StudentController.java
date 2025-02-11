package com.saurabh.practice.controller;

import com.saurabh.practice.model.Student;
import com.saurabh.practice.service.StudentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/student")
@CrossOrigin
public class StudentController {

    @Autowired
    private StudentService studentService;

    @PostMapping("/add")
    public String add(@RequestBody Student student) {
        studentService.saveStudent(student);
        return "New Student added";
    }

    @GetMapping("/getAll")
    public ResponseEntity<List<Student>> getAllStudents() {
        System.out.println("Get all controller ----0111");
        List<Student> students = studentService.getAllStudents();
        if (students.isEmpty()) {
            return ResponseEntity.noContent().build(); // Returns 204 No Content
        }
        return ResponseEntity.ok(students); // Returns 200 OK with student list
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<String> deleteStudent(@PathVariable int id) {
        studentService.deleteStudent(id);
        return ResponseEntity.ok("Student deleted successfully");
    }


    @GetMapping("/{id}")
    public ResponseEntity<Optional<Student>> getStudent(@PathVariable int id){
        Optional<Student> existingStudentOpt = studentService.getStudent(id);
        return ResponseEntity.ok(existingStudentOpt);

    }


    @PutMapping("/{id}")
    public ResponseEntity<Student> editStudent(@PathVariable int id, @RequestBody Student updatedStudent) {
        // Find the existing student in the database
        Optional<Student> existingStudentOpt = studentService.getStudent(id);

        if (existingStudentOpt.isPresent()) {
            Student existingStudent = existingStudentOpt.get();

            // Update the fields
            existingStudent.setName(updatedStudent.getName());

            existingStudent.setAddress(updatedStudent.getAddress());

            // Save the updated student
            Student savedStudent = studentService.saveStudent(existingStudent);

            return ResponseEntity.ok(savedStudent);
        } else {
            return ResponseEntity.notFound().build();
        }
    }
}
