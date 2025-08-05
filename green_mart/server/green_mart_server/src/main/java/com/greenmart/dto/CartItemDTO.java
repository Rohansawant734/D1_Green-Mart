package com.greenmart.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
public class CartItemDTO {
	private Long productId;
	private String productName;
	private String imageUrl;
	private double offerPrice;
	private int quantity;

}
