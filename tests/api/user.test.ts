/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable no-undef */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/unbound-method */

// Import the dependencies for testing
import helper from 'tests/helper';
import api from 'api/api';
import validators from 'services/validators';
import store from 'store/index';
import AuthActions from 'store/actions/auth.actions';
import { UsersList, UserInfo } from 'api/user';

import fs from 'fs';

const dispatchSpy = jest.spyOn(store, 'dispatch');
jest.mock('api/session');

describe('API Tests', () => {
  describe('User Tests', () => {
    let user = {} as any;
    let session = undefined as any;
    let session2 = undefined as any;
    beforeAll(async () => {
      const user2 = helper.getFakeUser();
      session2 = await api.Auth.SignUp(user2.email, user2.phone_number, user2.username,
        user2.password, user.first_name, user2.last_name);
      user = helper.getFakeUser();
      session = await api.Auth.SignUp(user.email, user.phone_number, user.username,
        user.password, user.first_name, user.last_name);
    });

    it('GetAll - Retrieve a list of users', async () => {
      const users = await api.User.GetAll();
      validators.validateType(UsersList, users);
    });
    it('GetAll - Validate content (possible that type \'UserList\' or API changed)', async () => {
      const users = await api.User.GetAll();
      validators.validateType(UsersList, users);
    });

    it('GetByID - Retrieve self (no input)', async () => {
      const userInfo = await api.User.GetByID();
      expect(userInfo.username).toEqual(user.username);
    });
    it('GetByID - Retrieve a specific user (no profile)', async () => {
      const userInfo = await api.User.GetByID(session2._id);
      expect(userInfo.username).not.toEqual(user.username);
    });
    it('GetByID - Validate content (no profile) (possible that type \'UserInfo\' or API changed)', async () => {
      const newUser = await api.User.GetByID(session._id);
      validators.validateType(UserInfo, newUser);
      expect(Boolean(user.profile_photo)).toBeFalsy();
    });
    it('GetByID - Validate content (profile exists) (possible that type \'UserInfo\' or API changed)', async () => {
      const stream = fs.createReadStream('./tests/assets/freepeople.jpg');
      await api.Avatar.Update(stream as unknown as any);
      const newUser = await api.User.GetByID(session._id);
      validators.validateType(UserInfo, newUser);
    });

    it('UpdatePassword - Change password and re-login with new', async () => {
      const newPassword = 'Pass123$';
      await api.User.UpdatePassword(newPassword, user.password);
      await api.Auth.Login(user.email, newPassword);
    });

    it('UpdatePassword - New Password Invalid', async () => {
      const newPassword = 'short';
      let getErr;
      try {
        await api.User.UpdatePassword(newPassword, user.password);
      } catch (err) {
        getErr = err;
      }
      expect(Boolean(getErr)).toBeTruthy();
    });

    it('Follow Someone - Check User Information', async () => {
      await api.User.Follow(session2._id);
      const userInfo = await api.User.GetByID(session2._id);
      validators.validateType(UserInfo, userInfo);
      expect(userInfo.followers.length).toEqual(1);
    });

    it('Follow Self - Should fail with 422', async () => {
      try {
        await api.User.Follow(session._id);
      } catch (err) {
        expect(err.status).toEqual(422);
      }
    });

    it('Unfollow Someone - Success', async () => {
      await api.User.Unfollow(session2._id);
      const userInfo = await api.User.GetByID(session2._id);
      validators.validateType(UserInfo, userInfo);
      expect(userInfo.followers.length).toEqual(0);
    });

    it('Unfollow Self - Should fail with 422', async () => {
      try {
        await api.User.Unfollow(session._id);
      } catch (err) {
        expect(err.status).toEqual(422);
      }
    });
    it('DeleteMe - Success', async () => {
      await api.User.DeleteMe();
      expect(dispatchSpy).toBeCalledWith(AuthActions.Logout());
    });
  });
});
