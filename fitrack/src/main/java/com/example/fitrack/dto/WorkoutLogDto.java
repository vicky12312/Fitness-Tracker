package com.example.fitrack.dto;

import java.time.LocalDate;

import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor 
public class WorkoutLogDto {
    private Long id;
    private LocalDate date;
    private String title;
    private String notes;
    private Long userlogId;
	public Long getId() {
		return id;
	}
	public void setId(Long id) {
		this.id = id;
	}
	public LocalDate getDate() {
		return date;
	}
	public void setDate(LocalDate date) {
		this.date = date;
	}
	public String getTitle() {
		return title;
	}
	public void setTitle(String title) {
		this.title = title;
	}
	public String getNotes() {
		return notes;
	}
	public void setNotes(String notes) {
		this.notes = notes;
	}
	public Long getUserlogId() {
		return userlogId;
	}
	public void setUserlogId(Long userlogId) {
		this.userlogId = userlogId;
	}
}