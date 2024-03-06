package lk.leon.app.bookingapp.util;

import com.fasterxml.jackson.annotation.JsonValue;

public enum PropertyType {
    HOTEL("hotel"),APARTMENT("apartment"), RESORT("resort"), VILLA("villa");

    private String type;
    PropertyType(String type) {
        this.type = type;
    }

    @JsonValue
    public String getType(){
        return type;
    }
}
