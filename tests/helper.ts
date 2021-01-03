/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable @typescript-eslint/restrict-template-expressions */
/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable import/first */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-call */
const faker = require('faker');

const getFakeUser = () => ({
  username: faker.internet.userName().replace(/\./g, ''),
  first_name: faker.name.firstName(),
  last_name: faker.name.lastName(),
  email: faker.internet.email(),
  phone_number: `+${faker.phone.phoneNumberFormat(2).replace(/-/g, '')}`,
  password: `1a#D${faker.internet.password()}$`,
});

export default {
  getFakeUser,
};
