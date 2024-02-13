package lk.leon.app.bookingapp.api;

import lk.leon.app.bookingapp.repository.HotelRepository;
import lk.leon.app.bookingapp.service.custom.HotelService;
import lk.leon.app.bookingapp.to.HotelTo;
import lk.leon.app.bookingapp.to.request.HotelReqTo;
import lk.leon.app.bookingapp.util.HotelType;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

@RestController
@RequestMapping("api/v1/hotels")
@CrossOrigin
public class HotelHttpController {

    @Autowired
    private HotelService hotelService;


    @ResponseStatus(HttpStatus.CREATED)
    @PostMapping(consumes = "multipart/form-data", produces = "application/json")
    public HotelTo createNewHotel(@ModelAttribute @Validated HotelReqTo hotelReqTo){
        return hotelService.saveHotel(hotelReqTo);
    }

    @GetMapping(value = "/{hotel-id}", produces = "application/json")
    public HotelTo getHotelDetails(@PathVariable("hotel-id") Integer hotelId){
        return hotelService.getHotelDetails(hotelId);
    }
    @PatchMapping(value = "/{hotel-id}",consumes = "multipart/form-data")
    public void updateHotelwithImages(@ModelAttribute @Validated HotelReqTo hotelReqTo,
                                      @PathVariable("hotel-id") Integer hotelId){
        hotelReqTo.setId(hotelId);
        hotelService.updateHotelViaMultipart(hotelReqTo);

    }
    @DeleteMapping(value = "/{hotel-id}")
    public void deleteHotel(@PathVariable("hotel-id") Integer hotelId){
        hotelService.deleteHotel(hotelId);

    }

    @GetMapping(produces = "application/json")
    public List<HotelTo> getHotelByType(@RequestParam(required = false) HotelType type){
        return hotelService.getHotels(type);
    }



}
