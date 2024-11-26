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
Object.defineProperty(exports, "__esModule", { value: true });
const db_1 = require("../db");
// Fetch all employees
const fetchAllEmployees = () => __awaiter(void 0, void 0, void 0, function* () {
    const client = (0, db_1.createClient)(); // create a new client connection
    try {
        yield client.connect(); // connect to database
        const result = yield client.query(`SELECT * FROM employees`);
        return result.rows;
    }
    catch (err) {
        console.error(err);
        throw err;
    }
    finally {
        yield client.end(); // close the connection
    }
});
// Fetch employee by id
const fetchEmployeeById = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const client = (0, db_1.createClient)();
    try {
        yield client.connect();
        const result = yield client.query(`SELECT * FROM employees WHERE id = $1`, [id]);
        return result.rows[0]; // returns the first element
    }
    catch (err) {
        console.error(err);
        throw err;
    }
    finally {
        yield client.end();
    }
});
// Add employee
const createEmployee = (employeeData) => __awaiter(void 0, void 0, void 0, function* () {
    const { firstname, lastname, age, bdate } = employeeData;
    const client = (0, db_1.createClient)();
    try {
        yield client.connect();
        const result = yield client.query(`INSERT INTO employees (firstname, lastname, age, bdate) VALUES ($1, $2, $3, $4) RETURNING *`, [firstname, lastname, age, bdate]);
        return result.rows[0]; // return newly inserted employee
    }
    catch (err) {
        console.error(err);
        throw err;
    }
    finally {
        yield client.end();
    }
});
// Update employee by id
const editEmployeeById = (id, employeeData) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b, _c, _d;
    const foundEmployee = yield fetchEmployeeById(id);
    if (!foundEmployee) {
        return undefined;
    }
    const client = (0, db_1.createClient)();
    try {
        yield client.connect();
        const updateData = {
            firstname: (_a = employeeData.firstname) !== null && _a !== void 0 ? _a : foundEmployee.firstname,
            lastname: (_b = employeeData.lastname) !== null && _b !== void 0 ? _b : foundEmployee.lastname,
            age: (_c = employeeData.age) !== null && _c !== void 0 ? _c : foundEmployee.age,
            bdate: (_d = employeeData.bdate) !== null && _d !== void 0 ? _d : foundEmployee.bdate
        };
        const result = yield client.query(`UPDATE employees SET firstname = $1, lastname = $2, age = $3, bdate = $4 WHERE id = $5 RETURNING *`, [updateData.firstname, updateData.lastname, updateData.age, updateData.bdate, id]);
        return result.rows[0]; // return updated employee
    }
    catch (err) {
        console.error(err);
        throw err;
    }
    finally {
        yield client.end();
    }
});
// Delete employee by id
const removeEmployeeById = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const client = (0, db_1.createClient)();
    try {
        yield client.connect();
        const result = yield client.query(`DELETE FROM employees WHERE id = $1 RETURNING *`, [id]);
        return result.rows[0];
    }
    catch (err) {
        console.error(err);
        throw err;
    }
    finally {
        yield client.end();
    }
});
exports.default = {
    fetchAllEmployees,
    fetchEmployeeById,
    createEmployee,
    editEmployeeById,
    removeEmployeeById
};
