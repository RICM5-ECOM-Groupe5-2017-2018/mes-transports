package controller;

import javax.ejb.Singleton;
import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import javax.persistence.Query;
import javax.ws.rs.*;

import JsonEncoders.JsonMessage;
import model.AssignCharacteristic;
import model.AssignCharacteristicId;
import model.Characteristic;
import model.CharacteristicType;
import model.Disponibilitee;
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
		if(vehicle.getType() != vehicleRet.getType()) {
			entityManager.createNativeQuery("DELETE FROM assign_characteristic WHERE idVehicle="+vehicle.getId()+" ")
			.executeUpdate();
		}
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
	 * 
	 * @param vehicleId
	 * @return For a defined Vehicle return all the moment where this vehicle is available
	 */
	public List<Disponibilitee> dispoVehicle(Integer vehicleId) {
		List<Rent> lr = entityManager.createQuery("Select r FROM Rent r WHERE r.idVehicle=:id")
		.setParameter("id", vehicleId)
		.getResultList();
		
		
		List<Disponibilitee> ld = new LinkedList<Disponibilitee>();
		int i;
		
		for(i=0;i<ld.size() && ld.get(i).getEnd().before(new Date());i++);
				
		if(lr.size()>0 && !lr.get(i).getStartDate().before(new Date())) {
			Disponibilitee dispo = new Disponibilitee();
			dispo.setStart(new Date());
			dispo.setEnd(lr.get(i).getStartDate());
			System.out.println("ajoute dispo : now/"+dispo.getEnd());
		}
		
		for(;i<lr.size();i++) {
			if(i!=0) {
				Rent actuel=lr.get(i);
				Rent past= lr.get(i-1);
				
				if(!(past.getEndDate() == actuel.getStartDate())) {
					Disponibilitee dispo = new Disponibilitee();
					dispo.setEnd(actuel.getStartDate());
					dispo.setStart(past.getEndDate());
				
					
					ld.add(dispo);
					System.out.println("ajoute dispo : "+dispo.getStart()+"("+past.getEndDate()+")/"+dispo.getEnd()+"("+actuel.getStartDate()+")");
				}
			}
		}
		
		if(i>0 && ld.size()>0) {
			Disponibilitee dispo = new Disponibilitee();
			dispo.setEnd(new Date((long) 1000000000000000f));
			dispo.setStart(lr.get(lr.size()-1).getEndDate());
			ld.add(dispo);
		}
		
		if(ld.size()==0) {
			Disponibilitee dispo = new Disponibilitee();
			dispo.setEnd(new Date((long) 1000000000000000f));
			dispo.setStart(new Date());
			ld.add(dispo);
		}
		
		return ld;		
	}

	/**
	 * Return the rent history for a specified Vehicle defined by idVehicle
	 * @param idVehicle
	 * @return
	 */
	
	public List<Rent> getRents(Integer idVehicle){
		return entityManager.createQuery("Select r FROM Rent r WHERE r.idVehicle=:id")
		.setParameter("id", idVehicle)
		.getResultList();
	}
	
	/**
	 * Add the value valueCharac to the Characteristic defined by idCharac to the vehicle defined by idVehicule
	 *
	 * @param idVehicule
	 * @param idCharac
	 * @param valueCharac
	 * @return a JsonMessage
	 */
	public JsonMessage addCharacteristic(Integer idVehicule, Integer idCharac, String valueCharac) {
		Query q= entityManager.createNativeQuery("insert into assign_characteristic values("+idVehicule+","+idCharac+",'"+valueCharac+"')");
		q.executeUpdate();
		return new JsonMessage("Characteristic added successfully");
	}
	
	/**
	 * Edit the value valueCharac to the Characteristic defined by idCharac to the vehicle defined by idVehicule
	 * 
	 * @param idVehicule
	 * @param idCharac
	 * @param valueCharac
	 * @return a JsonMessage
	 */
	public JsonMessage editCharacteristic(Integer idVehicule, Integer idCharac, String valueCharac) {
		Query q= entityManager.createNativeQuery("update assign_characteristic SET valueCharacteristic='"+valueCharac+"' WHERE idVehicle="+idVehicule+" AND idCharacteristic="+idCharac);
		q.executeUpdate();
		return new JsonMessage("Characteristic updated successfully");
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

	/**
     * Returns all vehicle type from the data base
     *
     * @param idType the type chosen
     * @return List of characteristics or error
     */
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
		if(vehicleRet.isStatus()) {
			return vehicleRet;
		}
		else return null;
		
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
	 * @param startDate date of beginning
	 * @param endDate date of end
	 * @return
	 */
	public List<Vehicle> searchVehicle (String startDate, String endDate) {
		Query q=entityManager.createQuery("SELECT r FROM Rent r WHERE r.startDate BETWEEN	'"+startDate+"' AND '"+endDate+"' OR r.endDate BETWEEN '"+startDate+"' AND '"+endDate+"'");
		Query q2=entityManager.createQuery("SELECT v FROM Vehicle v WHERE v.status=true");

	    List<Rent> lr = q.getResultList(); 
	    List<Vehicle> excluded = new LinkedList<Vehicle>();
	    for(int i=0;i<lr.size();i++) {
	    	excluded.add(entityManager.find(Vehicle.class, lr.get(i).getIdVehicle()));
	    }
	    
		List<Vehicle> all_vehicles = q2.getResultList();
		for(int i=0;i<all_vehicles.size();i++) {
			for(int j=0;j<excluded.size();j++) {
				if(all_vehicles.get(i).getId() == excluded.get(j).getId()) {
					excluded.remove(j);
					all_vehicles.remove(i);
				}
			}
		}
		return all_vehicles;
	}
}
