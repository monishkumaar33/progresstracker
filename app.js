const express = require('express');
const app = express();
app.use(express.json());

const pool = require('./db');

pool.query('SELECT NOW()', (err, res) => {
    if (err) {
        console.error('Database connection failed:', err.message);
        console.error('Check your .env file and database connection settings.');
    } else {
        console.log('Database connected successfully');
    }
});


app.use('/auth', require('./authroutes'));
app.use('/signin', require('./routes'));

const server = app.listen(3000, () => {
    console.log(`Server is running on 3000`);
});

// Global error handlers
server.on('error', (err) => {
    console.error('Server error:', err);
    process.exit(1);
});

process.on('uncaughtException', (err) => {
    console.error('Uncaught Exception:', err);
    process.exit(1);
});

process.on('unhandledRejection', (reason, promise) => {
    console.error('Unhandled Rejection at:', promise, 'reason:', reason);
});