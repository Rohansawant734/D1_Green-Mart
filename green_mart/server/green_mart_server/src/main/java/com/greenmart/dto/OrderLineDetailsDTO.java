package com.greenmart.dto;

import lombok.*;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class OrderLineDetailsDTO {
    private Long orderLineId;
    
    private Long productId;
    
    private String productName;
    
    private double price;
    
    private int quantity;
    
    private double discount;
    
    private double subTotal;
    
    private String productImage;
}
