import express from "express";
import userRouter from "./routes/userRoute.js";
import sequelize from "./config/connectDB.js"; // Adjust the path if needed

const app = express();
app.use(express.json()); // Middleware to parse JSON requests

// Routes
app.use("/api/users", userRouter);

// Test Route
app.get("/", (req, res) => {
    res.send("API is running...");
});

// Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, async () => {
    try {
        await sequelize.authenticate();
        console.log("Database connected successfully!");
        console.log(`Server running on http://localhost:${PORT}`);
    } catch (error) {
        console.error("Database connection failed:", error);
    }
});
