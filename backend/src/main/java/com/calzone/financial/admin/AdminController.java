package com.calzone.financial.admin;

import com.calzone.financial.user.Role;
import com.calzone.financial.user.RoleRepository;
import com.calzone.financial.user.User;
import com.calzone.financial.user.UserRepository;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/api/admin")
public class AdminController {
    private final UserRepository users;
    private final RoleRepository roles;
    private final PasswordEncoder encoder;

    public AdminController(UserRepository users, RoleRepository roles, PasswordEncoder encoder) {
        this.users = users; this.roles = roles; this.encoder = encoder;
    }

    public record CreateEmployee(@Email String email, @NotBlank String phone, @NotBlank String password, @NotBlank String fullName) {}

    private static record EmployeeDto(Long id, String fullName, String email, String phone, java.util.List<String> roles) {}

    private static EmployeeDto toDto(User u) {
        java.util.List<String> roleNames = u.getRoles() == null ? java.util.List.of() : u.getRoles().stream().map(r -> r.getName()).toList();
        return new EmployeeDto(u.getId(), u.getFullName(), u.getEmail(), u.getPhone(), roleNames);
    }

    @PreAuthorize("hasRole('ADMIN')")
    @PostMapping("/employees")
    public ResponseEntity<?> createEmployee(@RequestBody CreateEmployee req) {
        User u = new User();
        u.setEmail(req.email());
        u.setPhone(req.phone());
        u.setFullName(req.fullName());
        u.setPassword(encoder.encode(req.password()));
        Role role = roles.findByName("EMPLOYEE").orElseGet(() -> roles.save(new Role("EMPLOYEE")));
        u.getRoles().add(role);
        users.save(u);
        return ResponseEntity.ok(Map.of("id", u.getId()));
    }

    @PreAuthorize("hasRole('ADMIN')")
    @GetMapping("/employees")
    public java.util.List<EmployeeDto> listEmployees() {
        return users.findAll().stream()
                .filter(u -> u.getRoles().stream().anyMatch(r -> r.getName().equals("EMPLOYEE")))
                .map(AdminController::toDto)
                .toList();
    }

    @PreAuthorize("hasRole('ADMIN')")
    @GetMapping("/employees/{id}")
    public ResponseEntity<EmployeeDto> getEmployee(@PathVariable Long id) {
        return users.findById(id).map(u -> ResponseEntity.ok(toDto(u))).orElse(ResponseEntity.notFound().build());
    }

    @PreAuthorize("hasRole('ADMIN')")
    @DeleteMapping("/employees/{id}")
    public ResponseEntity<Void> deleteEmployee(@PathVariable Long id) {
        users.findById(id).ifPresent(u -> users.delete(u));
        return ResponseEntity.noContent().build();
    }
}
