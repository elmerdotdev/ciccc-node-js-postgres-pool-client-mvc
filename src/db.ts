import { Client } from "pg";

const config = {
  user: process.env.DBUSER,
  host: process.env.DBHOST,
  database: process.env.DBNAME,
  password: process.env.DBPASS,
  port: Number(process.env.DBPORT)
}

// Create new client
const createClient = () => {
  return new Client(config)
}

// Check if we can connect to database using client connection
const connectDb = async () => {
  const client = createClient()
  try {
    await client.connect()
    console.log('Connected to PostgreSQL database')
    return client
  } catch (err) {
    console.error('Error connecting to database :(')
    throw err
  }
}

// Export functions
export {
  createClient,
  connectDb
}