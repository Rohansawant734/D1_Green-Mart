package com.greenmart.entities;

import java.util.ArrayList;
import java.util.List;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@Entity
@Table(name = "categories") // to specify table name
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
@ToString(callSuper = true, exclude = "products")
public class Category extends BaseEntity {
	
	@Column(name = "category_name", length = 20)
	private String catName;
	
	@Column(name = "category_img")
	private String catImgUrl;
	
	@Column(name = "background_color", length = 20)
	private String bgColor;
	
	// 1 Category has Many Products
	// 1 Category <-----> Many Products
	@OneToMany(mappedBy = "myCategory", cascade = CascadeType.ALL, orphanRemoval = true)
	private List<Product> products = new ArrayList<>();
}
