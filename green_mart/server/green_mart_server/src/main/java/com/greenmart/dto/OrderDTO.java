package com.greenmart.dto;

import java.time.LocalDate;
import java.util.List;

import lombok.*;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class OrderDTO {
    private Long id;
    private Long adressId;
    private Long userId;
    private double orderAmount;
    private String orderStatus;
    private LocalDate creationDate;
    private double deliveryCharges;
    private String customerName;
    private String deliveryAddress;
    
    private List<OrderLineDetailsDTO> orderLines;
}
