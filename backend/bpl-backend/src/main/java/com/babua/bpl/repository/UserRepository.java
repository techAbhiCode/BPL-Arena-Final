package com.babua.bpl.repository;

import org.springframework.data.mongodb.repository.MongoRepository;

import com.babua.bpl.entity.User;

public interface UserRepository extends MongoRepository<User, String> {
    User findByUsername(String username);
    Boolean existsByUsername(String username);
}
