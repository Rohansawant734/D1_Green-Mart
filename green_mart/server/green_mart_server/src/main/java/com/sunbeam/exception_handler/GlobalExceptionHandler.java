package com.sunbeam.exception_handler;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

import com.sunbeam.custom_exceptions.ApiException;
import com.sunbeam.custom_exceptions.AuthenticationException;
import com.sunbeam.custom_exceptions.NoContentException;
import com.sunbeam.custom_exceptions.ResourceNotFoundException;

@RestControllerAdvice
public class GlobalExceptionHandler {
	
	@ExceptionHandler(ApiException.class)
	public ResponseEntity<?> handleApiException(ApiException e){
		System.out.println("In api exception handler");
		return ResponseEntity.status(HttpStatus.CONFLICT).body(new ApiException(e.getMessage()));
	}
	
	@ExceptionHandler(AuthenticationException.class)
	public ResponseEntity<?> handleAuthenicationException(AuthenticationException e){
		System.out.println("In authentication exception handler");
		return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(new AuthenticationException(e.getMessage()));
	}
	
	@ExceptionHandler(NoContentException.class)
	public ResponseEntity<?> handleNoContentException(NoContentException e){
		System.out.println("In no content exception handler");
		return ResponseEntity.status(HttpStatus.NO_CONTENT).body(new NoContentException(e.getMessage()));
	}
	
	@ExceptionHandler(ResourceNotFoundException.class)
	public ResponseEntity<?> handleResourceNotFoundException(ResourceNotFoundException e){
		System.out.println("In resource not found exception handler");
		return ResponseEntity.status(HttpStatus.NOT_FOUND).body(new ResourceNotFoundException(e.getMessage()));
	}
	
	@ExceptionHandler(Exception.class)
	public ResponseEntity<?> handleException(Exception e){
		System.out.println("In catch all exception handler");
		return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(new Exception(e.getMessage()));
	}
}
