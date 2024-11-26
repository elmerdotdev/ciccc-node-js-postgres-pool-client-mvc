import { Request, Response } from 'express'
import employeePoolModel from '../models/employeePool.model'
import { Employee } from '../types/employee'

// Get all employees
const getAllEmployees = async (req: Request, res: Response) => {
  try {
    const employees = await employeePoolModel.fetchAllEmployees()
    res.status(200).json(employees)
  } catch (err) {
    console.error(err)
    res.status(500).json({ message: "Something went wrong :("})
  }
}

// Get employee by id
const getEmployeeById = async (req: Request<{ id: string }>, res: Response) => {
  const id = Number(req.params.id)
  try {
    const employee = await employeePoolModel.fetchEmployeeById(id)
    if (!employee) {
      res.status(404).json({ message: 'Employee not found :('})
      return
    }
    res.status(200).json(employee)
  } catch (err) {
    console.error(err)
    res.status(500).json({ message: 'Failed to get employee info' })
  }
}

// Add employee
const addEmployee = async (req: Request<{}, {}, Employee>, res: Response) => {
  const { firstname, lastname, age, bdate } = req.body
  try {
    const addedEmployee = await employeePoolModel.createEmployee({ firstname, lastname, age, bdate })
    res.status(201).json(addedEmployee)
  } catch (err) {
    console.error(err)
    res.status(500).json({ message: 'Employee not added successfully :(' })
  }
}

// Update employee by id
const updateEmployeeById = async (req: Request<{ id: string }, {}, Partial<Employee>>, res: Response) => {
  const id = Number(req.params.id)
  const { firstname, lastname, age, bdate } = req.body
  try {
    const updatedEmployee = await employeePoolModel.editEmployeeById(id, { firstname, lastname, age, bdate })
    res.status(200).json(updatedEmployee)
  } catch (err) {
    console.error(err)
    res.status(500).json({ message: 'Employee not updated' })
  }
}

// Delete employee by id
const deleteEmployeeById = async (req: Request<{ id: string }>, res: Response) => {
  try {
    const id = Number(req.params.id)
    const deletedEmployee = await employeePoolModel.removeEmployeeById(id)
    if (!deletedEmployee) {
      res.status(404).json({ message: 'Employee not found' })
      return
    }
    res.status(200).json(deletedEmployee)
  } catch (err) {
    console.error(err)
    res.status(500).json({ message: 'Employee not deleted :(' })
  }
}

export default {
  getAllEmployees,
  getEmployeeById,
  addEmployee,
  updateEmployeeById,
  deleteEmployeeById
}