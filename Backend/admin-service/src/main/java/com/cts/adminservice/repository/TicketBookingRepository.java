package com.cts.adminservice.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.cts.adminservice.model.TicketBooking;

@Repository
public interface TicketBookingRepository extends JpaRepository<TicketBooking, String> {

}
