package com.greenmart.controller;

import java.util.List;
import java.util.Map;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.greenmart.service.DashboardService;

import io.swagger.v3.oas.annotations.Operation;
import lombok.AllArgsConstructor;

@RestController
@RequestMapping("/dashboard")
@CrossOrigin(origins = "http://localhost:5173")
@AllArgsConstructor
public class DashboardController {
   private final DashboardService dashboardService;
   
   @GetMapping("/users/count")
   @Operation(description = "count of users")
   public ResponseEntity<?> getUserCount(){
	   return ResponseEntity.ok(dashboardService.getUserCount());
   }
   
   @GetMapping("/product/count")
   @Operation
   public ResponseEntity<?> getProductCount(){
	   return ResponseEntity.ok(dashboardService.getProductCount());
   }
   
   @GetMapping("/suppliers/count")
   @Operation
   public ResponseEntity<Long> getSupplierCount() {
       return ResponseEntity.ok(dashboardService.getSupplierCount());
   }
   @GetMapping("/products/by-category")
   @Operation
   public ResponseEntity<Map<String, Long>> getProductsByCategory() {
       return ResponseEntity.ok(dashboardService.getProductCountByCategory());
   }
   @GetMapping("/products/top")
   public ResponseEntity<List<Map<String, Long>>> getTopProducts() {
       return ResponseEntity.ok(dashboardService.getTopProducts());
   }
}
