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
import lombok.RequiredArgsConstructor;
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
@RequiredArgsConstructor
public class HotelServiceImpl implements HotelService {

    private final HotelRepository hotelRepository;
    private final PictureRepository pictureRepository;
    private final Transformer transformer;
    private final Bucket bucket;

    @Override
    public HotelTo saveHotel(HotelReqTo hotelReqTo){
        Hotel hotel = transformer.fromHotelReqTo(hotelReqTo);
        hotelRepository.save(hotel);

        List<String> urlList = new ArrayList<>();

        if(hotelReqTo.getPictureList() != null && hotelReqTo.getPictureList().size() > 0 ){
            urlList=savePictures(hotelReqTo,hotel);
        }
        HotelTo hotelTo = transformer.toHotelTo(hotel);
        if(urlList.size()>0){
            hotelTo.setPictureList(urlList);
        }
        return hotelTo;
    }
    @Override
    public void updateHotelViaMultipart(HotelReqTo hotelReqTo) {
        Hotel currentHotel = hotelRepository.findById(hotelReqTo.getId())
                .orElseThrow(() -> new RuntimeException("No hotel associated with the id"));
        Hotel newHotel = transformer.fromHotelReqTo(hotelReqTo);
        if(currentHotel.getPictureList().size() >0){
            for (Picture picture : currentHotel.getPictureList()){
                pictureRepository.delete(picture);
                bucket.get(picture.getPicturePath()).delete();
            }
        }
        newHotel = hotelRepository.save(newHotel);

        if(hotelReqTo.getPictureList() != null && hotelReqTo.getPictureList().size() > 0){
            savePictures(hotelReqTo, newHotel);
        }
    }
    public List<String> savePictures(HotelReqTo hotelReqTo, Hotel hotel){
        List<String> urlList = new ArrayList<>();
        List<MultipartFile> pictureList = hotelReqTo.getPictureList();

        for (int i = 0; i < pictureList.size(); i++) {
            try {
                Picture picture = new Picture("hotel/" + hotel.getId() + "image/" + i, hotel);
                pictureRepository.save(picture);
                Blob blob = bucket.create(picture.getPicturePath(), pictureList.get(i).getInputStream(), pictureList.get(i).getContentType());
                urlList.add(blob.signUrl(1,TimeUnit.DAYS, Storage.SignUrlOption.withV4Signature()).toString());
            } catch (IOException e) {
                throw new RuntimeException(e);
            }
        }
        return urlList;
    }

    @Override
    public void updateHotelViaJson(HotelTo hotelTo) {
        Hotel currentHotel = hotelRepository.findById(hotelTo.getId())
                .orElseThrow(() -> new RuntimeException("No hotel associated with the id"));
        Hotel newhotel = transformer.fromHotelTo(hotelTo);
        if(currentHotel.getPictureList().size() >0){
            for (Picture picture : currentHotel.getPictureList()){
                pictureRepository.delete(picture);
                bucket.get(picture.getPicturePath()).delete();
            }
        }
        hotelRepository.save(newhotel);
    }

    @Override
    public void deleteHotel(Integer hotelId) {
        Hotel hotel = hotelRepository.findById(hotelId)
                .orElseThrow(() -> new RuntimeException("No hotel Associated with the id"));
        hotelRepository.deleteById(hotelId);
        for ( Picture picture :hotel.getPictureList() ) {
            bucket.get(picture.getPicturePath()).delete();
        }
    }

    @Override
    public HotelTo getHotelDetails(Integer hotelId) {
        Hotel hotel = hotelRepository.findById(hotelId)
                .orElseThrow(() -> new RuntimeException("No hotel associated with the id"));
        HotelTo hotelTo = transformer.toHotelTo(hotel);
        if(hotel.getPictureList() != null && hotel.getPictureList().size()> 0){
            return hotelWithImage(hotel, hotelTo);
        }
        return hotelTo;
    }

    @Override
    public List<HotelTo> getHotels(HotelType type) {
        List<Hotel> hotelList = (type==null) ? hotelRepository.findAll() :hotelRepository.findHotelByType(type);

        List<HotelTo> hotelTos = hotelList.stream().map(hotel -> {
            HotelTo hotelTo = transformer.toHotelTo(hotel);
            if(hotel.getPictureList() != null && hotel.getPictureList().size()> 0){
                return hotelWithImage(hotel, hotelTo);
            }
            return hotelTo;
        }).collect(Collectors.toList());
        return hotelTos;
    }

    public HotelTo hotelWithImage(Hotel hotel, HotelTo hotelTo){
        List<String> imageList = new ArrayList<>();
        if (hotel.getPictureList() != null) {
            Iterable<Blob> blobs = bucket.list(Storage.BlobListOption.prefix("hotel/" + hotel.getId()+"image")).iterateAll();
            for (Blob blob : blobs) {
                imageList.add(blob.signUrl(1, TimeUnit.DAYS, Storage.SignUrlOption.withV4Signature()).toString());
            }
            hotelTo.setPictureList(imageList);
        }
        return hotelTo;
    }
}
