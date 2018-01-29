package be.phw.gtw.config;

import org.springframework.boot.autoconfigure.security.oauth2.resource.ResourceServerProperties;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Primary;
import org.springframework.security.oauth2.client.OAuth2ClientContext;
import org.springframework.security.oauth2.client.OAuth2RestOperations;
import org.springframework.security.oauth2.client.OAuth2RestTemplate;
import org.springframework.security.oauth2.client.resource.BaseOAuth2ProtectedResourceDetails;
import org.springframework.security.oauth2.client.token.grant.code.AuthorizationCodeResourceDetails;


@Configuration
public class MultiTenantConfig {

    @Bean(name = "multiResourceServerProperties")
    @Primary
    public ResourceServerProperties multiResourceServerProperties(){
        return new MultiResourceServerProperties();
    }

    @Bean
    @Primary
    public OAuth2RestTemplate restTemplate(OAuth2ClientContext oauth2ClientContext) {
        return new OAuth2RestTemplate(multiAuthorizationCodeResourceDetails(), oauth2ClientContext);
    }

    @Bean(name = "multiAuthorizationCodeResourceDetails")
    public AuthorizationCodeResourceDetails multiAuthorizationCodeResourceDetails(){
        return new MultiAuthorizationCodeResourceDetails();
    }
}
