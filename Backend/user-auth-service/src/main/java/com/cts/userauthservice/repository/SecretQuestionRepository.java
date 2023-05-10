package com.cts.userauthservice.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.cts.userauthservice.model.SecretQuestion;

public interface SecretQuestionRepository extends JpaRepository<SecretQuestion, Long> {

}
