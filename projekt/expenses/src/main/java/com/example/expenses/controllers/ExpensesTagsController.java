package com.example.expenses.controllers;

import com.example.expenses.models.ExpensesTags;
import com.example.expenses.services.ExpensesTagsService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;
import java.util.Optional;

@RestController
@CrossOrigin(origins = "http://localhost:3000")
@RequestMapping("/expenses-tags")
public class ExpensesTagsController {
    @Autowired
    private ExpensesTagsService expensesTagsService;

    @GetMapping("/view/all")
    public ResponseEntity<List<ExpensesTags>> getAllExpensesTags() {
        return new ResponseEntity<>(expensesTagsService.getAllExpensesTags(), HttpStatus.OK);
    }

    @GetMapping("/view/{id}")
    public ResponseEntity<Optional<ExpensesTags>> getOneExpensesTag(@PathVariable String id) {
        return new ResponseEntity<>(expensesTagsService.getOneExpensesTag(Integer.parseInt(id)), HttpStatus.OK);
    }

    @GetMapping("/view/expenses/{id}")
    public ResponseEntity<List<ExpensesTags>> getExpensesExpensesTags(@PathVariable String id) {
        return new ResponseEntity<>(expensesTagsService.getExpensesExpensesTags(Integer.parseInt(id)), HttpStatus.OK);
    }

    @GetMapping("/view/tags/{id}")
    public ResponseEntity<List<ExpensesTags>> getTagsExpensesTags(@PathVariable String id) {
        return new ResponseEntity<>(expensesTagsService.getTagsExpensesTags(Integer.parseInt(id)), HttpStatus.OK);
    }


    @GetMapping("/view/users/{userId}")
    public ResponseEntity<List<ExpensesTags>> getUserExpensesTags(@PathVariable String userId) {
        return new ResponseEntity<>(expensesTagsService.getUserExpensesTags(Integer.parseInt(userId)), HttpStatus.OK);
    }

    @PostMapping("/add")
    public ResponseEntity<String> addExpensesTag(@RequestBody Map<String, String> payload) {
        return new ResponseEntity<>(expensesTagsService.addExpensesTag(payload.get("importanceLevel"), payload.get("tag"), payload.get("expense")), HttpStatus.CREATED);
    }

    @DeleteMapping("/delete/{id}")
    public ResponseEntity<String> deleteExpensesTag(@PathVariable String id) {
        return new ResponseEntity<>(expensesTagsService.deleteExpensesTag(Integer.parseInt(id)), HttpStatus.OK);
    }

    @PutMapping("/update")
    public ResponseEntity<String> updateExpensesTag(@RequestBody Map<String, String> payload) {
        return new ResponseEntity<>(expensesTagsService.updateExpensesTag(Integer.parseInt(payload.get("id")), payload.get("importanceLevel"), payload.get("expenseId"), payload.get("tagId")), HttpStatus.OK);
    }
}
