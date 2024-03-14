const express = require('express');
const bodyParser = require('body-parser')

const sequelize = require('./config/database');
const User = require('./models/users')

const app = express();
app.use(bodyParser.json());

const PORT = process.env.PORT || 3000;

const userRouter = require('./routes/userRoutes');
app.use('/user', userRouter);

sequelize.sync()
    .then(() => {
        app.listen(PORT, () => {
            console.log('Servidor iniciado en el Puerto ', PORT);
        })
    })
    .catch((err) => {
        console.error('Error al sincronizar el modelo', err);
    })