package com.example.expenses.controllers;

import com.example.expenses.models.Expenses;
import com.example.expenses.services.ExpensesService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;
import java.util.Optional;

@RestController
@CrossOrigin(origins = "http://localhost:3000")
@RequestMapping("/expenses")
public class ExpensesController {
    @Autowired
    private ExpensesService expensesService;

    @GetMapping("/view/all")
    public ResponseEntity<List<Expenses>> getAllExpenses() {
        return new ResponseEntity<>(expensesService.getAllExpenses(), HttpStatus.OK);
    }

    @GetMapping("/view/{id}")
    public ResponseEntity<Optional<Expenses>> getOneExpense(@PathVariable String id) {
        return new ResponseEntity<>(expensesService.getOneExpense(Integer.parseInt(id)), HttpStatus.OK);
    }

    @GetMapping("/view/users/{id}")
    public ResponseEntity<List<Expenses>> getUserExpenses(@PathVariable String id) {
        return new ResponseEntity<>(expensesService.getUserExpenses(Integer.parseInt(id)), HttpStatus.OK);
    }

    @PostMapping("/add")
    public ResponseEntity<Expenses> addExpense(@RequestBody Map<String, String> payload) {
        return new ResponseEntity<>(expensesService.addExpense(Double.parseDouble(payload.get("amount")), payload.get("date"), payload.get("description"), Integer.parseInt(payload.get("user"))), HttpStatus.CREATED);
    }

    @DeleteMapping("/delete/{id}")
    public ResponseEntity<String> deleteExpense(@PathVariable String id) {
        return new ResponseEntity<>(expensesService.deleteExpense(Integer.parseInt(id)), HttpStatus.OK);
    }

    @PutMapping("/update")
    public ResponseEntity<String> updateExpense(@RequestBody Map<String, String> payload) {
        return new ResponseEntity<>(expensesService.updateExpense(Integer.parseInt(payload.get("expenseId")), Double.parseDouble(payload.get("amount")), payload.get("date"), payload.get("description")), HttpStatus.OK);
    }
}
