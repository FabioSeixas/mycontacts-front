const { Client } = require('pg');

async function cleanDB() {
  const client = new Client({
    host: 'localhost',
    port: 5432,
    user: 'root',
    password: 'root',
    database: 'mycontacts',
  });
  await client.connect().catch((error) => {
    console.warn('conected error ', error);
    process.exit(1);
  });

  console.log('will clean contacts');
  await client.query(`
    TRUNCATE TABLE contacts
  `);

  console.log('will clean categories');
  await client.query(`
      TRUNCATE TABLE categories
  `);

  console.log(' clean done');

  return client.end();
  // return;
}

module.exports = cleanDB;
