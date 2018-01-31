package be.phw.gtw.multitenancy;

import org.springframework.web.filter.GenericFilterBean;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.ServletRequest;
import javax.servlet.ServletResponse;
import java.io.IOException;

public class CustomFilter extends GenericFilterBean {

    @Override
    public void doFilter(ServletRequest request, ServletResponse response, FilterChain chain) throws IOException, ServletException {
        String tenantId = "jhipster2";
        //TenantContext.setCurrentTenant(tenantId);
        chain.doFilter(request, response);
    }

}
