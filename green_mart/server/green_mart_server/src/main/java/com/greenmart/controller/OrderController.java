package com.greenmart.controller;

import com.greenmart.dto.*;
import com.greenmart.service.OrderService;
 

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins = "http://localhost:5173")
@RestController
@RequestMapping("/orders")
@RequiredArgsConstructor
public class OrderController {

    private final OrderService orderService;

    // User places an order
    @PostMapping("/place")
    public ResponseEntity<?> placeOrder(@Valid @RequestBody OrderRequestDTO requestDTO) {
         OrderResponseDTO response = orderService.placeOrder(requestDTO);
        return ResponseEntity.ok(response);
    }	

    // User gets their own orders
    @GetMapping("/user/{userId}")
    public ResponseEntity<?> getUserOrders(@PathVariable Long userId) {
        List<OrderDTO> userOrders = orderService.getOrdersByUserId(userId);
        return ResponseEntity.ok(userOrders);
    }

    //  Admin gets all orders
    @GetMapping("/admin/all")
    public ResponseEntity<?> getAllOrders() {
        List<OrderDTO> allOrders = orderService.getAllOrders();
        return ResponseEntity.ok(allOrders);
    }

    //  gets orders by specific userId
    @GetMapping("/admin/{userId}")
    public ResponseEntity<?> getOrdersByUserId(@PathVariable Long userId) {
        List<OrderDTO> userOrders = orderService.getOrdersByUserId(userId);
        return ResponseEntity.ok(userOrders);
    }

    // Get specific order by orderId
    @GetMapping("/{orderId}")
    public ResponseEntity<?> getOrderById(@PathVariable Long orderId) {
        OrderDTO orderDTO = orderService.getOrderById(orderId);
        return ResponseEntity.ok(orderDTO);
    }
    
 // Update order status or payment method
    @PutMapping("/{orderId}")
    public ResponseEntity<?> updateOrder(@PathVariable Long orderId, @RequestBody OrderUpdateDTO updateDTO) {
        ApiResponse response = orderService.updateOrder(orderId, updateDTO);
        return ResponseEntity.ok(response);
    }

    
 // Cancel or delete order
    @DeleteMapping("/{orderId}")
    public ResponseEntity<?> deleteOrder(@PathVariable Long orderId) {
        ApiResponse response = orderService.deleteOrder(orderId);
        return ResponseEntity.ok(response);
    }

}
