package com.calzone.financial.auth;

import com.calzone.financial.auth.dto.RegisterRequest;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/api/auth")
@CrossOrigin(origins = "*") 
public class AuthController {

    private final AuthService authService;

    public AuthController(AuthService authService) {
        this.authService = authService;
    }

    /**
     * Handles /api/auth/signup endpoint.
     * 1. Uses @Valid to automatically check constraints defined in RegisterRequest DTO.
     * 2. Calls the AuthService with all four required fields.
     * 3. Maps IllegalArgumentException (Email exists) to 409 Conflict.
     */
    @PostMapping("/signup") 
    public ResponseEntity<?> signup(@Valid @RequestBody RegisterRequest request) {
        try {
            // Call the service with all four required user details (fullName, email, phone, password)
            Map<String, Object> res = authService.register(
                request.email(), 
                request.password(), 
                request.fullName(), 
                request.phone()
            );
            
            // Use 201 CREATED for successful resource creation
            return ResponseEntity.status(HttpStatus.CREATED).body(res); 

        } catch (IllegalArgumentException e) {
            // Return 409 Conflict if the email already exists
            return ResponseEntity.status(HttpStatus.CONFLICT).body(
                Map.of("message", e.getMessage())
            );
        }
    }

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody Map<String, String> body) {
        String email = body.get("email");
        String password = body.get("password");
        Map<String,Object> res = authService.login(email, password);
        return ResponseEntity.ok(res);
    }
}
