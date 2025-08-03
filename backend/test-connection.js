const { Pool } = require('pg');

const pool = new Pool({
    host: 'uat-nexus-nexus.chrimikajkhn.us-east-1.rds.amazonaws.com',
    user: 'postgresadmin',
    password: 'MySecurePassword123!',
    database: 'nexus',
    port: 5432,
    ssl: {
        rejectUnauthorized: false
    },
    connectionTimeoutMillis: 10000,
    idleTimeoutMillis: 30000
});

console.log('Attempting to connect to RDS PostgreSQL...');

pool.connect((err, client, release) => {
    if (err) {
        console.error('❌ Connection failed:');
        console.error('Error message:', err.message);
        console.error('Error code:', err.code);
        console.error('Error detail:', err.detail);
        process.exit(1);
    }
    
    console.log('✅ Successfully connected to PostgreSQL RDS');
    
    // Test a simple query
    client.query('SELECT version()', (err, result) => {
        if (err) {
            console.error('❌ Query failed:', err.message);
        } else {
            console.log('✅ Database version:', result.rows[0].version);
        }
        release();
        pool.end();
    });
}); 