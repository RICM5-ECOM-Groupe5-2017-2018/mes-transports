package controller;

import javax.ejb.Stateless;
import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import javax.persistence.Query;
import javax.ws.rs.*;
import javax.ws.rs.core.Application;
import javax.ws.rs.core.MediaType;

import io.swagger.annotations.Api;
import model.Characteristic;
import model.CharacteristicType;
import model.Vehicle;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

@Stateless
@ApplicationPath("/api")
@Path("/car")
@Api("cart")
@Consumes(MediaType.APPLICATION_JSON)
@Produces(MediaType.APPLICATION_JSON)
public class CartController extends Application{

}
