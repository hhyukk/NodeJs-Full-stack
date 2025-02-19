import express from 'express';
// import cors from 'cors';
import morgan from 'morgan';
import session from 'express-session';
import flash from 'connect-flash';
import MongoStore from 'connect-mongo';
import rootRouter from './routers/rootRouter';
import videoRouter from './routers/videoRouter';
import userRouter from './routers/userRouter';
import apiRouter from './routers/apiRouter';
import { localsMiddleware } from './middlewares';

const app = express();
const loger = morgan('dev');

app.set('view engine', 'pug');
app.set('views', process.cwd() + '/src/views');
// app.use(cors({ origin: 'http://localhost:3000' }));
app.use((req, res, next) => {
  res.header('Cross-Origin-Embedder-Policy', 'require-corp');
  res.header('Cross-Origin-Opener-Policy', 'same-origin');
  next();
});
app.use(loger);
app.use(express.urlencoded({ extended: true }));
app.use(express.json({ extended: true }));
app.use(
  session({
    secret: process.env.COOKIE_SECRET,
    resave: false,
    saveUninitialized: false,
    store: MongoStore.create({ mongoUrl: process.env.DB_URL }),
  })
);
app.use(flash());

app.use(localsMiddleware);
app.use('/uploads', express.static('uploads'));
app.use('/static', express.static('assets'));

app.use('/', rootRouter);
app.use('/videos', videoRouter);
app.use('/users', userRouter);
app.use('/api', apiRouter);

export default app;
