package com.greenmart.dto;

import com.greenmart.entities.AddressType;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class AddAddressDTO {
	@NotBlank(message = "Please enter the address line 1")
	private String adrLine1;
	
	@NotBlank(message = "Please enter the address line 2")
	private String adrLine2;

	@NotBlank(message = "Please enter the city")
	private String city;
	
	@NotBlank(message = "Please enter the state")
	private String state;
	
	@NotBlank(message = "Please enter the country")
	private String country;
	
	@NotBlank(message = "Please enter the zip code")
	private String zipCode;
	
	@NotNull(message = "Please enter the address type")
	private AddressType addrType;	

}
