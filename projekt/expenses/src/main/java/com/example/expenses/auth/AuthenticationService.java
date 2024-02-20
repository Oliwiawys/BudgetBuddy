package com.example.expenses.auth;

import com.example.expenses.config.JwtService;
import com.example.expenses.models.Users;
import com.example.expenses.repositories.UsersRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Date;

@Service
@RequiredArgsConstructor
public class AuthenticationService {
    private final UsersRepository repository;
    private final PasswordEncoder passwordEncoder;
    private final JwtService jwtService;
    private final AuthenticationManager authenticationManager;

    public AuthenticationResponse register(RegisterRequest request) {

        if (repository.findByUsername(request.getUsername()).isPresent()) {
            return AuthenticationResponse.builder()
                    .token("UsernameTaken")
                    .build();
        }
        if (repository.findByEmail(request.getEmail()).isPresent()) {
            return AuthenticationResponse.builder()
                    .token("EmailTaken")
                    .build();
        }
        var user = new Users(request.getUsername(), request.getEmail(), passwordEncoder.encode(request.getPassword()), "user", new Date());
        repository.save(user);
        var jwtToken = jwtService.generateToken(user);
        return AuthenticationResponse.builder()
                .token(jwtToken)
                .build();
    }

    public AuthenticationResponse authenticate(AuthenticationRequest request) {
        authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(
                        request.getUsername(),
                        request.getPassword()
                )
        );
        var user = repository.findByUsername(request.getUsername()).orElseThrow();
        var jwtToken = jwtService.generateToken(user);
        return AuthenticationResponse.builder()
                .token(jwtToken)
                .build();
    }
}
