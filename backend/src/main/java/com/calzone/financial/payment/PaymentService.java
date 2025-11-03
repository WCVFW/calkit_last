package com.calzone.financial.payment;

import com.calzone.financial.payment.dto.OrderDtos.CreateOrderRequest;
import com.calzone.financial.payment.dto.OrderDtos.CreateOrderResponse;
import com.calzone.financial.user.User;
import com.razorpay.Order;
import com.razorpay.RazorpayClient;
import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class PaymentService {

    private final PaymentRepository repo;
    private final Optional<RazorpayClient> client;

    @Value("${razorpay.key_id:}")
    private String keyId;

    public PaymentService(PaymentRepository repo, Optional<RazorpayClient> client) {
        this.repo = repo;
        this.client = client;
    }

    public CreateOrderResponse createOrder(CreateOrderRequest req, User user) throws Exception {
        RazorpayClient razorpayClient = client.orElseThrow(() -> new IllegalStateException("Razorpay not configured"));
        JSONObject options = new JSONObject();
        options.put("amount", req.amount);
        options.put("currency", req.currency);
        if (req.description != null && !req.description.isBlank()) {
            options.put("receipt", req.description.substring(0, Math.min(40, req.description.length())));
            options.put("notes", new JSONObject().put("description", req.description));
        }
        Order order = razorpayClient.orders.create(options);

        Payment p = new Payment();
        p.setOrderId(order.get("id"));
        p.setStatus(order.get("status"));
        p.setAmount(order.get("amount"));
        p.setCurrency(order.get("currency"));
        p.setDescription(req.description);
        p.setUser(user);
        repo.save(p);

        CreateOrderResponse res = new CreateOrderResponse();
        res.orderId = order.get("id");
        res.keyId = keyId;
        res.amount = order.get("amount");
        res.currency = order.get("currency");
        res.status = order.get("status");
        res.description = req.description;
        return res;
    }

    public void markPaid(String orderId, String paymentId) {
        Optional<Payment> opt = repo.findByOrderId(orderId);
        opt.ifPresent(p -> { p.setPaymentId(paymentId); p.setStatus("paid"); repo.save(p); });
    }
}
