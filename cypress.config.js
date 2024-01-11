const { defineConfig } = require('cypress');
const cleanDB = require('./cypress/e2e/db-reset');

const myTasks = {
  log(message) {
    console.log(message);
    return null;
  },
  db_reset: async () => {
    console.log('db_reset');
    await cleanDB()
      .then(() => console.log('db reset done'))
      .catch((e) => console.error('db reset error: ', e));
    console.log('db_reset done!');
    return null;
  },
};

module.exports = defineConfig({
  e2e: {
    setupNodeEvents(on, config) {
      on('task', myTasks);
    },
  },

  component: {
    devServer: {
      framework: 'create-react-app',
      bundler: 'webpack',
    },
  },
});
