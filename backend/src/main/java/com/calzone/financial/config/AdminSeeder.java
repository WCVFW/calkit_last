package com.calzone.financial.config;

import com.calzone.financial.user.Role;
import com.calzone.financial.user.RoleRepository;
import com.calzone.financial.user.User;
import com.calzone.financial.user.UserRepository;
import org.springframework.boot.ApplicationArguments;
import org.springframework.boot.ApplicationRunner;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

@Component
public class AdminSeeder implements ApplicationRunner {

    private final UserRepository users;
    private final RoleRepository roles;
    private final PasswordEncoder encoder;

    public AdminSeeder(UserRepository users, RoleRepository roles, PasswordEncoder encoder) {
        this.users = users;
        this.roles = roles;
        this.encoder = encoder;
    }

    @Override
    public void run(ApplicationArguments args) throws Exception {
        // Admin credentials (provided by user)
        final String adminEmail = "prakash@hadoglobalservices.com";
        final String adminPassword = "Prakash@1482";
        final String adminFullName = "Prakash Admin";
        final String adminPhone = "9999999999";

        // Ensure ADMIN role exists
        Role adminRole = roles.findByName("ADMIN").orElseGet(() -> roles.save(new Role("ADMIN")));

        // Ensure EMPLOYEE role exists
        Role employeeRole = roles.findByName("EMPLOYEE").orElseGet(() -> roles.save(new Role("EMPLOYEE")));

        // Ensure admin user exists
        users.findByEmail(adminEmail).ifPresentOrElse(u -> {
            // Ensure user has ADMIN role
            if (u.getRoles().stream().noneMatch(r -> r.getName().equals("ADMIN"))) {
                u.getRoles().add(adminRole);
                users.save(u);
            }
        }, () -> {
            User u = new User();
            u.setEmail(adminEmail);
            u.setFullName(adminFullName);
            u.setPhone(adminPhone);
            u.setPassword(encoder.encode(adminPassword));
            u.getRoles().add(adminRole);
            users.save(u);
        });

        // Seed a default employee account for testing
        final String employeeEmail = "employee@calkit.local";
        final String employeePassword = "Employee@123";
        final String employeeFullName = "Default Employee";
        final String employeePhone = "8888888888";

        users.findByEmail(employeeEmail).ifPresentOrElse(u -> {
            if (u.getRoles().stream().noneMatch(r -> r.getName().equals("EMPLOYEE"))) {
                u.getRoles().add(employeeRole);
                users.save(u);
            }
        }, () -> {
            User eu = new User();
            eu.setEmail(employeeEmail);
            eu.setFullName(employeeFullName);
            eu.setPhone(employeePhone);
            eu.setPassword(encoder.encode(employeePassword));
            eu.getRoles().add(employeeRole);
            users.save(eu);
        });
    }
}
