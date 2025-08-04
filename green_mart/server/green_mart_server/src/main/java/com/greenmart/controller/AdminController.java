package com.greenmart.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.greenmart.entities.Supplier;
import com.greenmart.RequestDto.SupplierRequestDTO;
import com.greenmart.ResponseDto.SupplierResponseDTO;
import com.greenmart.service.SupplierService;
@CrossOrigin(origins = "http://localhost:5173")
@RestController
@RequestMapping("/admin")
public class AdminController {
	
	 @Autowired
	    private SupplierService supplierService;

	    @PostMapping("/add-supplier")
	    public ResponseEntity<SupplierResponseDTO> addSupplier(@RequestBody Supplier supplier) {
	    	
	    	SupplierResponseDTO responseDTO=supplierService.addSupplier(supplier);

	        return ResponseEntity.status(HttpStatus.CREATED).body(responseDTO);
	    }
	    
	    @GetMapping("/suppliers")
	    public ResponseEntity<List<SupplierResponseDTO >> getAllSuppliers() {
	        List<SupplierResponseDTO > suppliers = supplierService.getAllSuppliers();
	        return ResponseEntity.ok(suppliers);
	    }
    
	    @DeleteMapping("/delete-supplier/{id}")
	    public ResponseEntity<String> deleteSupplier(@PathVariable Long id) {
	        try {
	            supplierService.deleteSupplierById(id);
	            return ResponseEntity.ok("Supplier with ID " + id + " deleted successfully.");
	        } catch (RuntimeException e) {
	            return ResponseEntity
	                    .status(HttpStatus.NOT_FOUND)
	                    .body("Supplier not found with ID: " + id);
	        }
	    }
	    
	    @PutMapping("/update-supplier/{id}")
	    public ResponseEntity<SupplierResponseDTO> updateSupplier(
	            @PathVariable Long id,
	            @RequestBody SupplierRequestDTO requestDTO) {
	        
	        SupplierResponseDTO responseDTO = supplierService.updateSupplier(id, requestDTO);
	        
	        if (responseDTO != null) {
	            return ResponseEntity.ok(responseDTO);
	        } else {
	            return ResponseEntity.notFound().build();
	        }
	    }


}
