package lk.leon.app.bookingapp.service.custom;

import lk.leon.app.bookingapp.service.SuperService;
import lk.leon.app.bookingapp.to.UserTo;
import lk.leon.app.bookingapp.to.request.UserReqTo;

public interface UserService extends SuperService {

    UserTo registerUser(UserReqTo userReqTo);
    void updateUser(UserReqTo userReqTo);
}
