package jsonencoders;

import java.io.Serializable;

public class JsonMessage implements Serializable {

    private String message;

    public JsonMessage (String message){
        this.message = message;
    }

    public String getMessage() {
        return message;
    }
}
