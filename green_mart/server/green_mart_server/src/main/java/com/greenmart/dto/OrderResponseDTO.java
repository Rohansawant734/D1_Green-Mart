package com.greenmart.dto;

import java.time.LocalDateTime;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class OrderResponseDTO {
    private Long orderId;
    private String firstName;
    private String lastName;
    private String email;
    private String orderDate;    // formatted date as String "yyyy-MM-dd"
    private String orderTime;    // formatted time as String "HH:mm:ss"
    private String orderStatus;
    private Double orderAmount;
    private Long deliveryCharges;
    private String adrLine1;
    private String adrLine2;
    private String city;
    private String state;
    private String zipCode;

    // This constructor is used by JPA Query (cannot use @AllArgsConstructor directly)
    public OrderResponseDTO(Long orderId, String firstName, String lastName, String email,
                            LocalDateTime creationDate,
                            String orderStatus, Double orderAmount, Long deliveryCharges,
                            String adrLine1, String adrLine2, String city, String state, String zipCode) {
        this.orderId = orderId;
        this.firstName = firstName;
        this.lastName = lastName;
        this.email = email;

        if (creationDate != null) {
            this.orderDate = creationDate.toLocalDate().toString();
            this.orderTime = creationDate.toLocalTime().toString();
        }

        this.orderStatus = orderStatus;
        this.orderAmount = orderAmount;
        this.deliveryCharges = deliveryCharges;
        this.adrLine1 = adrLine1;
        this.adrLine2 = adrLine2;
        this.city = city;
        this.state = state;
        this.zipCode = zipCode;
    }
}
