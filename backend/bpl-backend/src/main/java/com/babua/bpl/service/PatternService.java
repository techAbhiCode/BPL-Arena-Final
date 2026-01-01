package com.babua.bpl.service;

import com.babua.bpl.entity.LearningPattern;
import com.babua.bpl.entity.User;
import com.babua.bpl.repository.PatternRepository;
import com.babua.bpl.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
@RequiredArgsConstructor
public class PatternService {

    private final PatternRepository repository;
    private final UserRepository userRepository; // Added this

    public List<LearningPattern> getAllPatterns() {
        return repository.findAll();
    }

    public LearningPattern savePattern(LearningPattern pattern) {
        pattern.updateMastery();
        return repository.save(pattern);
    }

    public LearningPattern getPatternById(String id) {
        return repository.findById(id).orElse(null);
    }

    public LearningPattern markProblemAsCompleted(String patternId, int problemIndex, String userId) {
        LearningPattern pattern = repository.findById(patternId).orElse(null);
        User user = userRepository.findById(userId).orElse(null);
        
        if (pattern != null && user != null && pattern.getProblems() != null && problemIndex < pattern.getProblems().size()) {
            LearningPattern.Problem prob = pattern.getProblems().get(problemIndex);
            
            if (!prob.isCompleted()) {
                prob.setCompleted(true);
                
                // Logic for XP Points
                int pointsToAdd = 10;
                if ("Medium".equalsIgnoreCase(prob.getDifficulty())) pointsToAdd = 20;
                if ("Hard".equalsIgnoreCase(prob.getDifficulty())) pointsToAdd = 30;
                
                user.setPoints((user.getPoints() == null ? 0 : user.getPoints()) + pointsToAdd);
                user.setTotalSolved((user.getTotalSolved() == null ? 0 : user.getTotalSolved()) + 1);
                
                userRepository.save(user);
            }
            
            pattern.updateMastery();
            return repository.save(pattern);
        }
        return null;
    }
}