package com.calzone.financial.workflow;

import org.springframework.boot.ApplicationRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.stereotype.Component;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

@Component
public class WorkflowInitializer {
    private static final Logger logger = LoggerFactory.getLogger(WorkflowInitializer.class);

    @Bean
    public ApplicationRunner initializeWorkflowSampleData(
            WorkflowEventRepository eventRepository,
            WorkflowAlertRepository alertRepository) {
        return args -> {
            logger.info("Initializing workflow sample data...");

            try {
                // Check if sample data already exists
                if (eventRepository.count() > 0) {
                    logger.info("Sample data already exists, skipping initialization");
                    return;
                }

                Long sampleOrderId = 1002L;

                // Create sample workflow events
                WorkflowEvent event1 = new WorkflowEvent(
                        sampleOrderId,
                        WorkflowStage.WEB,
                        WorkflowStatus.COMPLETED,
                        "Lead captured from website form"
                );
                event1.setDetails("Customer filled registration form on website");
                eventRepository.save(event1);

                WorkflowEvent event2 = new WorkflowEvent(
                        sampleOrderId,
                        WorkflowStage.CRM,
                        WorkflowStatus.COMPLETED,
                        "Lead scored and routed to sales team"
                );
                event2.setDetails("Lead score: 85/100, High priority");
                eventRepository.save(event2);

                WorkflowEvent event3 = new WorkflowEvent(
                        sampleOrderId,
                        WorkflowStage.SALES,
                        WorkflowStatus.COMPLETED,
                        "Customer approved quote and made payment"
                );
                event3.setDetails("Payment of ₹4,999 received");
                eventRepository.save(event3);

                WorkflowEvent event4 = new WorkflowEvent(
                        sampleOrderId,
                        WorkflowStage.ONBD,
                        WorkflowStatus.IN_PROGRESS,
                        "Documents being uploaded and verified"
                );
                event4.setDetails("Waiting for PAN card and Aadhar verification");
                eventRepository.save(event4);

                // Create sample alert
                WorkflowAlert alert = new WorkflowAlert(
                        sampleOrderId,
                        WorkflowAlert.AlertType.DOCUMENT_MISSING,
                        "Document Verification Pending",
                        "Aadhar proof is pending. Please upload for verification."
                );
                alert.setActionUrl("/dashboard/orders/" + sampleOrderId);
                alertRepository.save(alert);

                logger.info("Sample workflow data initialized successfully");
            } catch (Exception e) {
                logger.error("Error initializing sample data", e);
            }
        };
    }
}
