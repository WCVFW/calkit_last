package com.calzone.financial.auth;

import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import com.calzone.financial.user.User;
import com.calzone.financial.user.UserRepository;
@Service
public class AuthService {

    private final UserRepository userRepository;
    private final BCryptPasswordEncoder encoder = new BCryptPasswordEncoder();
    private final JwtUtil jwtUtil;

    public AuthService(UserRepository userRepository, JwtUtil jwtUtil) {
        this.userRepository = userRepository;
        this.jwtUtil = jwtUtil;
    }

    public java.util.Map<String, Object> register(String email, String password, String string, String string2) {
        if (userRepository.findByEmail(email).isPresent()) throw new IllegalArgumentException("Email exists");
        String hash = encoder.encode(password);
        User u = User.builder().email(email).password(hash).fullName("").phone("").build();
        userRepository.save(u);
        String token = jwtUtil.generateToken(email);
        java.util.Map<String,Object> res = new java.util.HashMap<>();
        res.put("token", token);
        String role = "USER";
        if (u.getRoles()!=null && !u.getRoles().isEmpty()) {
            role = u.getRoles().iterator().next().getName();
        }
        res.put("user", java.util.Map.of("email", u.getEmail(), "role", role));
        return res;
    }

    public java.util.Map<String, Object> login(String email, String password) {
        User u = userRepository.findByEmail(email).orElseThrow(() -> new IllegalArgumentException("Invalid credentials"));
        if (!encoder.matches(password, u.getPassword())) throw new IllegalArgumentException("Invalid credentials");
        String token = jwtUtil.generateToken(email);
        java.util.Map<String,Object> res = new java.util.HashMap<>();
        String role = "USER";
        if (u.getRoles()!=null && !u.getRoles().isEmpty()) {
            role = u.getRoles().iterator().next().getName();
        }
        res.put("token", token);
        res.put("user", java.util.Map.of("email", u.getEmail(), "role", role));
        return res;
    }
}
