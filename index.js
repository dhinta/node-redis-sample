import express from 'express';
import bodyParser from 'body-parser';
// Import Library files
import './lib/db.js';
import './lib/shutdown.js';
// Import & Set Schemas
import './model/users/user.schema.js';
import './model/blogs/blog.schema.js';
// Import Routers
import userRouter from './router/users.js';
import blogRouter from './router/blogs.js';

const app = express();
const router = new express.Router();

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

router.use((req, res, next) => {
  // Do Things Applicable for all routes
  next();
});

// Setup Routes for app
router.get('/', (req, res) => res.status(403).send());
app.use(router);
app.use('/users', userRouter);
app.use('/blogs', blogRouter);

app.listen(
    process.env.port || 3000,
    () => console.log('Server is up & running')
);
