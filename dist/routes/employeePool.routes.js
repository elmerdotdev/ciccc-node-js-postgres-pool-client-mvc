"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const employeePool_controller_1 = __importDefault(require("../controllers/employeePool.controller"));
const employeeRouter = (0, express_1.default)();
// Routes
employeeRouter.get('/employees', employeePool_controller_1.default.getAllEmployees);
employeeRouter.get('/employees/:id', employeePool_controller_1.default.getEmployeeById);
employeeRouter.post('/employees', employeePool_controller_1.default.addEmployee);
employeeRouter.put('/employees/:id', employeePool_controller_1.default.updateEmployeeById);
employeeRouter.delete('/employees/:id', employeePool_controller_1.default.deleteEmployeeById);
exports.default = employeeRouter;
