package lk.leon.app.bookingapp.service.custom.impl;

import com.google.cloud.storage.Blob;
import com.google.cloud.storage.Bucket;
import com.google.cloud.storage.Storage;
import lk.leon.app.bookingapp.entity.Property;
import lk.leon.app.bookingapp.entity.Picture;
import lk.leon.app.bookingapp.entity.User;
import lk.leon.app.bookingapp.repository.PropertyRepository;
import lk.leon.app.bookingapp.repository.PictureRepository;
import lk.leon.app.bookingapp.repository.UserRepository;
import lk.leon.app.bookingapp.service.custom.PropertyService;
import lk.leon.app.bookingapp.service.util.Transformer;
import lk.leon.app.bookingapp.to.PropertyTo;
import lk.leon.app.bookingapp.to.request.PropertyReqTo;
import lk.leon.app.bookingapp.util.PropertyType;
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
public class PropertyServiceImpl implements PropertyService {

    private final PropertyRepository propertyRepository;
    private final UserRepository userRepository;
    private final PictureRepository pictureRepository;
    private final Transformer transformer;
    private final Bucket bucket;

    @Override
    public PropertyTo saveProperty(PropertyReqTo propertyReqTo){
        Property property = transformer.fromPropertyReqTo(propertyReqTo);
        Optional<User> user = userRepository.findById(propertyReqTo.getUserId());
        property.setUser(user.orElseThrow());
        propertyRepository.save(property);

        List<String> urlList = new ArrayList<>();

        if(propertyReqTo.getPictureList() != null && propertyReqTo.getPictureList().size() > 0 ){
            urlList=savePictures(propertyReqTo, property);
        }
        PropertyTo propertyTo = transformer.toPropertyTo(property);
        if(urlList.size()>0){
            propertyTo.setPictureList(urlList);
        }
        return propertyTo;
    }
    @Override
    public void updatePropertyViaMultipart(PropertyReqTo propertyReqTo) {
        Property currentProperty = propertyRepository.findById(propertyReqTo.getId())
                .orElseThrow(() -> new RuntimeException("No hotel associated with the id"));
        Property newProperty = transformer.fromPropertyReqTo(propertyReqTo);
        if(currentProperty.getPictureList().size() >0){
            for (Picture picture : currentProperty.getPictureList()){
                pictureRepository.delete(picture);
                bucket.get(picture.getPicturePath()).delete();
            }
        }
        newProperty = propertyRepository.save(newProperty);

        if(propertyReqTo.getPictureList() != null && propertyReqTo.getPictureList().size() > 0){
            savePictures(propertyReqTo, newProperty);
        }
    }
    public List<String> savePictures(PropertyReqTo propertyReqTo, Property property){
        List<String> urlList = new ArrayList<>();
        List<MultipartFile> pictureList = propertyReqTo.getPictureList();

        for (int i = 0; i < pictureList.size(); i++) {
            try {
                Picture picture = new Picture("property/" + property.getId() + "image/" + i, property);
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
    public void updateHotelViaJson(PropertyTo propertyTo) {
        Property currentProperty = propertyRepository.findById(propertyTo.getId())
                .orElseThrow(() -> new RuntimeException("No property associated with the id"));
        Property newhotel = transformer.fromPropertyTo(propertyTo);
        if(currentProperty.getPictureList().size() >0){
            for (Picture picture : currentProperty.getPictureList()){
                pictureRepository.delete(picture);
                bucket.get(picture.getPicturePath()).delete();
            }
        }
        propertyRepository.save(newhotel);
    }

    @Override
    public void deleteProperty(Integer hotelId) {
        Property property = propertyRepository.findById(hotelId)
                .orElseThrow(() -> new RuntimeException("No property Associated with the id"));
        propertyRepository.deleteById(hotelId);
        for ( Picture picture : property.getPictureList() ) {
            bucket.get(picture.getPicturePath()).delete();
        }
    }

    @Override
    public PropertyTo getPropertyDetails(Integer hotelId) {
        Property property = propertyRepository.findById(hotelId)
                .orElseThrow(() -> new RuntimeException("No property associated with the id"));
        PropertyTo propertyTo = transformer.toPropertyTo(property);
        if(property.getPictureList() != null && property.getPictureList().size()> 0){
            return hotelWithImage(property, propertyTo);
        }
        return propertyTo;
    }

    @Override
    public List<PropertyTo> getProperties(PropertyType type) {
        List<Property> propertyList = (type==null) ? propertyRepository.findAll() : propertyRepository.findPropertyByType(type);

        List<PropertyTo> propertyTos = propertyList.stream().map(property -> {
            PropertyTo propertyTo = transformer.toPropertyTo(property);
            if(property.getPictureList() != null && property.getPictureList().size()> 0){
                return hotelWithImage(property, propertyTo);
            }
            return propertyTo;
        }).collect(Collectors.toList());
        return propertyTos;
    }

    @Override
    public List<PropertyTo> getProperties(Integer id) {
        if(propertyRepository.findPropertyByUserId(id)==null) return null;
        List<Property> propertyList = propertyRepository.findPropertyByUserId(id);
        List<PropertyTo> propertyTos = propertyList.stream().map(property -> {
            PropertyTo propertyTo = transformer.toPropertyTo(property);
            if (property.getPictureList() != null && property.getPictureList().size() > 0) {
                return hotelWithImage(property, propertyTo);
            }
            return propertyTo;
        }).collect(Collectors.toList());
        return propertyTos;

    }

    public PropertyTo hotelWithImage(Property property, PropertyTo propertyTo){
        List<String> imageList = new ArrayList<>();
        if (property.getPictureList() != null) {
            Iterable<Blob> blobs = bucket.list(Storage.BlobListOption.prefix("property/" + property.getId()+"image")).iterateAll();
            for (Blob blob : blobs) {
                imageList.add(blob.signUrl(1, TimeUnit.DAYS, Storage.SignUrlOption.withV4Signature()).toString());
            }
            propertyTo.setPictureList(imageList);
        }
        return propertyTo;
    }
}
