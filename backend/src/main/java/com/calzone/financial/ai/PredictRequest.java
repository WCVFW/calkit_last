package com.calzone.financial.ai;

public class PredictRequest {
    private String serviceType;

    public PredictRequest() {}
    public PredictRequest(String serviceType) { this.serviceType = serviceType; }

    public String getServiceType() { return serviceType; }
    public void setServiceType(String serviceType) { this.serviceType = serviceType; }
}
