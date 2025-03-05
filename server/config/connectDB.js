import { Sequelize } from 'sequelize';

const sequelize = new Sequelize('EComDB', 'root', 'Raghav@2004', {
    host: 'localhost',
    dialect: 'mysql',
    port: 3306,
    logging: false
});

sequelize.authenticate()
    .then(() => console.log('✅ Database connected...'))
    .catch(err => console.error('❌ Connection error:', err));

export default sequelize;
