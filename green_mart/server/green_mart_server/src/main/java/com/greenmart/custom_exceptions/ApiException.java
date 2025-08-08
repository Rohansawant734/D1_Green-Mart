package com.greenmart.custom_exceptions;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@SuppressWarnings("serial")
@ResponseStatus(HttpStatus.BAD_REQUEST)
public class ApiException extends RuntimeException{
	public ApiException(String message) {
		super(message);
	}
}
