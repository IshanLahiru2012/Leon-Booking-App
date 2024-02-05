package lk.leon.app.bookingapp.service.custom.impl;

import com.google.cloud.storage.Bucket;
import lk.leon.app.bookingapp.entity.Hotel;
import lk.leon.app.bookingapp.repository.HotelRepository;
import lk.leon.app.bookingapp.repository.PictureRepository;
import lk.leon.app.bookingapp.service.custom.HotelService;
import lk.leon.app.bookingapp.service.util.Transformer;
import lk.leon.app.bookingapp.to.HotelTo;
import lk.leon.app.bookingapp.to.request.HotelReqTo;
import lk.leon.app.bookingapp.util.HotelType;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.List;
@Service
@Transactional
public class HotelServiceImpl implements HotelService {

    private final HotelRepository hotelRepository;
    private final PictureRepository pictureRepository;
    private final Transformer transformer;
    private final Bucket bucket;

    public HotelServiceImpl(HotelRepository hotelRepository, PictureRepository pictureRepository, Transformer transformer, Bucket bucket) {
        this.hotelRepository = hotelRepository;
        this.pictureRepository = pictureRepository;
        this.transformer = transformer;
        this.bucket = bucket;
    }

    @Override
    public HotelTo saveHotel(HotelReqTo hotelReqTo) {
        Hotel hotel = transformer.fromHotelReqTo(hotelReqTo);
        if(hotelReqTo.getPictureList().size() == 0){
            System.out.println("awa");
        }
        return null;
    }

    @Override
    public void updateHotelViaMultipart(HotelReqTo hotelReqTo) {

    }

    @Override
    public void updateHotelViaJson(HotelTo hotelTo) {

    }

    @Override
    public void deleteHotel(Integer hotelId) {

    }

    @Override
    public HotelTo getHotelDetails(Integer hotelId) {
        return null;
    }

    @Override
    public List<HotelTo> getHotels(HotelType type) {
        return null;
    }
}
