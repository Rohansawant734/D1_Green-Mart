package com.greenmart.entities;

import java.util.ArrayList;
import java.util.List;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.OneToMany;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

@Entity
@Getter
@Setter
@NoArgsConstructor 
@AllArgsConstructor   
public class Supplier {
	 @Id
	    @GeneratedValue(strategy = GenerationType.IDENTITY)
	    private Long id;

	    @NotBlank(message = "Supplier name is required")
	    private String name;

	    @NotBlank(message = "Contact number is required")
	    private String contactNumber;

	    @NotBlank(message = "Email is required")
	    @Email(message = "Invalid email format")
	    private String email;

	    @NotBlank(message = "Address is required")
	    @Size(max = 100, message = "Address can't exceed 100 characters")
	    @Column(length = 100)
	    private String address; 
	    
	    @OneToMany(mappedBy = "supplier",cascade = CascadeType.ALL,orphanRemoval = true)
	    private List<Product> products = new ArrayList<>();
}
