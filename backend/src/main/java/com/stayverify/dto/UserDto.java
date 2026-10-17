package com.stayverify.dto;

import com.stayverify.entity.Role;

public class UserDto {
    private String id;
    private String name;
    private String email;
    private Role role;
    private String phone;

    public UserDto() {}

    public UserDto(String id, String name, String email, Role role, String phone) {
        this.id = id;
        this.name = name;
        this.email = email;
        this.role = role;
        this.phone = phone;
    }

    public String getId() { return id; }
    public void setId(String id) { this.id = id; }

    public String getName() { return name; }
    public void setName(String name) { this.name = name; }

    public String getEmail() { return email; }
    public void setEmail(String email) { this.email = email; }

    public Role getRole() { return role; }
    public void setRole(Role role) { this.role = role; }

    public String getPhone() { return phone; }
    public void setPhone(String phone) { this.phone = phone; }
}
