package com.example.expenses.models;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Entity(name = "Tags")
@Table
public class Tags {
    @Id
    @SequenceGenerator(
            name = "tags_sequence",
            sequenceName = "tags_sequence",
            allocationSize = 1
    )
    @GeneratedValue(
            strategy = GenerationType.SEQUENCE,
            generator = "tags_sequence"
    )
    @Column(
            name = "tag_id",
            updatable = false
    )
    private int tagId;
    @Column(
            name = "tag_name",
            nullable = false
    )
    private String tagName;
    @Column(
            name = "tag_description"
    )
    private String tagDescription;

    public Tags(String tagName, String tagDescription) {
        this.tagName = tagName;
        this.tagDescription = tagDescription;
    }
}
