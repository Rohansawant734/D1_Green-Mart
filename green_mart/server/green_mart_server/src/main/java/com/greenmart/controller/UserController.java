package com.greenmart.controller;

import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.greenmart.dto.AddUserDTO;
import com.greenmart.dto.JWTResponseDTO;
import com.greenmart.dto.LoginDTO;
import com.greenmart.dto.UpdatePasswordDTO;
import com.greenmart.dto.UpdateUserDTO;
import com.greenmart.dto.UserResponseDTO;
import com.greenmart.service.UserService;
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
		if(uList.isEmpty()) {
			 return ResponseEntity.status(HttpStatus.NO_CONTENT).build();
		}
		
		return ResponseEntity.ok(uList);
	}
	
	@GetMapping("/{userId}")
	public ResponseEntity<?> fetchUser(@PathVariable Long userId){
		
		return ResponseEntity.ok(userService.findUserById(userId));
	}
	
	@PostMapping("/signup")
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
	
	@PatchMapping("/{userId}/password")
	public ResponseEntity<?> updatePassword(@PathVariable Long userId, @RequestBody @Valid UpdatePasswordDTO dto){
		
		return ResponseEntity.ok(userService.updatePassword(userId, dto));
	}
	
	@PostMapping("/signin")
	public ResponseEntity<JWTResponseDTO> signIn(@RequestBody @Valid LoginDTO dto){
		
		return ResponseEntity.ok(userService.login(dto));
	}
}
