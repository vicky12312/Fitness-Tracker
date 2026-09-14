package com.example.fitrack.repository;

import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import com.example.fitrack.model.UserLog;
import com.example.fitrack.model.WorkoutLog;

public interface WorkoutLogRepository extends JpaRepository<WorkoutLog, Long> {
    List<WorkoutLog> findByUserlog(UserLog userlog);
}