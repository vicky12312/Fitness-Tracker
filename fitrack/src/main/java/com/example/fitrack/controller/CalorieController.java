package com.example.fitrack.controller;

import java.time.LocalDate;
import java.util.List;
import java.util.stream.Collectors;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.fitrack.dto.CalorieLogDto;
import com.example.fitrack.model.CaloriesLog;
import com.example.fitrack.model.UserLog;
import com.example.fitrack.service.CalorieService;
import com.example.fitrack.service.UserLogService;

@RestController
@RequestMapping("/api/calories")
@CrossOrigin(origins = "http://localhost:3000")
public class CalorieController {

    private final CalorieService calorieService;
    private final UserLogService userLogService;

    public CalorieController(CalorieService calorieService, UserLogService userLogService) {
        this.calorieService = calorieService;
        this.userLogService = userLogService;
    }

    // Add calorie log
    @PostMapping("/add")
    public CalorieLogDto addLog(@RequestBody CalorieLogDto dto) {
        UserLog userLog = userLogService.getUserLogById(dto.getUserlogId())
                .orElseThrow(() -> new RuntimeException("User profile not found"));

        CaloriesLog log = new CaloriesLog();
        log.setFood(dto.getFood());
        log.setCalories(dto.getCalories());
        log.setDate(dto.getDate());
        log.setUserlog(userLog);

        CaloriesLog saved = calorieService.addLog(log);
        return toDto(saved);
    }

    // Get all logs for a user
    @GetMapping("/user/{userlogId}")
    public List<CalorieLogDto> getLogsByUser(@PathVariable Long userlogId) {
        UserLog userLog = userLogService.getUserLogById(userlogId)
                .orElseThrow(() -> new RuntimeException("User profile not found"));

        return calorieService.getLogsByUserlog(userLog).stream()
                .map(this::toDto)
                .collect(Collectors.toList());
    }

    // Get logs by date
    @GetMapping("/user/{userlogId}/date/{date}")
    public List<CalorieLogDto> getLogsByDate(@PathVariable Long userlogId, @PathVariable String date) {
        UserLog userLog = userLogService.getUserLogById(userlogId)
                .orElseThrow(() -> new RuntimeException("User profile not found"));

        LocalDate localDate = LocalDate.parse(date);
        return calorieService.getLogsByDate(userLog, localDate).stream()
                .map(this::toDto)
                .collect(Collectors.toList());
    }

    // Convert entity to DTO
    private CalorieLogDto toDto(CaloriesLog log) {
        CalorieLogDto dto = new CalorieLogDto();
        dto.setId(log.getId());
        dto.setFood(log.getFood());
        dto.setCalories(log.getCalories());
        dto.setDate(log.getDate());
        dto.setUserlogId(log.getUserlog().getId());
        return dto;
    }
}