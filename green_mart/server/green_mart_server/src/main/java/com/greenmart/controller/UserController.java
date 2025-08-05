package com.greenmart.controller;

import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.greenmart.dto.AddUserDTO;
import com.greenmart.dto.UpdateUserDTO;
import com.greenmart.dto.UserResponseDTO;
import com.greenmart.service.UserService;
import io.swagger.v3.oas.annotations.parameters.RequestBody;
import jakarta.validation.Valid;
import lombok.AllArgsConstructor;

@RestController
@RequestMapping("/users")
@CrossOrigin(origins = "http://localhost:5173")
@AllArgsConstructor
@Validated
public class UserController {
	
	private final UserService userService;
	
	@GetMapping
	public ResponseEntity<?> getAllUsers(){
		
		List<UserResponseDTO> uList = userService.getAllUsers();
		
		return ResponseEntity.ok(uList);
	}
	
	@GetMapping("/{userId}")
	public ResponseEntity<?> fetchUser(@PathVariable Long userId){
		
		return ResponseEntity.ok(userService.findUserById(userId));
	}
	
	@PostMapping
	public ResponseEntity<?> signUp(@RequestBody @Valid AddUserDTO dto){
		
		return ResponseEntity.status(HttpStatus.CREATED).body(userService.register(dto));
	}
	
	@PutMapping("/{userId}")
	public ResponseEntity<?> updateUser(@PathVariable Long userId, @RequestBody @Valid UpdateUserDTO dto){
		
		return ResponseEntity.ok(userService.updateUser(userId, dto));
	}
	
	@DeleteMapping("/{userId}")
	public ResponseEntity<?> deleteUser(@PathVariable Long userId){
		
		return ResponseEntity.ok(userService.deleteUser(userId));
	}
	
	@PutMapping("/{userId}/restore")
	public ResponseEntity<?> restoreUser(@PathVariable Long userId){
		
		return ResponseEntity.ok(userService.restoreUser(userId));
	}
	
}
