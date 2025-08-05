package com.greenmart.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class WishlistDTO {
	private Long id;
	private Long productId;
	private String productName;
	private String productImage;
	private int offerPrice;
	private String description;
}
