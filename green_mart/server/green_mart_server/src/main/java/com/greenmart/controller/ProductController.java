package com.greenmart.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.greenmart.dto.ProductDTO;
import com.greenmart.dto.ProductResponseDTO;
import com.greenmart.service.ProductService;

import io.swagger.v3.oas.annotations.Operation;
import lombok.AllArgsConstructor;

@RestController
@RequestMapping("/products")
@AllArgsConstructor
@Validated
@CrossOrigin(origins = "http://localhost:5173")
public class ProductController {
	
	@Autowired
	private ProductService productService;
	
	@PostMapping(consumes = "multipart/form-data")
	@Operation(description = "Add new product")
	public ResponseEntity<?> addProduct(@ModelAttribute ProductDTO dto){
		System.out.println("in add " + dto);
		
		return ResponseEntity.status(HttpStatus.CREATED)
				.body(productService.addNewProduct(dto));
	}
	
	@GetMapping
	@Operation(description = "list all products")
	public ResponseEntity<?> getAllProducts(){
		System.out.println("in list");
		List<ProductResponseDTO>products=
		productService.getAllProducts();
		if(products.isEmpty()) {
			return ResponseEntity.status(HttpStatus.NO_CONTENT).build();
		}
		return ResponseEntity.ok(products);
	}
	
	@PutMapping(value = "/{id}",consumes = "application/json")
	@Operation(description = "Update existing product by ID")
	public ResponseEntity<?> updateProduct(@PathVariable Long id, @RequestBody ProductDTO dto ){
		dto.setId(id);//Ensure ID is set
		
		return ResponseEntity.ok(productService.updateProduct(id,dto));
	}
	
	@DeleteMapping("/{id}")
	public ResponseEntity<?> deleteproducts(@PathVariable Long id){
		return ResponseEntity.ok(productService.deleteProduct(id));
	}
	
	@GetMapping("/{id}")
	@Operation(description = "Get Product by Id")
	public ResponseEntity<?> getProductById(@PathVariable Long id){
		return ResponseEntity.ok(productService.getProductById(id));
	}
	@Operation(summary = "Search products by keyword", description = "Search products by matching product name or category")
	@GetMapping("/search")
	public ResponseEntity<?> searchProducts(@RequestParam("q") String keyword) {
	    List<ProductResponseDTO> results = productService.searchProducts(keyword);
	    if(results.isEmpty()) {
	        return ResponseEntity.status(HttpStatus.NO_CONTENT).build();
	    }
	    return ResponseEntity.ok(results);
	}

}
