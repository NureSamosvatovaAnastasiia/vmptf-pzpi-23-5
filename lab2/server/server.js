import express from 'express';
import cors from 'cors';
import 'dotenv/config';

import authRouter from './routes/auth.js';
import coursesRouter from './routes/courses.js';
import enrollmentsRouter from './routes/enrollments.js';
import programsRouter from './routes/programs.js';
import newsRouter from './routes/news.js';

const app = express();

app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 5000;

app.use('/api/auth', authRouter);
app.use('/api/courses', coursesRouter);
app.use('/api', enrollmentsRouter); 
app.use('/api/programs', programsRouter);
app.use('/api/news', newsRouter);

app.use('/api/reviews', (req, res, next) => {
  req.url = '/reviews'; 
  coursesRouter(req, res, next);
});

app.listen(PORT, () => {
  console.log(`Працює на порту ${PORT}`);
});