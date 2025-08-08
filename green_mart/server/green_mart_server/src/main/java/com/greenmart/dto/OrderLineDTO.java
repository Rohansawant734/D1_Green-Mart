package com.greenmart.dto;

import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotNull;
import lombok.*;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class OrderLineDTO {
    @NotNull
    private Long productId;

    @Min(1)
    private int quantity;
    private double price;
    private String productName;
    private double discount;
    private double subTotal;
}
