package com.calzone.financial.order;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/orders")
public class OrderController {

    private final OrderRepository orderRepository;

    public OrderController(OrderRepository orderRepository) {
        this.orderRepository = orderRepository;
    }

    @PostMapping
    public ResponseEntity<Order> create(@RequestBody Map<String, String> body) {
        Order o = new Order();
        o.setServiceName(body.getOrDefault("serviceName", "Unknown Service"));
        o.setCustomerEmail(body.getOrDefault("customerEmail", "demo@demo.com"));
        Order saved = orderRepository.save(o);
        return ResponseEntity.ok(saved);
    }

    @GetMapping
    public ResponseEntity<List<Order>> list() {
        return ResponseEntity.ok(orderRepository.findAll());
    }

    @GetMapping("/{id}")
    public ResponseEntity<Order> get(@PathVariable Long id) {
        return orderRepository.findById(id).map(ResponseEntity::ok).orElse(ResponseEntity.notFound().build());
    }

    @PutMapping("/{id}")
    public ResponseEntity<Order> update(@PathVariable Long id, @RequestBody Map<String, String> body) {
        return orderRepository.findById(id).map(o -> {
            if (body.containsKey("status")) o.setStatus(body.get("status"));
            Order saved = orderRepository.save(o);
            return ResponseEntity.ok(saved);
        }).orElse(ResponseEntity.notFound().build());
    }
}
