require('dotenv').config();
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser')

const sequelize = require('./config/database');
const { connectRabbitMQ, closeRabbitMQ } = require('./config/rabbitmq');
const userRouter = require('./routes/userRoutes');

const app = express();
app.use(bodyParser.json());
app.use(cors());

const PORT = process.env.PORT || 3000;

app.get('/', (req, res) => {
    res.send('Hola Mundo')
})

app.use('/api/user', userRouter);

sequelize.sync()
    .then(() => {
        connectRabbitMQ()
        app.listen(PORT, () => {
            console.log(`Servidor iniciado en  http://localhost:${PORT}`);
        })
    })
    .catch((err) => {
        console.error('Error al sincronizar el modelo', err);
    })

// process.on('SIGINT', () => {
//     closeRabbitMQ();
//     process.exit();
// });

// process.on('SIGTERM', () => {
//     closeRabbitMQ();
//     process.exit();
// });