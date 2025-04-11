const dotenv = require('dotenv');
const prisma = require('../backend/src/config/db');

dotenv.config({ path: './.env' });
const app = require('./src/app');

const port = process.env.port || 3000;

const server = app.listen(port, () => {
  console.log(`Listening on ${port}`);
});
