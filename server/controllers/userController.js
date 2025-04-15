import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";
import UserModel from "../models/userModel.js";

export async function registerUserController(req, res) {
    try {
        console.log("Incoming Register Request:", req.body);

        const { name, email, password } = req.body;
        if (!name || !email || !password) {
            return res.status(400).json({ message: "All fields are required." });
        }

        const existingUser = await UserModel.findOne({ where: { email } });
        if (existingUser) {
            return res.status(400).json({ message: "Email already registered" });
        }

        const hashedPassword = await bcryptjs.hash(password, 10);
        const newUser = await UserModel.create({ name, email, password: hashedPassword });

        // 🔥 Generate token
        const token = jwt.sign({ id: newUser.id }, process.env.JWT_SECRET, { expiresIn: "7d" });

        res.json({ 
            message: "User registered successfully.",
            success: true,
            token,
            user: { id: newUser.id, name: newUser.name, email: newUser.email }
        });

    } catch (error) {
        console.error("Register Error:", error);
        res.status(500).json({ message: error.message });
    }
}

export async function loginController(req, res) {
    try {
        console.log("Incoming Login Request:", req.body);

        const { email, password } = req.body;
        if (!email || !password) {
            return res.status(400).json({ message: "All fields are required." });
        }

        const user = await UserModel.findOne({ where: { email } });
        if (!user || !(await bcryptjs.compare(password, user.password))) {
            return res.status(400).json({ message: "Invalid email or password" });
        }

        // 🔥 Generate token
        const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: "7d" });

        res.json({ 
            message: "Login successful", 
            token,
            user: { id: user.id, name: user.name, email: user.email }
        });

    } catch (error) {
        console.error("Login Error:", error);
        res.status(500).json({ message: error.message });
    }
}

export async function logoutController(req, res) {
    try {
        console.log("Incoming Logout Request");
        res.json({ message: "Logout successful" });
    } catch (error) {
        console.error("Logout Error:", error);
        res.status(500).json({ message: error.message });
    }
}

export async function getAllUsersController(req, res) {
    try {
        console.log("Fetching all users...");
        const users = await UserModel.findAll({ attributes: ["id", "name", "email", "status", "role"] });
        res.json({ success: true, users });
    } catch (error) {
        console.error("Fetch Users Error:", error.message);
        res.status(500).json({ message: error.message });
    }
}
