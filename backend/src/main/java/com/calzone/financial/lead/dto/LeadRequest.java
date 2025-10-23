package com.calzone.financial.lead.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

public record LeadRequest(
        @NotBlank(message = "Name is required")
        @Size(max = 120, message = "Name can be at most 120 characters")
        String name,

        @Size(max = 160, message = "Service can be at most 160 characters")
        String service,

        @NotBlank(message = "Status is required")
        @Size(max = 40, message = "Status can be at most 40 characters")
        String status
) {
}
