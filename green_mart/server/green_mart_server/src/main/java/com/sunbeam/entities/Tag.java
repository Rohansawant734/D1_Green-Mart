package com.sunbeam.entities;

import java.util.HashSet;
import java.util.Set;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.JoinTable;
import jakarta.persistence.ManyToMany;
import jakarta.persistence.Table;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@Entity
@Table(name = "tags")
@NoArgsConstructor
@Getter
@Setter
@ToString(callSuper = true)
public class Tag extends BaseEntity {
	@Column(length = 20, unique = true)
	private String name;
	// Tag *---->* Restaurant
	@ManyToMany // o.w MappingException
	@JoinTable(name = "my_restaurant_tags"
	,joinColumns = @JoinColumn(name="my_tag_id"),
	inverseJoinColumns = @JoinColumn(name="my_restaurant_id"))
	private Set<Restaurant> restaurants = new HashSet<>();

	public Tag(String name) {
		super();
		this.name = name;
	}

}
