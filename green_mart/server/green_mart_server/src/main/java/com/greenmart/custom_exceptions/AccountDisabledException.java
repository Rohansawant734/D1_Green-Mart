package com.greenmart.custom_exceptions;

@SuppressWarnings("serial")
public class AccountDisabledException extends RuntimeException{
	public AccountDisabledException(String message) {
		super(message);
	}
}
