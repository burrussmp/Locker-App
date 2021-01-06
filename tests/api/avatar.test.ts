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
import store from 'store/index';
import AuthActions from 'store/actions/auth.actions';
import { UsersList, UserInfo } from 'api/user';

import fs from 'fs';

const dispatchSpy = jest.spyOn(store, 'dispatch');
jest.mock('api/session');

describe('API Tests', () => {
  describe('Avatar Tests', () => {
    let user = {} as any;
    let session = undefined as any;
    let session2 = undefined as any;
    beforeAll(async () => {
      user = helper.getFakeUser();
      session2 = await api.Auth.SignUp(user.email, user.phone_number, user.username,
        user.password, user.first_name, user.last_name);
      user = helper.getFakeUser();
      session = await api.Auth.SignUp(user.email, user.phone_number, user.username,
        user.password, user.first_name, user.last_name);
      await api.Avatar.Update(fs.createReadStream('./tests/assets/freepeople.jpg') as unknown as any);
    });
    it('Get - Retrieve own avatar (no input)', async () => {
      const avatarURI = await api.Avatar.Get();
      expect(typeof avatarURI).toEqual('string');
    });
    it('Get - Retrieve avatar of another user', async () => {
      const avatarURI = await api.Avatar.Get(session2._id);
      expect(typeof avatarURI).toEqual('string');
    });
    it('Get - Retrieve avatar and use size parameter = small', async () => {
      await api.Avatar.Get(undefined, 'small');
    });
    it('Get - Retrieve avatar and use size parameter = medium', async () => {
      await api.Avatar.Get(undefined, 'medium');
    });
    it('Get - Retrieve avatar and use size parameter = large', async () => {
      await api.Avatar.Get(undefined, 'large');
    });
    it('Get - Retrieve avatar and use size parameter = xlarge', async () => {
      await api.Avatar.Get(undefined, 'xlarge');
    });
    it('Get - Retrieve avatar and use size parameter = unsupported (status=400)', async () => {
      try {
        await api.Avatar.Get(undefined, 'unsupported');
      } catch (err) {
        expect(err.status).toEqual(400);
      }
    });
    it('Update - Change avatar (success)', async () => {
      await api.Avatar.Update(fs.createReadStream('./tests/assets/freepeople.jpg') as unknown as any);
    });
    it('Update - Fail if undefined', async () => {
      await expect(api.Avatar.Update(undefined as any)).rejects.toThrow();
    });
    it('Delete - Remove Avatar (Goes back to default)', async () => {
      await api.Avatar.Delete();
    });
  });
});
