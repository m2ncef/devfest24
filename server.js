require('module-alias/register');
const mongoose = require('mongoose');
const glob = require('glob');
const path = require('path');

// Make sure we are running Node 14 or greater
const [major, minor] = process.versions.node.split('.').map(parseFloat);
if (major < 14 || (major === 14 && minor <= 0)) {
  console.log('Please go to nodejs.org and download version 14 or greater. 👌\n');
  process.exit();
}

// Import environmental variables from our .env file
require('dotenv').config({ path: '.variables.env' });

// Set Mongoose to use ES6 promises
mongoose.Promise = global.Promise;

// Connect to MongoDB
mongoose
  .connect(process.env.DATABASE, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    // You can add more options as needed, like `retryWrites: true` for better resilience.
  })
  .then(() => {
    console.log('Connected to the database successfully');
  })
  .catch((err) => {
    console.error(`🚫 Error → : ${err.message}`);
    process.exit(1); // Exit if database connection fails
  });

// Load all models dynamically
glob.sync('./models/**/*.js').forEach(function (file) {
  require(path.resolve(file));
});

// Start the app
const app = require('./app');
app.set('port', process.env.PORT || 8888);
const server = app.listen(app.get('port'), () => {
  console.log(`Express running → On PORT : ${server.address().port}`);
});
