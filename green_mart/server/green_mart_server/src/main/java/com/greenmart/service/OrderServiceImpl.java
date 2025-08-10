package com.greenmart.service;

import com.greenmart.dao.*;
import com.greenmart.dto.*;
import com.greenmart.entities.*;
 
import com.greenmart.custom_exceptions.ResourceNotFoundException;

import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.*;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
@Transactional
public class OrderServiceImpl implements OrderService {

    private final OrderDao orderDao;
    private final UserDao userDao;
    private final AddressDao addressDao;
    private final ProductDao productDao;
    private final ModelMapper mapper;
    private final EmailService emailService;

    @Override
    public OrderResponseDTO placeOrder(OrderRequestDTO requestDTO) {
        User user = userDao.findById(requestDTO.getUserId())
                .orElseThrow(() -> new ResourceNotFoundException("User not found"));

        Address address = addressDao.findById(requestDTO.getAddressId())
                .orElseThrow(() -> new ResourceNotFoundException("Address not found"));

        Order order = new Order();
        order.setUser(user);
        order.setAddress(address);
        order.setOrderStatus(OrderStatus.PENDING);
        order.setPaymentMethod(requestDTO.getPaymentMethod());
        order.setDeliveryCharges(requestDTO.getDeliveryCharges());
        order.setCreationDate(LocalDate.now());
        order.setOrderTime(LocalDateTime.now());

        List<OrderLine> orderLines = new ArrayList<>();
        double totalAmount = 0;

        for (OrderLineDTO dto : requestDTO.getOrderLines()) {
            Product product = productDao.findById(dto.getProductId())
                    .orElseThrow(() -> new ResourceNotFoundException("Product not found"));

            OrderLine line = new OrderLine();
            line.setOrder(order);
            line.setProduct(product);
            line.setQuantity(dto.getQuantity());
            line.setDiscount(dto.getDiscount());
            line.setPrice(dto.getPrice());
          

            double subTotal = dto.getPrice() * dto.getQuantity();
            line.setSubTotal(subTotal);
            orderLines.add(line);
            totalAmount += subTotal;
        }

        order.setOrderLines(orderLines);
        order.setOrderAmount(totalAmount + order.getDeliveryCharges());
      
        Order savedOrder = orderDao.save(order);
        emailService.sendOrderConfirmationEmail(user, savedOrder);
        return  new OrderResponseDTO("Order placed successfully!", savedOrder.getId());
    }

    @Override
    public List<OrderDTO> getOrdersByUserId(Long userId) {
        return orderDao.findByUserId(userId).stream()
                .map(this::mapOrderToDTO)
                .collect(Collectors.toList());
    }

    @Override
    public List<OrderDTO> getAllOrders() {
        return orderDao.findAll().stream()
                .map(this::mapOrderToDTO)
                .collect(Collectors.toList());
    }

    @Override
    public OrderDTO getOrderById(Long orderId) {
        Order order = orderDao.findById(orderId)
                .orElseThrow(() -> new ResourceNotFoundException("Order not found"));

        return mapOrderToDTO(order);
    }
    
    @Override
    public ApiResponse updateOrder(Long orderId, OrderUpdateDTO updateDTO) {
        Order order = orderDao.findById(orderId)
                .orElseThrow(() -> new ResourceNotFoundException("Order not found with ID: " + orderId));

        if (updateDTO.getOrderStatus() != null) {
            order.setOrderStatus(updateDTO.getOrderStatus());
            if (updateDTO.getOrderStatus() == OrderStatus.DELIVERED) {
                order.setDeliveryDateTime(LocalDateTime.now());
            }
        }

        if (updateDTO.getPaymentMethod() != null) {
            order.setPaymentMethod(updateDTO.getPaymentMethod());
        }

        //  Handle address update
        if (updateDTO.getAddressId() != null) {
            Address newAddress = addressDao.findById(updateDTO.getAddressId())
                    .orElseThrow(() -> new ResourceNotFoundException("Address not found with ID: " + updateDTO.getAddressId()));
            order.setAddress(newAddress);
        }

        orderDao.save(order);

        return new ApiResponse("Order updated successfully!");
    }


    
    @Override
    public ApiResponse deleteOrder(Long orderId) {
        Order order = orderDao.findById(orderId)
                .orElseThrow(() -> new ResourceNotFoundException("Order not found with ID: " + orderId));

        orderDao.delete(order);
        return new ApiResponse("Order deleted successfully!");
    }

    
 
    // Shared mapper used by all endpoints
    private OrderDTO mapOrderToDTO(Order order) {
        OrderDTO orderDTO = mapper.map(order, OrderDTO.class);

        orderDTO.setId(order.getId());

        if (order.getUser() != null) {
            orderDTO.setUserId(order.getUser().getId());
            orderDTO.setCustomerName(order.getUser().getFirstName() + " " + order.getUser().getLastName());
        }

        if (order.getAddress() != null) {
            orderDTO.setAdressId(order.getAddress().getId());
            orderDTO.setDeliveryAddress(formatAddress(order.getAddress()));
        }

        // map order lines
        List<OrderLineDetailsDTO> orderLineDTOs = order.getOrderLines().stream().map(line -> {
            OrderLineDetailsDTO dto = mapper.map(line, OrderLineDetailsDTO.class);
            dto.setOrderLineId(line.getId());

            if (line.getProduct() != null) {
                dto.setProductId(line.getProduct().getId());
                dto.setProductName(line.getProduct().getProdName());
                dto.setProductImage(line.getProduct().getProdImgUrl());
            }

            return dto;
        }).collect(Collectors.toList());

        orderDTO.setOrderLines(orderLineDTOs);

        return orderDTO;
    }

    private String formatAddress(Address address) {
        return address.getAdrLine1() + ", " +
               (address.getAdrLine2() != null ? address.getAdrLine2() + ", " : "") +
               address.getCity() + ", " +
               address.getState() + " - " +
               address.getZipCode();
    }

}
