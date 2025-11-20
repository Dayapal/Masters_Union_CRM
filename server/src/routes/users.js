// routes/users.js
import express from 'express';
import * as userService from '../services/users.js';
import logger from '../lib/logger.js';

const router = express.Router();

// create user
router.post('/', async (req, res) => {
  try {
    const user = await userService.createUser(req.body);
    res.status(201).json(user);
  } catch (err) {
    logger.error({ err }, 'POST /users error');
    res.status(400).json({ error: err.message });
  }
});

// login (authenticate)
router.post('/login', async (req, res) => {
  try {
    const { login, password } = req.body;
    const user = await userService.authenticate({ userLoginOrEmail: login, password });
    if (!user) return res.status(401).json({ error: 'invalid credentials' });

    // create refresh token entry (cookie or return in body as you choose)
    const token = await userService.createRefreshToken(user.id);
    // for example set httpOnly cookie
    res.cookie('refresh_token', token.token, { httpOnly: true, secure: process.env.NODE_ENV === 'production', sameSite: 'Lax' });
    res.json({ user });
  } catch (err) {
    logger.error({ err }, 'POST /users/login error');
    res.status(400).json({ error: err.message });
  }
});

// get user
router.get('/:id', async (req, res) => {
  try {
    const id = Number(req.params.id);
    const user = await userService.getUserById(id, { withMeta: true });
    if (!user) return res.status(404).json({ error: 'not found' });
    res.json(user);
  } catch (err) {
    logger.error({ err }, 'GET /users/:id error');
    res.status(400).json({ error: err.message });
  }
});

// list users
router.get('/', async (req, res) => {
  try {
    const { page = 1, perPage = 20, q } = req.query;
    const data = await userService.listUsers({ page: Number(page), perPage: Number(perPage), q });
    res.json(data);
  } catch (err) {
    logger.error({ err }, 'GET /users error');
    res.status(400).json({ error: err.message });
  }
});

export default router;
