package com.cts.adminservice.repository;



import com.cts.adminservice.model.Theater;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface TheaterRepository extends MongoRepository<Theater, String> {

}
