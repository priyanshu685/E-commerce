import bcryptjs from "bcryptjs";
import UserModel from "../models/userModel.js";

export async function registerUserController(req, res) {
    try {
        const { name, email, password } = req.body;
        if (!name || !email || !password) return res.status(400).json({ message: "All fields are required." });

        const existingUser = await UserModel.findOne({ where: { email } });
        if (existingUser) return res.status(400).json({ message: "Email already registered" });

        const hashedPassword = await bcryptjs.hash(password, 10);
        await UserModel.create({ name, email, password: hashedPassword });

        res.json({ message: "User registered successfully.", success: true });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

export async function loginController(req, res) {
    try {
        const { email, password } = req.body;
        if (!email || !password) return res.status(400).json({ message: "All fields are required." });

        const user = await UserModel.findOne({ where: { email } });
        if (!user || !await bcryptjs.compare(password, user.password)) {
            return res.status(400).json({ message: "Invalid email or password" });
        }

        res.json({ message: "Login successful", userId: user.id });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

export async function logoutController(req, res) {
    try {
        res.json({ message: "Logout successful" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}
