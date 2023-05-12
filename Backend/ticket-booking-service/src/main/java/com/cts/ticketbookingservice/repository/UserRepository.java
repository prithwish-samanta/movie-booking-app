package com.cts.ticketbookingservice.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.cts.ticketbookingservice.model.User;

@Repository
public interface UserRepository extends JpaRepository<User, String> {

}
