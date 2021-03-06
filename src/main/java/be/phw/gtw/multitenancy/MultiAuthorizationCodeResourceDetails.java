package be.phw.gtw.multitenancy;

import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.security.oauth2.client.token.grant.code.AuthorizationCodeResourceDetails;

import java.io.Serializable;
import java.util.Optional;

@ConfigurationProperties(prefix = "security.oauth2.client")
public class MultiAuthorizationCodeResourceDetails extends AuthorizationCodeResourceDetails implements Serializable {

    @Override
    public String getAccessTokenUri() {
        String uri = super.getAccessTokenUri().replace(TenantUtils.TENANT_PATH_VAR, getTenant());
        System.out.println("getAccessTokenUri " + uri);
        return uri;
    }

    @Override
    public String getUserAuthorizationUri() {
        String uri = super.getUserAuthorizationUri();
        uri = uri.replace(TenantUtils.TENANT_PATH_VAR, getTenant());
        System.out.println("getUserAuthorizationUri " + uri);
        return uri;
    }

    private String getTenant(){
        //get selected tenant
        return Optional.ofNullable(TenantContext.getCurrentTenant()).orElse(TenantUtils.TENANT_PATH_VAR);
    }
}
