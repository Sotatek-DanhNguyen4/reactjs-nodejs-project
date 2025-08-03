const express = require('express');
const { Pool } = require('pg');
const cors = require('cors');

const app = express();
app.use(cors());

const pool = new Pool({
    host: process.env.POSTGRES_HOST || 'uat-nexus-nexus.chrimikajkhn.us-east-1.rds.amazonaws.com',
    user: process.env.POSTGRES_USER || 'postgresadmin',
    password: process.env.POSTGRES_PASSWORD || 'MySecurePassword123!',
    database: process.env.POSTGRES_DB || 'nexus',
    port: process.env.POSTGRES_PORT || 5432,
    ssl: {
        rejectUnauthorized: false
    },
    connectionTimeoutMillis: 10000,
    idleTimeoutMillis: 30000
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
