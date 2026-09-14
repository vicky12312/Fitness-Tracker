package com.example.fitrack.model;

import java.util.List;

import com.fasterxml.jackson.annotation.JsonIgnore;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.OneToMany;
import jakarta.persistence.OneToOne;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "users")
public class UserLog {
@Id
@GeneratedValue(strategy = GenerationType.IDENTITY)
private Long id;
private String name;
private int age;
private double height;
private double weight;
private double bmi;
@OneToOne(mappedBy = "userlog")
@JsonIgnore
private User credential;
@JsonIgnore
@OneToMany(mappedBy = "userlog", cascade = CascadeType.ALL)
private List<CaloriesLog> calorieLogs;
@JsonIgnore
@OneToMany(mappedBy = "userlog", cascade = CascadeType.ALL)
private List<ActivityLog> activityLogs;
@JsonIgnore
@OneToMany(mappedBy = "userlog", cascade = CascadeType.ALL)
private List<WorkoutLog> workoutLogs;

public long getId() {
	return id;
}

public void setId(long id) {
	this.id = id;
}

public String getName() {
	return name;
}

public void setName(String name) {
	this.name = name;
}

public int getAge() {
	return age;
}

public void setAge(int age) {
	this.age = age;
}

public double getHeight() {
	return height;
}

public void setHeight(double height) {
	this.height = height;
}

public double getWeight() {
	return weight;
}

public void setWeight(double weight) {
	this.weight = weight;
}

public double getBmi() {
	return bmi;
}

public void setBmi(double bmi) {
	this.bmi = bmi;
}

public User getCredential() {
	return credential;
}

public void setCredential(User credential) {
	this.credential = credential;
}

public List<CaloriesLog> getCalorieLogs() {
	return calorieLogs;
}

public void setCalorieLogs(List<CaloriesLog> calorieLogs) {
	this.calorieLogs = calorieLogs;
}

public List<ActivityLog> getActivityLogs() {
	return activityLogs;
}

public void setActivityLogs(List<ActivityLog> activityLogs) {
	this.activityLogs = activityLogs;
}

public List<WorkoutLog> getWorkoutLogs() {
	return workoutLogs;
}

public void setWorkoutLogs(List<WorkoutLog> workoutLogs) {
	this.workoutLogs = workoutLogs;
}
}
