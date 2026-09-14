package com.example.fitrack.service;




import java.time.LocalDate;
import java.util.List;

import org.springframework.stereotype.Service;

import com.example.fitrack.model.CaloriesLog;
import com.example.fitrack.model.UserLog;
import com.example.fitrack.repository.CalorieLogRepository;

@Service
public class CalorieService {
    
    private final CalorieLogRepository calorieLogRepository;
    
    public CalorieService(CalorieLogRepository calorieLogRepository) {
        this.calorieLogRepository = calorieLogRepository;
    }
    
    // Add calorie log
    public CaloriesLog addLog(CaloriesLog log) {
        return calorieLogRepository.save(log);
    }
    
    // Get logs for a userlog
    public List<CaloriesLog> getLogsByUserlog(UserLog userlog) {
        return calorieLogRepository.findByUserlog(userlog);
    }
    
    // Get logs by date
    public List<CaloriesLog> getLogsByDate(UserLog userlog, LocalDate date) {
        return calorieLogRepository.findByUserlogAndDate(userlog, date);
    }
}
