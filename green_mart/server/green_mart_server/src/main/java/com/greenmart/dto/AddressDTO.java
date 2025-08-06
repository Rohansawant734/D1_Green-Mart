package com.greenmart.dto;

import com.greenmart.entities.AddressType;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@ToString(callSuper = true)
public class AddressDTO {
 

	private Long id;
 
	private String adrLine1;

	private String adrLine2;

	private String city;

	private String state;

	private String country;

	private String zipCode;

	private AddressType addrType;

}
