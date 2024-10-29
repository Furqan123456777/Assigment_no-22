import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import User from './models/userModel.js'; // Import User model
import bcrypt from 'bcrypt';

const app = express();
const PORT = 5000;

// Apply CORS middleware
app.use(cors({
    origin: 'http://localhost:5174', // Allow only your frontend's origin
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const DBURI = 'mongodb+srv://furqankq:mymom@cluster0.ubo5a.mongodb.net/';  
mongoose.connect(DBURI);

mongoose.connection.on("connected", () => console.log("MongoDB Connected"));
mongoose.connection.on("error", (err) => console.log("MongoDB Error", err));

// Signup route
app.post('/api/signup', async (req, res) => {
    const { email, password } = req.body;

    // Check for required fields
    if (!email || !password) {
        return res.json({ success: false, message: "All fields are required" });
    }

    try {
        // Check if user already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.json({ success: false, message: "User already exists" });
        }

        // Hash the password before saving it
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create a new user
        const newUser = new User({ email, password: hashedPassword });
        await newUser.save();

        res.json({ success: true, message: "User registered successfully" });
    } catch (error) {
        console.error("Error in signup:", error);
        res.status(500).json({ success: false, message: "Server error" });
    }
});

// Login route
app.post('/api/login', async (req, res) => {
    const { email, password } = req.body;

    // Check for required fields
    if (!email || !password) {
        return res.json({ success: false, message: "All fields are required" });
    }

    try {
        // Check if user exists in the database
        const user = await User.findOne({ email });

        if (user) {
            // Compare hashed password
            const isMatch = await bcrypt.compare(password, user.password);
            if (isMatch) {
                res.json({ success: true, message: "Login successful" });
            } else {
                res.json({ success: false, message: "Invalid email or password" });
            }
        } else {
            res.json({ success: false, message: "Invalid email or password" });
        }
    } catch (error) {
        console.error("Error in login:", error);
        res.status(500).json({ success: false, message: "Server error" });
    }
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
