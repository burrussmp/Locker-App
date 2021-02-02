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

import fs from 'fs';

describe('API Tests', () => {
  describe('S3 Tests', () => {
    let key = {} as any;
    beforeAll(async () => {
      const user = helper.getFakeUser();
      await api.Auth.SignUp(user.email, user.phone_number, user.username,
        user.password, user.first_name, user.last_name);
      await api.Avatar.Update(fs.createReadStream('./tests/assets/freepeople.jpg') as unknown as any);
      const userInfo = await api.User.GetByID();
      key = userInfo.profile_photo?.key;
      expect(key).toBeTruthy();
    });
    it('getMedia - Fails when key undefined', async () => {
      await expect(api.S3.getMedia(undefined as any)).rejects.toBeTruthy();
    });
    it('getMedia - Fails when invalid size', async () => {
      await expect(api.S3.getMedia(key, 'unsupported')).rejects.toBeTruthy();
    });
    it('getMedia - Success', async () => {
      const uri = await api.S3.getMedia(key);
      expect(typeof uri).toEqual('string');
    });
    it('getMedia - Success (with "size" query parameter)', async () => {
      const uri = await api.S3.getMedia(key, 'small');
      expect(typeof uri).toEqual('string');
    });
  });
});
