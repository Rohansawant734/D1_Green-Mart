package com.greenmart.dto;

import com.greenmart.entities.OrderStatus;
import com.greenmart.entities.PaymentMethod;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class OrderUpdateDTO {
    private OrderStatus orderStatus;
    private PaymentMethod paymentMethod;
    private Long addressId; 
}
