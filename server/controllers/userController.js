import bcryptjs from "bcryptjs";
import UserModel from "../models/userModel.js";

export async function registerUserController(req, res) {
    try {
        console.log("Incoming Register Request:", req.body);

        const { name, email, password } = req.body;
        if (!name || !email || !password) {
            console.log("Missing fields");
            return res.status(400).json({ message: "All fields are required." });
        }

        const existingUser = await UserModel.findOne({ where: { email } });
        console.log("Checking if email exists:", existingUser);

        if (existingUser) {
            console.log("Email already registered");
            return res.status(400).json({ message: "Email already registered" });
        }

        const hashedPassword = await bcryptjs.hash(password, 10);
        console.log("Password hashed");

        const newUser = await UserModel.create({ name, email, password: hashedPassword });
        console.log("User created:", newUser);

        res.json({ message: "User registered successfully.", success: true });
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
            console.log("Missing fields");
            return res.status(400).json({ message: "All fields are required." });
        }

        const user = await UserModel.findOne({ where: { email } });
        console.log("Checking user:", user);

        if (!user || !(await bcryptjs.compare(password, user.password))) {
            console.log("Invalid email or password");
            return res.status(400).json({ message: "Invalid email or password" });
        }

        console.log("Login successful for user:", user.id);
        res.json({ message: "Login successful", userId: user.id });
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

        console.log(`Found ${users.length} users`);
        res.json({ success: true, users });

    } catch (error) {
        console.error("Fetch Users Error:", error.message);
        res.status(500).json({ message: error.message });
    }
}