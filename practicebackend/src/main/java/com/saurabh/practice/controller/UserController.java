package com.saurabh.practice.controller;

import com.saurabh.practice.entity.User;
import com.saurabh.practice.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/auth")
@CrossOrigin(origins = "http://localhost:3000")
public class UserController {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @PostMapping("/register")
    public ResponseEntity<String> add(@RequestBody User userRequest) {
        System.out.println("user add request 001");
        System.out.println("New user "+ userRequest.getUserName());
        System.out.println("New user "+ userRequest.getPassword());
        System.out.println("New user "+ userRequest.getRole());
        // Create a new user instance
        User user = new User();
        user.setRole(userRequest.getRole());
        user.setUserName(userRequest.getUserName());
        System.out.println("user add request 001");

        // Encode password
        String encodedPassword = passwordEncoder.encode(userRequest.getPassword());
        System.out.println("user add request 002");
        user.setPassword(encodedPassword);
        System.out.println("user add request 003");
        System.out.println(" user "+ user.getUserName());
        System.out.println(" user "+ user.getPassword());
        System.out.println(" user "+ user.getRole());

        // Save user in the repository
        userRepository.save(user);
        System.out.println("user added");

        // Return a response with 201 status and a message
        return ResponseEntity.status(HttpStatus.CREATED).body("New user added");
    }
}
