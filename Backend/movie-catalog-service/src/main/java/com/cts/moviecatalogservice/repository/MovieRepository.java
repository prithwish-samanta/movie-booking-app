package com.cts.moviecatalogservice.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.cts.moviecatalogservice.model.Movie;

import java.util.List;

public interface MovieRepository extends JpaRepository<Movie, String>{
    public List<Movie>  findMoviesByTitleContains(String keyWord);
}
