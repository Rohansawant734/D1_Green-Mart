package com.greenmart.entities;

import jakarta.persistence.Entity;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@Entity
@Table(name = "wishlist") // to specify table name
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
@ToString(callSuper = true, exclude = { "myProduct", "user" })
public class Wishlist extends BaseEntity {

	@ManyToOne
	@JoinColumn(name = "user_id", nullable = false)
	private User user;

	// Many Wishlist can contain the same product
	// Many Wishlist <-----> 1 Product
	@ManyToOne
	@JoinColumn(name = "product_id", nullable = false)
	private Product myProduct;
}
