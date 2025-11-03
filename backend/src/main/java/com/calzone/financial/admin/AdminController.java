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
import java.util.Optional;

@RestController
@RequestMapping("/api/admin")
public class AdminController {
    private final UserRepository users;
    private final RoleRepository roles;
    private final PasswordEncoder encoder;

    public AdminController(UserRepository users, RoleRepository roles, PasswordEncoder encoder) {
        this.users = users; this.roles = roles; this.encoder = encoder;
    }

    // Accepts mobile or phone, optional password, role, address, image (ignored server-side if not supported)
    public record CreateEmployee(@Email String email, String phone, String mobile, String password, @NotBlank String fullName, String role, String address, String image) {}

    // Partial update payload
    public record UpdateEmployee(String fullName, String phone, String mobile, String password, String role, String address, String image) {}

    private static record EmployeeDto(Long id, String fullName, String email, String phone, java.util.List<String> roles, String role, String address, String image) {}

    private static EmployeeDto toDto(User u) {
        java.util.List<String> roleNames = u.getRoles() == null ? java.util.List.of() : u.getRoles().stream().map(r -> r.getName()).toList();
        String primaryRole = roleNames.isEmpty() ? "USER" : roleNames.get(0);
        return new EmployeeDto(u.getId(), u.getFullName(), u.getEmail(), u.getPhone(), roleNames, primaryRole, u.getAddress(), u.getImage());
    }

    @PreAuthorize("hasRole('ADMIN')")
    @PostMapping("/employees")
    public ResponseEntity<?> createEmployee(@RequestBody CreateEmployee req) {
        User u = new User();
        u.setEmail(req.email());
        // Prefer phone, fallback to mobile
        String phoneVal = req.phone() != null && !req.phone().isBlank() ? req.phone() : (req.mobile() != null ? req.mobile() : "");
        u.setPhone(phoneVal);
        u.setFullName(req.fullName());
        if (req.password() != null && !req.password().isBlank()) {
            u.setPassword(encoder.encode(req.password()));
        } else {
            u.setPassword("");
        }

        // Assign role if provided, otherwise EMPLOYEE
        String roleName = (req.role() == null || req.role().isBlank()) ? "EMPLOYEE" : req.role().toUpperCase();
        Role role = roles.findByName(roleName).orElseGet(() -> roles.save(new Role(roleName)));
        u.getRoles().add(role);
        // Persist optional fields
        if (req.address() != null) u.setAddress(req.address());
        if (req.image() != null) u.setImage(req.image());

        users.save(u);
        return ResponseEntity.ok(Map.of("id", u.getId()));
    }

    @PreAuthorize("hasRole('ADMIN')")
    @GetMapping("/employees")
    public java.util.List<EmployeeDto> listEmployees() {
        // Return users that have ADMIN or EMPLOYEE role (so admin can see employees and admins)
        return users.findAll().stream()
                .filter(u -> u.getRoles().stream().anyMatch(r -> r.getName().equals("EMPLOYEE") || r.getName().equals("ADMIN")))
                .map(AdminController::toDto)
                .toList();
    }

    @PreAuthorize("hasRole('ADMIN')")
    @GetMapping("/employees/{id}")
    public ResponseEntity<EmployeeDto> getEmployee(@PathVariable Long id) {
        return users.findById(id).map(u -> ResponseEntity.ok(toDto(u))).orElse(ResponseEntity.notFound().build());
    }

    @PreAuthorize("hasRole('ADMIN')")
    @PutMapping("/employees/{id}")
    public ResponseEntity<?> updateEmployee(@PathVariable Long id, @RequestBody UpdateEmployee req) {
        Optional<User> ou = users.findById(id);
        if (ou.isEmpty()) return ResponseEntity.notFound().build();
        User u = ou.get();
        if (req.fullName() != null) u.setFullName(req.fullName());
        if (req.phone() != null) u.setPhone(req.phone());
        else if (req.mobile() != null) u.setPhone(req.mobile());
        if (req.password() != null && !req.password().isBlank()) u.setPassword(encoder.encode(req.password()));

        // Handle role change
        if (req.role() != null && !req.role().isBlank()) {
            String rname = req.role().toUpperCase();
            Role role = roles.findByName(rname).orElseGet(() -> roles.save(new Role(rname)));
            // replace existing roles with the single provided role
            u.getRoles().clear();
            u.getRoles().add(role);
        }

        // Optional fields
        if (req.address() != null) u.setAddress(req.address());
        if (req.image() != null) u.setImage(req.image());

        users.save(u);
        return ResponseEntity.ok(Map.of("id", u.getId()));
    }

    @PreAuthorize("hasRole('ADMIN')")
    @DeleteMapping("/employees/{id}")
    public ResponseEntity<Void> deleteEmployee(@PathVariable Long id) {
        users.findById(id).ifPresent(u -> users.delete(u));
        return ResponseEntity.noContent().build();
    }
}
