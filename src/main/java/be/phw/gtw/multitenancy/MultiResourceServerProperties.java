package be.phw.gtw.multitenancy;

import org.springframework.boot.autoconfigure.security.oauth2.resource.ResourceServerProperties;

import java.io.Serializable;

public class MultiResourceServerProperties extends ResourceServerProperties implements Serializable{

    @Override
    public String getUserInfoUri() {
        String uri = super.getUserInfoUri().replace("{realm}", getTenant());
        System.out.println("UserInfoUri " + uri);
        return uri;
    }

    @Override
    public String getTokenInfoUri() {
        String uri = super.getTokenInfoUri().replace("{realm}", getTenant());
        System.out.println("TokenInfoUri " + uri);
        return uri;
    }

    @Override
    public Jwt getJwt() {
        Jwt jwt = super.getJwt();
        if (jwt != null && jwt.getKeyUri() != null){
            jwt.setKeyUri(jwt.getKeyUri().replace("{realm}", getTenant()));
        }
        return jwt;
    }

    private String getTenant(){
        //TODO : get selected tenant
        return "jhipster";
    }
}
