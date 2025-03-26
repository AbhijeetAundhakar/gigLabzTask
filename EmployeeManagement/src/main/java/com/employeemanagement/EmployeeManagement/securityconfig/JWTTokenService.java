package com.employeemanagement.EmployeeManagement.securityconfig;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.io.Decoders;
import io.jsonwebtoken.security.Keys;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Service;

import javax.crypto.KeyGenerator;
import javax.crypto.SecretKey;
import java.security.Key;
import java.security.NoSuchAlgorithmException;
import java.util.Base64;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;
import java.util.function.Function;



@Service
public class JWTTokenService{
    public String generateToken(String username) {
//        We have to create the claims in this
        Map<String, Object> claims = new HashMap<>();

        return Jwts.builder()
                .setClaims(claims)
                .setSubject(username)
                .setIssuedAt(new Date(System.currentTimeMillis()))      //  This is the current time.
                .setExpiration(new Date(System.currentTimeMillis() + 1000*60*30))
                .signWith(getKey(), SignatureAlgorithm.HS256).compact();
    }




    private String secreatKey;

    public JWTTokenService() {
//        Calling the generateSecretKey and we can use this in genKey() method.
        secreatKey = generateSecreatKey();
    }

    public String generateSecreatKey(){
        try{
            KeyGenerator keyGenerator = KeyGenerator.getInstance("HmacSHA256");
            SecretKey secretKey = keyGenerator.generateKey();
            System.out.println("Secret key : " + secretKey.toString());
            return Base64.getEncoder().encodeToString(secretKey.getEncoded());
        } catch (NoSuchAlgorithmException e) {
            throw new RuntimeException("Error generating secret key : "+e);
        }
    }




    private Key getKey() {
//        We have to pass some random key for this we have to create another method. Above method is for this key.
        byte[] keyBytes = Decoders.BASE64.decode(secreatKey);
        return Keys.hmacShaKeyFor(keyBytes);
    }


    //    This method is for extracting the username from the token, This method is used in JwtFilter.java file.
    public String extractUsername(String token) {
        return extractClaim(token, Claims::getSubject);
    }




    private <T> T extractClaim(String token, Function<Claims, T> claimResolver){
        final Claims claims = extractAllClaims(token);
        return claimResolver.apply(claims);
    }

    private Claims extractAllClaims(String token) {
        return Jwts.parserBuilder()
                .setSigningKey(getKey())
                .build().parseClaimsJws(token).getBody();
    }

    //    WE ARE BASICALLY CHECKING THE USERNAME WHICH IS SENT IN THE TOKEN. IS IT MATCHING WITH THE USERNAME IN THE DATABASE.
    public boolean validateToken(String token, UserDetails userDetails) {
        final String userName = extractUsername(token);
        return (userName.equals(userDetails.getUsername()) && !isTokenExpired(token));
    }

    private boolean isTokenExpired(String token) {
        return extractExpiration(token).before(new Date());
    }

    private Date extractExpiration(String token) {
        return extractClaim(token, Claims::getExpiration);
    }
}





















