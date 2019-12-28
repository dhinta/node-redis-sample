import express from 'express';
import './lib/db.js';

const app = express();
const router = new express.Router();

router.use((req, res, next) => {
  // Do Things Applicable for all routes
  next();
});

router.get('/', (req, res) => res.status(403).send());

app.use(router);
app.listen(
    process.env.port || 3000,
    () => console.log('Server is up & running')
);
