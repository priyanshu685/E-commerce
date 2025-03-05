import express from "express";
import userRouter from "./routes/userRoute.js";
import sequelize from "./config/connectDB.js";
import UserModel from "./models/userModel.js"; // Import your User model

const app = express();
app.use(express.json());

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
        console.log("✅ Database connected successfully!");
        await sequelize.sync({ alter: true });
        console.log("✅ All models were synchronized successfully.");

        console.log(`🚀 Server running on http://localhost:${PORT}`);
    } catch (error) {
        console.error("❌ Database connection failed:", error);
    }
});
