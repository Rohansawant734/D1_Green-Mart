package com.sunbeam.entities;

import java.util.List;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
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
@Table(name = "cart") // to specify table name
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
@ToString(callSuper = true, exclude = "myProduct")
public class Cart extends BaseEntity {
	
	@Column(nullable = false)
	private long quantity;
	
	// Many cart can contain the same product
	// Many Cart <----> 1 Product
	@ManyToOne
	@JoinColumn(name="product_id",nullable = false)
	private Product myProduct;
}
