package com.cts.moviecatalogservice.config;

import com.cts.moviecatalogservice.model.Movie;
import com.cts.moviecatalogservice.repository.MovieRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class InsertConfig implements CommandLineRunner {
    @Autowired
    private MovieRepository repository;
    @Override
    public void run(String... args) throws Exception {
        Movie movie = Movie.builder().id("").genre("").cast("").posterUrl("").trailerUrl("").rating("").country("").director("")
                .title("").language("").description("").releaseDate().shows();
    }
}
