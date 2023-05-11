package com.cts.moviecatalogservice.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;

import com.cts.moviecatalogservice.dto.AllMovieResponse;
import com.cts.moviecatalogservice.dto.MovieDto;
import com.cts.moviecatalogservice.service.MovieCatalogService;

@RestController
public class MovieCatalogController {
	@Autowired
	private MovieCatalogService catalogService;

	@GetMapping("/all")
	public ResponseEntity<AllMovieResponse> getAllMovies() {
		AllMovieResponse response = catalogService.getAllMovies();
		return ResponseEntity.ok(response);
	}

	@GetMapping("/movies/search/{movieById}")
	public ResponseEntity<MovieDto> getMovieById(@PathVariable String movieById) {
		MovieDto movie = catalogService.getMovieById(movieById);
		return ResponseEntity.ok(movie);
	}
}
