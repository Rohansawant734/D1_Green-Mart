 package com.greenmart.entities;

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

@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
@Entity
@Table(name = "order_lines")
@ToString(callSuper = true, exclude = "order")
public class OrderLine extends BaseEntity {
	private int quantity;
	private double discount;
	private double subTotal;
	private double price;//price after discount - if any

	// Many OrderLines can belong to 1 Order
	// Many OrderLines <----> 1 Order
	@ManyToOne
	@JoinColumn(name = "order_id", nullable = false)
	private Order order;
	
	// Many OrderLine can refer to the same product
	// Many OrderLine ----> 1 Product
	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "product_id", nullable = false)
	private Product product;
}
