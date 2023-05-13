package com.cts.adminservice.controller;

import java.util.List;
import java.util.stream.Collectors;

import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.validation.ObjectError;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RestController;

import com.cts.adminservice.dto.AddMovieRequest;
import com.cts.adminservice.dto.Response;
import com.cts.adminservice.service.AdminService;

@RestController
public class AdminController {
	@Autowired
	private AdminService adminService;

	@PutMapping("/update/{ticketId}/{newStatus}")
	public ResponseEntity<Response> updateTicketStatus(@RequestHeader(name = "Authorization") String token,
			@PathVariable String ticketId, @PathVariable String newStatus) {
		adminService.updateTicketStatus(token, ticketId, newStatus);
		return ResponseEntity.ok(Response.builder().status("success").message("Ticket updated successfully").build());
	}

	@PostMapping("/addmovie")
	public ResponseEntity<Response> addMovie(@RequestHeader(name = "Authorization") String token,
			@RequestBody @Valid AddMovieRequest addMovieRequest, BindingResult bindingResult) {
		if (bindingResult.hasErrors()) {
			return errorResponse(bindingResult.getAllErrors());
		}
		adminService.addMovie(token, addMovieRequest);
		return new ResponseEntity<>(Response.builder().status("success").message("Movie added successsfully").build(),
				HttpStatus.CREATED);
	}

	@DeleteMapping("/delete/{movieId}")
	public ResponseEntity<Response> deleteMovie(@RequestHeader(name = "Authorization") String token,
			@PathVariable String movieId) {
		adminService.deleteMovie(token, movieId);
		return ResponseEntity.ok(Response.builder().status("success").message("Movie deleted successfully").build());
	}

	private ResponseEntity<Response> errorResponse(List<ObjectError> errors) {
		String errorMsg = errors.stream().map(ObjectError::getDefaultMessage).collect(Collectors.joining(". "));
		return new ResponseEntity<>(Response.builder().status("error").message(errorMsg).build(),
				HttpStatus.BAD_REQUEST);
	}
}
