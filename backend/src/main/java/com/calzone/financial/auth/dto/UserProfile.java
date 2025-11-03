package com.calzone.financial.auth.dto;

public record UserProfile(
        Long id,
        String fullName,
        String email,
        String phone
) {
}
