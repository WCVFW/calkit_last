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
    private final com.calzone.financial.email.EmailVerificationService emailVerificationService;

    public AuthController(AuthService authService, com.calzone.financial.email.EmailVerificationService emailVerificationService) {
        this.authService = authService;
        this.emailVerificationService = emailVerificationService;
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
        try {
            Map<String,Object> res = authService.login(email, password);
            return ResponseEntity.ok(res);
        } catch (IllegalArgumentException e) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(Map.of("message", e.getMessage()));
        }
    }

    // Request an email OTP. Returns code in response only when service is configured for debug return.
    @PostMapping("/request-email-otp")
    public ResponseEntity<?> requestEmailOtp(@RequestBody Map<String, String> body) {
        String email = body.get("email");
        if (email == null || email.isBlank()) {
            return ResponseEntity.badRequest().body(Map.of("message", "Email is required"));
        }
        String code = emailVerificationService.sendCode(email);
        if (code != null) {
            return ResponseEntity.ok(Map.of("code", code));
        }
        return ResponseEntity.ok().build();
    }

    // Verify email OTP
    @PostMapping("/verify-email")
    public ResponseEntity<?> verifyEmail(@RequestBody Map<String, String> body) {
        String email = body.get("email");
        String code = body.get("code");
        if (email == null || code == null) return ResponseEntity.badRequest().build();
        emailVerificationService.verifyCode(email, code);
        return ResponseEntity.ok(Map.of("message", "Email verified"));
    }
}
