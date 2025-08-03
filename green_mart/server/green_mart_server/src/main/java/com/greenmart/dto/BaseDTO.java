package com.greenmart.dto;

import java.time.LocalDate;
import java.time.LocalDateTime;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.fasterxml.jackson.annotation.JsonProperty.Access;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@ToString
public class BaseDTO {

	//will skipped during de-serialization, will read common fields during serialization
	@JsonProperty(access = Access.READ_ONLY)
	private Long id;

	@JsonProperty(access = Access.READ_ONLY)
	private LocalDate creationDate;

	@JsonProperty(access = Access.READ_ONLY)
	private LocalDateTime updatedOn;
}