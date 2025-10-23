package com.calzone.financial.workflow;

public enum WorkflowStage {
    WEB(1, "Web/App Layer", "Lead/Order forms"),
    CRM(2, "CRM & Lead Routing", "Lead scoring/SDR"),
    SALES(3, "Sales & Payments", "Payment gateway/e-sign"),
    ONBD(4, "Onboarding & Doc Intake", "Secure upload/OCR"),
    CASE(5, "Case Management", "Expert assignment/SLA"),
    EXEC(6, "Service Execution", "Company Reg/Trademark/Tax"),
    GOVT(7, "Government Portals", "MCA/GST/RPA"),
    QA(8, "QA & Compliance", "Peer review/Checklists"),
    DEL(9, "Delivery & Closure", "Upload deliverables/Invoice"),
    
    // Exception stages
    PF(0, "Payment Failure", "Payment processing failure"),
    MD(0, "Missing Documents", "Incomplete/invalid docs"),
    GO(0, "Govt Objection", "Government rejection"),
    SLAB(0, "SLA Breach", "SLA breach risk detected"),
    CR(0, "Cancellation Request", "Cancellation/Refund");

    private final int sequence;
    private final String label;
    private final String description;

    WorkflowStage(int sequence, String label, String description) {
        this.sequence = sequence;
        this.label = label;
        this.description = description;
    }

    public int getSequence() { return sequence; }
    public String getLabel() { return label; }
    public String getDescription() { return description; }

    public boolean isMainStage() { return sequence > 0; }
    public boolean isException() { return sequence == 0; }
}
