package com.cts.userauthservice.util;

import java.time.Instant;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.oauth2.jwt.JwtClaimsSet;
import org.springframework.security.oauth2.jwt.JwtEncoder;
import org.springframework.security.oauth2.jwt.JwtEncoderParameters;
import org.springframework.stereotype.Service;

@Service
public class JwtProvider {
	@Autowired
	private JwtEncoder jwtEncoder;

	public String generateToken(Authentication authentication) {
		User user = (User) authentication.getPrincipal();
		GrantedAuthority authority = user.getAuthorities().iterator().next();
		String role = "ROLE_" + authority.getAuthority();
		return generateTokenWithUsername(user.getUsername(), role);
	}

	private String generateTokenWithUsername(String username, String role) {
		JwtClaimsSet claims = JwtClaimsSet.builder().issuer("self").issuedAt(Instant.now()).subject(username)
				.claim("scope", role).build();
		return jwtEncoder.encode(JwtEncoderParameters.from(claims)).getTokenValue();
	}
}
