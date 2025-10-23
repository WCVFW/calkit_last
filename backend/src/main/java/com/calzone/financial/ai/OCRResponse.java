package com.calzone.financial.ai;

import java.util.List;
import java.util.Map;

public class OCRResponse {
    private boolean valid;
    private Map<String, String> extracted;
    private List<String> missingFields;

    public OCRResponse() {}
    public OCRResponse(boolean valid, Map<String, String> extracted, List<String> missingFields) {
        this.valid = valid; this.extracted = extracted; this.missingFields = missingFields;
    }

    public boolean isValid() { return valid; }
    public void setValid(boolean valid) { this.valid = valid; }
    public Map<String, String> getExtracted() { return extracted; }
    public void setExtracted(Map<String, String> extracted) { this.extracted = extracted; }
    public List<String> getMissingFields() { return missingFields; }
    public void setMissingFields(List<String> missingFields) { this.missingFields = missingFields; }
}
