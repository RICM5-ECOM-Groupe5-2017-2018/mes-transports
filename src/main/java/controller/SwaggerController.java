package controller;


import javax.ws.rs.ApplicationPath;
import javax.ws.rs.core.Application;

import io.swagger.jaxrs.config.BeanConfig;


@ApplicationPath("/swagger")
public class SwaggerController extends Application {

	public SwaggerController()
	{
		BeanConfig beanConfig = new BeanConfig();
		beanConfig.setVersion("2.0.0");
		beanConfig.setSchemes(new String[]{"http"});
		beanConfig.setHost("localhost:8080");
		beanConfig.setBasePath("/mes-transports/api");
		beanConfig.setResourcePackage("controller");
		beanConfig.setPrettyPrint(true);
		beanConfig.setScan();
	}
}
