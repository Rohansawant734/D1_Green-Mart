package com.greenmart.dto;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.fasterxml.jackson.annotation.JsonProperty.Access;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Pattern;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class UpdatePasswordDTO {

	@NotBlank(message = "Please enter your old password")
	//will skipped during serialization, will write during de-serialization
	@JsonProperty(access = Access.WRITE_ONLY)
	private String oldPassword;
	
	@NotBlank(message = "Please enter the new password")
	@Pattern(regexp = "((?=.*\\d)(?=.*[a-z])(?=.*[#@$*]).{5,20})", 
	message = "Invalid password format. Password must be 5-20 characters, include digits, lowercase letters, and special characters")
	@JsonProperty(access = Access.WRITE_ONLY)
	private String newPassword;
}
