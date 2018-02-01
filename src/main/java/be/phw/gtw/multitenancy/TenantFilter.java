package be.phw.gtw.multitenancy;

import org.springframework.web.filter.GenericFilterBean;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.ServletRequest;
import javax.servlet.ServletResponse;
import java.io.IOException;

public class TenantFilter extends GenericFilterBean {

    @Override
    public void doFilter(ServletRequest request, ServletResponse response, FilterChain chain) throws IOException, ServletException {
        String tenantId = "jhipster";
        //TODO : extraire le tenantId du param tenant de l'url (si url : login?tenant=tenantId)
        TenantContext.setCurrentTenant(tenantId);
        chain.doFilter(request, response);
    }

}
