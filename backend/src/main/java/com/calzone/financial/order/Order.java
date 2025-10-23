package com.calzone.financial.order;

import jakarta.persistence.*;
import java.time.LocalDateTime;

@Entity(name = "com_calzone_financial_order_Order")
@Table(name = "orders")
public class Order {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String serviceName;
    private String customerEmail;
    private String status = "CREATED";
    private LocalDateTime createdAt = LocalDateTime.now();

    public Order() {}

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }
    public String getServiceName() { return serviceName; }
    public void setServiceName(String serviceName) { this.serviceName = serviceName; }
    public String getCustomerEmail() { return customerEmail; }
    public void setCustomerEmail(String customerEmail) { this.customerEmail = customerEmail; }
    public String getStatus() { return status; }
    public void setStatus(String status) { this.status = status; }
    public LocalDateTime getCreatedAt() { return createdAt; }
    public void setCreatedAt(LocalDateTime createdAt) { this.createdAt = createdAt; }
}
