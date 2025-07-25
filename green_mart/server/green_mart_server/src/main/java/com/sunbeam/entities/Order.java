package com.sunbeam.entities;

import java.time.LocalDateTime;
import java.time.LocalTime;
import java.util.ArrayList;
import java.util.List;

import org.hibernate.annotations.CreationTimestamp;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@NoArgsConstructor
@Getter
@Setter
@Entity
@Table(name = "orders")
public class Order extends BaseEntity {

	@Enumerated(EnumType.STRING)
	
	private OrderStatus orderStatus;

	private double orderAmount;

	@CreationTimestamp
	private LocalTime orderDateTime;

	// the datetime at which order was actually delivered(i.e status is updated)
	private LocalDateTime deliveryDateTime;

	private int deliveryCharges;

	@ManyToOne //uni dir association
	@JoinColumn(nullable = false)
	private UserEntity customer;

	@ManyToOne //uni dir association
	@JoinColumn(nullable = false)
	private Restaurant restaurant;

	@OneToMany(cascade = CascadeType.ALL, 
			mappedBy = "order", orphanRemoval = true)
	private List<OrderLine> orderLines = new ArrayList<>();

	// helper methods to add n remove the order item
	public void addOrderLine(OrderLine line) {
		orderLines.add(line);
		line.setOrder(this);
		this.orderAmount += line.getSubTotal();
	}
	public void removeOrderItem(OrderLine line) {
		orderLines.remove(line);
		line.setOrder(null);
		this.orderAmount -= line.getSubTotal();
	}

}
