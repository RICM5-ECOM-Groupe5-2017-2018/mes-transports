package endpoints;

import io.swagger.jaxrs.config.BeanConfig;

import javax.ws.rs.ApplicationPath;
import javax.ws.rs.core.Application;

@ApplicationPath("/swagger")
public class SwaggerEndpoint extends Application {

    public SwaggerEndpoint()
    {
        BeanConfig beanConfig = new BeanConfig();
        beanConfig.setVersion("2.0.0");
        beanConfig.setSchemes(new String[]{"http"});
        beanConfig.setHost("localhost:8080");
        beanConfig.setBasePath("/mes-transports/api");
        beanConfig.setResourcePackage("endpoints");
        beanConfig.setPrettyPrint(true);
        beanConfig.setScan();
    }
}
