package com.calzone.financial.auth;

import com.calzone.financial.auth.dto.RegisterRequest; // 1. Must import the DTO
import jakarta.validation.Valid; // 2. Must import @Valid
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/api/auth")
@CrossOrigin(origins = "*") // Added CrossOrigin for frontend communication
public class AuthController {

    private final AuthService authService;

    public AuthController(AuthService authService) {
        this.authService = authService;
    }

    /**
     * FIXES: 
     * 1. Uses the RegisterRequest DTO instead of a raw Map.
     * 2. Adds @Valid for input validation (fullName, email, phone, password).
     * 3. Catches IllegalArgumentException (e.g., "Email exists") and returns 409 Conflict.
     */
    @PostMapping("/signup") // Using /signup for common convention
    public ResponseEntity<?> register(@Valid @RequestBody RegisterRequest request) {
        try {
            // Call the service with the full set of user details
            Map<String, Object> res = authService.register(
                request.email(), 
                request.password(), 
                request.fullName(), 
                request.phone()
            );
            
            // Assuming the service handles OTP and returns the necessary data
            return ResponseEntity.status(HttpStatus.CREATED).body(res); // Use 201 CREATED for new resource

        } catch (IllegalArgumentException e) {
            // Map domain-specific error (like "Email exists") to 409 Conflict
            return ResponseEntity.status(HttpStatus.CONFLICT).body(
                Map.of("message", e.getMessage())
            );
        }
    }

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody Map<String, String> body) {
        String email = body.get("email");
        String password = body.get("password");
        // NOTE: login method should also be updated in AuthService to use the PasswordEncoder bean if possible.
        Map<String,Object> res = authService.login(email, password);
        return ResponseEntity.ok(res);
    }
}