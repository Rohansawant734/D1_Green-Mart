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

@Entity
@Table(name = "cart") // to specify table name
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
public class Cart extends BaseEntity {
	
	@Column(length = 10)
	private long quantity;
	
	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name="product_id",nullable = false)
	private Product myProduct;
}
