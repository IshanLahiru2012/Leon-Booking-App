package lk.leon.app.bookingapp.validation;

import org.springframework.web.multipart.MultipartFile;

import javax.validation.ConstraintValidator;
import javax.validation.ConstraintValidatorContext;
import java.util.List;

public class HotelImageConstraintValidator implements ConstraintValidator<HotelImage, List<MultipartFile>> {

    private long maximumFileSize;
    @Override
    public void initialize(HotelImage constraintAnnotation) {
        maximumFileSize = constraintAnnotation.maximumFileSize();
    }

    @Override
    public boolean isValid(List<MultipartFile> multipartFiles, ConstraintValidatorContext constraintValidatorContext) {
        if(multipartFiles == null || multipartFiles.size() == 0 ) {
            return true;
        }
        for (MultipartFile multipartFile: multipartFiles ) {
            if(multipartFile.isEmpty()) return true;
            if(multipartFile.getContentType() == null || !multipartFile.getContentType().startsWith("image/")) return false;
            return multipartFile.getSize() <= maximumFileSize;
        }
        return true;
    }


}
