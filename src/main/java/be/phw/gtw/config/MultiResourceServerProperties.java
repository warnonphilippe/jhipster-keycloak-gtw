package be.phw.gtw.config;

import org.springframework.boot.autoconfigure.security.oauth2.resource.ResourceServerProperties;

import java.io.Serializable;

public class MultiResourceServerProperties extends ResourceServerProperties implements Serializable{

    //TODO : comment récupérer le code du tenant ???
    private String tenant = "jhipster";

    @Override
    public String getUserInfoUri() {
        String uri = super.getUserInfoUri().replace("{realm}", tenant);
        System.out.println("UserInfoUri " + uri);
        return uri;
    }

    @Override
    public String getTokenInfoUri() {
        String uri = super.getTokenInfoUri().replace("{realm}", tenant);
        System.out.println("TokenInfoUri " + uri);
        return uri;
    }

    @Override
    public Jwt getJwt() {
        Jwt jwt = super.getJwt();
        if (jwt != null && jwt.getKeyUri() != null){
            jwt.setKeyUri(jwt.getKeyUri().replace("{realm}", tenant));
        }
        return jwt;
    }
}
