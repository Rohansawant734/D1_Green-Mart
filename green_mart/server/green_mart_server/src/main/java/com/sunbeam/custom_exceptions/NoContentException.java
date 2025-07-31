package com.sunbeam.custom_exceptions;

@SuppressWarnings("serial")
public class NoContentException extends RuntimeException{
	public NoContentException(String message) {
		super(message);
	}
}
