package com.calzone.financial.ai;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/ai")
public class AIController {

    private final MockAIService aiService;

    public AIController(MockAIService aiService) {
        this.aiService = aiService;
    }

    @PostMapping("/chat")
    public ResponseEntity<ChatResponse> chat(@RequestBody ChatRequest req) {
        ChatResponse res = aiService.chat(req);
        return ResponseEntity.ok(res);
    }

    @PostMapping("/ocr/validate")
    public ResponseEntity<OCRResponse> ocrValidate(@RequestBody OCRRequest req) {
        OCRResponse res = aiService.ocrValidate(req);
        return ResponseEntity.ok(res);
    }

    @PostMapping("/docs/draft")
    public ResponseEntity<DraftResponse> draftDocument(@RequestBody DraftRequest req) {
        DraftResponse res = aiService.draftDocument(req);
        return ResponseEntity.ok(res);
    }

    @PostMapping("/kb/search")
    public ResponseEntity<KBQueryResponse> kbSearch(@RequestBody KBQueryRequest req) {
        KBQueryResponse res = aiService.kbSearch(req);
        return ResponseEntity.ok(res);
    }

    @PostMapping("/predict/eta")
    public ResponseEntity<PredictResponse> predictEta(@RequestBody PredictRequest req) {
        PredictResponse res = aiService.predictEta(req);
        return ResponseEntity.ok(res);
    }

    @PostMapping("/triage/objection")
    public ResponseEntity<TriageResponse> triage(@RequestBody TriageRequest req) {
        TriageResponse res = aiService.triage(req);
        return ResponseEntity.ok(res);
    }
}
