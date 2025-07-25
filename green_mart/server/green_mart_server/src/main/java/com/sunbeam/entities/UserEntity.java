package com.sunbeam.entities;

import java.time.LocalDate;
import java.util.Collection;
import java.util.List;

import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

//import annotations from JPA
import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.FetchType;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.Lob;
import jakarta.persistence.OneToOne;
import jakarta.persistence.Table;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Table(name = "new_users") // to specify table name
@NoArgsConstructor
@Getter
@Setter
public class UserEntity extends BaseEntity implements UserDetails{
	@Column(length = 20, name = "first_name") // col name , varchar size
	private String firstName;
	@Column(length = 30, name = "last_name") // col name , varchar size
	private String lastName;
	@Column(length = 30, unique = true) // varchar(30), unique constraint
	private String email;
	@Column(length = 300, nullable = false) // not null
	private String password;
	private LocalDate dob;
	@Enumerated(EnumType.STRING) // col type - varchar : name of constant
	@Column(length = 30, name = "user_role")
	private UserRole userRole;
	@Lob // col type for mysql - longblob
	private byte[] image;
	@Column(name = "subscription_amount")
	private double subscriptionAmount;	
	//User 1 ----> 1 Address
	@OneToOne(cascade = CascadeType.ALL,fetch=FetchType.LAZY)
	@JoinColumn(name="address_id")
	private Address myAddress;

	// parameterized ctor for sign up
	public UserEntity(String firstName, String lastName, String email, String password, LocalDate dob, UserRole userRole,
			double subscriptionAmount) {
		super();
		this.firstName = firstName;
		this.lastName = lastName;
		this.email = email;
		this.password = password;
		this.dob = dob;
		this.userRole = userRole;
		this.subscriptionAmount = subscriptionAmount;
	}

	// adding overloaded parameterized ctor - for JPQL constr expression
	public UserEntity(String firstName, String lastName, LocalDate dob) {
		super();
		this.firstName = firstName;
		this.lastName = lastName;
		this.dob = dob;
	}

	@Override
	public Collection<? extends GrantedAuthority> getAuthorities() {
		// TODO Auto-generated method stub
		return List.of(new SimpleGrantedAuthority
				(this.userRole.name()));
	}

	@Override
	public String getUsername() {
		// TODO Auto-generated method stub
		return this.email;
	}
	

}
