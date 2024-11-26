import pool from '../dbPool'
import { Employee } from '../types/employee'

// Fetch all employees
const fetchAllEmployees = async () => {
  try {
    const result = await pool.query(`SELECT * FROM employees`)
    return result.rows
  } catch (err) {
    console.error(err)
    throw err
  }
}

// Fetch employee by id
const fetchEmployeeById = async (id: number) => {
  try {
    const result = await pool.query(`SELECT * FROM employees WHERE id = $1`, [id])
    return result.rows[0]
  } catch (err) {
    console.error(err)
    throw err
  }
}

// Add employee
const createEmployee = async (employeeData: Employee) => {
  const { firstname, lastname, age, bdate } = employeeData
  try {
    const result = await pool.query(`INSERT INTO employees (firstname, lastname, age, bdate) VALUES ($1, $2, $3, $4) RETURNING *`, [firstname, lastname, age, bdate])
    return result.rows[0]
  } catch (err) {
    console.error(err)
    throw err
  }
}

// Update employee by id
const editEmployeeById = async (id: number, employeeData: Partial<Employee>) => {
  const found = await fetchEmployeeById(id)
  if (!found) {
    return undefined
  }
  try {
    const update = {
      firstname: employeeData.firstname ?? found.firstname,
      lastname: employeeData.lastname ?? found.lastname,
      age: employeeData.age ?? found.age,
      bdate: employeeData.bdate ?? found.bdate
    }
    const result = await pool.query(`UPDATE employees SET firstname = $1, lastname = $2, age = $3, bdate = $4 WHERE id = $5 RETURNING *`, [update.firstname, update.lastname, update.age, update.bdate, id])
    return result.rows[0]
  } catch (err) {
    console.error(err)
    throw err
  }
}

// Delete employee by id
const removeEmployeeById = async (id: number) => {
  try {
    const result = await pool.query(`DELETE FROM employees WHERE id = $1 RETURNING *`, [id])
    return result.rows[0]
  } catch (err) {
    console.error(err)
    throw err
  }
}

export default {
  fetchAllEmployees,
  fetchEmployeeById,
  createEmployee,
  editEmployeeById,
  removeEmployeeById
}