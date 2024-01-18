package com.example.expenses.services;

import com.example.expenses.models.Expenses;
import com.example.expenses.models.ExpensesTags;
import com.example.expenses.models.Users;
import com.example.expenses.repositories.ExpensesRepository;
import com.example.expenses.repositories.UsersRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.Optional;


@Service
public class ExpensesService {
    private ExpensesRepository expensesRepository;

    private UsersRepository usersRepository;

    private ExpensesTagsService expensesTagsService;

    @Autowired
    public ExpensesService(ExpensesRepository expensesRepository, UsersRepository usersRepository, ExpensesTagsService expensesTagsService) {
        this.expensesRepository = expensesRepository;
        this.usersRepository = usersRepository;
        this.expensesTagsService = expensesTagsService;
    }

    public List<Expenses> getAllExpenses() {
        return expensesRepository.findAll();
    }

    public List<Expenses> getUserExpenses(int userId) {
        List<Expenses> expenses = expensesRepository.findAll();
        Optional<Users> user = usersRepository.findById(userId);
        List<Expenses> userExpenses = new ArrayList<>();
        if (user.isPresent()) {
            for (Expenses expense : expenses) {
                if (expense.getUser() == user.get()) {
                    userExpenses.add(expense);
                }
            }
            return userExpenses;
        }
        return null;
    }

    public Optional<Expenses> getOneExpense(int id) {
        return expensesRepository.findById(id);
    }

    public Expenses addExpense(double amount, String date, String description, int userId) {
        try {
            Date parsedDate = new SimpleDateFormat("yyyy-MM-dd").parse(date);
            Optional<Users> user = usersRepository.findById(userId);
            if (user.isPresent()) {
                Expenses expense = new Expenses(amount, parsedDate, description, user.get());
                expensesRepository.save(expense);
                return expense;
            }
        } catch (ParseException e) {
            throw new RuntimeException(e);
        }
        return null;
    }

    public String deleteExpense(int id) {
        List<ExpensesTags> expensesTags = expensesTagsService.getExpensesExpensesTags(id);
        if (expensesRepository.findById(id).isPresent()) {
            for (ExpensesTags expensesTag : expensesTags) {
                expensesTagsService.deleteExpensesTag(expensesTag.getExpensesTagsId());
            }
            expensesRepository.deleteById(id);
            return "deleted";
        }
        return "expenseNotFound";
    }

    public String updateExpense(int id, double amount, String date, String description) {
        try {
            Date parsedDate = new SimpleDateFormat("yyyy-MM-dd").parse(date);
            if (parsedDate != null) {
                expensesRepository.updateDate(id, parsedDate);
            }
        } catch (ParseException e) {
            throw new RuntimeException(e);
        }
        if (expensesRepository.findById(id).isEmpty()) {
            return "expenseNotFound";
        }
        if (!Double.isNaN(amount)) {
            expensesRepository.updateAmount(id, amount);
        }
        if (!description.equals("null")) {
            expensesRepository.updateDescription(id, description);
        }
        return "updated";
    }
}
