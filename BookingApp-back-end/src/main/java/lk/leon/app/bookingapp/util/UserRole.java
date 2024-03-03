package lk.leon.app.bookingapp.util;

public enum UserRole {
    ADMIN("admin"),CUSTOMER("customer");

    private String type;

    UserRole(String type) {
        this.type = type;
    }
    public String getType(){
        return this.type;
    }
}
