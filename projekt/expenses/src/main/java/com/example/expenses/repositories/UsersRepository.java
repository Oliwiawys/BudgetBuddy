package com.example.expenses.repositories;

import com.example.expenses.models.Users;
import jakarta.transaction.Transactional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.Optional;

public interface UsersRepository extends JpaRepository<Users, Integer> {
    Optional<Users> findByUsername(String username);
    Optional<Users> findByEmail(String email);

    @Modifying
    @Transactional
    @Query("update Users u set u.username = :username where u.userID = :id")
    void updateUsername(@Param("id") int id, @Param("username") String username);

    @Modifying
    @Transactional
    @Query("update Users u set u.password = :password where u.userID = :id")
    void updatePassword(@Param("id") int id, @Param("password") String password);

    @Modifying
    @Transactional
    @Query("update Users u set u.email = :email where u.userID = :id")
    void updateEmail(@Param("id") int id, @Param("email") String email);

    @Modifying
    @Transactional
    @Query("update Users u set u.role = :role where u.userID = :id")
    void updateRole(@Param("id") int id, @Param("role") String role);
}
