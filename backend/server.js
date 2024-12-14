require('module-alias/register');
const mongoose = require('mongoose');
const glob = require('glob');
const path = require('path');

const nodeVersion = process.versions.node.split('.').map(parseFloat);
if (nodeVersion[0] < 14) {
  console.log('Please use Node.js version 14 or greater');
  process.exit(1);
}

require('dotenv').config({ path: '.variables.env' });

mongoose.Promise = global.Promise;

mongoose
  .connect(process.env.DATABASE, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log('Connected to database'))
  .catch((err) => {
    console.error(`Database connection error: ${err.message}`);
    process.exit(1);
  });

glob.sync('./models/**/*.js').forEach((file) => require(path.resolve(file)));

const app = require('./app');
const PORT = process.env.PORT || 8888;

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
