import { pgTable, serial, varchar, text, integer, timestamp, date, unique, primaryKey } from 'drizzle-orm/pg-core';
import { relations } from 'drizzle-orm';

export const users = pgTable('users', {
  id: serial('id').primaryKey(),
  username: varchar('username', { length: 100 }).notNull().unique(),
  passwordHash: varchar('password_hash', { length: 255 }).notNull(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
});

export const courses = pgTable('courses', {
  id: serial('id').primaryKey(),
  title: varchar('title', { length: 255 }).notNull(),
  description: text('description'),
  author: varchar('author', { length: 100 }),
  price: varchar('price', { length: 50 }).default('Безкоштовно').notNull(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
});

export const reviews = pgTable('reviews', {
  id: serial('id').primaryKey(),
  courseId: integer('course_id').references(() => courses.id, { onDelete: 'cascade' }).notNull(),
  userId: integer('user_id').references(() => users.id, { onDelete: 'cascade' }).notNull(),
  rating: integer('rating').notNull(), // Валідація 1-5 буде на рівні коду
  text: text('text'),
  createdAt: timestamp('created_at').defaultNow().notNull(),
});

export const enrollments = pgTable('enrollments', {
  id: serial('id').primaryKey(),
  userId: integer('user_id').references(() => users.id, { onDelete: 'cascade' }).notNull(),
  courseId: integer('course_id').references(() => courses.id, { onDelete: 'cascade' }).notNull(),
  progress: integer('progress').default(0).notNull(),
  enrolledAt: timestamp('enrolled_at').defaultNow().notNull(),
}, (t) => ({
  unq: unique('user_course_unique').on(t.userId, t.courseId)
}));

export const programs = pgTable('programs', {
  id: serial('id').primaryKey(),
  title: varchar('title', { length: 255 }).notNull(),
  description: text('description'),
});

export const programCourses = pgTable('program_courses', {
  programId: integer('program_id').references(() => programs.id, { onDelete: 'cascade' }).notNull(),
  courseId: integer('course_id').references(() => courses.id, { onDelete: 'cascade' }).notNull(),
  stepOrder: integer('step_order').notNull(),
}, (t) => ({
  pk: primaryKey({ columns: [t.programId, t.courseId] })
}));

export const news = pgTable('news', {
  id: serial('id').primaryKey(),
  title: varchar('title', { length: 255 }).notNull(),
  content: text('content').notNull(),
  publishedAt: date('published_at').defaultNow().notNull(),
});


export const usersRelations = relations(users, ({ many }) => ({
  reviews: many(reviews),
  enrollments: many(enrollments),
}));

export const coursesRelations = relations(courses, ({ many }) => ({
  reviews: many(reviews),
  enrollments: many(enrollments),
  programCourses: many(programCourses),
}));

export const reviewsRelations = relations(reviews, ({ one }) => ({
  course: one(courses, { fields: [reviews.courseId], references: [courses.id] }),
  user: one(users, { fields: [reviews.userId], references: [users.id] }),
}));

export const enrollmentsRelations = relations(enrollments, ({ one }) => ({
  user: one(users, { fields: [enrollments.userId], references: [users.id] }),
  course: one(courses, { fields: [enrollments.courseId], references: [courses.id] }),
}));

export const programsRelations = relations(programs, ({ many }) => ({
  programCourses: many(programCourses),
}));

export const programCoursesRelations = relations(programCourses, ({ one }) => ({
  program: one(programs, { fields: [programCourses.programId], references: [programs.id] }),
  course: one(courses, { fields: [programCourses.courseId], references: [courses.id] }),
}));