package com.calzone.financial.ai;

import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;
import java.util.Map;

@Service
public class MockAIService {

    public ChatResponse chat(ChatRequest req) {
        String reply = "Hello " + (req.getUserName() == null ? "there" : req.getUserName())
                + ", I'm a demo legal assistant. Tell me about your issue and I can help with next steps.";
        return new ChatResponse(reply, List.of("I can help with Company Registration, Trademark, Tax, Documents."));
    }

    public OCRResponse ocrValidate(OCRRequest req) {
        // Mocked OCR: if filename contains "id" return parsed fields
        if (req.getFilename() != null && req.getFilename().toLowerCase().contains("id")) {
            return new OCRResponse(true, Map.of("name", "Demo User", "idNumber", "ID123456"), List.of());
        }
        // Otherwise return missing required fields
        return new OCRResponse(false, Map.of(), List.of("name", "idNumber"));
    }

    public DraftResponse draftDocument(DraftRequest req) {
        String body = "[DRAFT for " + req.getType() + "]\nThis is an AI-generated draft for " + req.getClientName()
                + " using the selected clauses. Please review and edit before finalizing.";
        return new DraftResponse(body, List.of("Please verify client name, addresses, and signatory details."));
    }

    public KBQueryResponse kbSearch(KBQueryRequest req) {
        // Mocked KB: return a short answer with a citation
        String answer = "For " + req.getQuery() + ", typically the applicable regulation is Section X of the Indian Companies Act.\n" +
                "Recommendation: consult CA/CS for filing specifics.";
        return new KBQueryResponse(answer, List.of(new KBQueryResponse.Citation("Indian Companies Act", "https://www.indiacode.nic.in/")));
    }

    public PredictResponse predictEta(PredictRequest req) {
        // Mock prediction based on service type
        int days = switch (req.getServiceType().toLowerCase()) {
            case "company registration" -> 7;
            case "trademark" -> 30;
            case "tax" -> 5;
            default -> 14;
        };
        LocalDate eta = LocalDate.now().plusDays(days);
        return new PredictResponse(eta.toString(), days, "Based on historical averages (demo data).");
    }

    public TriageResponse triage(TriageRequest req) {
        // Mock triage: simple severity analysis
        String strategy = "Review objection, prepare response with precedent references";
        String priority = req.getObjectionText().length() > 100 ? "High" : "Medium";
        return new TriageResponse(priority, strategy, List.of("Reference A", "Reference B"));
    }
}
