package com.greenmart.dto;

import jakarta.validation.constraints.Max;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.Size;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class AddReviewDTO {

	@Size(max = 200)
	private String comment;
	
	@Min(1)
    @Max(5)
	private int ratings;
	
}
