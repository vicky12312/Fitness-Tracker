package com.example.fitrack.service;

import java.util.Optional;

import org.springframework.stereotype.Service;

import com.example.fitrack.model.User;
import com.example.fitrack.model.UserLog;
import com.example.fitrack.repository.UserLogRepository;

@Service
public class UserLogService {
    
    private final UserLogRepository userLogRepository;
    public UserLogService(UserLogRepository userLogRepository) {
        this.userLogRepository = userLogRepository;  
    }
    
    // Create/Update profile
    public UserLog saveUserLog(UserLog userlog) {
        // Auto-calculate BMI if height and weight exist
        if (userlog.getHeight() > 0 && userlog.getWeight() > 0) {
            double heightInMeters = userlog.getHeight() / 100.0;
            double bmi = userlog.getWeight() / (heightInMeters * heightInMeters);
            userlog.setBmi(Math.round(bmi * 10.0) / 10.0);
        }
        return userLogRepository.save(userlog);
        
    }
    
    // Get profile by ID
    public Optional<UserLog> getUserLogById(Long id) {
        return userLogRepository.findById(id);
    }
}