package com.greenmart.dto;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class ProductResponseDTO extends BaseDTO{
	    private String prodName;
	    private String description;
	    private double price;
	    private int offerPrice;
	    private String unit;
	    private Boolean inStock;
	    private Long categoryId;
	    private String categoryName;
	    private Long supplierId;
	    private String supplierName;
	    private String proimage;
}
