package com.example.fitrack.repository;
import java.util.*;
import java.time.LocalDate;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.fitrack.model.CaloriesLog;
import com.example.fitrack.model.User;
import com.example.fitrack.model.UserLog;

public interface CalorieLogRepository extends JpaRepository<CaloriesLog, Long> {
	 List<CaloriesLog> findByUserlog(UserLog userlog);
	    List<CaloriesLog> findByUserlogAndDate(UserLog userlog, LocalDate date);
}
