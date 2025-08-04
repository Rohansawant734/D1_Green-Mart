package com.greenmart.dto;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class CartRequestDTO {
    private Long userId;
    private Long productId;
    private int quantity;
}