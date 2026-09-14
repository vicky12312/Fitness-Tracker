package com.example.fitrack.controller;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.fitrack.dto.ActivityLogDto;
import com.example.fitrack.model.ActivityLog;
import com.example.fitrack.model.UserLog;
import com.example.fitrack.service.ActivityService;
import com.example.fitrack.service.UserLogService;

@RestController
@RequestMapping("/api/activity")
public class ActivityController {

    private final ActivityService activityService;
    private final UserLogService userLogService;

    public ActivityController(ActivityService activityService, UserLogService userLogService) {
        this.activityService = activityService;
        this.userLogService = userLogService;
    }

    // Add activity log
    @PostMapping("/add")
    public ActivityLogDto addLog(@RequestBody ActivityLogDto dto) {
        UserLog userLog = userLogService.getUserLogById(dto.getUserlogId())
                .orElseThrow(() -> new RuntimeException("User profile not found"));

        ActivityLog log = new ActivityLog();
        log.setSteps(dto.getSteps());
        log.setWaterIntake(dto.getWaterIntake());
        log.setDate(dto.getDate());
        log.setUserlog(userLog);

        ActivityLog saved = activityService.addLog(log);
        return toDto(saved);
    }

    // Get all logs for a user
    @GetMapping("/user/{userlogId}")
    public List<ActivityLogDto> getLogsByUser(@PathVariable Long userlogId) {
        UserLog userLog = userLogService.getUserLogById(userlogId)
                .orElseThrow(() -> new RuntimeException("User profile not found"));

        return activityService.findByUserlog(userLog).stream()
                .map(this::toDto)
                .collect(Collectors.toList());
    }

    // Convert entity to DTO
    private ActivityLogDto toDto(ActivityLog log) {
        ActivityLogDto dto = new ActivityLogDto();
        dto.setId(log.getId());
        dto.setSteps(log.getSteps());
        dto.setWaterIntake(log.getWaterIntake());
        dto.setDate(log.getDate());
        dto.setUserlogId(log.getUserlog().getId());
        return dto;
    }
}