package com.greenmart.dto;

 
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;
 
import lombok.*;

import java.util.List;

import com.greenmart.entities.PaymentMethod;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class OrderRequestDTO {
    @NotNull
    private Long userId;

    @NotNull
    private Long addressId;

    @NotEmpty
    private List<OrderLineDTO> orderLines;
    
    @NotNull
    private PaymentMethod paymentMethod;
   
    
    private long deliveryCharges;
}
