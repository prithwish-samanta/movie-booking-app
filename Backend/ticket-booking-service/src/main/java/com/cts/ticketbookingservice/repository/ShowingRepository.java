package com.cts.ticketbookingservice.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.cts.ticketbookingservice.model.Showing;

@Repository
public interface ShowingRepository extends JpaRepository<Showing, String>{

}
