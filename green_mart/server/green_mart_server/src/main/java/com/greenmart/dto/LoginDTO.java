package com.greenmart.dto;

import jakarta.validation.constraints.NotBlank;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@ToString
public class LoginDTO {

	@NotBlank
	private String email;
	
	@NotBlank
	private String password;
}
