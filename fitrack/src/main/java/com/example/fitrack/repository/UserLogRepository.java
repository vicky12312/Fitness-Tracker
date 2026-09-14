package com.example.fitrack.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.fitrack.model.UserLog;

public interface UserLogRepository extends JpaRepository<UserLog, Long> {

}
