package com.saurabh.practice.dto;

import lombok.Data;
@Data
public class AuthenticationRequest {
    private String userName;
    private String password;

    // Default constructor
    public AuthenticationRequest() {}

    // Getters and Setters
    public String getUserName() {
        return userName;
    }

    public void setUserName(String userName) {
        this.userName = userName;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }
}

