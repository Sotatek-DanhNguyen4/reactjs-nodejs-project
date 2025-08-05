const express = require('express');
const { Pool } = require('pg');
const cors = require('cors');

const app = express();
app.use(cors());

const db = mysql.createConnection({
    host: process.env.mysql-host || 'lab2-mysql-eastus–001',
    user: process.env.mysql-user|| 'azureuser',
    password: process.env.mysql-pass || 'Azureuser123@',
    database: process.env.mysql-db || 'NodeTest',
    port: process.env.mysql-port || 3306

});

pool.connect((err, client, release) => {
    if (err) {
        console.error('Database connection failed:', err.message);
        console.error('Error code:', err.code);
        console.error('Error detail:', err.detail);
        return;
    }
    console.log('Connected to PostgreSQL RDS');
    release();
});

app.get('/countries', (req, res) => {
    pool.query('SELECT * FROM countries', (err, results) => {
        if (err) return res.status(500).json({ error: err });
        res.json(results.rows);
    });
});

const PORT = 3001;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
