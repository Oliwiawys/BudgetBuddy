package com.example.expenses.services;

import com.example.expenses.models.Expenses;
import com.example.expenses.models.ExpensesTags;
import com.example.expenses.models.Tags;
import com.example.expenses.repositories.ExpensesRepository;
import com.example.expenses.repositories.ExpensesTagsRepository;
import com.example.expenses.repositories.TagsRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
public class ExpensesTagsService {
    private ExpensesTagsRepository expensesTagsRepository;
    private TagsRepository tagsRepository;
    private ExpensesRepository expensesRepository;

    @Autowired
    public ExpensesTagsService(ExpensesTagsRepository expensesTagsRepository, TagsRepository tagsRepository, ExpensesRepository expensesRepository) {
        this.expensesTagsRepository = expensesTagsRepository;
        this.tagsRepository = tagsRepository;
        this.expensesRepository = expensesRepository;
    }

    public List<ExpensesTags> getAllExpensesTags() {
        return expensesTagsRepository.findAll();
    }

    public Optional<ExpensesTags> getOneExpensesTag(int id) {
        return expensesTagsRepository.findById(id);
    }

    public List<ExpensesTags> getExpensesExpensesTags(int expenseId) {
        List<ExpensesTags> expensesTags = getAllExpensesTags();
        Optional<Expenses> expense = expensesRepository.findById(expenseId);
        List<ExpensesTags> expenseExpensesTags = new ArrayList<>();
        if (expense.isPresent()) {
            for (ExpensesTags expensesTag : expensesTags) {
                if (expensesTag.getExpense() == expense.get()) {
                    expenseExpensesTags.add(expensesTag);
                }
            }
            return expenseExpensesTags;
        }
        return null;
    }

    public List<ExpensesTags> getTagsExpensesTags(int tagsId) {
        List<ExpensesTags> expensesTags = getAllExpensesTags();
        Optional<Tags> tag = tagsRepository.findById(tagsId);
        List<ExpensesTags> tagExpensesTags = new ArrayList<>();
        if (tag.isPresent()) {
            for (ExpensesTags expensesTag : expensesTags) {
                if (expensesTag.getTag() == tag.get()) {
                    tagExpensesTags.add(expensesTag);
                }
            }
            return tagExpensesTags;
        }
        return null;
    }

    public List<ExpensesTags> getUserExpensesTags(int userId) {
        List<ExpensesTags> expensesTags = getAllExpensesTags();
        List<ExpensesTags> userExpensesTags = new ArrayList<>();

        for (ExpensesTags expensesTag : expensesTags) {
            Expenses expense = expensesTag.getExpense();
            if (expense != null && expense.getUser().getUserID() == userId) {
                userExpensesTags.add(expensesTag);
            }
        }
        return userExpensesTags;
    }

    public String addExpensesTag(String importanceLevel, String tagId, String expenseId) {
        Optional<Tags> tag = tagsRepository.findById(Integer.parseInt(tagId));
        Optional<Expenses> expense = expensesRepository.findById(Integer.parseInt(expenseId));
        if (tag.isPresent() && expense.isPresent()) {
            ExpensesTags expensesTag = new ExpensesTags(importanceLevel, tag.get(), expense.get());
            expensesTagsRepository.save(expensesTag);
            return "added";
        }
        return "paramsMissing";
    }

    public String deleteExpensesTag(int id) {
        if (expensesTagsRepository.findById(id).isPresent()) {
            expensesTagsRepository.deleteById(id);
        } else {
            return "expensesTagNotFound";
        }
        return "deleted";
    }

    public String updateExpensesTag(int id, String importanceLevel, String expenseId, String tagId) {
        Optional<Tags> tag = tagsRepository.findById(Integer.parseInt(tagId));
        Optional<Expenses> expense = expensesRepository.findById(Integer.parseInt(expenseId));
        if (expensesTagsRepository.findById(id).isEmpty()) {
            return "expensesTagNotFound";
        } else {
            if (!importanceLevel.equals("null")) {
                expensesTagsRepository.updateImportanceLevel(id, importanceLevel);
            }
            if (expense.isPresent() && !expenseId.equals("null")) {
                expensesTagsRepository.updateExpense(id, expense.get());
            }
            if (tag.isPresent() && !tagId.equals("null")) {
                expensesTagsRepository.updateTag(id, tag.get());
            }
            return "updated";
        }
    }
}
