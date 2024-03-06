package lk.leon.app.bookingapp.converter;

import lk.leon.app.bookingapp.util.PropertyType;
import org.springframework.core.convert.converter.Converter;
import org.springframework.stereotype.Component;

@Component
public class HotelTypeConverter implements Converter<String, PropertyType> {
    @Override
    public PropertyType convert(String source) {
        for (PropertyType type: PropertyType.values() ) {
            if(type.getType().equalsIgnoreCase(source)){
                return type;
            }
        }
        return null;
    }
}
