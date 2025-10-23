package com.calzone.financial.auth;

import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import com.calzone.financial.user.User;
import com.calzone.financial.user.UserRepository;
import org.springframework.security.crypto.password.PasswordEncoder; // Use the interface
import java.util.HashMap;
import java.util.Map;

@Service
public class AuthService {

    private final UserRepository userRepository;
    // Keeping BCryptPasswordEncoder instantiation as in your original code
    private final PasswordEncoder encoder = new BCryptPasswordEncoder(); 
    private final JwtUtil jwtUtil;

    public AuthService(UserRepository userRepository, JwtUtil jwtUtil) {
        this.userRepository = userRepository;
        this.jwtUtil = jwtUtil;
    }

    /**
     * FIX: Updated method signature to accept fullName and phone.
     */
    public Map<String, Object> register(String email, String password, String fullName, String phone) {
        if (userRepository.findByEmail(email).isPresent()) {
            throw new IllegalArgumentException("Email exists"); 
        }
        
        String hash = encoder.encode(password);
        
        // Assuming User.builder() and appropriate setters exist.
        User u = User.builder()
                .email(email)
                .password(hash)
                .fullName(fullName) // ✅ Now correctly using the parameter
                .phone(phone)       // ✅ Now correctly using the parameter
                // Add any other required fields (e.g., enabled/roles)
                .build();
                
        userRepository.save(u);
        
        String token = jwtUtil.generateToken(email);
        Map<String,Object> res = new HashMap<>();
        res.put("token", token);
        
        String role = "USER";
        if (u.getRoles() != null && !u.getRoles().isEmpty()) {
            role = u.getRoles().iterator().next().getName();
        }
        
        res.put("user", Map.of("email", u.getEmail(), "role", role));
        return res;
    }

    public Map<String, Object> login(String email, String password) {
        User u = userRepository.findByEmail(email).orElseThrow(() -> new IllegalArgumentException("Invalid credentials"));
        
        if (!encoder.matches(password, u.getPassword())) {
            throw new IllegalArgumentException("Invalid credentials");
        }
        
        String token = jwtUtil.generateToken(email);
        Map<String,Object> res = new HashMap<>();
        
        String role = "USER";
        if (u.getRoles() != null && !u.getRoles().isEmpty()) {
            role = u.getRoles().iterator().next().getName();
        }
        
        res.put("token", token);
        res.put("user", Map.of("email", u.getEmail(), "role", role));
        return res;
    }
}