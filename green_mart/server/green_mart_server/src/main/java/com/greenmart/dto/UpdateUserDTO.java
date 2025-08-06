package com.greenmart.dto;

import org.hibernate.validator.constraints.Length;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Pattern;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class UpdateUserDTO {
	
	@NotBlank(message = "First name is required")
	@Length(min = 5, max = 20, message = "Invalid length of first name")
	private String firstName;
	
	@NotBlank(message = "Last name is required")
	@Length(min = 5, max = 20, message = "Invalid length of last name")
	private String lastName;
	
	@NotBlank(message = "Email is required")
	@Email(message = "Invalid email format")
	private String email;
	
	@NotBlank(message = "Phone number is required")
	@Pattern(regexp = "\\+91-\\d{10}", message = "Phone number must start with +91- followed by 10 digits")
	private String phone;
}
