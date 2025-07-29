package com.sunbeam.entities;

import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Table(name = "wishlist") // to specify table name
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
public class Wishlist extends BaseEntity {
	
	private boolean isRemoved; // for soft removal
	
	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name="product_id",nullable = false)
	private Product myProduct;
}
