package lk.leon.app.bookingapp.converter;

import lk.leon.app.bookingapp.util.HotelType;
import org.springframework.core.convert.converter.Converter;
import org.springframework.stereotype.Component;

@Component
public class HotelTypeConverter implements Converter<String, HotelType> {
    @Override
    public HotelType convert(String source) {
        for (HotelType type: HotelType.values() ) {
            if(type.getType().equalsIgnoreCase(source)){
                return type;
            }
        }
        return null;
    }
}
