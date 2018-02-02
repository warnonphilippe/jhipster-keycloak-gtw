package be.phw.gtw.multitenancy;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.boot.web.servlet.ServletContextInitializer;
import org.springframework.context.annotation.Configuration;
import org.springframework.core.env.Environment;
import javax.servlet.*;

/**
 * Configuration of web application with Servlet 3.0 APIs.
 */
@Configuration
public class CustomWebConfigurer implements ServletContextInitializer {

    private final Logger log = LoggerFactory.getLogger(be.phw.gtw.config.WebConfigurer.class);

    private final Environment env;

    public CustomWebConfigurer(Environment env) {
        this.env = env;
    }

    @Override
    public void onStartup(ServletContext servletContext) throws ServletException {
        initCustomFilters(servletContext);
        log.info("Web application fully configured with custom filters");
    }

    private void initCustomFilters(ServletContext servletContext){
        FilterRegistration.Dynamic tenantFilter = servletContext.addFilter("tenantFilter",
            new TenantFilter());

    }
}

