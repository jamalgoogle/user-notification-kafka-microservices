const { kafka } = require('kafkajs');
const twilio = require('twilio');



// Twilio credentials from https://www.twilio.com/console
const accountSid = 'ACXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX';
const authToken = 'your_auth_token';
const fromPhone = '+15005550006';
const client = new twilio(accountSid, authToken);

const kafka = new kafka({
    clientId: 'notifiacation-service',
    brokers: ['localhost:9092']
});

const consumer = kafka.consumer({groupId: 'notification-group'});

const startConsumer = async ()=>{
   await consumer.connect();
   await consumer.subscribe({topic: 'user-created'} , {fromBeginning: true});
   await consumer.run({
       eachMessage: async ({topic, partition, message}) => {
           const user = JSON.parse(message.value.toString());
           console.log(`Sending notification to ${user.email}`);
           await client.messages.create({
               body: `Hello ${user.name}, welcome to our platform!`,
               from: fromPhone,
               to: user.phone
           });
       }
   });
}

startConsumer();