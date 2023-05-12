package com.cts.ticketbookingservice.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.cts.ticketbookingservice.model.TicketBooking;

@Repository
public interface TicketBookingRepository extends JpaRepository<TicketBooking, String>{
	
}
