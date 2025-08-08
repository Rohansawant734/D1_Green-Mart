package com.greenmart.dao;

import java.util.List;

//import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
//import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

//import com.greenmart.dto.OrderResponseDTO;
import com.greenmart.entities.Order;

@Repository
public interface OrderDao extends JpaRepository<Order, Long> {

//    @Query("SELECT new com.greenmart.dto.OrderResponseDTO(" +
//           "o.id, u.firstName, u.lastName, u.email, o.creationDate, " +
//           "o.orderStatus, o.orderAmount, o.deliveryCharges, " +
//           "a.adrLine1, a.adrLine2, a.city, a.state, a.zipCode) " +
//           "FROM Order o JOIN o.user u JOIN o.address a")
//    List<OrderResponseDTO> getAllOrdersForAdmin();
	List<Order> findByUserId(Long userId);
}
