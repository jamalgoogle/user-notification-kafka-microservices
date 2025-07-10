const { sendUserCreatedEvent } = require('./user-service');

const user = {
  id: 1,
  name: 'Jamal',
  email: 'jamal@example.com',
  phone: '+201001234567' // رقم الموبايل بصيغة دولية
};

sendUserCreatedEvent(user)
.then(() => {console.log(`User created event sent successfully, ${user.name}`) })
.catch(err => { console.error(`Error sending user created event: ${err}`) })
