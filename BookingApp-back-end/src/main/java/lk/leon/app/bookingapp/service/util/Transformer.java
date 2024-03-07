package lk.leon.app.bookingapp.service.util;

import lk.leon.app.bookingapp.entity.Property;
import lk.leon.app.bookingapp.entity.Picture;
import lk.leon.app.bookingapp.entity.User;
import lk.leon.app.bookingapp.to.PropertyTo;
import lk.leon.app.bookingapp.to.UserTo;
import lk.leon.app.bookingapp.to.request.PropertyReqTo;
import lk.leon.app.bookingapp.to.request.UserReqTo;
import org.modelmapper.ModelMapper;
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

    public Property fromPropertyReqTo(PropertyReqTo propertyReqTo){
        Property property = modelMapper.map(propertyReqTo, Property.class);
        property.setPictureList(null);
        return property;
    }
    public Property fromPropertyTo(PropertyTo propertyTo){
        Property property = modelMapper.map(propertyTo, Property.class);
        property.setPictureList(null);
        return property;
    }
    public PropertyTo toPropertyTo(Property property){
        PropertyTo propertyTo = modelMapper.map(property, PropertyTo.class);
        propertyTo.setPictureList(null);
        return propertyTo;
    }
    public List<PropertyTo> toPropertyTo(List<Property> propertyList){
        return propertyList.stream().map(hotel -> modelMapper.map(hotel, PropertyTo.class)).collect(Collectors.toList());
    }

    public User fromUserReqTo(UserReqTo userReqTo){
        return modelMapper.map(userReqTo, User.class);
    }
    public UserTo toUserTo(User user){
        return modelMapper.map(user, UserTo.class);
    }

}
