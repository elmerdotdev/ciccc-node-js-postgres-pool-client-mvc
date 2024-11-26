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
const dbPool_1 = __importDefault(require("../dbPool"));
// Fetch all employees
const fetchAllEmployees = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield dbPool_1.default.query(`SELECT * FROM employees`);
        return result.rows;
    }
    catch (err) {
        console.error(err);
        throw err;
    }
});
// Fetch employee by id
const fetchEmployeeById = (id) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield dbPool_1.default.query(`SELECT * FROM employees WHERE id = $1`, [id]);
        return result.rows[0];
    }
    catch (err) {
        console.error(err);
        throw err;
    }
});
// Add employee
const createEmployee = (employeeData) => __awaiter(void 0, void 0, void 0, function* () {
    const { firstname, lastname, age, bdate } = employeeData;
    try {
        const result = yield dbPool_1.default.query(`INSERT INTO employees (firstname, lastname, age, bdate) VALUES ($1, $2, $3, $4) RETURNING *`, [firstname, lastname, age, bdate]);
        return result.rows[0];
    }
    catch (err) {
        console.error(err);
        throw err;
    }
});
// Update employee by id
const editEmployeeById = (id, employeeData) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b, _c, _d;
    const found = yield fetchEmployeeById(id);
    if (!found) {
        return undefined;
    }
    try {
        const update = {
            firstname: (_a = employeeData.firstname) !== null && _a !== void 0 ? _a : found.firstname,
            lastname: (_b = employeeData.lastname) !== null && _b !== void 0 ? _b : found.lastname,
            age: (_c = employeeData.age) !== null && _c !== void 0 ? _c : found.age,
            bdate: (_d = employeeData.bdate) !== null && _d !== void 0 ? _d : found.bdate
        };
        const result = yield dbPool_1.default.query(`UPDATE employees SET firstname = $1, lastname = $2, age = $3, bdate = $4 WHERE id = $5 RETURNING *`, [update.firstname, update.lastname, update.age, update.bdate, id]);
        return result.rows[0];
    }
    catch (err) {
        console.error(err);
        throw err;
    }
});
// Delete employee by id
const removeEmployeeById = (id) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield dbPool_1.default.query(`DELETE FROM employees WHERE id = $1 RETURNING *`, [id]);
        return result.rows[0];
    }
    catch (err) {
        console.error(err);
        throw err;
    }
});
exports.default = {
    fetchAllEmployees,
    fetchEmployeeById,
    createEmployee,
    editEmployeeById,
    removeEmployeeById
};
