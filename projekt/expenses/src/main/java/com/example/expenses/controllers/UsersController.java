package com.example.expenses.controllers;

import com.example.expenses.models.Users;
import com.example.expenses.services.UsersService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;
import java.util.Optional;

@RestController
@CrossOrigin(origins = "http://localhost:3000")
@RequestMapping("/users")
public class UsersController {
    @Autowired
    private UsersService usersService;

    @GetMapping("/view/all")
    public ResponseEntity<List<Users>> getAllUsers() {
        return new ResponseEntity<>(usersService.getAllUsers(), HttpStatus.OK);
    }

    @GetMapping("/view/{id}")
    public ResponseEntity<Optional<Users>> getOneUser(@PathVariable String id) {
        return new ResponseEntity<>(usersService.getOneUser(Integer.parseInt(id)), HttpStatus.OK);
    }

    @PostMapping("/admin/add")
    public ResponseEntity<String> adminAddUser(@RequestBody Map<String, String> payload) {
        return new ResponseEntity<>(usersService.adminAddUser(payload.get("username"), payload.get("password"), payload.get("email"), payload.get("role")), HttpStatus.CREATED);
    }

    @DeleteMapping("/delete/{id}")
    public ResponseEntity<String> deleteUser(@PathVariable String id) {
        return new ResponseEntity<>(usersService.deleteUser(Integer.parseInt(id)), HttpStatus.OK);
    }

    @PutMapping("/update")
    public ResponseEntity<String> updateUser(@RequestBody Map<String, String> payload) {
        return new ResponseEntity<>(usersService.updateUser(Integer.parseInt(payload.get("id")), payload.get("username"), payload.get("password"), payload.get("email"), payload.get("role")), HttpStatus.OK);
    }

    @PatchMapping("/update/role")
    public ResponseEntity<String> updateUserRole(@RequestBody Map<String, String> payload) {
        return new ResponseEntity<>(usersService.updateUserRole(Integer.parseInt(payload.get("id")), payload.get("role")), HttpStatus.OK);
    }

    @PostMapping("/login")
    public ResponseEntity<Users> loginUser() {
        return new ResponseEntity<>(usersService.loginUser(), HttpStatus.OK);
    }
}
