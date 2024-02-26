// Initialize dotenv file
require("dotenv").config()

// Set up express server
const express = require("express")
const mariadb = require("mariadb")

const app = express()
const port = process.env.PORT || 5000

// Parse middleware
app.use(express.urlencoded({ extended: true }))
app.use(express.json())

// Initialize the SSH client
const { Client } = require("ssh2")
const sshClient = new Client()

// Connect to the SSH network & give feedback based on the connection status
sshClient
  .connect({
    host: process.env.SSH_HOST,
    port: process.env.SSH_PORT,
    username: process.env.SSH_USERNAME,
    password: process.env.SSH_PASSWORD,
  })
  .addListener("ready", () => {
    console.log("Connected to SSH server!")
    createDatabaseConnection()
  })
  .addListener("error", (err) => {
    console.log("Error connecting to SSH server: " + err)
  })
  .addListener("end", () => {
    console.log("Disconnected from SSH server!")
  })
  .addListener("close", () => {
    console.log("Connection to SSH server closed!")
  })

// Connect & query the database
const createDatabaseConnection = async () => {
  const db = mariadb
    .createPool({
      connectionLimit: 10,
      host: process.env.DB_HOST,
      port: process.env.DB_PORT,
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      allowPublicKeyRetrieval: true,
    })
    .addListener("error", (err) => {
      // console.log("Error connecting to database: " + err)
    })
    .addListener("enqueue", () => {
      console.log("Waiting for available connection slot")
    })
    .addListener("release", (connection) => {
      console.log("Connection released!")
    })
    .addListener("close", () => {
      console.log("Connection to database closed!")
    })
    .addListener("end", () => {
      console.log("Disconnected from database!")
    })

  db.getConnection()
    .then((conn) => {
      conn.query("SELECT 1 as val").then((rows) => {
        console.log("Connected to database!")
        conn.end()
        createAPIEndpoints(db)
      })
    })
    .catch((err) => {
      console.log("Error connecting to database: " + err)
    })

  // Get all users
  app.get("/users", (req, res) => {
    const sql = "SELECT * FROM users"
    db.query(sql, (err, result) => {
      if (err) {
        res.status(500).send("Error retrieving users from database")
        console.log(err)
      } else {
        res.status(200).send(result)
      }
    })
  })

  // Listen on environment port or 5000
  app.listen(port, () => {
    console.log(`API server is running on port: ${port}`)
  })
}
