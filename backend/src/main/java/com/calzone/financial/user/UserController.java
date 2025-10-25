package com.calzone.financial.user;

import com.calzone.financial.auth.dto.UserProfile;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Map;

@RestController
@RequestMapping("/api/user")
public class UserController {

    private final com.calzone.financial.user.UserRepository userRepository;
    private final org.springframework.security.crypto.password.PasswordEncoder passwordEncoder;

    public UserController(com.calzone.financial.user.UserRepository userRepository, org.springframework.security.crypto.password.PasswordEncoder passwordEncoder) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
    }

    @GetMapping("/me")
    public ResponseEntity<UserProfile> me(@AuthenticationPrincipal User user) {
        UserProfile profile = new UserProfile(user.getId(), user.getFullName(), user.getEmail(), user.getPhone());
        return ResponseEntity.ok(profile);
    }

    @PutMapping("/me")
    public ResponseEntity<?> updateMe(@AuthenticationPrincipal User user, @RequestBody Map<String, String> body) {
        if (user == null) return ResponseEntity.status(401).build();

        String fullName = body.get("fullName");
        String phone = body.get("phone");
        String password = body.get("password");

        boolean changed = false;
        if (fullName != null) {
            user.setFullName(fullName.trim());
            changed = true;
        }
        if (phone != null) {
            user.setPhone(phone.trim());
            changed = true;
        }
        if (password != null && !password.isBlank()) {
            user.setPassword(passwordEncoder.encode(password));
            changed = true;
        }

        if (changed) {
            userRepository.save(user);
        }

        UserProfile profile = new UserProfile(user.getId(), user.getFullName(), user.getEmail(), user.getPhone());
        return ResponseEntity.ok(Map.of("user", profile, "message", "Profile updated"));
    }
}
