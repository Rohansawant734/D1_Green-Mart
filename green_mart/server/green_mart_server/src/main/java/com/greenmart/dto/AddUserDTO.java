package com.greenmart.dto;

import org.hibernate.validator.constraints.Length;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.fasterxml.jackson.annotation.JsonProperty.Access;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Pattern;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class AddUserDTO {

	@NotBlank(message = "First name is required")
	@Length(min = 1, max = 20, message = "invalid length of first name")
	private String firstName;
	
	@NotBlank(message = "Last name is required")
	@Length(min = 1, max = 20, message = "invalid length of last name")
	private String lastName;
	
	@NotBlank(message = "Email is required")
	@Email(message = "invalid email format")
	private String email;
	
	@NotBlank(message = "Phone number is required")
	@Pattern(regexp = "\\+91-\\d{10}", message = "Phone number must start with +91- followed by 10 digits")
	private String phone;
	
	@NotBlank(message = "Please enter a password for your account")
	@Pattern(regexp = "((?=.*\\d)(?=.*[a-z])(?=.*[#@$*]).{5,20})", 
	message = "Invalid password format. Password must be 5-20 characters, include digits, lowercase letters, and special characters")
	//will skipped during serialization, will write during de-serialization
	@JsonProperty(access = Access.WRITE_ONLY)
	private String password;
			
	
}
