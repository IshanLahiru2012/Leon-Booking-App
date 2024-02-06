package lk.leon.app.bookingapp.service.custom;

import lk.leon.app.bookingapp.service.SuperService;
import lk.leon.app.bookingapp.to.HotelTo;
import lk.leon.app.bookingapp.to.request.HotelReqTo;
import lk.leon.app.bookingapp.util.HotelType;

import java.io.IOException;
import java.util.List;

public interface HotelService extends SuperService {

    HotelTo saveHotel(HotelReqTo hotelReqTo);
    void updateHotelViaMultipart(HotelReqTo hotelReqTo);
    void updateHotelViaJson(HotelTo hotelTo);
    void deleteHotel(Integer hotelId);
    HotelTo getHotelDetails(Integer hotelId);
    List<HotelTo> getHotels(HotelType type);

}
