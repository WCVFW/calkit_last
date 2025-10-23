package com.calzone.financial.lead;

import com.calzone.financial.lead.dto.LeadRequest;
import com.calzone.financial.lead.dto.LeadResponse;
import com.calzone.financial.lead.dto.LeadUpdateRequest;
import com.calzone.financial.user.User;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;

@Service
public class LeadService {

    private final LeadRepository leadRepository;

    public LeadService(LeadRepository leadRepository) {
        this.leadRepository = leadRepository;
    }

    @Transactional(readOnly = true)
    public List<LeadResponse> findAll(User owner) {
        return leadRepository.findAllByOwnerOrderByCreatedAtDesc(owner)
                .stream()
                .map(this::toResponse)
                .toList();
    }

    @Transactional
    public LeadResponse create(LeadRequest request, User owner) {
        Lead lead = new Lead();
        lead.setName(request.name().trim());
        lead.setService(request.service() == null ? null : request.service().trim());
        lead.setStatus(normalizeStatus(request.status()));
        lead.setOwner(owner);
        Lead saved = leadRepository.save(lead);
        return toResponse(saved);
    }

    @Transactional
    public LeadResponse update(Long id, LeadUpdateRequest request, User owner) {
        Lead lead = leadRepository.findByIdAndOwner(id, owner)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Lead not found"));

        if (!request.isEmpty()) {
            if (request.name() != null && !request.name().isBlank()) {
                lead.setName(request.name().trim());
            }
            if (request.service() != null) {
                lead.setService(request.service().isBlank() ? null : request.service().trim());
            }
            if (request.status() != null && !request.status().isBlank()) {
                lead.setStatus(normalizeStatus(request.status()));
            }
        }

        return toResponse(lead);
    }

    @Transactional
    public void delete(Long id, User owner) {
        Lead lead = leadRepository.findByIdAndOwner(id, owner)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Lead not found"));
        leadRepository.delete(lead);
    }

    private LeadResponse toResponse(Lead lead) {
        return new LeadResponse(
                lead.getId(),
                lead.getName(),
                lead.getService(),
                lead.getStatus(),
                lead.getCreatedAt(),
                lead.getUpdatedAt()
        );
    }

    private String normalizeStatus(String status) {
        return status.trim();
    }
}
