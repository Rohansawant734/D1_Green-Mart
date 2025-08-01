package com.greenmart.custom_exceptions;

@SuppressWarnings("serial")
public class AuthenticationException extends RuntimeException{
	public AuthenticationException(String message) {
		super(message);
	}
}
