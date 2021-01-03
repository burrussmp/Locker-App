/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/unbound-method */
// Import the dependencies for testing

import helper from 'tests/helper';
import api from 'api/api';

describe('API Tests', () => {
  describe('GetAll Tests', () => {

    let user = {} as any;
    let session = undefined as any;
    beforeAll(async () => {
      user = helper.getFakeUser();
      session = await api.Auth.SignUp(user);
    });

    it('GetAll - Retrieve a list of users and check content', async () => {
      const users = await api.User.GetAll();
      expect(users[0]._id).toBeTruthy();
      expect(users[0].username).toBeTruthy();
      expect(users[0].updatedAt).toBeTruthy();
      expect(users[0].createdAt).toBeTruthy();
    });

    it('GetByID - Retrieve a specific user and check content', async () => {
      const user = await api.User.GetByID(session._id);
      expect(user._id).toBeTruthy();
      expect(user.about).toBeTruthy();
      expect(user.cognito_username).toBeTruthy();
      expect(user.username).toBeTruthy();
    });
  });
});