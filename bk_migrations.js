const { Client } = require('pg');

const client = new Client({
  host: 'localhost',
  port: 5432,
  user: 'root',
  password: 'root',
  database: 'mycontacts',
});

client
  .connect()
  .then(async () => {
    try {
      await client.query(`
      CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
    `);
      await client.query(`
      CREATE TABLE IF NOT EXISTS categories (
        id UUID NOT NULL UNIQUE DEFAULT uuid_generate_v4(),
        name VARCHAR NOT NULL
      );
    `);
      await client.query(`
      CREATE TABLE IF NOT EXISTS contacts (
        id UUID NOT NULL UNIQUE DEFAULT uuid_generate_v4(),
        name VARCHAR NOT NULL,
        email VARCHAR UNIQUE,
        phone VARCHAR,
        category_id UUID,
        FOREIGN KEY(category_id) REFERENCES categories(id)
      );
    `);
    } catch (err) {
      console.warn('conected error ', err);
      process.exit(1);
    }
    console.log('DB setup ready!');
    client.end();
  })
  .catch((error) => {
    console.warn('conected error ', error);
    process.exit(1);
  });
