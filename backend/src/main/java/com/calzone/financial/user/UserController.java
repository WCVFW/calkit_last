package com.calzone.financial.user;

import com.calzone.financial.auth.dto.UserProfile;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/user")
public class UserController {

    @GetMapping("/me")
    public ResponseEntity<UserProfile> me(@AuthenticationPrincipal User user) {
        UserProfile profile = new UserProfile(user.getId(), user.getFullName(), user.getEmail(), user.getPhone());
        return ResponseEntity.ok(profile);
    }
}
