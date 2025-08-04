package com.greenmart.dto;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class CartItemDTO {
	  private Long productId;
	    private String productName;
	    private String imageUrl;
	    private int quantity;
	    private int offerPrice;

}
