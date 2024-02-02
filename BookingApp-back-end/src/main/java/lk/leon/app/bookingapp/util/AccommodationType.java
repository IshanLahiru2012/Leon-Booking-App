package lk.leon.app.bookingapp.util;

import com.fasterxml.jackson.annotation.JsonValue;

public enum AccommodationType {
    HOTELS("hotel"), APARTMENTS("apartment"), RESORT("resort"), VILLA("villa");

    private String type;
    AccommodationType(String type) {
        this.type = type;
    }

    @JsonValue
    public String getType(){
        return type;
    }
}
