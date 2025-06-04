import express from 'express';
import env from 'dotenv';
import cors from 'cors';
import connectDB from './Database/connectDB.js'
import authRoutes from './Routes/auth.Route.js'

env.config();
const app = express();
const PORT = process.env.PORT || 5000 ;

app.use(express.json());
app.use(cors());

app.use('/api/auth',authRoutes)

app.listen(PORT,()=>{
    console.log(`Server is Running On Port ${PORT}`);
    connectDB()
})


 
