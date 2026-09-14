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

import com.example.fitrack.dto.WorkoutLogDto;
import com.example.fitrack.model.UserLog;
import com.example.fitrack.model.WorkoutLog;

import com.example.fitrack.service.UserLogService;
import com.example.fitrack.service.WorkoutService;

@RestController
@RequestMapping("/api/workout")
@CrossOrigin(origins = "http://localhost:3000")
public class WorkoutController {

    private final WorkoutService workoutService;
    private final UserLogService userLogService;

    public WorkoutController(WorkoutService workoutService, UserLogService userLogService) {
        this.workoutService = workoutService;
        this.userLogService = userLogService;
    }

    // Add workout log
    @PostMapping("/add")
    public WorkoutLogDto addLog(@RequestBody WorkoutLogDto dto) {
        UserLog userLog = userLogService.getUserLogById(dto.getUserlogId())
                .orElseThrow(() -> new RuntimeException("User profile not found"));

        WorkoutLog log = new WorkoutLog();
        log.setDate(dto.getDate());
        log.setTitle(dto.getTitle());
        log.setNotes(dto.getNotes());
        log.setUserlog(userLog);

        WorkoutLog saved = workoutService.addLog(log);
        return toDto(saved);
    }

    // Get all logs for a user
    @GetMapping("/user/{userlogId}")
    public List<WorkoutLogDto> getLogsByUser(@PathVariable Long userlogId) {
        UserLog userLog = userLogService.getUserLogById(userlogId)
                .orElseThrow(() -> new RuntimeException("User profile not found"));

        return workoutService.findByUserlog(userLog).stream()
                .map(this::toDto)
                .collect(Collectors.toList());
    }

    // Convert entity to DTO
    private WorkoutLogDto toDto(WorkoutLog log) {
        WorkoutLogDto dto = new WorkoutLogDto();
        dto.setId(log.getId());
        dto.setDate(log.getDate());
        dto.setTitle(log.getTitle());
        dto.setNotes(log.getNotes());
        dto.setUserlogId(log.getUserlog().getId());
        return dto;
    }
}