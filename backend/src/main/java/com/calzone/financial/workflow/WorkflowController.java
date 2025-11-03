package com.calzone.financial.workflow;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.util.*;

@RestController
@RequestMapping("/api/workflow")
public class WorkflowController {

    @GetMapping("/orders/{orderId}/timeline")
    public ResponseEntity<List<Map<String, Object>>> timeline(@PathVariable Long orderId) {
        List<Map<String, Object>> events = new ArrayList<>();
        events.add(Map.of(
            "id", 1L,
            "orderId", orderId,
            "stage", "WEB",
            "status", "COMPLETED",
            "description", "Order created successfully",
            "details", "Customer initiated the service order",
            "createdAt", LocalDateTime.now().minusDays(5).toString()
        ));
        events.add(Map.of(
            "id", 2L,
            "orderId", orderId,
            "stage", "CRM",
            "status", "COMPLETED",
            "description", "Customer routed to CRM system",
            "details", "Order details recorded in CRM database",
            "createdAt", LocalDateTime.now().minusDays(3).toString()
        ));
        events.add(Map.of(
            "id", 3L,
            "orderId", orderId,
            "stage", "SALES",
            "status", "IN_PROGRESS",
            "description", "Sales processing in progress",
            "details", "Awaiting payment confirmation",
            "createdAt", LocalDateTime.now().minusDays(1).toString()
        ));
        return ResponseEntity.ok(events);
    }

    @GetMapping("/orders/{orderId}/progress")
    public ResponseEntity<Map<String, Object>> progress(@PathVariable Long orderId) {
        List<Map<String, Object>> stages = new ArrayList<>();
        stages.add(Map.of("sequence", 1, "stage", "WEB", "label", "Web/App", "status", "COMPLETED"));
        stages.add(Map.of("sequence", 2, "stage", "CRM", "label", "CRM Routing", "status", "COMPLETED"));
        stages.add(Map.of("sequence", 3, "stage", "SALES", "label", "Sales & Payment", "status", "IN_PROGRESS"));
        stages.add(Map.of("sequence", 4, "stage", "ONBD", "label", "Onboarding", "status", "PENDING"));
        stages.add(Map.of("sequence", 5, "stage", "CASE", "label", "Case Management", "status", "PENDING"));
        stages.add(Map.of("sequence", 6, "stage", "EXEC", "label", "Execution", "status", "PENDING"));
        stages.add(Map.of("sequence", 7, "stage", "GOVT", "label", "Government Portal", "status", "PENDING"));
        stages.add(Map.of("sequence", 8, "stage", "QA", "label", "QA & Compliance", "status", "PENDING"));
        stages.add(Map.of("sequence", 9, "stage", "DEL", "label", "Delivery", "status", "PENDING"));

        Map<String, Object> prog = new HashMap<>();
        prog.put("orderId", orderId);
        prog.put("currentStage", "SALES");
        prog.put("completionPercentage", 33);
        prog.put("stages", stages);
        return ResponseEntity.ok(prog);
    }

    @GetMapping("/orders/{orderId}/current-stage")
    public ResponseEntity<Map<String, Object>> current(@PathVariable Long orderId) {
        Map<String, Object> current = Map.of("stage", "Drafting MOA/AOA", "etaDays", 3);
        return ResponseEntity.ok(current);
    }

    @PostMapping("/orders/{orderId}/advance")
    public ResponseEntity<?> advance(@PathVariable Long orderId, @RequestBody Map<String,String> body) {
        return ResponseEntity.ok(Map.of("status","advanced","orderId",orderId));
    }

    @PostMapping("/orders/{orderId}/complete")
    public ResponseEntity<?> complete(@PathVariable Long orderId, @RequestBody Map<String,String> body) {
        return ResponseEntity.ok(Map.of("status","completed","orderId",orderId));
    }

    @PostMapping("/orders/{orderId}/fail")
    public ResponseEntity<?> fail(@PathVariable Long orderId, @RequestBody Map<String,String> body) {
        return ResponseEntity.ok(Map.of("status","failed","orderId",orderId));
    }

    @PostMapping("/orders/{orderId}/event")
    public ResponseEntity<?> event(@PathVariable Long orderId, @RequestBody Map<String,String> body) {
        return ResponseEntity.ok(Map.of("status","event_created","orderId",orderId, "event", body));
    }

    @PostMapping("/orders/{orderId}/exception")
    public ResponseEntity<?> exception(@PathVariable Long orderId, @RequestBody Map<String,String> body) {
        return ResponseEntity.ok(Map.of("status","exception_added","orderId",orderId));
    }

    @GetMapping("/orders/{orderId}/exceptions")
    public ResponseEntity<List<Map<String,Object>>> exceptions(@PathVariable Long orderId) {
        return ResponseEntity.ok(List.of(Map.of("id",1,"type","missing_docs","status","open")));
    }

    @GetMapping("/stages")
    public ResponseEntity<List<String>> stages() {
        return ResponseEntity.ok(List.of("Intake","Drafting","Filing","Processing","Delivery"));
    }
}
