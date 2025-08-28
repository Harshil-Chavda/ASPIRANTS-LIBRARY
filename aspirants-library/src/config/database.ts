import { Sequelize } from 'sequelize';

const database = new Sequelize('database_name', 'username', 'password', {
    host: 'localhost',
    dialect: 'mysql', // or 'postgres', 'sqlite', 'mssql'
    logging: false, // Set to true to see SQL queries in the console
});

export default database;