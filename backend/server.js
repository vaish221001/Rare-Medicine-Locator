//import express
import express from 'express';
// read .env files
import dotenv from 'dotenv';
//allow frontend access
import cors from 'cors';
//handle cookies
import cookieParser from 'cookie-parser';
//import database conection 
import connectDB from './config/db.js';
import authRoutes from './routes/authRoutes.js';
import emergencyRoutes from "./routes/emergencyRoutes.js";
import medicineRoutes from "./routes/medicineRoutes.js";
//load .env
dotenv.config();
//create express app
const app = express();
//connect to database
connectDB();
//allow frontend
app.use(cors({
    origin:process.env.FRONTEND_URL,
    credentials:true
})
);
//accept json data
app.use(
    express.json()
);
app.use("/auth", authRoutes);

app.use("/emergency", emergencyRoutes);

app.use("/medicines", medicineRoutes);

//enable cookies
app.use(
    cookieParser()

);
//test route 
app.get("/",(req,res)=>{
    res.send ("rare medicine locator backend is running");
}
);

//port
const PORT = process.env.PORT ||5000;
//start server
app.listen(PORT,()=>{
    console.log(`Server is running on port ${PORT}`);
});
