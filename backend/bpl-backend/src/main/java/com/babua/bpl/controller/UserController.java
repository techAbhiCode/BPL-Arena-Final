package com.babua.bpl.controller;

import java.util.List;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.babua.bpl.entity.User;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.query.Query;
import org.springframework.data.domain.Sort;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api/users")
@CrossOrigin(origins = "http://localhost:3000")
@RequiredArgsConstructor
public class UserController {
    
    private final MongoTemplate mongoTemplate; // Queries ke liye

    @GetMapping("/leaderboard")
    public List<User> getLeaderboard() {
        Query query = new Query();
        query.with(Sort.by(Sort.Direction.DESC, "points")); // Jyada points wala upar
        return mongoTemplate.find(query, User.class);
    }
}
