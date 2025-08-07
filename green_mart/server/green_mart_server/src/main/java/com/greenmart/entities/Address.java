package com.greenmart.entities;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.FetchType;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@Entity
@Table(name = "address")
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
@ToString(callSuper = true)
public class Address extends BaseEntity {

	@Column(name = "adr_line1", length = 100)
	private String adrLine1;

	@Column(name = "adr_line2", length = 100)
	private String adrLine2;

	@Column(length = 20)
	private String city;

	@Column(length = 20)
	private String state;

	@Column(length = 20)
	private String country;

	@Column(length = 20, name = "zip_code")
	private String zipCode;

	@Enumerated(EnumType.STRING) // col type - varchar : name of constant
	@Column(length = 30, name = "addr_type")
	private AddressType addrType;

	// Many Address can belong to one user
	// Many Address <-----> 1 User
	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "user_id", nullable = false)
	private User user;

}
