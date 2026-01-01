package com.babua.bpl.entity;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import lombok.Data;
import java.time.LocalDateTime;
import java.util.List;

@Document(collection = "learning_patterns")
@Data
public class LearningPattern {
    
    @Id
    private String id; // MongoDB automatically handles ObjectIDs

    private String name;           // e.g., "Sliding Window"
    private String domain;         // e.g., "DSA"
    private String description;    // Pattern ki details
    
    private Integer totalProblems;
    private Integer solvedProblems;
    private Double masteryScore;
    private LocalDateTime lastUpdated;

    // Is list mein is pattern se related saari problems hongi
    private List<Problem> problems;

    @Data
    public static class Problem {
        private String title;       // e.g., "Max Sum Subarray"
        private String difficulty;  // Easy, Medium, Hard
        private String statement;   // Problem description
        private String videoUrl; // Example: "https://www.youtube.com/embed/dQw4w9WgXcQ"
        private boolean completed;  // Status
    }

    // Mastery calculate karne ka method (Postman se save karte waqt kaam aayega)
    public void updateMastery() {
        this.lastUpdated = LocalDateTime.now();
        if (this.totalProblems != null && this.totalProblems > 0) {
            // Hum problems list ki size se bhi totalProblems set kar sakte hain
            if (this.problems != null) {
                this.totalProblems = this.problems.size();
                long solvedCount = this.problems.stream().filter(Problem::isCompleted).count();
                this.solvedProblems = (int) solvedCount;
            }
            this.masteryScore = (double) this.solvedProblems / this.totalProblems * 100;
        } else {
            this.masteryScore = 0.0;
        }
    }
}