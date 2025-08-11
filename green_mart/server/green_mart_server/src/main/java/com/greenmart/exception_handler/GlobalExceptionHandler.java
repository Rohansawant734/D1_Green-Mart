package com.greenmart.exception_handler;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.DisabledException;
import org.springframework.validation.FieldError;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

import com.greenmart.custom_exceptions.AccountDisabledException;
import com.greenmart.custom_exceptions.ApiException;
import com.greenmart.custom_exceptions.AuthenticationException;
import com.greenmart.custom_exceptions.NoContentException;
import com.greenmart.custom_exceptions.ResourceNotFoundException;

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
	
	@ExceptionHandler(DisabledException.class)
	public ResponseEntity<Map<String, String>> handleDisabledException(DisabledException e) {
	    return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
	                         .body(Map.of("message", e.getMessage()));
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
	
	@ExceptionHandler(AccountDisabledException.class)
	public ResponseEntity<Map<String, String>> handleAccountDisabledException(AccountDisabledException e){
		System.out.println("In account disabled exception handler");
		return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(Map.of("message", e.getMessage()));
	}
	
	// add exc handling method
	@ExceptionHandler(MethodArgumentNotValidException.class)
	public ResponseEntity<?> handleMethodArgumentNotValidException
	(MethodArgumentNotValidException e) {
		System.out.println("In handle Program Logic validation failures - @Valid ");
		//create Map of rejected fields and error messages
		//eg - firstName - mandatory field.....
		//1. get list of rejected fields 
		List<FieldError> fieldErrors = e.getFieldErrors();
		//2. Convert -> Map<Key - String fieldName , 
		//Value - String - err message>
//		fieldErrors.stream() //Stream<FieldError>
//		.collect(Collectors.toMap
//				(FieldError::getField,
//				FieldError::getDefaultMessage);
		 Map<String,String> errorMap=new HashMap<>();
		 fieldErrors.forEach(fieldError -> 
		 errorMap.put(fieldError.getField(), 
				 fieldError.getDefaultMessage()));
		return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(errorMap);
	}
	
	@ExceptionHandler(Exception.class)
	public ResponseEntity<?> handleException(Exception e){
		System.out.println("In catch all exception handler");
		return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(new Exception(e.getMessage()));
	}

}
