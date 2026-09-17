const app = require('./app');
const config = require('./config/config');
const initDatabase = require('./database/initDatabase');
const initAdmin = require('./database/initAdmin');

initDatabase();
initAdmin();

app.listen(config.port, () => {
  console.log(`MotoExpress API ejecutándose en http://localhost:${config.port}`);
});

