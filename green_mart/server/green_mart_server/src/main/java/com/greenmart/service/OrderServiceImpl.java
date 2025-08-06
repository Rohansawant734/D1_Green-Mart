package com.greenmart.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.greenmart.dao.OrderRepository;
import com.greenmart.dto.OrderResponseDTO;

@Service
public class OrderServiceImpl implements OrderService {

    @Autowired
    private OrderRepository orderRepository;

    @Override
    public List<OrderResponseDTO> getAllOrdersForAdmin() {
        return orderRepository.getAllOrdersForAdmin();
    }
}
