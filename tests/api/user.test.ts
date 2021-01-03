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
import validators from 'services/validators';

import { UsersList, UserInfo} from 'api/user';

describe('API Tests', () => {
  describe('GetAll Tests', () => {

    let user = {} as any;
    let session = undefined as any;
    beforeAll(async () => {
      user = helper.getFakeUser();
      session = await api.Auth.SignUp(user);
    });

    it('GetAll - Retrieve a list of users', async () => {
        let users = await api.User.GetAll();
        validators.validateType(UsersList, users);
    });
    it('GetAll - Validate content (possible that type \'UserList\' or API changed)', async () => {
      let users = await api.User.GetAll();
      validators.validateType(UsersList, users);
    });

    it('GetByID - Retrieve a specific user', async () => {
      const user = await api.User.GetByID(session._id);
    });
    it('GetByID - Validate content (possible that type \'UserInfo\' or API changed)', async () => {
      const user = await api.User.GetByID(session._id);
      const res = validators.validateType(UserInfo, user);
    });
  });
});