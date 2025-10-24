package com.calzone.financial.auth;

import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import com.calzone.financial.user.User;
import com.calzone.financial.user.UserRepository;
@Service
public class AuthService {

    private final UserRepository userRepository;
    private final PasswordEncoder encoder;
    private final JwtUtil jwtUtil;

    public AuthService(UserRepository userRepository, PasswordEncoder encoder, JwtUtil jwtUtil) {
        this.userRepository = userRepository;
        this.encoder = encoder;
        this.jwtUtil = jwtUtil;
    }

    public java.util.Map<String, Object> register(String email, String password, String fullName, String phone) {
        if (userRepository.findByEmail(email).isPresent()) throw new IllegalArgumentException("Email exists");
        String hash = encoder.encode(password);
        User u = User.builder()
                .email(email)
                .password(hash)
                .fullName(fullName == null ? "" : fullName.trim())
                .phone(phone == null ? "" : phone.trim())
                .build();
        userRepository.save(u);
        String token = jwtUtil.generateToken(email);
        java.util.Map<String,Object> res = new java.util.HashMap<>();
        res.put("token", token);
        String role = "USER";
        if (u.getRoles()!=null && !u.getRoles().isEmpty()) {
            role = u.getRoles().iterator().next().getName();
        }
        res.put("user", java.util.Map.of(
                "id", u.getId(),
                "fullName", u.getFullName(),
                "email", u.getEmail(),
                "phone", u.getPhone(),
                "role", role
        ));
        return res;
    }

    public java.util.Map<String, Object> login(String email, String password) {
        User u = userRepository.findByEmail(email).orElseThrow(() -> new IllegalArgumentException("Invalid credentials"));
        String stored = u.getPassword() == null ? "" : u.getPassword();

        boolean ok = false;
        try {
            if (stored.startsWith("{")) {
                // DelegatingPasswordEncoder format, match normally
                ok = encoder.matches(password, stored);
            } else {
                // Legacy plain password (no encoder prefix) — allow match and re-encode using current encoder
                ok = stored.equals(password);
                if (ok) {
                    u.setPassword(encoder.encode(password));
                    userRepository.save(u);
                }
            }
        } catch (Exception ex) {
            // If any error during matching, treat as fail
            ok = false;
        }

        if (!ok) throw new IllegalArgumentException("Invalid credentials");

        String token = jwtUtil.generateToken(email);
        java.util.Map<String,Object> res = new java.util.HashMap<>();
        String role = "USER";
        if (u.getRoles()!=null && !u.getRoles().isEmpty()) {
            role = u.getRoles().iterator().next().getName();
        }
        res.put("token", token);
        res.put("user", java.util.Map.of(
                "id", u.getId(),
                "fullName", u.getFullName(),
                "email", u.getEmail(),
                "phone", u.getPhone(),
                "role", role
        ));
        return res;
    }
}
