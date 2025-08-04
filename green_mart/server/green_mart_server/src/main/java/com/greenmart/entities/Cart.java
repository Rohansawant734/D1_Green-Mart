package com.greenmart.entities;

 
import java.util.ArrayList;
import java.util.List;

import com.fasterxml.jackson.annotation.JsonIgnore;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.OneToMany;
import jakarta.persistence.OneToOne;
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
@ToString(callSuper = true, exclude = {"cartUser","items"})
public class Cart extends BaseEntity {
	@JsonIgnore
	 @OneToOne (fetch = FetchType.LAZY)	   
	 @JoinColumn(name = "user_id", nullable = false)	   
	 private User cartUser;
	 
	 @OneToMany(mappedBy = "cart",cascade = CascadeType.ALL,orphanRemoval = true)
	 private List<CartItem> items = new ArrayList<>();
	 
	 public Cart(User user) {
		    this.cartUser = user;
		}

	 
	 public void addItem(CartItem item) {
	        items.add(item);
	        item.setCart(this);
	    }

	    public void removeItem(CartItem item) {
	        items.remove(item);
	        item.setCart(null);
	    }
	 
}
