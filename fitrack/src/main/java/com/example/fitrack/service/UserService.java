package com.example.fitrack.service;

import org.springframework.stereotype.Service;
import com.example.fitrack.model.User;
import com.example.fitrack.repository.UserRepository;
import java.util.Optional;

@Service
public class UserService {
    
    private final UserRepository userRepository;
    
    public UserService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }
    
    // Register new user
    public User saveUser(User user) {
    	  Optional<User> existing = userRepository.findByUsername(user.getUsername());
    	
    	    
    	    return userRepository.save(user);
    }
    public Optional<User> getUserById(Long id) {
        return userRepository.findById(id);
    }
    // Login - find by username
    public Optional<User> getUserByUsername(String username) {
        return userRepository.findByUsername(username);
    }
}