package com.babua.bpl.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.babua.bpl.dto.SignupRequest;
import com.babua.bpl.dto.LoginRequest;
import com.babua.bpl.entity.User;
import com.babua.bpl.repository.UserRepository;
import org.springframework.http.HttpStatus;

import lombok.RequiredArgsConstructor;

// src/main/java/com/babua/bpl/controller/AuthController.java
@RestController
@RequestMapping("/api/auth")
@CrossOrigin(origins = "http://localhost:3000")
@RequiredArgsConstructor
public class AuthController {

    private final UserRepository userRepository; // UserRepository interface banana padega
    // BCrypt password encoder baad mein add karenge security config mein

    @PostMapping("/signup")
    public ResponseEntity<?> registerUser(@RequestBody SignupRequest signupRequest) {
        if (userRepository.existsByUsername(signupRequest.getUsername())) {
            return ResponseEntity.badRequest().body("Username pehle se liya ja chuka hai!");
        }

        User user = new User();
        user.setUsername(signupRequest.getUsername());
        user.setEmail(signupRequest.getEmail());
        // Abhi ke liye plain password (BCrypt baad mein security ke saath lagayenge)
        user.setPassword(signupRequest.getPassword()); 
        
        userRepository.save(user);
        return ResponseEntity.ok("Babua registered successfully! 🎉");
    }

    @PostMapping("/login")
    public ResponseEntity<?> loginUser(@RequestBody LoginRequest loginRequest) {
        User user = userRepository.findByUsername(loginRequest.getUsername());
        
        if (user != null && user.getPassword().equals(loginRequest.getPassword())) {
            return ResponseEntity.ok(user); // Login success
        }
        
        return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Invalid username or password!");
    }
}
