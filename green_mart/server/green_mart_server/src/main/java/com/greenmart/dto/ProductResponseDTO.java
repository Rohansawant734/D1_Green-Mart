package com.greenmart.dto;

import org.springframework.web.multipart.MultipartFile;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class ProductResponseDTO extends BaseDTO{
	 private String prodName;
	    private String description;
	    private double price;
	    private String unit;
	    private int stockQuantity;
	    private boolean inStock;
	    private Long categoryId;
	    private MultipartFile image;
}
