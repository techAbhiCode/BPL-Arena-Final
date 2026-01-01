package com.babua.bpl.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.web.SecurityFilterChain;

@Configuration
@EnableWebSecurity
public class SecurityConfig {

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        http
            .csrf(csrf -> csrf.disable()) // Development mein CSRF disable karte hain
            .authorizeHttpRequests(auth -> auth
                .requestMatchers("/api/**").permitAll() // Hamari APIs ko allow karo
                .anyRequest().authenticated() // Baaki sab ke liye login chahiye hoga
            );
        
        return http.build();
    }
}