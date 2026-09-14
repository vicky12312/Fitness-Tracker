package com.example.fitrack.controller;

import com.example.fitrack.dto.UserLogDto;
import com.example.fitrack.model.User;
import com.example.fitrack.model.UserLog;
import com.example.fitrack.service.UserLogService;
import com.example.fitrack.service.UserService;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/profile")
@CrossOrigin(origins = "http://localhost:3000")
public class UserLogController {
    
    private final UserLogService userLogService;
    private final UserService userService;

    public UserLogController(UserLogService userLogService, UserService userService) {
        this.userLogService = userLogService;
        this.userService = userService;
    }

    // Create profile and link to credential
    @PostMapping("/create/{userId}")
    public UserLogDto createProfile(@PathVariable Long userId, @RequestBody UserLogDto dto) {

        // Find the user credential
        User user = userService.getUserById(userId)
                .orElseThrow(() -> new RuntimeException("User not found"));

        // Create new profile
        UserLog userLog = new UserLog();
        userLog.setName(dto.getName());
        userLog.setAge(dto.getAge());
        userLog.setHeight(dto.getHeight());
        userLog.setWeight(dto.getWeight());

        // ---- BMI CALCULATION (ADD THIS PART) ----
        if (dto.getHeight() > 0 && dto.getWeight() > 0) {
            double heightInMeters = dto.getHeight() / 100.0;
            double bmi = dto.getWeight() / (heightInMeters * heightInMeters);

            // round to 1 decimal (optional but recommended)
            bmi = Math.round(bmi * 10.0) / 10.0;

            userLog.setBmi(bmi);
        } else {
            userLog.setBmi(0.0);
        }
        // ----------------------------------------

        // Link profile to credential
        user.setUserlog(userLog);

        // Save (cascade will save UserLog too)
        userService.saveUser(user);

        return toDto(user.getUserlog());
    }


    // Update existing profile
    @PostMapping("/update")
    public UserLogDto updateProfile(@RequestBody UserLogDto dto) {
        UserLog userLog = userLogService.getUserLogById(dto.getId())
                .orElseThrow(() -> new RuntimeException("Profile not found"));

        userLog.setName(dto.getName());
        userLog.setAge(dto.getAge());
        userLog.setHeight(dto.getHeight());
        userLog.setWeight(dto.getWeight());

        UserLog saved = userLogService.saveUserLog(userLog);
        return toDto(saved);
    }

    // Get profile by credential ID
    @GetMapping("/user/{userId}")
    public UserLogDto getProfileByUserId(@PathVariable Long userId) {
        User user = userService.getUserById(userId)
                .orElseThrow(() -> new RuntimeException("User not found"));

        if (user.getUserlog() == null) {
            throw new RuntimeException("Profile not created yet");
        }

        return toDto(user.getUserlog());
    }

    // Get profile by ID (keep your original method too)
    @GetMapping("/{id}")
    public UserLogDto getProfile(@PathVariable Long id) {
        UserLog userLog = userLogService.getUserLogById(id)
                .orElseThrow(() -> new RuntimeException("Profile not found"));
        return toDto(userLog);
    }

    // Convert entity to DTO
    private UserLogDto toDto(UserLog userLog) {
        UserLogDto dto = new UserLogDto();
        dto.setId(userLog.getId());
        dto.setName(userLog.getName());
        dto.setAge(userLog.getAge());
        dto.setHeight(userLog.getHeight());
        dto.setWeight(userLog.getWeight());
        dto.setBmi(userLog.getBmi());
        return dto;
    }
}