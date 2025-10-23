package com.calzone.financial.ai;

import java.util.List;

public class TriageResponse {
    private String priority;
    private String strategy;
    private List<String> references;

    public TriageResponse() {}
    public TriageResponse(String priority, String strategy, List<String> references) { this.priority = priority; this.strategy = strategy; this.references = references; }

    public String getPriority() { return priority; }
    public void setPriority(String priority) { this.priority = priority; }
    public String getStrategy() { return strategy; }
    public void setStrategy(String strategy) { this.strategy = strategy; }
    public List<String> getReferences() { return references; }
    public void setReferences(List<String> references) { this.references = references; }
}
