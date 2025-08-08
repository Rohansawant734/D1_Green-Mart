package com.greenmart.dto;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@ToString(callSuper = true)
public class UserResponseDTO {

	private String firstName;
	
	private String lastName;
	
	private String email;
	
	private String phone;
	
	private Long userId;
	
	private boolean deleted;	
}
