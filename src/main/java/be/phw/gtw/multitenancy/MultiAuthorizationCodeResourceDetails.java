package be.phw.gtw.multitenancy;

import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.security.oauth2.client.token.grant.code.AuthorizationCodeResourceDetails;

import java.io.Serializable;

@ConfigurationProperties(prefix = "security.oauth2.client")
public class MultiAuthorizationCodeResourceDetails extends AuthorizationCodeResourceDetails implements Serializable {

    public MultiAuthorizationCodeResourceDetails() {
    }

    @Override
    public String getAccessTokenUri() {
        String uri = super.getAccessTokenUri().replace("{realm}", getTenant());
        System.out.println("getAccessTokenUri " + uri);
        return uri;
    }

    @Override
    public String getUserAuthorizationUri() {
        String uri = super.getUserAuthorizationUri();
        uri = uri.replace("{realm}", getTenant());
        System.out.println("getUserAuthorizationUri " + uri);
        return uri;
    }

    private String getTenant(){
        //TODO : get selected tenant
        return "jhipster";
    }
}
