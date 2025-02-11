package com.saurabh.practice.dto;

import lombok.Data;

@Data
public class AuthenticationResponse {
    private String token;

    // Constructor
    public AuthenticationResponse(String token) {
        this.token = token;
    }

    // Getter
    public String getToken() {
        return token;
    }

    // Setter (optional, depending on whether you need it)
    public void setToken(String token) {
        this.token = token;
    }
}

