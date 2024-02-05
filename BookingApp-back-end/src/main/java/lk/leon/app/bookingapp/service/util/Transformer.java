package lk.leon.app.bookingapp.service.util;

import lk.leon.app.bookingapp.entity.Hotel;
import lk.leon.app.bookingapp.entity.Picture;
import lk.leon.app.bookingapp.to.HotelTo;
import lk.leon.app.bookingapp.to.request.HotelReqTo;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.stereotype.Component;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;
import java.util.stream.Collectors;

@Component
public class Transformer {
    private final ModelMapper modelMapper;

    public Transformer(ModelMapper modelMapper) {
        this.modelMapper = modelMapper;

        modelMapper.typeMap(MultipartFile.class, Picture.class).setConverter(ctc -> null);
    }

    public Hotel fromHotelReqTo(HotelReqTo hotelReqTo){
        Hotel hotel = modelMapper.map(hotelReqTo, Hotel.class);
        return hotel;
    }
    public Hotel fromHotelTo(HotelTo hotelTo){
        Hotel hotel = modelMapper.map(hotelTo, Hotel.class);
        return hotel;
    }
    public HotelTo toHotelTo(Hotel hotel){
        HotelTo hotelTo = modelMapper.map(hotel, HotelTo.class);
        return hotelTo;
    }
    public List<HotelTo> toHotelTo(List<Hotel> hotelList){
        return hotelList.stream().map(hotel -> modelMapper.map(hotel, HotelTo.class)).collect(Collectors.toList());
    }
}
