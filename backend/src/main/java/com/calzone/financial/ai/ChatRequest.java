package com.calzone.financial.ai;

public class ChatRequest {
    private String userName;
    private String message;

    public ChatRequest() {}
    public ChatRequest(String userName, String message) { this.userName = userName; this.message = message; }

    public String getUserName() { return userName; }
    public void setUserName(String userName) { this.userName = userName; }
    public String getMessage() { return message; }
    public void setMessage(String message) { this.message = message; }
}
