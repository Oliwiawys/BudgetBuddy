package com.example.expenses.services;

import com.example.expenses.models.Expenses;
import com.example.expenses.models.ExpensesTags;
import com.example.expenses.models.Tags;
import com.example.expenses.models.Users;
import com.example.expenses.repositories.ExpensesRepository;
import com.example.expenses.repositories.ExpensesTagsRepository;
import com.example.expenses.repositories.TagsRepository;
import com.example.expenses.repositories.UsersRepository;
import jakarta.annotation.PostConstruct;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Date;

@Service
public class DataInitService {

    private final UsersRepository usersRepository;
    private final TagsRepository tagsRepository;
    private final ExpensesRepository expensesRepository;
    private final ExpensesTagsRepository expensesTagsRepository;


    @Autowired
    public DataInitService(UsersRepository usersRepository, TagsRepository tagsRepository, ExpensesRepository expensesRepository, ExpensesTagsRepository expensesTagsRepository) {
        this.usersRepository = usersRepository;
        this.tagsRepository = tagsRepository;
        this.expensesRepository = expensesRepository;
        this.expensesTagsRepository = expensesTagsRepository;
    }

    @PostConstruct
    public void init() {
        if (usersRepository.count() == 0 && tagsRepository.count() == 0 && expensesRepository.count() == 0 && expensesTagsRepository.count() == 0) {
            Users user1 = new Users("guest", "guest@email.com", "guest", "guest", new Date());
            usersRepository.save(user1);
            Users user2 = new Users("admin", "admin@email.com", "admin", "admin", new Date());
            usersRepository.save(user2);
            Users user3 = new Users("user", "user@email.com", "user", "user", new Date());
            usersRepository.save(user3);
            Users user4 = new Users("admin1", "admin1@email.com", "admin", "admin", new Date());
            usersRepository.save(user4);
            Users user5 = new Users("user1", "user1@email.com", "user", "user", new Date());
            usersRepository.save(user5);
            Users user6 = new Users("oliwiawys", "oliwiawys@email.com", "password", "admin", new Date());
            usersRepository.save(user6);


            Tags tag1 = new Tags("Jedzenie", "Wydatki związane z jedzeniem");
            tagsRepository.save(tag1);
            Tags tag2 = new Tags("Transport", "Koszty związane z transportem");
            tagsRepository.save(tag2);
            Tags tag3 = new Tags("Rozrywka", "Wydatki na rozrywkę");
            tagsRepository.save(tag3);
            Tags tag4 = new Tags("Zakupy", "Wydatki na zakupy");
            tagsRepository.save(tag4);
            Tags tag5 = new Tags("Opłaty stałe", "Miesięczne opłaty stałe");
            tagsRepository.save(tag5);
            Tags tag6 = new Tags("Zdrowie", "Wydatki na opiekę zdrowotną");
            tagsRepository.save(tag6);
            Tags tag7 = new Tags("Edukacja", "Koszty związane z edukacją");
            tagsRepository.save(tag7);
            Tags tag8 = new Tags("Inne", "Inne wydatki");
            tagsRepository.save(tag8);
            Tags tag9 = new Tags("Sport i rekreacja", "Wydatki związane ze sportem i rekreacją");
            tagsRepository.save(tag9);
            Tags tag10 = new Tags("Dom i ogród", "Wydatki związane z utrzymaniem domu i ogrodu");
            tagsRepository.save(tag10);
            Tags tag11 = new Tags("Technologia", "Wydatki na technologiczne gadżety");
            tagsRepository.save(tag11);
            Tags tag12 = new Tags("Podróże", "Wydatki związane z podróżami");
            tagsRepository.save(tag12);
            Tags tag13 = new Tags("Ubrania", "Wydatki na ubrania");
            tagsRepository.save(tag13);
            Tags tag14 = new Tags("Prezenty", "Wydatki na prezenty");
            tagsRepository.save(tag14);
            Tags tag15 = new Tags("Szkolenia", "Koszty szkoleń i kursów");
            tagsRepository.save(tag15);
            Tags tag16 = new Tags("Zwierzęta", "Wydatki związane z opieką nad zwierzętami");
            tagsRepository.save(tag16);
            Tags tag17 = new Tags("Hobby", "Wydatki na hobby i zainteresowania");
            tagsRepository.save(tag17);

            //user2 expenses
            Expenses expense3 = new Expenses(20.0, parseDate("2023-01-03"), "Bilet autobusowy", user2);
            expensesRepository.save(expense3);
            ExpensesTags expenseTags1 = new ExpensesTags("Średnio ważne", tag2, expense3);
            expensesTagsRepository.save(expenseTags1);
            ExpensesTags expenseTags2 = new ExpensesTags("Średnio ważne", tag12, expense3);
            expensesTagsRepository.save(expenseTags2);

            Expenses expense4 = new Expenses(100.0, parseDate("2023-01-04"), "Bilety do kina", user2);
            expensesRepository.save(expense4);
            ExpensesTags expenseTags3 = new ExpensesTags("Nieważne", tag3, expense4);
            expensesTagsRepository.save(expenseTags3);
            ExpensesTags expenseTags4 = new ExpensesTags("Nieważne", tag17, expense4);
            expensesTagsRepository.save(expenseTags4);

            //user3 expenses
            Expenses expense5 = new Expenses(70.0, parseDate("2023-01-05"), "Zakupy spożywcze", user3);
            expensesRepository.save(expense5);
            ExpensesTags expenseTags5_1 = new ExpensesTags("Ważne", tag4, expense5);
            expensesTagsRepository.save(expenseTags5_1);
            ExpensesTags expenseTags5_2 = new ExpensesTags("Ważne", tag8, expense5);
            expensesTagsRepository.save(expenseTags5_2);

            Expenses expense6 = new Expenses(25.0, parseDate("2023-01-06"), "Opłata za internet", user3);
            expensesRepository.save(expense6);
            ExpensesTags expenseTags6_1 = new ExpensesTags("Mniej ważne", tag5, expense6);
            expensesTagsRepository.save(expenseTags6_1);

            Expenses expense11 = new Expenses(15.0, parseDate("2023-01-11"), "Nowy kubek", user3);
            expensesRepository.save(expense11);
            ExpensesTags expenseTags11_1 = new ExpensesTags("Mniej ważne", tag14, expense11);
            expensesTagsRepository.save(expenseTags11_1);
            ExpensesTags expenseTags11_2 = new ExpensesTags("Mniej ważne", tag4, expense11);
            expensesTagsRepository.save(expenseTags11_2);
            ExpensesTags expenseTags11_3 = new ExpensesTags("Mniej ważne", tag1, expense11);
            expensesTagsRepository.save(expenseTags11_3);

            Expenses expense12 = new Expenses(35.0, parseDate("2023-01-12"), "Bilet na basen", user3);
            expensesRepository.save(expense12);
            ExpensesTags expenseTags12_1 = new ExpensesTags("Średnio ważne", tag9, expense12);
            expensesTagsRepository.save(expenseTags12_1);

            Expenses expense13 = new Expenses(55.0, parseDate("2023-01-13"), "Nowy odkurzacz", user3);
            expensesRepository.save(expense13);
            ExpensesTags expenseTags13_1 = new ExpensesTags("Ważne", tag10, expense13);
            expensesTagsRepository.save(expenseTags13_1);

            Expenses expense14 = new Expenses(20.0, parseDate("2023-01-14"), "Bilet na kolejny koncert", user3);
            expensesRepository.save(expense14);
            ExpensesTags expenseTags14_1 = new ExpensesTags("Nieważne", tag17, expense14);
            expensesTagsRepository.save(expenseTags14_1);

            //user4 expenses
            Expenses expense1 = new Expenses(50.0, parseDate("2023-01-01"), "Lunch", user4);
            expensesRepository.save(expense1);
            ExpensesTags expenseTags1_1 = new ExpensesTags("Ważne", tag1, expense1);
            expensesTagsRepository.save(expenseTags1_1);

            Expenses expense2 = new Expenses(30.0, parseDate("2023-01-02"), "Książka", user4);
            expensesRepository.save(expense2);
            ExpensesTags expenseTags2_1 = new ExpensesTags("Średnio ważne", tag7, expense2);
            expensesTagsRepository.save(expenseTags2_1);
            ExpensesTags expenseTags2_2 = new ExpensesTags("Średnio ważne", tag14, expense2);
            expensesTagsRepository.save(expenseTags2_2);
            ExpensesTags expenseTags2_3 = new ExpensesTags("Średnio ważne", tag17, expense2);
            expensesTagsRepository.save(expenseTags2_3);

            //user5 expenses
            Expenses expense7 = new Expenses(25.0, parseDate("2023-01-07"), "Kosmetyki", user5);
            expensesRepository.save(expense7);
            ExpensesTags expenseTags7_1 = new ExpensesTags("Mniej ważne", tag8, expense7);
            expensesTagsRepository.save(expenseTags7_1);
            ExpensesTags expenseTags7_2 = new ExpensesTags("Mniej ważne", tag4, expense7);
            expensesTagsRepository.save(expenseTags7_2);

            Expenses expense8 = new Expenses(60.0, parseDate("2023-01-08"), "Bilet na koncert", user5);
            expensesRepository.save(expense8);
            ExpensesTags expenseTags8_1 = new ExpensesTags("Ważne", tag17, expense8);
            expensesTagsRepository.save(expenseTags8_1);

            //user6 expenses
            Expenses expense9 = new Expenses(45.0, parseDate("2023-01-09"), "Narzędzia ogrodowe", user6);
            expensesRepository.save(expense9);
            ExpensesTags expenseTags9_1 = new ExpensesTags("Ważne", tag10, expense9);
            expensesTagsRepository.save(expenseTags9_1);
            ExpensesTags expenseTags9_2 = new ExpensesTags("Ważne", tag5, expense9);
            expensesTagsRepository.save(expenseTags9_2);
            ExpensesTags expenseTags9_3 = new ExpensesTags("Ważne", tag8, expense9);
            expensesTagsRepository.save(expenseTags9_3);

            Expenses expense10 = new Expenses(80.0, parseDate("2023-01-10"), "Nowa bluza", user6);
            expensesRepository.save(expense10);
            ExpensesTags expenseTags10_1 = new ExpensesTags("Nieważne", tag13, expense10);
            expensesTagsRepository.save(expenseTags10_1);
        }
    }

    private Date parseDate(String dateString) {
        try {
            return new SimpleDateFormat("yyyy-MM-dd").parse(dateString);
        } catch (ParseException e) {
            throw new RuntimeException("Error parsing date", e);
        }
    }
}