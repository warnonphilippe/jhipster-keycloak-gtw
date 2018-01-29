package be.phw.gtw.config;

import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.security.oauth2.client.token.grant.code.AuthorizationCodeResourceDetails;

import java.io.Serializable;

@ConfigurationProperties(prefix = "security.oauth2.client")
public class MultiAuthorizationCodeResourceDetails extends AuthorizationCodeResourceDetails implements Serializable {

    private String tenant = "jhipster";

    public MultiAuthorizationCodeResourceDetails() {
    }

    @Override
    public String getAccessTokenUri() {
        String uri = super.getAccessTokenUri().replace("{realm}", tenant);
        System.out.println("getAccessTokenUri " + uri);
        return uri;
    }

    @Override
    public String getUserAuthorizationUri() {
        String uri = super.getUserAuthorizationUri();
        uri = uri.replace("{realm}", tenant);
        System.out.println("getUserAuthorizationUri " + uri);
        return uri;
    }
}
