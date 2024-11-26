import { createClient } from "../db";
import { Employee } from "../types/employee";

// Fetch all employees
const fetchAllEmployees = async () => {
  const client = createClient() // create a new client connection
  try {
    await client.connect() // connect to database
    const result = await client.query(`SELECT * FROM employees`);
    return result.rows
  } catch (err) {
    console.error(err)
    throw err
  } finally {
    await client.end() // close the connection
  }
}

// Fetch employee by id
const fetchEmployeeById = async(id: number) => {
  const client = createClient()
  try {
    await client.connect()
    const result = await client.query(`SELECT * FROM employees WHERE id = $1`, [id])
    return result.rows[0] // returns the first element
  } catch (err) {
    console.error(err)
    throw err
  } finally {
    await client.end()
  }
}

// Add employee
const createEmployee = async (employeeData: Employee) => {
  const { firstname, lastname, age, bdate } = employeeData
  const client = createClient()
  try {
    await client.connect()
    const result = await client.query(`INSERT INTO employees (firstname, lastname, age, bdate) VALUES ($1, $2, $3, $4) RETURNING *`, [firstname, lastname, age, bdate])
    return result.rows[0] // return newly inserted employee
  } catch (err) {
    console.error(err)
    throw err
  } finally {
    await client.end()
  }
}

// Update employee by id
const editEmployeeById = async (id: number, employeeData: Partial<Employee>) => {
  const foundEmployee = await fetchEmployeeById(id)
  if (!foundEmployee) {
    return undefined
  }
  const client = createClient()
  try {
    await client.connect()
    const updateData = {
      firstname: employeeData.firstname ?? foundEmployee.firstname,
      lastname: employeeData.lastname ?? foundEmployee.lastname,
      age: employeeData.age ?? foundEmployee.age,
      bdate: employeeData.bdate ?? foundEmployee.bdate
    }
    const result = await client.query(`UPDATE employees SET firstname = $1, lastname = $2, age = $3, bdate = $4 WHERE id = $5 RETURNING *`, [updateData.firstname, updateData.lastname, updateData.age, updateData.bdate, id])
    return result.rows[0] // return updated employee
  } catch (err) {
    console.error(err)
    throw err
  } finally {
    await client.end()
  }
}

// Delete employee by id
const removeEmployeeById = async (id: number) => {
  const client = createClient()
  try {
    await client.connect()
    const result = await client.query(`DELETE FROM employees WHERE id = $1 RETURNING *`, [id])
    return result.rows[0]
  } catch (err) {
    console.error(err)
    throw err
  } finally {
    await client.end()
  }
}

export default {
  fetchAllEmployees,
  fetchEmployeeById,
  createEmployee,
  editEmployeeById,
  removeEmployeeById
}