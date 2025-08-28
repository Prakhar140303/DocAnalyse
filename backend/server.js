import express from 'express'
import dotenv from 'dotenv'
import documentRoutes from './routers/document.routes.js'
import cors from 'cors'
dotenv.config()
const PORT = process.env.PORT || 5001;
const  app = express();
app.use(express.json());


app.use(cors({
    origin: "http://localhost:5173",
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
    allowedHeaders : [
        "Content-Type",
        "Authorization",
        "Cache-Control",
        'Expires',
        'Pragma'
    ]
}));

app.use('/api',documentRoutes);

app.listen(PORT, () =>{
    console.log('Server runs on Port',PORT);
})