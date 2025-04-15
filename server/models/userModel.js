import { DataTypes } from 'sequelize';
import sequelize from '../config/connectDB.js';

const User = sequelize.define('user', {
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false
    },
    cartData: {
        type: DataTypes.JSON,
        defaultValue: {}
    },
    status: {
        type: DataTypes.STRING,
        defaultValue: 'active'
    },
    role: {
        type: DataTypes.STRING,
        defaultValue: 'user'
    }
}, {
    freezeTableName: true,
    timestamps: false
});

export default User;
