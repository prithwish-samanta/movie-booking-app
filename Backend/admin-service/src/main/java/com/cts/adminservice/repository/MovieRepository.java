package com.cts.adminservice.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.cts.adminservice.model.Movie;

@Repository
public interface MovieRepository extends JpaRepository<Movie, String> {

}
