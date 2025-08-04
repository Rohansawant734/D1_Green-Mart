package com.greenmart.dto;

import org.hibernate.validator.constraints.Length;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class UpdateUserDTO {
	
	@NotBlank(message = "First name is required")
	@Length(min = 5, max = 20, message = "invalid length of first name")
	private String firstName;
	
	@NotBlank(message = "Last name is required")
	@Length(min = 5, max = 20, message = "invalid length of last name")
	private String lastName;
	
	@NotBlank(message = "Email is required")
	@Email(message = "invalid email format")
	private String email;
}
