package com.example.expenses.models;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.Date;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Entity(name = "Expenses_Tags")
@Table
public class ExpensesTags {
    @Id
    @SequenceGenerator(
            name = "expenses_tags_sequence",
            sequenceName = "expenses_tags_sequence",
            allocationSize = 1
    )
    @GeneratedValue(
            strategy = GenerationType.SEQUENCE,
            generator = "expenses_tags_sequence"
    )
    @Column(
            name = "expenses_tags_id",
            updatable = false
    )
    private int expensesTagsId;
    @Column(
            name = "importance_level",
            nullable = false
    )
    private String importanceLevel;
    @ManyToOne
    private Tags tag;
    @ManyToOne
    private Expenses expense;

    public ExpensesTags(String importanceLevel, Tags tag, Expenses expense) {
        this.importanceLevel = importanceLevel;
        this.tag = tag;
        this.expense = expense;
    }
}