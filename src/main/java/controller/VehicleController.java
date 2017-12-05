package controller;

import javax.ejb.Singleton;
import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import javax.persistence.Query;
import javax.ws.rs.*;

import JsonEncoders.JsonMessage;
import model.Characteristic;
import model.CharacteristicType;
import model.Rent;
import model.Vehicle;
import model.VehicleType;

import java.util.ArrayList;
import java.util.Date;
import java.util.LinkedList;
import java.util.List;

@Singleton
public class VehicleController {

	@PersistenceContext(unitName="myPU")
	private EntityManager entityManager;

	/**
	 * Creates new vehicle based on given model
	 *
	 * @param vehicle model vehicle
	 * @return new vehicle or error
	 */
	public Vehicle createVehicle (Vehicle vehicle){
		Vehicle newVehicle = new Vehicle(vehicle);
		entityManager.persist(newVehicle);
		entityManager.flush();
		return newVehicle;
	}

	/**
	 * Edit vehicle based on given model
	 *
	 * @param vehicle model vehicle
	 * @return edited vehicle or error
	 */
	public Vehicle editVehicle (Vehicle vehicle) {
		Vehicle vehicleRet = entityManager.find(Vehicle.class, vehicle.getId());
		vehicleRet.setBrand(vehicle.getBrand());
		vehicleRet.setPrice(vehicle.getPrice());
		vehicleRet.setInsurance(vehicle.getInsurance());
		vehicleRet.setIdAgency(vehicle.getIdAgency());
		vehicleRet.setType(vehicle.getType());
		entityManager.merge(vehicleRet);
		entityManager.flush();
		return vehicleRet;
		
	}

	/**
	 * Returns characteristics of vehicle that match typeId
	 *
	 * @param idType the type chosen
	 * @return List of characteristics or error
	 */
	public List<Characteristic> getCharacteristicsByType (Integer idType){
		List<Characteristic> characteristics;
		if (idType == null){
			List<Characteristic> characteristicList = entityManager
					.createQuery("FROM Characteristic ")
					.getResultList();
			return characteristicList;
		}
		characteristics = new ArrayList<>();
		List<CharacteristicType> charatypeList = entityManager.createQuery("FROM CharacteristicType WHERE idType = :idType")
				.setParameter("idType", idType)
				.getResultList();
		for (CharacteristicType chara: charatypeList){
			characteristics.add(entityManager.find(Characteristic.class, chara.getId().getIdCharacteristic()));
		}
		return characteristics;
	}
	
	/**
	 * Returns all characteristics of vehicle 
	 *
	 * @param idType the type chosen
	 * @return List of characteristics or error
	 */
	public List<Characteristic> getCharacteristics (){
		List<Characteristic> characteristicList = entityManager
				.createQuery("FROM Characteristic ")
				.getResultList();
		return characteristicList;
	}
	
	public List<VehicleType> getTypeVehicle(){
		List<VehicleType> typeList = entityManager
				.createQuery("FROM  VehicleType")
				.getResultList();
		return typeList;
	}
	
	

	/**
	 * Returns the vehicle identified by id
	 *
	 * @param id the id of the vehicle
	 * @return the vehicle
	 */
	public Vehicle consultVehicle (Integer id) {
		Vehicle vehicleRet = entityManager.find(Vehicle.class, id);
		return vehicleRet;
	}

	/**
	 * Delete the vehicle (disable)
	 *
	 * @param id id of the vehicle to disable
	 * @return Message
	 */
	public JsonMessage deleteVehicle (@QueryParam("id") Integer id) {
		Vehicle vehicleRet = entityManager.find(Vehicle.class, id);
		vehicleRet.setStatus(false);
		entityManager.merge(vehicleRet);
		entityManager.flush();
		return new JsonMessage("Vehicle successfully deleted");
	}

	/**
	 * Returns all vehicle available from startDate to endDate
	 *
	 * @param startDate date of begining
	 * @param endDate date of end
	 * @return
	 */
	public List<Vehicle> searchVehicle (Date startDate, Date endDate) {
		Query q=entityManager.createQuery("SELECT v FROM Vehicle v INNER JOIN Rent r ON v.id=r.idVehicle WHERE r.begin_date<'"
				+startDate.toString()+"' AND r.end_date>'"
				+endDate.toString()+"'");
		return ((List<Vehicle>) q.getResultList());
	}
}
