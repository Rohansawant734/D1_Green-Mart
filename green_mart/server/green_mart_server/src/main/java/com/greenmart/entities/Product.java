package com.greenmart.entities;

import java.util.ArrayList;
import java.util.List;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@Entity
@Table(name = "products") // to specify table name
@NoArgsConstructor
@Getter
@Setter
@ToString(callSuper = true, exclude = {"myCategory", "carts", "wishLists"})
public class Product extends BaseEntity {
	@Column(name = "product_name", length = 20)
	private String prodName;
	
	@Column(length = 200)
	private String description;
	
	private double price;
	
	private String unit;
	
	@Column(name = "stock_quantity")
	private int stockQuantity;
	
	@Column(name = "product_image")
	private String prodImgUrl;
	
	@Column(name = "in_stock")
	private boolean inStock; // for soft deleting the product
	
	// 1 Product can be in multiple carts
	// 1 Product <-----> Many Carts
	@OneToMany(mappedBy = "myProduct", cascade = CascadeType.ALL, orphanRemoval = true)
	private List<Cart> carts = new ArrayList<>();
	
	// 1 Product can be in multiple wishlist
	// 1 Product <-----> Many Wishlists
	@OneToMany(mappedBy = "myProduct", cascade = CascadeType.ALL, orphanRemoval = true)
	private List<Wishlist> wishLists = new ArrayList<>();
	
	// Many products can belong to one category
	// Many Products <-----> 1 Category
	@ManyToOne
	@JoinColumn(name="category_id", nullable = false)
	private Category myCategory;
	
	// 1 Product has many reviews
	// 1 Product ----> Many reviews
	@OneToMany(cascade = CascadeType.ALL, orphanRemoval = true)
	@JoinColumn(name = "product_id")
	private List<ProductReviews> reviews = new ArrayList<>();
}
