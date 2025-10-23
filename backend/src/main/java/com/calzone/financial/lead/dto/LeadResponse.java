package com.calzone.financial.lead.dto;

import java.time.Instant;

public record LeadResponse(
        Long id,
        String name,
        String service,
        String status,
        Instant createdAt,
        Instant updatedAt
) {
}
