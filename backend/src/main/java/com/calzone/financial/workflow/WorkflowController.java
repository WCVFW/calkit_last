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
        events.add(Map.of("ts", LocalDateTime.now().minusDays(5).toString(), "event", "Order Created", "by", "system"));
        events.add(Map.of("ts", LocalDateTime.now().minusDays(3).toString(), "event", "Documents Uploaded", "by", "customer"));
        events.add(Map.of("ts", LocalDateTime.now().minusDays(1).toString(), "event", "Filed to MCA", "by", "system"));
        return ResponseEntity.ok(events);
    }

    @GetMapping("/orders/{orderId}/progress")
    public ResponseEntity<Map<String, Object>> progress(@PathVariable Long orderId) {
        Map<String, Object> prog = Map.of("percent", 60, "currentStage", "Drafting MOA/AOA");
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
