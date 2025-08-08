package com.greenmart.dto;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@ToString
public class JWTResponseDTO {

	private String token;
	private String firstName;
	private String lastName;
	private String email;
	private String phone;
	private Long userId;
	private String userRole;
}
