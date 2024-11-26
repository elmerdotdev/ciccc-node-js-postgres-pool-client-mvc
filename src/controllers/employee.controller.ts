import { Request, Response } from 'express'
import employeeModel from '../models/employee.model'
import { Employee } from '../types/employee'

// Get all employees
const getAllEmployees = async (req: Request, res: Response) => {
  try {
    const employees = await employeeModel.fetchAllEmployees()
    res.status(200).json(employees)
  } catch (err) {
    console.error(err)
    res.status(500).json({ message: 'Failed to get all employees' })
  }
}

// Get employee by id
const getEmployeeById = async (req: Request<{ id: string }>, res: Response) => {
  const id = Number(req.params.id)
  try {
    const employee = await employeeModel.fetchEmployeeById(id)
    if (!employee) {
      res.status(404).json({ message: 'Employee not found!' })
      return
    }
    res.status(200).json(employee)
  } catch (err) {
    console.error(err)
    res.status(404).json({ message: 'Employee not found!' })
  }
}

// Add employee
const addEmployee = async (req: Request<{}, {}, Employee>, res: Response) => {
  try {
    const { firstname, lastname, age, bdate } = req.body
    const newEmployee = await employeeModel.createEmployee({ firstname, lastname, age, bdate })
    res.status(201).json(newEmployee)
  } catch (err) {
    console.error(err)
    res.status(500).json({ message: 'Employee not added' })
  }
}

const updateEmployeeById = async (req: Request<{id: string}, {}, Partial<Employee>>, res: Response) => {
  try {
    const id = Number(req.params.id)
    const { firstname, lastname, age, bdate } = req.body
    const updatedEmployee = await employeeModel.editEmployeeById(id, { firstname, lastname, age, bdate })
    if (!updatedEmployee) {
      res.status(404).json({ message: "Employee not found!" })
      return
    }
    res.status(200).json(updatedEmployee)
  } catch (err) {
    console.error(err)
    res.status(500).json({ message: "Failed to update employee" })
  }
}

// Delete employee by id
const deleteEmployeeById = async (req: Request<{ id: string }>, res: Response) => {
  try {
    const id = Number(req.params.id)
    const deletedEmployee = await employeeModel.removeEmployeeById(id)
    if (!deletedEmployee) {
      res.status(404).json({ message: 'Employee not found' })
      return
    }
    res.status(200).json(deletedEmployee)
  } catch (err) {
    console.error(err)
    res.status(500).json({ message: 'Something went wrong' })
  }
}

export default {
  getAllEmployees,
  getEmployeeById,
  addEmployee,
  updateEmployeeById,
  deleteEmployeeById
}