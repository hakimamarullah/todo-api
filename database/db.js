const { Pool } = require("pg")
// const db = new Pool({
// 	host: 'ec2-184-73-243-101.compute-1.amazonaws.com',
// 	user: 'rcjuistugeuwax',
// 	password: 'c2c16ca09d95f5c8d88533aa72e4667bbee02cb694bf96195eb9fdcfa3fb5ce3',
// 	port: 5432,
// 	URI: 'postgres://rcjuistugeuwax:c2c16ca09d95f5c8d88533aa72e4667bbee02cb694bf96195eb9fdcfa3fb5ce3@ec2-184-73-243-101.compute-1.amazonaws.com:5432/d6bn5q5pkoqprg'
// });

const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
    ssl: {
        rejectUnauthorized: true
    }
});

const db = async (query, ...params)=>{
	const client = await pool.connect();
	const data = await client.query(query,params);
	client.release();
	return data;
}
module.exports = db;