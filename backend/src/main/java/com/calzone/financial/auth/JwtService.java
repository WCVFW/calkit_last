package com.calzone.financial.auth;

import com.calzone.financial.config.JwtProperties;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jws;
import io.jsonwebtoken.JwtException;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.io.Decoders;
import io.jsonwebtoken.security.Keys;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Service;

import java.security.Key;
import java.util.Date;
import java.util.Optional;

@Service
public class JwtService {

    private final JwtProperties properties;

    public JwtService(JwtProperties properties) {
        this.properties = properties;
    }

    public String generateToken(UserDetails userDetails) {
        Date issuedAt = new Date();
        Date expiration = new Date(issuedAt.getTime() + properties.getExpiration());
        return Jwts.builder()
                .setSubject(userDetails.getUsername())
                .setIssuedAt(issuedAt)
                .setExpiration(expiration)
                .signWith(getSigningKey(), SignatureAlgorithm.HS256)
                .compact();
    }

    public Optional<String> extractUsername(String token) {
        try {
            return Optional.ofNullable(parseToken(token).getBody().getSubject());
        } catch (JwtException | IllegalArgumentException ex) {
            return Optional.empty();
        }
    }

    public boolean isTokenValid(String token, UserDetails userDetails) {
        try {
            Jws<Claims> claimsJws = parseToken(token);
            String subject = claimsJws.getBody().getSubject();
            Date expiration = claimsJws.getBody().getExpiration();
            return subject != null && subject.equals(userDetails.getUsername()) && expiration.after(new Date());
        } catch (JwtException | IllegalArgumentException ex) {
            return false;
        }
    }

    private Jws<Claims> parseToken(String token) {
        return Jwts.parserBuilder()
                .setSigningKey(getSigningKey())
                .build()
                .parseClaimsJws(token);
    }

    private Key getSigningKey() {
        byte[] keyBytes = Decoders.BASE64.decode(properties.getSecret());
        return Keys.hmacShaKeyFor(keyBytes);
    }
}
