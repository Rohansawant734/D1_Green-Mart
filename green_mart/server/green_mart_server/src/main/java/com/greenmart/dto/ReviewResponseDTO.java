package com.greenmart.dto;

import jakarta.validation.constraints.Max;
import jakarta.validation.constraints.Min;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@ToString
public class ReviewResponseDTO extends BaseDTO{
	private String comment;
	private int ratings;
	private String firstName;
	private String lastName;
	private String productName;
	
}
