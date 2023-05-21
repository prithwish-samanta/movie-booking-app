package com.cts.ticketbookingservice.repository;


import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import com.cts.ticketbookingservice.model.Showing;

@Repository
public interface ShowingRepository extends MongoRepository<Showing, String> {

}
