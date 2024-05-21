const amqp = require('amqplib/callback_api');

let channel = null;
let connection = null;

const connectRabbitMQ = () => {
    return new Promise((resolve, reject) => {
        amqp.connect(process.env.RABBITMQ_URL, (error0, conn) => {
            if (error0) {
                reject(error0);
            }
            connection = conn;
            connection.createChannel((error1, ch) => {
                if (error1) {
                    reject(error1);
                }
                channel = ch;
                console.log('Connected to RabbitMQ');
                resolve();
            });
        });
    });
};

const getChannel = () => {
    if (!channel) {
        throw new Error('RabbitMQ channel is not created');
    }
    return channel;
};

const closeRabbitMQ = async () => {
    try {
        console.log('Closing RabbitMQ connection and channel...');
        if (channel) {
            await channel.close((err) => {
                if (err) {
                    throw err;
                } else {
                    channel = null;
                    console.log('RabbitMQ channel closed');
                }
            });
        }
        if (connection) {
            await connection.close((err) => {
                if (err) {
                    throw err;
                } else {
                    connection = null
                    console.log('RabbitMQ connection closed');
                }
            });
        }
    } catch (error) {
        console.error('Error closing RabbitMQ connection:', err);
    }
};

process.on('exit', (code) => {
    closeRabbitMQ();
    console.log(`About to exit with code: ${code}`);
});

module.exports = { connectRabbitMQ, getChannel, closeRabbitMQ };