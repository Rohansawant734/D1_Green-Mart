package com.sunbeam.entities;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Table(name = "reviews") // to specify table name
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
public class ProductReviews extends BaseEntity {
	@Column(length = 200)
	private String comment;
	
	private int ratings;
	
	// Many Reviews can belong to one user
	// Many Reviews <-----> 1 User
	@ManyToOne
	@JoinColumn(name = "user_id", nullable = false)
	private User user;
	
}
