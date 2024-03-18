package lk.leon.app.bookingapp.service.custom;

import lk.leon.app.bookingapp.service.SuperService;
import lk.leon.app.bookingapp.to.PropertyTo;
import lk.leon.app.bookingapp.to.request.PropertyReqTo;
import lk.leon.app.bookingapp.util.PropertyType;

import java.util.List;

public interface PropertyService extends SuperService {

    PropertyTo saveProperty(PropertyReqTo propertyReqTo);
    void updatePropertyViaMultipart(PropertyReqTo propertyReqTo);
    void updateHotelViaJson(PropertyTo propertyTo);
    void deleteProperty(Integer hotelId);
    PropertyTo getPropertyDetails(Integer hotelId);
    List<PropertyTo> getPropertiesByType(PropertyType type);
    List<PropertyTo> getPropertiesByUserId(Integer id);
    List<PropertyTo> getBookedPropertiesByUserId(Integer id);
    List<PropertyTo> getPropertiesByCity(String city);

}
