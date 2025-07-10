const {kafka} = require('kafkajs');

const kafka = new kafka({
    clientId: 'user-service',
    brokers: ['localhost:9092']
});
const producer = kafka.producer();

const sendUserCreatedEvent = async (user) => {
    await producer.connect();
    await producer.send({
        topic: 'user-created',
        messages: [
            {
               key: 'user-registered',
               value: JSON.stringify(user)}
        ]
    });
    await producer.disconnect();
}

module.exports = {
    sendUserCreatedEvent
}