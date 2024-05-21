const amqp = require('amqplib/callback_api');

let channel = null;
let connection = null;

const connectRabbitMQ = () => {
    amqp.connect(process.env.RABBITMQ_URL, (error0, connection) => {
        if (error0) {
            throw error0;
        }
        connection = connection;
        connection.createChannel((error1, ch) => {
            if (error1) {
                throw error1;
            }
            channel = ch;
            console.log('Connected to RabbitMQ');
        });
    });
};

const getChannel = () => {
    if (!channel) {
        throw new Error('RabbitMQ channel is not created');
    }
    return channel;
};

const closeRabbitMQ = () => {
    if (channel) {
        channel.close((err) => {
            if (err) {
                console.error('Error closing RabbitMQ channel', err);
            } else {
                console.log('RabbitMQ channel closed');
            }
        });
    }
    if (connection) {
        connection.close((err) => {
            if (err) {
                console.error('Error closing RabbitMQ connection', err);
            } else {
                console.log('RabbitMQ connection closed');
            }
        });
    }
};

// process.on('exit', (code) => {
//     closeRabbitMQ();
//     console.log(`About to exit with code: ${code}`);
// });

module.exports = { connectRabbitMQ, getChannel, closeRabbitMQ };