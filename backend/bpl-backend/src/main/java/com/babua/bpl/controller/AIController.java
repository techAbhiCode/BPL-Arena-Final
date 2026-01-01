package com.babua.bpl.controller;

import org.springframework.web.bind.annotation.*;
import java.util.Map;

@RestController
@RequestMapping("/api/ai")
@CrossOrigin(origins = "http://localhost:3000")
public class AIController {

    @PostMapping("/hint")
    public Map<String, String> getHint(@RequestBody Map<String, String> request) {
        String problemTitle = request.get("title");
        String hint = "Babua, logic lagao! ";

        // Mock AI Logic (Isse real AI API se bhi connect kar sakte hain baad mein)
        if (problemTitle.contains("Subarray")) {
            hint = "Think about maintaining a 'window' and sliding it as you find better sums.";
        } else if (problemTitle.contains("Substring")) {
            hint = "Use a HashMap to keep track of characters inside your current sliding window.";
        } else {
            hint = "Try to break the problem into smaller parts and see if you can avoid re-calculating values.";
        }

        return Map.of("hint", hint);
    }
}