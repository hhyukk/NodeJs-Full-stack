import express from 'express';
import { home, search } from '../controllers/videoController';
import { getJoin, getLogin, postJoin, postLogin } from '../controllers/userController';
import { protectorMiddleware, publicOnlyMiddleware } from '../middlewares';

const rootRouter = express.Router();

rootRouter.get('/', home);
rootRouter.route('/join').get(getJoin).post(postJoin);
rootRouter.route('/login').all(publicOnlyMiddleware).get(getLogin).post(postLogin);
rootRouter.get('/search', search);

export default rootRouter;
