package com.greenmart.dto;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class ProductResponseDTO extends BaseDTO{
	    private String prodName;
	    private String description;
	    private double price;
	    private String unit;
	    private Boolean inStock;
	    private Long categoryId;
	    private String proimage;
}
