package com.calzone.financial.ai;

public class TriageRequest {
    private String caseId;
    private String objectionText;

    public TriageRequest() {}
    public TriageRequest(String caseId, String objectionText) { this.caseId = caseId; this.objectionText = objectionText; }

    public String getCaseId() { return caseId; }
    public void setCaseId(String caseId) { this.caseId = caseId; }
    public String getObjectionText() { return objectionText; }
    public void setObjectionText(String objectionText) { this.objectionText = objectionText; }
}
