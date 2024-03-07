package lk.leon.app.bookingapp.util;

public enum UserRole {
    ADMIN("admin"),CLIENT("client");

    private String type;

    UserRole(String type) {
        this.type = type;
    }
    public String getType(){
        return this.type;
    }
}
