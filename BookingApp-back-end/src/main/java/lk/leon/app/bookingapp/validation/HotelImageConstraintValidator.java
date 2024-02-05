package lk.leon.app.bookingapp.validation;

import org.springframework.web.multipart.MultipartFile;

import javax.validation.ConstraintValidator;
import javax.validation.ConstraintValidatorContext;

public class HotelImageConstraintValidator implements ConstraintValidator<HotelImage, MultipartFile> {

    private long maximumFileSize;
    @Override
    public void initialize(HotelImage constraintAnnotation) {
        maximumFileSize = constraintAnnotation.maximumFileSize();
    }

    @Override
    public boolean isValid(MultipartFile multipartFile, ConstraintValidatorContext constraintValidatorContext) {
        if(multipartFile.isEmpty() || multipartFile == null) return true;
        if(multipartFile.getContentType() == null || !multipartFile.getContentType().startsWith("image/")) return false;
        return multipartFile.getSize() <= maximumFileSize;

    }
}
