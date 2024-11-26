"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const employeePool_model_1 = __importDefault(require("../models/employeePool.model"));
// Get all employees
const getAllEmployees = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const employees = yield employeePool_model_1.default.fetchAllEmployees();
        res.status(200).json(employees);
    }
    catch (err) {
        console.error(err);
        res.status(500).json({ message: "Something went wrong :(" });
    }
});
// Get employee by id
const getEmployeeById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = Number(req.params.id);
    try {
        const employee = yield employeePool_model_1.default.fetchEmployeeById(id);
        if (!employee) {
            res.status(404).json({ message: 'Employee not found :(' });
            return;
        }
        res.status(200).json(employee);
    }
    catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Failed to get employee info' });
    }
});
// Add employee
const addEmployee = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { firstname, lastname, age, bdate } = req.body;
    try {
        const addedEmployee = yield employeePool_model_1.default.createEmployee({ firstname, lastname, age, bdate });
        res.status(201).json(addedEmployee);
    }
    catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Employee not added successfully :(' });
    }
});
// Update employee by id
const updateEmployeeById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = Number(req.params.id);
    const { firstname, lastname, age, bdate } = req.body;
    try {
        const updatedEmployee = yield employeePool_model_1.default.editEmployeeById(id, { firstname, lastname, age, bdate });
        res.status(200).json(updatedEmployee);
    }
    catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Employee not updated' });
    }
});
// Delete employee by id
const deleteEmployeeById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = Number(req.params.id);
        const deletedEmployee = yield employeePool_model_1.default.removeEmployeeById(id);
        if (!deletedEmployee) {
            res.status(404).json({ message: 'Employee not found' });
            return;
        }
        res.status(200).json(deletedEmployee);
    }
    catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Employee not deleted :(' });
    }
});
exports.default = {
    getAllEmployees,
    getEmployeeById,
    addEmployee,
    updateEmployeeById,
    deleteEmployeeById
};
