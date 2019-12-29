import express from 'express';
import model from '../model/users/users.js';
const router = new express.Router();

router.get('/', async (req, res) => {
  const response = await model.get();
  res.send(response);
});
router.get('/:id', async (req, res) => {
  const response = await model.get(req.params.id);
  res.send(response);
});
router.post('/', async (req, res) => {
  const response = await model.create(req.body);
  res.send(response);
});
router.put('/:id', (req, res) => res.send(`update user ${req.params.id}`));
router.delete('/:id', (req, res) => res.send(`delete user ${req.params.id}`));

export default router;
