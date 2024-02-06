package lk.leon.app.bookingapp.service.custom.impl;

import com.google.api.gax.paging.Page;
import com.google.cloud.storage.Blob;
import com.google.cloud.storage.Bucket;
import com.google.cloud.storage.Storage;
import lk.leon.app.bookingapp.entity.Hotel;
import lk.leon.app.bookingapp.entity.Picture;
import lk.leon.app.bookingapp.repository.HotelRepository;
import lk.leon.app.bookingapp.repository.PictureRepository;
import lk.leon.app.bookingapp.service.custom.HotelService;
import lk.leon.app.bookingapp.service.util.Transformer;
import lk.leon.app.bookingapp.to.HotelTo;
import lk.leon.app.bookingapp.to.request.HotelReqTo;
import lk.leon.app.bookingapp.util.HotelType;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import javax.transaction.Transactional;
import java.io.IOException;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.concurrent.TimeUnit;
import java.util.stream.Collectors;

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
    public HotelTo saveHotel(HotelReqTo hotelReqTo){
        Hotel hotel = transformer.fromHotelReqTo(hotelReqTo);
        System.out.println(hotel);
        hotelRepository.save(hotel);

        ArrayList<String> urlList = new ArrayList<>();

        if(hotelReqTo.getPictureList() != null && hotelReqTo.getPictureList().size() != 0 ){
            List<MultipartFile> pictureList = hotelReqTo.getPictureList();

            for (int i = 0; i < pictureList.size(); i++) {
                try {
                    Picture picture = new Picture("hotel/" + hotel.getId() + "/" + i, hotel);
                    pictureRepository.save(picture);
                    Blob blob = bucket.create(picture.getPicturePath(), pictureList.get(i).getInputStream(), pictureList.get(i).getContentType());
                    urlList.add(blob.signUrl(1,TimeUnit.DAYS, Storage.SignUrlOption.withV4Signature()).toString());
                } catch (IOException e) {
                    throw new RuntimeException(e);
                }
            }
        }
        HotelTo hotelTo = transformer.toHotelTo(hotel);
        if(urlList.size()>0){
            hotelTo.setPictureList(urlList);
        }
        return hotelTo;
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
        Hotel hotel = hotelRepository.findById(hotelId)
                .orElseThrow(() -> new RuntimeException("No hotel associated with the id"));
        HotelTo hotelTo = transformer.toHotelTo(hotel);
        if(hotel.getPictureList() != null && hotel.getPictureList().size()> 0){
            return hotelWithImage(hotel.getPictureList(), hotel, hotelTo);
        }
        return hotelTo;
    }

    @Override
    public List<HotelTo> getHotels(HotelType type) {
        List<Hotel> hotelList = (type==null) ? hotelRepository.findAll() :hotelRepository.findHotelByType(type);

        List<HotelTo> hotelTos = hotelList.stream().map(hotel -> {
            HotelTo hotelTo = transformer.toHotelTo(hotel);
            if(hotel.getPictureList() != null && hotel.getPictureList().size()> 0){
                return hotelWithImage(hotel.getPictureList(), hotel, hotelTo);
            }
            return hotelTo;
        }).collect(Collectors.toList());
        return hotelTos;
    }

    public HotelTo hotelWithImage(List<Picture> pictureList, Hotel hotel, HotelTo hotelTo){
        List<String> imageList = new ArrayList<>();
        if (hotel.getPictureList() != null) {
            Iterable<Blob> blobs = bucket.list(Storage.BlobListOption.prefix("hotel/" + hotel.getId())).iterateAll();
            for (Blob blob : blobs) {
                imageList.add(blob.signUrl(1, TimeUnit.DAYS, Storage.SignUrlOption.withV4Signature()).toString());
            }
            hotelTo.setPictureList(imageList);
        }
        return hotelTo;
    }
}
