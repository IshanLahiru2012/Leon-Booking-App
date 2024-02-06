package lk.leon.app.bookingapp.util;

import com.fasterxml.jackson.annotation.JsonValue;

public enum HotelType {
    APARTMENT("apartment"), RESORT("resort"), VILLA("villa");

    private String type;
    HotelType(String type) {
        this.type = type;
    }

    @JsonValue
    public String getType(){
        return type;
    }
}
