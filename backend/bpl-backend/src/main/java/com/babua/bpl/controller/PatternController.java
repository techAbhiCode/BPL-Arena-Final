package com.babua.bpl.controller;

import com.babua.bpl.entity.LearningPattern;
import com.babua.bpl.service.PatternService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/patterns")
@RequiredArgsConstructor
@CrossOrigin(origins = "http://localhost:3000")
public class PatternController {

    private final PatternService service;

    @GetMapping
    public List<LearningPattern> getAll() {
        return service.getAllPatterns();
    }

    @PostMapping
    public LearningPattern save(@RequestBody LearningPattern pattern) {
        return service.savePattern(pattern);
    }

    @GetMapping("/{id}")
    public LearningPattern getById(@PathVariable String id) {
        return service.getPatternById(id);
    }

    @PostMapping("/{id}/complete/{index}")
    public LearningPattern completeProblem(
            @PathVariable String id, 
            @PathVariable int index, 
            @RequestParam String userId) { // Added userId param
        return service.markProblemAsCompleted(id, index, userId);
    }
}