package com.ucv.Config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationProvider;
import org.springframework.security.config.annotation.method.configuration.EnableMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.security.web.util.matcher.AntPathRequestMatcher;
import org.springframework.security.web.util.matcher.OrRequestMatcher;
import org.springframework.security.web.util.matcher.RequestMatcher;

import com.ucv.Repository.UserRepository;

import lombok.RequiredArgsConstructor;

@Configuration
@EnableWebSecurity
@RequiredArgsConstructor
@EnableMethodSecurity
public class SecurityConfig {

    private final JwtFilter jwtFilter;
    private final AuthenticationProvider authenticationProvider;
    private final UserRepository userRepository;
    private final AppConfig appConfig;

    // -------------------------------
    // USUARIO TEMPORAL ADMIN
    // -------------------------------
    @Bean
    public UserDetailsService tempUserDetailsService() {
        return email -> {

            // 1. Buscar en BD primero
            return userRepository.findUserByEmail(email).map(user -> {
                return (UserDetails) user;
            }).orElseGet(() -> {

                // 2. Si NO existe, crear usuario ADMIN temporal
                if (email.equalsIgnoreCase("adminTemp@ucv.edu.pe")) {
                    return User.builder()
                            .username("adminTemp@ucv.edu.pe")
                            .password(appConfig.passwordEncoder().encode("Admin123"))
                            .roles("ADMIN")
                            .build();
                }

                // 3. Si no existe y no es el temporal → lanzar excepción
                throw new RuntimeException("User not found");
            });
        };
    }

    // -------------------------------
    // SECURITY FILTER CHAIN
    // -------------------------------
    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {

        http
                .cors(cors -> cors.and())
                .csrf(csrf -> csrf.disable())
                .authorizeHttpRequests(auth -> auth
                        .requestMatchers(publicEndpoints()).permitAll()
                        .anyRequest().authenticated())
                .sessionManagement(sess -> sess.sessionCreationPolicy(SessionCreationPolicy.STATELESS))
                .authenticationProvider(authenticationProvider)
                .addFilterBefore(jwtFilter, UsernamePasswordAuthenticationFilter.class);

        return http.build();
    }

    // -------------------------------
    // ENDPOINTS PÚBLICOS
    // -------------------------------
    private RequestMatcher publicEndpoints() {
        return new OrRequestMatcher(
                new AntPathRequestMatcher("/api/ucv/authenticate"),
                new AntPathRequestMatcher("/api/ucv/register"),
                new AntPathRequestMatcher("/api/ucv/publictest")
        );
    }
}