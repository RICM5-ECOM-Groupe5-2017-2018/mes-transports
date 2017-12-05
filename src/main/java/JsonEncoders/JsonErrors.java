package JsonEncoders;

import java.io.Serializable;

public class JsonErrors implements Serializable {

    private String error;

    public JsonErrors(String message){
        this.error = message;
    }

    public String getMessage() {
        return error;
    }
}
