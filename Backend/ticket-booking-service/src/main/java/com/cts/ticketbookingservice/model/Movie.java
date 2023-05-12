package com.cts.ticketbookingservice.model;

import java.time.LocalDate;
import java.util.List;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.OneToMany;
import javax.persistence.Table;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "tb_movie")
@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class Movie {
	@Id
	private String id;

	@Column(nullable = false)
	private String title;

	@Column(nullable = false, length = 1500)
	private String description;

	@Column(nullable = false)
	private LocalDate releaseDate;

	@Column(nullable = false)
	private int runtime;

	@Column(nullable = false)
	private String genre;

	@Column(nullable = false)
	private String language;

	@Column(nullable = false)
	private String country;

	@Column(nullable = false)
	private String director;

	@Column(nullable = false)
	private String cast;

	@Column(nullable = false)
	private String rating;

	@Column(nullable = false)
	private String posterUrl;

	@Column(nullable = false)
	private String trailerUrl;

	@OneToMany(mappedBy = "movie", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<Showing> shows;
}
