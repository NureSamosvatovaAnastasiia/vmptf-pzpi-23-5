import { db, pool } from './db/index.js';
import * as schema from './db/schema.js';
import bcrypt from 'bcryptjs';

async function seed() {
  try {
    await pool.query('TRUNCATE TABLE reviews, enrollments, program_courses, programs, courses, users, news RESTART IDENTITY CASCADE;');
    console.log('Базу даних успішно очищено.');

    console.log('Yаповнення бази даних тестовими даними');

    const insertedCourses = await db.insert(schema.courses).values([
      {
        title: "Основи Node.js та Express",
        description: "Вивчіть створення серверних додатків з нуля. Робота з Drizzle ORM.",
        author: "Олександр Петренко",
        price: "Безкоштовно",
      },
      {
        title: "React для початківців",
        description: "Сучасний фронтенд з використанням хуків та стейт-менеджменту.",
        author: "Анна Коваль",
        price: "Безкоштовно",
      },
      {
        title: "Просунутий JavaScript",
        description: "Замикання, прототипи, асинхронність та Event Loop.",
        author: "Дмитро Сидор",
        price: "Безкоштовно",
      }
    ]).returning();

    console.log(`Додано ${insertedCourses.length} курсів.`);

    const insertedPrograms = await db.insert(schema.programs).values([
      {
        title: "Full-Stack Розробник",
        description: "Комплексна програма: від фронтенду до серверної логіки та роботи з Drizzle ORM.",
      },
      {
        title: "Frontend Майстер",
        description: "Поглиблене вивчення клієнтської частини JavaScript та бібліотеки React.",
      }
    ]).returning();

    console.log(`Додано ${insertedPrograms.length} навчальних програм.`);

    await db.insert(schema.programCourses).values([
      { programId: insertedPrograms[0].id, courseId: insertedCourses[1].id, stepOrder: 1 },
      { programId: insertedPrograms[0].id, courseId: insertedCourses[0].id, stepOrder: 2 },

      { programId: insertedPrograms[1].id, courseId: insertedCourses[2].id, stepOrder: 1 },
      { programId: insertedPrograms[1].id, courseId: insertedCourses[1].id, stepOrder: 2 },
    ]);
    console.log('Навчальні програми пов\'язані з курсами.');

    await db.insert(schema.news).values([
      {
        title: "Запуск нової платформи на Drizzle ORM!",
        content: "Вітаємо всіх студентів! Наша платформа повністю перейшла на Drizzle ORM для швидшої роботи бази даних.",
      },
      {
        title: "Оновлення курсу по React",
        content: "Додано нові лекції про взаємодію з нашим новим Express API.",
      }
    ]);
    console.log('Створено початкові новини.');

    const salt = await bcrypt.genSalt(10);
    const passwordHash = await bcrypt.hash('password123', salt);
    
    const [testUser] = await db.insert(schema.users).values({
      username: 'testuser',
      passwordHash: passwordHash,
    }).returning();
    console.log(`Створено тестового користувача: ${testUser.username}`);

    await db.insert(schema.reviews).values([
      {
        courseId: insertedCourses[0].id,
        userId: testUser.id,
        rating: 5,
        text: "Неймовірний курс по Node.js! Використання Drizzle ORM розписано дуже детально.",
      },
      {
        courseId: insertedCourses[1].id,
        userId: testUser.id,
        rating: 4,
        text: "Гарний курс по React. Дуже чекаю на нові модулі.",
      }
    ]);
    console.log('Додано перші відгуки.');

    console.log('Наповнення бази даних успішно завершено');
    process.exit(0);
  } catch (err) {
    console.error('Помилка під час ініціалізації та сідінгу БД:', err);
    process.exit(1);
  }
}

seed();