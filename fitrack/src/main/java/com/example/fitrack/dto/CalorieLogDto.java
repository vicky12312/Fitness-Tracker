package com.example.fitrack.dto;

import java.time.LocalDate;

import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor 
public class CalorieLogDto {
    private Long id;
    private String food;
    private int calories;
    private LocalDate date;
    private Long userlogId;  // Instead of full Userlog object
	public Long getId() {
		return id;
	}
	public void setId(Long id) {
		this.id = id;
	}
	public String getFood() {
		return food;
	}
	public void setFood(String food) {
		this.food = food;
	}
	public int getCalories() {
		return calories;
	}
	public void setCalories(int calories) {
		this.calories = calories;
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