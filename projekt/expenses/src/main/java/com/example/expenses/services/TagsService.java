package com.example.expenses.services;

import com.example.expenses.models.ExpensesTags;
import com.example.expenses.models.Tags;
import com.example.expenses.repositories.TagsRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class TagsService {

    private TagsRepository tagsRepository;
    private ExpensesTagsService expensesTagsService;

    @Autowired
    public TagsService(TagsRepository tagsRepository, ExpensesTagsService expensesTagsService) {
        this.tagsRepository = tagsRepository;
        this.expensesTagsService = expensesTagsService;
    }

    public List<Tags> getAllTags() {
        return tagsRepository.findAll();
    }

    public Optional<Tags> getOneTag(int id) {
        return tagsRepository.findById(id);
    }

    public String addTag(String tagName, String tagDescription) {
        if (tagsRepository.findByTagName(tagName).isPresent()) {
            return "tagExists";
        }
        Tags tag = new Tags(tagName, tagDescription);
        tagsRepository.save(tag);
        return "added";
    }

    public String deleteTag(int id) {
        List<ExpensesTags> expensesTags = expensesTagsService.getTagsExpensesTags(id);
        if (tagsRepository.findById(id).isPresent()) {
            for (ExpensesTags expensesTag : expensesTags) {
                expensesTagsService.deleteExpensesTag(expensesTag.getExpensesTagsId());
            }
            tagsRepository.deleteById(id);
        } else {
            return "tagNotFound";
        }
        return "deleted";
    }

    public String updateTag(int id, String tagName, String tagDescription) {
        if (tagsRepository.findById(id).isEmpty()) {
            return "tagNotFound";
        }
        if (!tagName.equals("null")) {
            tagsRepository.updateTagName(id, tagName);
        }
        if (!tagDescription.equals("null")) {
            tagsRepository.updateTagDescription(id, tagDescription);
        }
        return "updated";
    }
}
