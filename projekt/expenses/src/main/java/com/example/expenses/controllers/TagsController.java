package com.example.expenses.controllers;

import com.example.expenses.models.Tags;
import com.example.expenses.services.TagsService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;
import java.util.Optional;

@RestController
@CrossOrigin(origins = "http://localhost:3000")
@RequestMapping("/tags")
public class TagsController {
    @Autowired
    private TagsService tagsService;

    @GetMapping("/view/all")
    public ResponseEntity<List<Tags>> getAllTags() {
        return new ResponseEntity<>(tagsService.getAllTags(), HttpStatus.OK);
    }

    @GetMapping("/view/{id}")
    public ResponseEntity<Optional<Tags>> getOneTag(@PathVariable String id) {
        return new ResponseEntity<>(tagsService.getOneTag(Integer.parseInt(id)), HttpStatus.OK);
    }

    @PostMapping("/add")
    public ResponseEntity<String> addTag(@RequestBody Map<String, String> payload) {
        return new ResponseEntity<>(tagsService.addTag(payload.get("tagName"), payload.get("tagDescription")), HttpStatus.CREATED);
    }

    @DeleteMapping("/delete/{id}")
    public ResponseEntity<String> deleteUser(@PathVariable String id) {
        return new ResponseEntity<>(tagsService.deleteTag(Integer.parseInt(id)), HttpStatus.OK);
    }

    @PutMapping("/update")
    public ResponseEntity<String> updateUser(@RequestBody Map<String, String> payload) {
        return new ResponseEntity<>(tagsService.updateTag(Integer.parseInt(payload.get("id")), payload.get("tagName"), payload.get("tagDescription")), HttpStatus.OK);
    }
}
