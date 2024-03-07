package lk.leon.app.bookingapp.service.custom;

import lk.leon.app.bookingapp.service.SuperService;
import lk.leon.app.bookingapp.to.UserTo;
import lk.leon.app.bookingapp.to.request.UserReqTo;

public interface AuthService extends SuperService {

    UserTo registerUser(UserReqTo userReqTo);

    boolean existUser(String email);
    void updateUser(UserReqTo userReqTo);
}
