import { DataTypes } from "sequelize";
import sequelize from "../config/connectDB.js";

const User = sequelize.define(
    "User",
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        avatar: {
            type: DataTypes.STRING,
            allowNull: true,
            defaultValue: "",
        },
        mobile: {
            type: DataTypes.BIGINT,
            allowNull: true,
            defaultValue: null,
        },
        last_login_date: {
            type: DataTypes.DATE,
            allowNull: true,
            defaultValue: null,
        },
        status: {
            type: DataTypes.ENUM("Active", "Inactive", "Suspended"),
            allowNull: false,
            defaultValue: "Active",
        },
        role: {
            type: DataTypes.ENUM("ADMIN", "USER"),
            allowNull: false,
            defaultValue: "USER",
        },
    },
    {
        timestamps: true,
        tableName: "users",
    }
);

export default User;
