package lk.leon.app.bookingapp.entity;

import lk.leon.app.bookingapp.util.HotelType;
import lk.leon.app.bookingapp.validation.HotelImage;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;

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
    @Column(nullable = false, columnDefinition = "ENUM('HOTEL','APARTMENT','RESORT','VILLA')")
    private HotelType type;
    @Column(name = "charge_per_night", nullable = false)
    @Positive
    private int chargePerNight;

    @ToString.Exclude
    @OneToMany(mappedBy = "hotel", cascade = CascadeType.REMOVE)
    private List<Picture> pictureList;
    @ManyToOne
    @JoinColumn(name = "user_id", referencedColumnName = "id")
    private User user;

    public Hotel(String name, String city, HotelType type, int chargePerNight) {
        this.name = name;
        this.city = city;
        this.type = type;
        this.chargePerNight = chargePerNight;
    }
}
