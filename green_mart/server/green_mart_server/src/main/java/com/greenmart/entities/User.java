package com.greenmart.entities;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.Collection;
import java.util.List;

import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import com.fasterxml.jackson.annotation.JsonIgnore;

//import annotations from JPA
import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.FetchType;
import jakarta.persistence.OneToMany;
import jakarta.persistence.OneToOne;
import jakarta.persistence.Table;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@SuppressWarnings("serial")
@Entity
@Table(name = "users") // to specify table name
@NoArgsConstructor
@Getter
@Setter
@ToString(callSuper = true, exclude = {"addresses", "orders", "reviews"})
public class User extends BaseEntity implements UserDetails{
	@Column(length = 20, name = "first_name") // col name , varchar size
	private String firstName;

	@Column(length = 30, name = "last_name") // col name , varchar size
	private String lastName;

	@Column(length = 30, unique = true) // varchar(30), unique constraint
	private String email;

	@Column(length = 15, nullable = false)// not null
	private String phone;
	
	@Column(length = 300, nullable = false) // not null
	private String password;

	@Enumerated(EnumType.STRING) // col type - varchar : name of constant
	@Column(length = 30, name = "user_role")
	private UserRole userRole;

	private boolean isDeleted; // for soft Deleting the user

	// 1 User has 1 cart
	// 1 User -----> 1 Cart
	@OneToOne(mappedBy = "cartUser", cascade = CascadeType.ALL, fetch = FetchType.LAZY, orphanRemoval = true)
	private Cart cart;

	// 1 User has 1 wishlist
	// 1 User -----> 1 WishlistItems
	@OneToMany(mappedBy = "user", cascade = CascadeType.ALL, orphanRemoval = true)
	private List<Wishlist> wishlistItems = new ArrayList<>();

	// User 1 <----> Many Address
	@OneToMany(mappedBy = "user", cascade = CascadeType.ALL, orphanRemoval = true)
	@JsonIgnore
	private List<Address> addresses = new ArrayList<>();

	// 1 User <----> Many Orders
	@OneToMany(mappedBy = "user", cascade = CascadeType.ALL, orphanRemoval = true)
	@JsonIgnore
	private List<Order> orders = new ArrayList<>();

	// 1 User can have many reviews
	// 1 User <-----> Many reviews
	@OneToMany(mappedBy = "user", cascade = CascadeType.ALL, orphanRemoval = true)
	@JsonIgnore
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
		return List.of(new SimpleGrantedAuthority(this.userRole.name()));
	}

	@Override
	public String getUsername() {
		// TODO Auto-generated method stub
		return this.email;
	}

	// add helper method to add address
	public void addAddress(Address address) {
		this.addresses.add(address);
		address.setUser(this);
	}

	// add helper method to remove remove address
	public void removeAddress(Address address) {
		this.addresses.remove(address);
		address.setUser(null);
	}
	
	// add helper method to add review
	public void addReview(ProductReviews review) {
		this.reviews.add(review);
		review.setUser(this);
	}
	
	// add helper method to remove review
	public void removeReview(ProductReviews review) {
		this.reviews.remove(review);
		review.setUser(null);
	}

	@Override
	public boolean isAccountNonExpired() {
	    return true;
	}

	@Override
	public boolean isAccountNonLocked() {
	    return true;
	}

	@Override
	public boolean isCredentialsNonExpired() {
	    return true;
	}

	@Override
	public boolean isEnabled() {
	    return !this.isDeleted(); // or return true if you don't treat deleted users as disabled
	}

}
