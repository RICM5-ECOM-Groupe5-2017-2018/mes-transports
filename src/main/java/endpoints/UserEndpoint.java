package endpoints;

import controller.UserController;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiImplicitParam;
import io.swagger.annotations.ApiImplicitParams;
import model.User;
import security.Secured;
import security.SecuredAdmin;

import javax.ejb.EJB;
import javax.ejb.Stateless;
import javax.ws.rs.*;
import javax.ws.rs.core.Application;
import javax.ws.rs.core.Context;
import javax.ws.rs.core.HttpHeaders;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;

@Stateless
@ApplicationPath("/api")
@Path("/user")
@Api("user")
@Consumes(MediaType.APPLICATION_JSON)
@Produces(MediaType.APPLICATION_JSON)
public class UserEndpoint extends Application{

    @EJB
    protected UserController controller;

    @GET
    @Secured
    @Path("/logout")
    @ApiImplicitParams({@ApiImplicitParam(name = "Authorization", value = "User token", required = true, dataType = "string", paramType = "header")})
    @Produces(MediaType.APPLICATION_JSON)
    public Response logout (@Context HttpHeaders httpHeaders) {
        try {
            return Response.status(200).entity(controller.logout(httpHeaders)).build();
        } catch (javax.persistence.NoResultException ex) {
            return Response.status(Response.Status.FORBIDDEN).build();
        } catch (Exception ex) {
            return Response.status(Response.Status.FORBIDDEN).build();
        }
    }

    @GET
    @SecuredAdmin
    @Path("/getAll")
    @Produces(MediaType.APPLICATION_JSON)
    public Response getAll() {
        try {
            return Response.status(200).entity(controller.getAllUsers()).build();
        } catch (javax.persistence.NoResultException ex) {
            return Response.status(Response.Status.FORBIDDEN).build();
        } catch (Exception ex) {
            return Response.status(Response.Status.FORBIDDEN).build();
        }
    }
    
    @GET
    @Secured
    @Path("/view/{id}")
    @ApiImplicitParams({@ApiImplicitParam(name = "Authorization", value = "User token", required = true, dataType = "string", paramType = "header")})
    @Produces(MediaType.APPLICATION_JSON)
    public Response view(@PathParam("id") Integer id) {
        try {
            return Response.status(200).entity(controller.viewUser(id)).build();
        } catch (Exception ex) {
            return Response.status(401).build();
        }
    }

    @GET
    @Path("/authenticate/{login}/{password}")
    @Produces(MediaType.APPLICATION_JSON)
    public Response authenticate (@PathParam("login") String login,
                                  @PathParam("password") String password) {
        try {
        	User u = controller.authenticate(login, password);
        	if(u==null) {
                return Response.status(400).type("text/plain")
                        .entity("Informations non valides").build();
        	}
            return Response.status(200).entity(u).build();
        }catch (Exception ex) {
            return Response.status(401).build();
        }
    }

    @POST
    @Path("/create")
    @Consumes(MediaType.APPLICATION_JSON)
    @Produces(MediaType.APPLICATION_JSON)
    public Response createUser (User userQuery) {
        try {
            return Response.status(200).entity(controller.createUser(userQuery)).build();
        }
        catch(Exception e) {
            return Response.status(400).type("text/plain")
                    .entity("Format de l'entité invalide").build();
        }
    }

    @PUT
    @Secured
    @Path("/edit")
    @Consumes(MediaType.APPLICATION_JSON)
    @Produces(MediaType.APPLICATION_JSON)
    public Response editUser (User userQuery) {
        try {
            return Response.status(200).entity(controller.updateUser(userQuery)).build();
        }
        catch(Exception e) {
            return Response.status(400).type("text/plain")
                    .entity("Format de l'entité invalide").build();
        }
    }

    @PUT
    @Secured
    @Path("/editpassword")
    @Consumes(MediaType.APPLICATION_JSON)
    @Produces(MediaType.APPLICATION_JSON)
    public Response editUserPass(@FormParam("idUser") Integer id
            ,@FormParam("oldass") String oldPass
            ,@FormParam("newPass") String newPass) {
        try {
            return Response.status(200).entity(controller.updateUserPass(id,oldPass, newPass)).build();

        }catch (Exception e) {
            return Response.status(400).type("text/plain")
                    .entity("Mot de passe non modifié").build();
        }
    }

    @DELETE
    @SecuredAdmin
    @Path("/disable/{id}")
    @Consumes(MediaType.APPLICATION_JSON)
    @Produces(MediaType.APPLICATION_JSON)
    public Response disableUser(@PathParam("id") Integer userId) {
        try {
            return Response.status(200).entity(controller.disableUser(userId)).build();
        }
        catch(Exception e) {
            return Response.status(400).type("text/plain")
                    .entity("Aucun utilisateur ne correspond a cette id").build();
        }
    }

    @PUT
    @SecuredAdmin
    @Path("/reactivate/{id}")
    @Consumes(MediaType.APPLICATION_JSON)
    @Produces(MediaType.APPLICATION_JSON)
    public Response reactiveUser(@PathParam("id") Integer userId) {
        try {
            return Response.status(200).entity(controller.enableUser(userId)).build();
        }
        catch(Exception e) {
            return Response.status(400).type("text/plain")
                    .entity("Aucun utilisateur ne correspond a cette id").build();
        }
    }


}