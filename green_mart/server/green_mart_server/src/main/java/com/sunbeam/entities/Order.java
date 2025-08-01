package com.sunbeam.entities;

import java.time.LocalDateTime;
import java.time.LocalTime;
import java.util.ArrayList;
import java.util.List;

import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.FetchType;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;
import jakarta.persistence.OneToOne;
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
@Table(name = "orders")
@ToString(callSuper = true, exclude ={"user", "orderLines"})
public class Order extends BaseEntity {

	@Enumerated(EnumType.STRING)
	@Column(name = "order_status", length = 30)
	private OrderStatus orderStatus;

	@Column(name = "order_amount", length = 20)
	private double orderAmount;

	@CreationTimestamp
	@Column(name = "ordered_on")
	private LocalTime orderTime;

	// the datetime at which order was actually delivered(i.e status is updated)
	@UpdateTimestamp
	@Column(name = "delivered_by")
	private LocalDateTime deliveryDateTime;

	@Column(name = "delivery_charges", length = 10)
	private long deliveryCharges;

	// Many Order can be delivered at 1 Address
	@ManyToOne(cascade = CascadeType.ALL, fetch = FetchType.LAZY)
	@JoinColumn(name = "address_id")
	private Address address;
	
	// Many Orders can belong to one User
	// Many Orders <----> 1 User
	@ManyToOne
	@JoinColumn(name = "user_id",  nullable = false)
	private User user;

	// 1 Order has Many OrderLines
	// 1 Order <-----> Many OrderLines
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
