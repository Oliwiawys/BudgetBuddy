package com.example.expenses.repositories;

import com.example.expenses.models.Expenses;
import com.example.expenses.models.ExpensesTags;
import com.example.expenses.models.Tags;
import jakarta.transaction.Transactional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

public interface ExpensesTagsRepository extends JpaRepository<ExpensesTags, Integer> {
    @Modifying
    @Transactional
    @Query("update Expenses_Tags e set e.importanceLevel = :importanceLevel where e.expensesTagsId = :id")
    void updateImportanceLevel(@Param("id") int id, @Param("importanceLevel") String importanceLevel);

    @Modifying
    @Transactional
    @Query("update Expenses_Tags e set e.expense = :expense where e.expensesTagsId = :id")
    void updateExpense(@Param("id") int id, @Param("expense") Expenses expense);

    @Modifying
    @Transactional
    @Query("update Expenses_Tags e set e.tag = :tag where e.expensesTagsId = :id")
    void updateTag(@Param("id") int id, @Param("tag") Tags tag);
}
