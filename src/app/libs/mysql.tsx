import mysql from 'mysql2/promise';

const pool= mysql.createPool({
    host: 'sql.cianci.io',       // Your MySQL host
    user: 'acheng2',  // Your MySQL username
    password: 'cl6g*t5URndDuZxe', // Your MySQL password
    database: '2024fall_comp367_geffen',  // Your MySQL database name
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
})

export default pool