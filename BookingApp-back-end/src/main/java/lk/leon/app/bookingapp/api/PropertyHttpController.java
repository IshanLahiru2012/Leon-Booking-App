package lk.leon.app.bookingapp.api;

import lk.leon.app.bookingapp.entity.Property;
import lk.leon.app.bookingapp.service.custom.BookService;
import lk.leon.app.bookingapp.service.custom.PropertyService;
import lk.leon.app.bookingapp.to.PropertyTo;
import lk.leon.app.bookingapp.to.request.PropertyReqTo;
import lk.leon.app.bookingapp.util.PropertyType;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("api/v1/properties")
@CrossOrigin
public class PropertyHttpController {

    @Autowired
    private PropertyService propertyService;
    @Autowired
    private BookService bookService;


    @ResponseStatus(HttpStatus.CREATED)
    @PostMapping(consumes = "multipart/form-data", produces = "application/json")
    public PropertyTo createNewProperty(@ModelAttribute @Validated PropertyReqTo propertyReqTo){
        return propertyService.saveProperty(propertyReqTo);
    }

    @GetMapping(value = "/{property-id}", produces = "application/json")
    public PropertyTo getPropertyDetails(@PathVariable("property-id") Integer hotelId){
        return propertyService.getPropertyDetails(hotelId);
    }
    @PatchMapping(value = "/{property-id}",consumes = "multipart/form-data")
    public void updatePropertywithImages(@ModelAttribute @Validated PropertyReqTo propertyReqTo,
                                         @PathVariable("property-id") Integer hotelId){
        propertyReqTo.setId(hotelId);
        propertyService.updatePropertyViaMultipart(propertyReqTo);

    }
    @DeleteMapping(value = "/{property-id}")
    public void deleteProperty(@PathVariable("property-id") Integer propertyId){
        propertyService.deleteProperty(propertyId);

    }

    @GetMapping(produces = "application/json")
    public List<PropertyTo> getPropertyByType(@RequestParam(required = false) PropertyType type){
        return propertyService.getPropertiesByType(type);
    }
    @GetMapping(value ="/user" ,produces = "application/json")
    public List<PropertyTo> getPropertyByUserId(@RequestParam(required = false) Integer id){
        return propertyService.getPropertiesByUserId(id);
    }

    @GetMapping(value ="/booked-user" )
    public ResponseEntity<?> getPropertyByBookedUserId(@RequestParam(required = false) Integer id){
        List<PropertyTo> bookedPropertiesByUserId = propertyService.getBookedPropertiesByUserId(id);
        return new ResponseEntity<>(bookedPropertiesByUserId,HttpStatus.OK);
    }
    @GetMapping(value = "/search")
    public ResponseEntity<?> getPropertyByBookedUserId(@RequestParam(required = false) String city){
        List<PropertyTo> bookedPropertiesByUserId = propertyService.getPropertiesByCity(city);
        System.out.println(city);
        return new ResponseEntity<>(bookedPropertiesByUserId,HttpStatus.OK);
    }



}
