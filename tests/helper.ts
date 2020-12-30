/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable import/first */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-call */
const faker = require('faker');

const getFakeUser = () => {
  return {
    username: faker.internet.userName().replace(/\./g, ''),
    first_name: faker.name.firstName(),
    last_name: faker.name.lastName(),
    email: faker.internet.email(),
    phone_number: '+' + faker.phone.phoneNumberFormat(2).replace(/-/g, ''),
    password: faker.internet.password() + '$',
  }
}

export default {
  getFakeUser,
}
