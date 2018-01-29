package be.phw.gtw.config;

import org.springframework.boot.autoconfigure.security.oauth2.resource.ResourceServerProperties;

public class MultiResourceServerProperties extends ResourceServerProperties {

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


}
