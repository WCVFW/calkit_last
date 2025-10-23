package com.calzone.financial.ai;

import java.util.Map;

public class DraftRequest {
    private String type;
    private String clientName;
    private Map<String,String> parameters;

    public DraftRequest() {}
    public DraftRequest(String type, String clientName, Map<String,String> parameters) { this.type = type; this.clientName = clientName; this.parameters = parameters; }

    public String getType() { return type; }
    public void setType(String type) { this.type = type; }
    public String getClientName() { return clientName; }
    public void setClientName(String clientName) { this.clientName = clientName; }
    public Map<String, String> getParameters() { return parameters; }
    public void setParameters(Map<String, String> parameters) { this.parameters = parameters; }
}
