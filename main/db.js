const { Pool } = require("pg")
require('dotenv').config()
const isProduction = process.env.NODE_ENV === 'production'

const connectionString = `postgresql://${process.env.DB_USER}:${process.env.DB_PASSWORD}@${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DB_DATABASE}`

const pool = new Pool({
    connectionString: process.env.DATABASE_URL
})
// const pool = new Pool({
//     connectionString: isProduction ? process.env.DATABASE_URL : connectionString
// })

// local db info
// const pool = new Pool({
//     connectionString : `postgresql://postgres:darklord@localhost:5432/mydb`
// })
// const pool = new Pool({
//     user: "postgres",
//     host: "localhost",
//     database: "mydb",
//     password: "darklord",
//     port: 5432
// })

module.exports = pool


// you should modify th packge.json file in the proxy section to the right url (in local case http://localhost:5000)

// access database from server
// heroku pg:psql postgresql-regular-57507 --app my-social-blog-api-server
// heroku pg:psql postgresql-convex-01369 --app dry-dawn-36976