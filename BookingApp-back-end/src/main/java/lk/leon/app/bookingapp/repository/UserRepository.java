package lk.leon.app.bookingapp.repository;

import lk.leon.app.bookingapp.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface UserRepository extends JpaRepository<User,Integer> {

    Optional<User> findFirstByEmail(String email);

    @Override
    Optional<User> findById(Integer integer);
}
