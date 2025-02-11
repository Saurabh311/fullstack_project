package com.saurabh.practice.service;

import com.saurabh.practice.entity.User;
import com.saurabh.practice.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Collections;

@Service
public class CustomUserDetailsService implements UserDetailsService {
    @Autowired
    private UserRepository userRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        User user = userRepository.findByUserName(username);
        if (user == null) {
            throw new UsernameNotFoundException("User not found");
        }
        // Return Spring Security's User object
        return new org.springframework.security.core.userdetails.User(
                user.getRole(),
                user.getPassword(),
                Collections.singleton(new SimpleGrantedAuthority("User"))
        );
    }

    public boolean authenticate(String username, String rawPassword) {
        User user = userRepository.findByUserName(username);
        if (user == null) {
            return false;  // Username not found
        }

        // Compare the raw password with the encoded password stored in the database
        return passwordEncoder.matches(rawPassword, user.getPassword());
    }
}
