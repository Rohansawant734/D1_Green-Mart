package com.greenmart.custom_exceptions;

@SuppressWarnings("serial")
public class NoContentException extends RuntimeException{
	public NoContentException(String message) {
		super(message);
	}
}
