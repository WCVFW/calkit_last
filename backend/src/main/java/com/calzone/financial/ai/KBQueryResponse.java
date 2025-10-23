package com.calzone.financial.ai;

import java.util.List;

public class KBQueryResponse {
    private String answer;
    private List<Citation> citations;

    public KBQueryResponse() {}
    public KBQueryResponse(String answer, List<Citation> citations) { this.answer = answer; this.citations = citations; }

    public String getAnswer() { return answer; }
    public void setAnswer(String answer) { this.answer = answer; }
    public List<Citation> getCitations() { return citations; }
    public void setCitations(List<Citation> citations) { this.citations = citations; }

    public static class Citation {
        private String title;
        private String url;

        public Citation() {}
        public Citation(String title, String url) { this.title = title; this.url = url; }

        public String getTitle() { return title; }
        public void setTitle(String title) { this.title = title; }
        public String getUrl() { return url; }
        public void setUrl(String url) { this.url = url; }
    }
}
