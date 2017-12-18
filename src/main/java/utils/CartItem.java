
package utils;

import java.util.List;

import model.Vehicle;

public class CartItem {

    public List<Vehicle> vehicles;
    public long start_date, end_date;

    public CartItem(List<Vehicle> vehicles, long start_date, long end_date) {
        this.vehicles = vehicles;
        this.start_date = start_date;
        this.end_date = end_date;
    }

}