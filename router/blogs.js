import express from 'express';
import model from '../model/blogs/blogs.js';
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
  const data = await model.create(req.body, req.query.id);
  res.status(data.statusCode).send(data.response);
});
router.patch('/:id', async (req, res) => {
  const response = await model.update(req.params.id, req.body);
  res.send(response);
});
router.delete('/:id', (req, res) => res.send(`delete blog ${req.params.id}`));

export default router;
