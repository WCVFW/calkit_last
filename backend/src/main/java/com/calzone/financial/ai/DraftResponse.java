package com.calzone.financial.ai;

import java.util.List;

public class DraftResponse {
    private String draftText;
    private List<String> notes;

    public DraftResponse() {}
    public DraftResponse(String draftText, List<String> notes) { this.draftText = draftText; this.notes = notes; }

    public String getDraftText() { return draftText; }
    public void setDraftText(String draftText) { this.draftText = draftText; }
    public List<String> getNotes() { return notes; }
    public void setNotes(List<String> notes) { this.notes = notes; }
}
