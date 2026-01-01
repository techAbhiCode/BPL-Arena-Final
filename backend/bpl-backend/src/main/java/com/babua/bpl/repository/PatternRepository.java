package com.babua.bpl.repository;

import org.springframework.data.mongodb.repository.MongoRepository;

import com.babua.bpl.entity.LearningPattern;

import java.util.List;

public interface PatternRepository extends MongoRepository<LearningPattern, String> {
    List<LearningPattern> findByDomain(String domain);
}
