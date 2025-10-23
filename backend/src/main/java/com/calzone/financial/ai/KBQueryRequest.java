package com.calzone.financial.ai;

public class KBQueryRequest {
    private String query;

    public KBQueryRequest() {}
    public KBQueryRequest(String query) { this.query = query; }

    public String getQuery() { return query; }
    public void setQuery(String query) { this.query = query; }
}
