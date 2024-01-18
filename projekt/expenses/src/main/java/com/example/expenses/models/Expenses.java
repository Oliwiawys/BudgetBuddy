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
@Entity(name = "Expenses")
@Table
public class Expenses {
    @Id
    @SequenceGenerator(
            name = "expenses_sequence",
            sequenceName = "expenses_sequence",
            allocationSize = 1
    )
    @GeneratedValue(
            strategy = GenerationType.SEQUENCE,
            generator = "expenses_sequence"
    )
    @Column(
            name = "expense_id",
            updatable = false
    )
    private int expenseId;
    @Column(
            name = "amount",
            nullable = false
    )
    private double amount;
    @Column(
            name = "date",
            nullable = false
    )
    @Temporal(TemporalType.DATE)
    private Date date;
    @Column(
            name = "description"
    )
    private String description;
    @ManyToOne
    private Users user;

    public Expenses(double amount, Date date, String description, Users user) {
        this.amount = amount;
        this.date = date;
        this.description = description;
        this.user = user;
    }
}

