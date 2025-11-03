package com.calzone.financial.lead.dto;

import jakarta.validation.constraints.Size;

public record LeadUpdateRequest(
        @Size(max = 120, message = "Name can be at most 120 characters")
        String name,

        @Size(max = 160, message = "Service can be at most 160 characters")
        String service,

        @Size(max = 40, message = "Status can be at most 40 characters")
        String status
) {
    public boolean isEmpty() {
        return (name == null || name.isBlank()) &&
                (service == null || service.isBlank()) &&
                (status == null || status.isBlank());
    }
}
