package com.example.expenses.repositories;

import com.example.expenses.models.Expenses;
import jakarta.transaction.Transactional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.Date;

public interface ExpensesRepository extends JpaRepository<Expenses, Integer> {

    @Modifying
    @Transactional
    @Query("update Expenses e set e.amount = :amount where e.expenseId = :id")
    void updateAmount(@Param("id") int id, @Param("amount") double amount);

    @Modifying
    @Transactional
    @Query("update Expenses e set e.date = :date where e.expenseId = :id")
    void updateDate(@Param("id") int id, @Param("date") Date date);

    @Modifying
    @Transactional
    @Query("update Expenses e set e.description = :description where e.expenseId = :id")
    void updateDescription(@Param("id") int id, @Param("description") String description);
}
