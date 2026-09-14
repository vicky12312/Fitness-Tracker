package com.example.fitrack.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.fitrack.model.ActivityLog;
import com.example.fitrack.model.User;
import com.example.fitrack.model.UserLog;

public interface ActivityLogRepository extends JpaRepository<ActivityLog, Long> {
    List<ActivityLog> findByUserlog(UserLog userlog);  // ← Match entity field name
}