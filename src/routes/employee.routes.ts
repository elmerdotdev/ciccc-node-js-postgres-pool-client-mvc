import { Router } from 'express'
import employeeController from '../controllers/employee.controller'

const employeeRouter = Router()

// Routes
employeeRouter.get('/employees', employeeController.getAllEmployees)
employeeRouter.get('/employees/:id', employeeController.getEmployeeById)
employeeRouter.post('/employees', employeeController.addEmployee)
employeeRouter.put('/employees/:id', employeeController.updateEmployeeById)
employeeRouter.delete('/employees/:id', employeeController.deleteEmployeeById)

export default employeeRouter