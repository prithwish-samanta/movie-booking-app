package com.cts.moviecatalogservice.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.cts.moviecatalogservice.model.Movie;

public interface MovieRepository extends JpaRepository<Movie, String>{

}
