package com.sunbeam.entities;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@Entity
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
@ToString(callSuper = true)
public class Address extends BaseEntity {
	@Column(name="adr_line1",length=100)
	private String adrLine1;
	
	@Column(name="adr_line2",length=100)
	private String adrLine2;
	
	@Column(length=20)
	private String city;
	
	@Column(length=20)
	private String state;
	
	@Column(length=20)
	private String country;
	
	@Column(length=20,name="zip_code")
	private String zipCode;
	
	private boolean isDeleted; // for soft deleting the address
	
	@Enumerated(EnumType.STRING) // col type - varchar : name of constant
	@Column(length = 30, name = "addr_type")
	private AddressType addrType;	

}
