// load the libs
const express = require('express')
const mysql = require('mysql2/promise')
const bodyParser = require('body-parser');
const secureEnv = require('secure-env')
global.env = secureEnv({secret:'mySecretPassword'})

// SQL
// const SQL_SELECT_ALL_FROM_ORDERS = 'select * from orders order by id desc;'
// const SQL_SELECT_ALL_FROM_ORDER_DETAILS = 'select * from order_details order by id desc;'

 const SQL_ADD_NEW_RSVP = 'insert into rsvps (name, email, phone, answer) values (?, ?, ?, ?);'
 const SQL_CREATE_NEW_DATABASE = 'create database if not exists birthday;'
 const SQL_USE_DATABASE = 'use birthday;'
 const SQL_CREATE_NEW_TABLE = 'CREATE TABLE IF NOT EXISTS rsvps (\
	id int not null auto_increment,\
	name varchar(30) not null,\
    email CHAR(255),\
    phone int,\
    answer varchar(20),\
    primary key (id)\
);'
 
// const SQL_ADD_NEW_ORDER_DETAILS='insert into order_details (order_id, product_ids, status_id, purchase_order_id, inventory_id) values (LAST_INSERT_ID(), ?,?,?,?);'

// const SQL_DELETE_ID_FROM_ORDERS = 'delete from orders where id = ?;'
// const SQL_DELETE_ID_FROM_ORDER_DETAILS = 'delete from order_details where order_id = ?;'

// const SQL_SELECT_ALL_EMPLOYEE_IDS = 'select id from employees;'
// const SQL_SELECT_ALL_CUSTOMER_IDS = 'select id from customers;'

const startApp = async (app, pool) => {
	const conn = await pool.getConnection()
	try {
		console.info('Pinging database...')
		await conn.ping()
		app.listen(PORT, () => {
			console.info(`Application started on port ${PORT} at ${new Date()}`)
		})

		// await conn.query(
		// 	SQL_CREATE_NEW_DATABASE
		// 	)
		await conn.query(
			SQL_USE_DATABASE
		)	
		await conn.query(
			SQL_CREATE_NEW_TABLE
		)

	} catch(e) {
		console.error('Cannot ping database', e)
	} finally {
		conn.release()
	}
}

// configure port
const PORT = parseInt(process.argv[2]) || parseInt(process.env.PORT) || 3000

// create connection pool
const pool = mysql.createPool({
	host: process.env.DB_HOST || 'localhost',
	port: parseInt(process.env.DB_PORT) || 3306,
	database: 'birthday',
	user: global.env.DB_USER || process.env.DB_USER,
	password: global.env.DB_PASSWORD || process.env.DB_PASSWORD,
	connectionLimit: 4
})

// create an instance of the application
const app = express()

app.use(bodyParser.json());
app.use(bodyParser.urlencoded());

app.post('/rsvp', async (req, resp) => {

    const name = req.body.name;
    const email = req.body.email;
    const phone = req.body.phone;
    const answer = req.body.answer;
	
	const conn = await pool.getConnection()
	try {

		await conn.beginTransaction() // to prevent only one DB from being updated

        const [ result, _ ] = await conn.query(
            SQL_ADD_NEW_RSVP, [name, email, phone, answer],
		)

		await conn.commit()

		resp.status(200)
		resp.format({
			html: () => { resp.send('Thank you'); },
			json: () => { resp.json({status: 'ok'});}

		})
			
	} catch(e) {
		conn.rollback()
		resp.status(500).send(e)
		resp.end()
	} finally {
		conn.release()
	}
});



app.use(express.static ( __dirname + '/public'))

// start the app
startApp(app, pool)