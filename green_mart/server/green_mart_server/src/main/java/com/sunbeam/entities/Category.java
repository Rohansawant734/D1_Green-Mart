package com.sunbeam.entities;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Table(name = "categories") // to specify table name
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
public class Category extends BaseEntity {
	
	@Column(name = "category_name", length = 20)
	private String catName;
	
	@Column(name = "category_img")
	private String catImgUrl;
	
	@Column(name = "background_color", length = 20)
	private String bgColor;
}
