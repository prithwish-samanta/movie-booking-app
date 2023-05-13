package com.cts.adminservice.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.cts.adminservice.model.Theater;

public interface TheaterRepository extends JpaRepository<Theater, String> {

}
