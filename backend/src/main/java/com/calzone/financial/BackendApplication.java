package com.calzone.financial;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.context.properties.ConfigurationPropertiesScan;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;
import org.springframework.boot.autoconfigure.domain.EntityScan;

@SpringBootApplication
@ConfigurationPropertiesScan
@EnableJpaRepositories(
    basePackages = {
        "com.calzone.financial.auth",
        "com.calzone.financial.user",
        "com.calzone.financial.lead",
        "com.calzone.financial.order",
        "com.calzone.financial.payment",
        "com.calzone.financial.docs",
        "com.calzone.financial.casemgmt",
        "com.calzone.financial.workflow",
        "com.calzone.financial.email",
        "com.calzone.financial.sms",
        "com.calzone.financial.process",
        "com.calzone.financial.compliance",
        "com.calzone.financial.servicehub"
    },
    basePackageClasses = {
        com.calzone.financial.order.OrderRepository.class,
        com.calzone.financial.order.DocumentRepository.class,
        com.calzone.financial.docs.DocsDocumentRepository.class
    }
)
@EntityScan(basePackages = {
    "com.calzone.financial.auth",
    "com.calzone.financial.user",
    "com.calzone.financial.lead",
    "com.calzone.financial.order",
    "com.calzone.financial.payment",
    "com.calzone.financial.docs",
    "com.calzone.financial.casemgmt",
    "com.calzone.financial.workflow",
    "com.calzone.financial.email",
    "com.calzone.financial.sms",
    "com.calzone.financial.process",
    "com.calzone.financial.servicehub",
    // --- THIS LINE WAS MISSING/INCORRECT IN YOUR ORIGINAL CODE ---
    "com.calzone.financial.compliance" // <-- ADDED/CORRECTED THIS
    })
public class BackendApplication {

    public static void main(String[] args) {
        SpringApplication.run(BackendApplication.class, args);
    }
}
