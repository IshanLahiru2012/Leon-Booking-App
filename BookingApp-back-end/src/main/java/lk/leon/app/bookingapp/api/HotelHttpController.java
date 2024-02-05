package lk.leon.app.bookingapp.api;

import lk.leon.app.bookingapp.repository.HotelRepository;
import lk.leon.app.bookingapp.service.custom.HotelService;
import lk.leon.app.bookingapp.to.HotelTo;
import lk.leon.app.bookingapp.to.request.HotelReqTo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

@RestController
@RequestMapping("api/v1/hotels")
public class HotelHttpController {

    @Autowired
    private HotelService hotelService;


    @ResponseStatus(HttpStatus.CREATED)
    @PostMapping(consumes = "multipart/form-data", produces = "application/json")
    public HotelTo createNewHotel(@ModelAttribute @Validated HotelReqTo hotelReqTo){
        System.out.println("a");
        hotelService.saveHotel(hotelReqTo);
        return null;
    }
}
