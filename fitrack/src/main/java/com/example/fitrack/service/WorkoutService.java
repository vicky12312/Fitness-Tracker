package com.example.fitrack.service;

import java.util.List;
import org.springframework.stereotype.Service;
import com.example.fitrack.model.UserLog;
import com.example.fitrack.model.WorkoutLog;
import com.example.fitrack.repository.WorkoutLogRepository;

@Service
public class WorkoutService {
    
    private final WorkoutLogRepository workoutrepo;
    
    public WorkoutService(WorkoutLogRepository workoutrepo) {
        this.workoutrepo = workoutrepo;
    }
    
    public List<WorkoutLog> findByUserlog(UserLog userlog) {
        return workoutrepo.findByUserlog(userlog);
    }
    public WorkoutLog addLog(WorkoutLog log)
    {
    	return workoutrepo.save(log);
    }
}
