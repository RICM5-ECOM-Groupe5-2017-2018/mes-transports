package controller;

import javax.ejb.Stateless;
import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import javax.ws.rs.*;
import javax.ws.rs.core.Application;
import javax.ws.rs.core.MediaType;

import io.swagger.annotations.Api;
import model.Characteristic;
import model.CharacteristicType;
import model.Vehicle;

import java.util.ArrayList;
import java.util.List;

@Stateless
@ApplicationPath("/api")
@Path("/vehicle")
@Api("vehicle")
@Consumes(MediaType.APPLICATION_JSON)
@Produces(MediaType.APPLICATION_JSON)
public class VehicleController extends ApiController{
	
	@PersistenceContext(unitName="myPU")
    private EntityManager entityManager;
	
	@POST
	@Consumes(MediaType.APPLICATION_JSON)
	@Path("/create")
	@Produces(MediaType.APPLICATION_JSON)
	public Vehicle createVehicle (@QueryParam("brand") String brand,
			@QueryParam("price") Float price,
			@QueryParam("insurance") String insurance,
			@QueryParam("idAgency") Integer idAgency,
			@QueryParam("idType") Integer idType){
		Vehicle vehicleRet = new Vehicle();
		vehicleRet.setBrand(brand);
		vehicleRet.setPrice(price);
		vehicleRet.setInsurance(insurance);
		vehicleRet.setIdAgency(idAgency);
		vehicleRet.setType(idType);
		entityManager.persist(vehicleRet);
		entityManager.flush();
		return vehicleRet;
	}
	
	@POST
	@Consumes(MediaType.APPLICATION_JSON)
	@Path("/edit")
	@Produces(MediaType.APPLICATION_JSON)
	public Vehicle editVehicle (@QueryParam("id") Integer id,
			@QueryParam("brand") String brand,
			@QueryParam("price") Float price,
			@QueryParam("insurance") String insurance,
			@QueryParam("idAgency") Integer idAgency,
			@QueryParam("idType") Integer idType) {
		Vehicle vehicleRet = entityManager.find(Vehicle.class, id);
		vehicleRet.setBrand(brand);
		vehicleRet.setPrice(price);
		vehicleRet.setInsurance(insurance);
		vehicleRet.setIdAgency(idAgency);
		vehicleRet.setType(idType);
		entityManager.merge(vehicleRet);
		entityManager.flush();
		return vehicleRet;
		
	}

	@POST
	@Consumes(MediaType.APPLICATION_JSON)
	@Path("/list")
	@Produces(MediaType.APPLICATION_JSON)
	public List<Characteristic> createVehicle (@QueryParam("idType") Integer idType){
		if (idType == null){
			List<Characteristic> characteristicList = entityManager
					.createQuery("FROM Characteristic ")
					.getResultList();
			return characteristicList;
		}

		List<Characteristic> characteristics = new ArrayList<Characteristic>();

		List<CharacteristicType> charatypeList = entityManager.createQuery("FROM CharacteristicType WHERE idType = :idType")
				.setParameter("idType", idType)
				.getResultList();

		for (CharacteristicType chara: charatypeList){
			characteristics.add(entityManager.find(Characteristic.class, chara.getId().getIdCharacteristic()));
		}
		return characteristics;
	}
	
	@GET
	@Path("/view/{id}")
	@Produces(MediaType.APPLICATION_JSON)
	public Vehicle consultVehicle (@PathParam("id") Integer id) {
		Vehicle vehicleRet = entityManager.find(Vehicle.class, id);
		return vehicleRet;
	}
	
	@POST
	@Consumes(MediaType.APPLICATION_JSON)
	@Path("/delete")
	@Produces(MediaType.APPLICATION_JSON)
	public String deleteVehicle (@QueryParam("id") Integer id) {
		Vehicle vehicleRet = entityManager.find(Vehicle.class, id);
		entityManager.detach(vehicleRet);
		entityManager.flush();
		return ("Vehicle successfully deleted");
	}

}
