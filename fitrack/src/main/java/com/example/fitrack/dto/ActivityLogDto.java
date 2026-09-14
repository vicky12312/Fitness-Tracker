package com.example.fitrack.dto;

import java.time.LocalDate;

import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor 
public class ActivityLogDto {
    private Long id;
    private int steps;
    private int waterIntake;
    private LocalDate date;
    private Long userlogId;
	public Long getId() {
		return id;
	}
	public void setId(Long id) {
		this.id = id;
	}
	public int getSteps() {
		return steps;
	}
	public void setSteps(int steps) {
		this.steps = steps;
	}
	public int getWaterIntake() {
		return waterIntake;
	}
	public void setWaterIntake(int waterIntake) {
		this.waterIntake = waterIntake;
	}
	public LocalDate getDate() {
		return date;
	}
	public void setDate(LocalDate date) {
		this.date = date;
	}
	public Long getUserlogId() {
		return userlogId;
	}
	public void setUserlogId(Long userlogId) {
		this.userlogId = userlogId;
	}
}