package com.example.expenses.services;

import com.example.expenses.models.Expenses;
import com.example.expenses.models.Users;
import com.example.expenses.repositories.UsersRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import java.util.Date;
import java.util.List;
import java.util.Optional;

@Service
public class UsersService {
    private UsersRepository usersRepository;
    private ExpensesService expensesService;

    @Autowired
    public UsersService(UsersRepository usersRepository, ExpensesService expensesService) {
        this.usersRepository = usersRepository;
        this.expensesService = expensesService;
    }

    public List<Users> getAllUsers() {
        return usersRepository.findAll();
    }

    public Optional<Users> getOneUser(int id) {
        return usersRepository.findById(id);
    }

    public String adminAddUser(String username, String password, String email, String role) {
        if (usersRepository.findByUsername(username).isPresent()) {
            return "usernameExists";
        }
        if (usersRepository.findByEmail(email).isPresent()) {
            return "emailExists";
        }
        Users user = new Users(username, email, password, role, new Date());
        usersRepository.save(user);
        return "registered";
    }

    public String deleteUser(int id) {
        Optional<Users> user = usersRepository.findById(id);
        List<Expenses> expenses = expensesService.getUserExpenses(id);
        if (user.isPresent()) {
            for (Expenses expense : expenses) {
                expensesService.deleteExpense(expense.getExpenseId());
            }
            usersRepository.deleteById(id);
            return "deleted";
        }
        return "userNotFound";
    }

    public String updateUser(int id, String username, String password, String email, String role) {
        if (usersRepository.findById(id).isEmpty()) {
            return "userNotFound";
        } else {
            if (!username.equals("null")) {
                usersRepository.updateUsername(id, username);
            }
            if (!password.equals("null")) {
                usersRepository.updatePassword(id, password);
            }
            if (!email.equals("null")) {
                usersRepository.updateEmail(id, email);
            }
            if (!email.equals("null")) {
                usersRepository.updateRole(id, role);
            }
            return "updated";
        }
    }

    public String updateUserRole(int id, String role) {
        if (usersRepository.findById(id).isEmpty()) {
            return "userNotFound";
        }
        if (!role.equals("null")) {
            usersRepository.updateRole(id, role);
        }
        return "updated";
    }

    public Users loginUser() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        String username = authentication.getName();
        Users user = usersRepository.findByUsername(username).get();
        return user;
    }
}
