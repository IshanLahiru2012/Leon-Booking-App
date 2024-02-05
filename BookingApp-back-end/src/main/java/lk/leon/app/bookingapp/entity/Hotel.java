package lk.leon.app.bookingapp.entity;

import lk.leon.app.bookingapp.util.HotelType;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import javax.validation.constraints.Digits;
import javax.validation.constraints.Positive;
import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "hotel")
public class Hotel implements SuperEntity{
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;
    @Column(length = 100, nullable = false)
    private String name;
    @Column(length = 100, nullable = false)
    private String city;
    @Enumerated(EnumType.STRING)
    @Column(nullable = false, columnDefinition = "ENUM('APARTMENT','RESORT','VILLA')")
    private HotelType type;
    @Column(name = "charge_per_night", nullable = false)
    @Positive
    private int ChargePerNight;

    @OneToMany(mappedBy = "hotel", cascade = CascadeType.ALL)
    private List<Picture> pictureList;


}
