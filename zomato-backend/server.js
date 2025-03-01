//Importing required modules

const express=require('express')
const mongoose=require('mongoose')
require('dotenv').config()
const cors = require("cors");
const User=require('./models/User')
const bcrypt=require('bcryptjs')

// Middleware setup
const app=express()
app.use(cors());
app.use(express.json());
const PORT = process.env.PORT || 5000;

// MongoDB connection
if (!process.env.MONGO_URI) {
    console.error("Error: MONGO_URI is not defined in the environment variables.");
    process.exit(1);
}

mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('DB connected...'))
    .catch(err => console.error("Database connection error:", err));

//Register API
app.post('/register',async(req,res)=>{
    const {username,email,password}=req.body

    try {
        if (!username || !email || !password) {
            return res.status(400).json({ message: "All fields are required" });
        }

        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: "Email already exists" });
        }

        const hashedPassword= await bcrypt.hash(password,10)
        const user=new User({username, email, password: hashedPassword})
        await user.save()
        console.log("User registration completed...");
        return res.json({ message: "User registered successfully" });

    }catch(err){
        console.error("Registration error:", err);
        return res.status(500).json({ message: "Internal Server Error" });
    }
});

// Login API

app.post('/login', async(req, res)=>{
    const {email, password} = req.body

    try {
        if (!email || !password) {
            return res.status(400).json({ message: "All fields are required" });
        }

        const user = await User.findOne({ email });
        if (!user || !(await bcrypt.compare(password, user.password))) 
            {
             return res.status(400).json({ message: "Invalid Credentials" });
            }

            return res.json({ message: "Login successful", username: user.username });
    }catch(err){
        console.error("Login error:", err);
        return res.status(500).json({ message: "Internal Server Error" });
    }
});

//Connecting Server
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));