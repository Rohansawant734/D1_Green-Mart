package com.greenmart.service;

import java.util.List;

import com.greenmart.dto.OrderResponseDTO;

public interface OrderService {
    List<OrderResponseDTO> getAllOrdersForAdmin();
}
