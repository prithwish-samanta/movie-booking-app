package com.cts.ticketbookingservice.controller;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.eq;
import static org.mockito.Mockito.when;

import java.util.ArrayList;
import java.util.List;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.validation.ObjectError;

import com.cts.ticketbookingservice.dto.BookTicketRequest;
import com.cts.ticketbookingservice.dto.Response;
import com.cts.ticketbookingservice.service.TicketBookingService;

class TicketBookingControllerTest {
	@InjectMocks
	private TicketBookingController ticketBookingController;

	@Mock
	private TicketBookingService ticketBookingService;

	@Mock
	private BindingResult bindingResult;

	@BeforeEach
	public void setup() {
		MockitoAnnotations.openMocks(this);
	}

	@Test
	public void bookTicket_ValidRequest_Success() {
		BookTicketRequest request = BookTicketRequest.builder().showingId("showing_id").seats(2).build();

		String token = "valid_token";
		when(bindingResult.hasErrors()).thenReturn(false);
		when(ticketBookingService.bookTicket(eq(token), eq(request)))
				.thenReturn(new Response("success", "Ticket booked succssfully"));

		ResponseEntity<Response> response = ticketBookingController.bookTicket(token, request, bindingResult);

		assertEquals(HttpStatus.OK, response.getStatusCode());
		assertEquals("success", response.getBody().getStatus());
	}

	@Test
	public void bookTicket_InvalidRequest_BadRequest() {
		List<ObjectError> errors = new ArrayList<>();
		errors.add(new ObjectError("showingId", "Show id is required"));
		when(bindingResult.hasErrors()).thenReturn(true);
		when(bindingResult.getAllErrors()).thenReturn(errors);

		BookTicketRequest request = BookTicketRequest.builder().showingId("showing_id").seats(10).build();

		ResponseEntity<Response> response = ticketBookingController.bookTicket("invalid_token", request, bindingResult);

		assertEquals(HttpStatus.BAD_REQUEST, response.getStatusCode());
		assertEquals("error", response.getBody().getStatus());
		assertEquals("Show id is required", response.getBody().getMessage());
	}
}
