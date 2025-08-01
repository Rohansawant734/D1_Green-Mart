package com.sunbeam.entities;

import java.time.LocalDate;
import java.util.ArrayList;
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
import jakarta.persistence.OneToMany;
import jakarta.persistence.OneToOne;
import jakarta.persistence.Table;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@Entity
@Table(name = "users") // to specify table name
@NoArgsConstructor
@Getter
@Setter
@ToString(callSuper = true, exclude = {"orders", "reviews"})
public class User extends BaseEntity implements UserDetails{
	@Column(length = 20, name = "first_name") // col name , varchar size
	private String firstName;
	
	@Column(length = 30, name = "last_name") // col name , varchar size
	private String lastName;
	
	@Column(length = 30, unique = true) // varchar(30), unique constraint
	private String email;
	
	@Column(length = 300, nullable = false) // not null
	private String password;
	
	@Enumerated(EnumType.STRING) // col type - varchar : name of constant
	@Column(length = 30, name = "user_role")
	private UserRole userRole;	
	
	private boolean isDeleted; // for soft Deleting the user
	
	// 1 User has 1 cart
	// 1 User -----> 1 Cart
	@OneToOne(cascade = CascadeType.ALL, fetch = FetchType.LAZY)
	@JoinColumn(name = "cart_id")
	private Cart cart;
	
	// 1 User has 1 wishlist
	// 1 User -----> 1 Wishlist
	@OneToOne(cascade = CascadeType.ALL, fetch = FetchType.LAZY)
	@JoinColumn(name = "wishlist_id")
	private Wishlist wishlist;
	
	//User 1 ----> Many Address
	@OneToMany(cascade = CascadeType.ALL, orphanRemoval = true)
	@JoinColumn(name = "user_id") // Foreign key in address table
	private List<Address> addresses = new ArrayList<>();
	
	// 1 User <----> Many Orders
	@OneToMany(mappedBy = "user", cascade  = CascadeType.ALL, orphanRemoval = true)
	private List<Order> orders = new ArrayList<>();
	
	// 1 User can have many reviews
	// 1 User <-----> Many reviews
	@OneToMany(mappedBy = "user", cascade = CascadeType.ALL, orphanRemoval = true)
	private List<ProductReviews> reviews = new ArrayList<>();
	
	// parameterized ctor for sign up
	public User(String firstName, String lastName, String email, String password, LocalDate dob, UserRole userRole) {
		super();
		this.firstName = firstName;
		this.lastName = lastName;
		this.email = email;
		this.password = password;
		this.userRole = userRole;
	}

	// adding overloaded parameterized ctor - for JPQL constr expression
	public User(String firstName, String lastName, LocalDate dob) {
		super();
		this.firstName = firstName;
		this.lastName = lastName;
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
