package com.calzone.financial.user;

import jakarta.persistence.*;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import java.time.Instant;
import java.util.Collection;
import java.util.List;

@Entity(name = "com_calzone_financial_user_User")
@Table(name = "users", uniqueConstraints = @UniqueConstraint(name = "uk_users_email", columnNames = "email"))
public class User implements UserDetails {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String fullName;

    @Column(nullable = false, unique = true)
    private String email;

    @Column(nullable = false)
    private String phone;

    @Column(nullable = false)
    private String password;

    private Boolean phoneVerified = false;

    @ManyToMany(fetch = FetchType.EAGER)
    @JoinTable(name = "user_roles",
            joinColumns = @JoinColumn(name = "user_id"),
            inverseJoinColumns = @JoinColumn(name = "role_id"))
    private java.util.Set<Role> roles = new java.util.HashSet<>();

    @Column(nullable = false, updatable = false)
    private Instant createdAt;

    @Column(nullable = false)
    private Instant updatedAt;

    @Column(nullable = false)
    private Boolean emailVerified = false;

    // ===================
    // Lifecycle hooks
    // ===================
    @PrePersist
    public void prePersist() {
        Instant now = Instant.now();
        createdAt = now;
        updatedAt = now;
        if (emailVerified == null) emailVerified = false;
    }

    @PreUpdate
    public void preUpdate() {
        updatedAt = Instant.now();
    }

    // ===================
    // UserDetails methods
    // ===================
    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        if (roles == null || roles.isEmpty()) {
            return List.of(new SimpleGrantedAuthority("ROLE_USER"));
        }
        return roles.stream().map(r -> new SimpleGrantedAuthority("ROLE_" + r.getName())).toList();
    }

    @Override
    public String getPassword() { return password; }

    @Override
    public String getUsername() { return email; }

    @Override
    public boolean isAccountNonExpired() { return true; }

    @Override
    public boolean isAccountNonLocked() { return true; }

    @Override
    public boolean isCredentialsNonExpired() { return true; }

    @Override
    public boolean isEnabled() { return true; }

    // ===================
    // Getters & Setters
    // ===================
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public String getFullName() { return fullName; }
    public void setFullName(String fullName) { this.fullName = fullName; }

    public String getEmail() { return email; }
    public void setEmail(String email) { this.email = email; }

    public String getPhone() { return phone; }
    public void setPhone(String phone) { this.phone = phone; }

    public void setPassword(String password) { this.password = password; }

    public Instant getCreatedAt() { return createdAt; }
    public void setCreatedAt(Instant createdAt) { this.createdAt = createdAt; }

    public Instant getUpdatedAt() { return updatedAt; }
    public void setUpdatedAt(Instant updatedAt) { this.updatedAt = updatedAt; }

    public Boolean getEmailVerified() { return emailVerified; }
    public void setEmailVerified(Boolean emailVerified) { this.emailVerified = emailVerified; }

    public Boolean getPhoneVerified() { return phoneVerified; }
    public void setPhoneVerified(Boolean phoneVerified) { this.phoneVerified = phoneVerified; }

    public java.util.Set<Role> getRoles() { return roles; }
    public void setRoles(java.util.Set<Role> roles) { this.roles = roles; }

    // ===================
    // Builder pattern
    // ===================
    public static Builder builder() {
        return new Builder();
    }

    public static class Builder {
        private String fullName;
        private String email;
        private String phone;
        private String password;

        public Builder fullName(String fullName) {
            this.fullName = fullName;
            return this;
        }

        public Builder email(String email) {
            this.email = email;
            return this;
        }

        public Builder phone(String phone) {
            this.phone = phone;
            return this;
        }

        public Builder password(String password) {
            this.password = password;
            return this;
        }

        public User build() {
            User user = new User();
            user.setFullName(fullName);
            user.setEmail(email);
            user.setPhone(phone);
            user.setPassword(password);
            return user;
        }
    }
}
