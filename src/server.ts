import express, { Request, Response } from 'express'
import dotenv from 'dotenv'
dotenv.config()
import { connectDb } from './db'
// import employeeRouter from './routes/employee.routes' // Client
import employeeRouter from './routes/employeePool.routes' // Pool

// Create server
const app = express()

// Middleware
app.use(express.json())

// Routes
app.use('/api', employeeRouter)

// Start server
const PORT: number = Number(process.env.PORT || 3000)
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}...`)
})

// Client
// connectDb().then(() => {
//   app.listen(PORT, () => {
//     console.log(`Server is running on port ${PORT}...`)
//   })
// }).catch(err => {
//   console.error(err)
// })