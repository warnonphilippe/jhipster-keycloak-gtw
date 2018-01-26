package be.phw.gtw.config;

import org.springframework.cloud.netflix.feign.EnableFeignClients;
import org.springframework.context.annotation.Configuration;

@Configuration
@EnableFeignClients(basePackages = "be.phw.gtw")
public class FeignConfiguration {

}
