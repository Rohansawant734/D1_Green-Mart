package com.greenmart.dto;

import java.util.List;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class CartDTO {
	private Long cartId;
    private Long userId;
    private List<CartItemDTO> items;
    private double subtotal;  
}
