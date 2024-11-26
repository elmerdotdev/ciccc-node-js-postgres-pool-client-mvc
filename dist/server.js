"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
// import employeeRouter from './routes/employee.routes' // Client
const employeePool_routes_1 = __importDefault(require("./routes/employeePool.routes")); // Pool
// Create server
const app = (0, express_1.default)();
// Middleware
app.use(express_1.default.json());
// Routes
app.use('/api', employeePool_routes_1.default);
// Start server
const PORT = Number(process.env.PORT || 3000);
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}...`);
});
// Client
// connectDb().then(() => {
//   app.listen(PORT, () => {
//     console.log(`Server is running on port ${PORT}...`)
//   })
// }).catch(err => {
//   console.error(err)
// })
