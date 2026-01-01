package com.babua.bpl.entity;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.index.Indexed;
import org.springframework.data.mongodb.core.mapping.Document;
import lombok.Data;
@Document(collection = "users")
@Data
public class User {
    @Id
    private String id;

    @Indexed(unique = true)
    private String username;

    private String password; // hashed password
    private String email;
    private Integer totalSolved = 0;
    private Integer points = 0; // logic: 1 easy = 10, 1 med = 20, 1 hard = 30
    private String rank = "Rookie"; // e.g., "Code Rookie", "Logic Legend"
}
