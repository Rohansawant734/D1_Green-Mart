package com.greenmart.dto;

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
