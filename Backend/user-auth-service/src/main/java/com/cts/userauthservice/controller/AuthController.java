package com.cts.userauthservice.controller;

import java.util.List;
import java.util.stream.Collectors;

import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.validation.ObjectError;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RestController;

import com.cts.userauthservice.dto.LoginRequest;
import com.cts.userauthservice.dto.LoginResponse;
import com.cts.userauthservice.dto.PasswordChangeRequest;
import com.cts.userauthservice.dto.RegistrationRequest;
import com.cts.userauthservice.dto.Response;
import com.cts.userauthservice.dto.ValidationDto;
import com.cts.userauthservice.service.AuthService;

@RestController
public class AuthController {
	@Autowired
	private AuthService authService;

	@PostMapping("/register")
	public ResponseEntity<Response> register(@RequestBody @Valid RegistrationRequest registrationRequest,
			BindingResult bindingResult) {
		if (bindingResult.hasErrors()) {
			return errorResponse(bindingResult.getAllErrors());
		}
		authService.register(registrationRequest);
		return new ResponseEntity<Response>(
				Response.builder().status("success").message("User resgistration successful").build(),
				HttpStatus.CREATED);
	}

	@PostMapping("/login")
	public ResponseEntity<?> login(@RequestBody @Valid LoginRequest loginRequest, BindingResult bindingResult) {
		if (bindingResult.hasErrors()) {
			return errorResponse(bindingResult.getAllErrors());
		}
		LoginResponse response = authService.login(loginRequest);
		return new ResponseEntity<LoginResponse>(response, HttpStatus.OK);
	}

	@GetMapping("/{userid}/forgot")
	public ResponseEntity<Response> forgotPassword(@PathVariable String userid,
			@RequestBody @Valid PasswordChangeRequest passwordChangeRequest, BindingResult bindingResult) {
		if (bindingResult.hasErrors()) {
			return errorResponse(bindingResult.getAllErrors());
		}
		authService.forgotPassword(userid, passwordChangeRequest);
		return new ResponseEntity<Response>(
				Response.builder().status("success").message("Your password recovered successfully").build(),
				HttpStatus.OK);
	}

	@PutMapping("/{userid}/updatepassword")
	public ResponseEntity<Response> updatePassword(@PathVariable String userid,
			@RequestBody @Valid PasswordChangeRequest passwordChangeRequest, BindingResult bindingResult) {
		if (bindingResult.hasErrors()) {
			return errorResponse(bindingResult.getAllErrors());
		}
		authService.updatePassword(userid, passwordChangeRequest);
		return new ResponseEntity<Response>(
				Response.builder().status("success").message("Your password updated successfully").build(),
				HttpStatus.OK);
	}

	@GetMapping("/validate")
	public ResponseEntity<ValidationDto> validateAuthToken(@RequestHeader(name = "Authorization") String jwtToken) {
		ValidationDto response = authService.validateAuthToken(jwtToken);
		if (response.isStatus())
			return ResponseEntity.ok(authService.validateAuthToken(jwtToken));
		else
			return new ResponseEntity<>(response, HttpStatus.UNAUTHORIZED);
	}

	private ResponseEntity<Response> errorResponse(List<ObjectError> errors) {
		String errorMsg = errors.stream().map(ObjectError::getDefaultMessage).collect(Collectors.joining(". "));
		return new ResponseEntity<>(Response.builder().status("error").message(errorMsg).build(),
				HttpStatus.BAD_REQUEST);
	}
}
