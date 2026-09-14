package com.example.fitrack.service;

import java.util.List;

import org.springframework.stereotype.Service;

import com.example.fitrack.model.ActivityLog;
import com.example.fitrack.model.User;
import com.example.fitrack.model.UserLog;
import com.example.fitrack.repository.ActivityLogRepository;
@Service

public class ActivityService {
    
    private final ActivityLogRepository activityrepo;
    
    public ActivityService(ActivityLogRepository activityrepo) {
        this.activityrepo = activityrepo;
    }
    
    public List<ActivityLog> findByUserlog(UserLog userlog) {  // ← Changed parameter type & name
        return activityrepo.findByUserlog(userlog);
    }

	public ActivityLog addLog(ActivityLog log) {
		// TODO Auto-generated method stub
		return activityrepo.save(log);
	}
}
