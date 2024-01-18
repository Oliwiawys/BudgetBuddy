package com.example.expenses.repositories;

import com.example.expenses.models.Tags;
import jakarta.transaction.Transactional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.Optional;

public interface TagsRepository extends JpaRepository<Tags, Integer> {
    Optional<Tags> findByTagName(String tagName);

    @Modifying
    @Transactional
    @Query("update Tags t set t.tagName = :tagName where t.tagId = :id")
    void updateTagName(@Param("id") int id, @Param("tagName") String tagName);

    @Modifying
    @Transactional
    @Query("update Tags t set t.tagDescription = :tagDescription where t.tagId = :id")
    void updateTagDescription(@Param("id") int id, @Param("tagDescription") String tagDescription);
}
