// Import the dependencies for testing
const fs = require('fs');
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
      session = await api.Auth.SignUp(user.email, user.phone_number, user.username,
        user.password, user.first_name, user.last_name);
      console.log(session);
    });

    it('GetAll - Retrieve a list of users', async () => {
        let users = await api.User.GetAll();
        validators.validateType(UsersList, users);
    });
    it('GetAll - Validate content (possible that type \'UserList\' or API changed)', async () => {
      let users = await api.User.GetAll();
      validators.validateType(UsersList, users);
    });

    it('GetByID - Retrieve a specific user (no profile)', async () => {
      const user = await api.User.GetByID(session._id);
    });
    it('GetByID - Validate content (no profile) (possible that type \'UserInfo\' or API changed)', async () => {
      const user = await api.User.GetByID(session._id);
      validators.validateType(UserInfo, user);
      expect(Boolean(user.profile_photo)).toBeFalsy();
    });
    it('GetByID - Validate content (profile exists) (possible that type \'UserInfo\' or API changed)', async () => {
      let stream = fs.createReadStream('./tests/assets/freepeople.jpg');
      await api.Avatar.Update(stream)
      const user = await api.User.GetByID(session._id);
      validators.validateType(UserInfo, user);
    });

    it('UpdatePassword - Change password and re-login', async () => {
      const newPassword = "Pass123$";
      await api.User.UpdatePassword(newPassword, user.password);
      await api.Auth.Login(user.email, newPassword);
    });

    it('GetByID - Validate content (profile exists) (possible that type \'UserInfo\' or API changed)', async () => {
      let stream = fs.createReadStream('./tests/assets/freepeople.jpg');
      await api.Avatar.Update(stream)
      const user = await api.User.GetByID(session._id);
      validators.validateType(UserInfo, user);
    });

  });
});