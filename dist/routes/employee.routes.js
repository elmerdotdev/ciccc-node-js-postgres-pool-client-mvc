"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const employee_controller_1 = __importDefault(require("../controllers/employee.controller"));
const employeeRouter = (0, express_1.Router)();
// Routes
employeeRouter.get('/employees', employee_controller_1.default.getAllEmployees);
employeeRouter.get('/employees/:id', employee_controller_1.default.getEmployeeById);
employeeRouter.post('/employees', employee_controller_1.default.addEmployee);
employeeRouter.put('/employees/:id', employee_controller_1.default.updateEmployeeById);
employeeRouter.delete('/employees/:id', employee_controller_1.default.deleteEmployeeById);
exports.default = employeeRouter;
