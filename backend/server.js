import express from 'express'
import dotenv from 'dotenv'
import documentRoutes from './routers/document.routes.js'
import cors from 'cors'
import path from 'path'
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

const __dirname = path.resolve();
if(process.env.NODE_ENV === "production") {

    app.use(express.static(path.join(__dirname,"../frontend/dist")));
    app.get("*",(req,res)=>{
        res.sendFile(path.join(__dirname,"../frontend","dist","index.html"));
    })
}

app.listen(PORT, () =>{
    console.log('Server runs on Port',PORT);
})