import Router from 'express'
import employeePoolController from '../controllers/employeePool.controller'

const employeeRouter = Router()

// Routes
employeeRouter.get('/employees', employeePoolController.getAllEmployees)
employeeRouter.get('/employees/:id', employeePoolController.getEmployeeById)
employeeRouter.post('/employees', employeePoolController.addEmployee)
employeeRouter.put('/employees/:id', employeePoolController.updateEmployeeById)
employeeRouter.delete('/employees/:id', employeePoolController.deleteEmployeeById)

export default employeeRouter