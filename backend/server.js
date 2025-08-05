const express = require('express');
const mysql = require('mysql2');
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

db.connect(err => {
    if (err) {
        console.error('Database connection failed:', err);
        return;
    }
    console.log('Connected to MySQL');
});

app.get('/countries', (req, res) => {
    db.query('SELECT * FROM countries', (err, results) => {
        if (err) return res.status(500).json({ error: err });
        res.json(results);
    });
});

const PORT = 3001;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
