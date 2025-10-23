package com.calzone.financial.ai;

public class PredictResponse {
    private String etaDate;
    private int etaDays;
    private String rationale;

    public PredictResponse() {}
    public PredictResponse(String etaDate, int etaDays, String rationale) { this.etaDate = etaDate; this.etaDays = etaDays; this.rationale = rationale; }

    public String getEtaDate() { return etaDate; }
    public void setEtaDate(String etaDate) { this.etaDate = etaDate; }
    public int getEtaDays() { return etaDays; }
    public void setEtaDays(int etaDays) { this.etaDays = etaDays; }
    public String getRationale() { return rationale; }
    public void setRationale(String rationale) { this.rationale = rationale; }
}
