/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/unbound-method */
// Import the dependencies for testing
import AsyncStorage from '@react-native-async-storage/async-storage';
import api from 'api/api';

import { ASYNC_STORAGE_SESSION_KEY } from 'api/session';
import helper from 'tests/helper';
// Configure chai
describe('API Tests', () => {
  describe('Session Tests', () => {
    const mockSession = {
      _id: '_id',
      access_token: 'access_token',
      id_token: 'id_token',
      refresh_token: 'refresh_token',
    };
    beforeEach(async () => {
      await AsyncStorage.clear();
    });
    it('setSession - Clear session if no input', async () => {
      await api.Session.setSession();
      expect(AsyncStorage.setItem).toBeCalledWith(ASYNC_STORAGE_SESSION_KEY, '');
    });
    it('setSession - Add session', async () => {
      await api.Session.setSession(mockSession);
      expect(AsyncStorage.setItem).toBeCalledWith(ASYNC_STORAGE_SESSION_KEY, JSON.stringify(mockSession));
    });
    it('getSession - Session is not stored', async () => {
      const session = await api.Session.getSession();
      expect(AsyncStorage.getItem).toBeCalledWith(ASYNC_STORAGE_SESSION_KEY);
      expect(session).toBe(undefined);
    });
    it('getSession - Session is stored', async () => {
      await AsyncStorage.setItem(ASYNC_STORAGE_SESSION_KEY, JSON.stringify(mockSession));
      const session = await api.Session.getSession();
      expect(AsyncStorage.getItem).toBeCalledWith(ASYNC_STORAGE_SESSION_KEY);
      expect(session).toEqual(mockSession);
    });
    it('getAccessToken - Session is not stored', async () => {
      const accessToken = await api.Session.getAccessToken();
      expect(accessToken).toBe(undefined);
    });
    it('getAccessToken - Session is stored', async () => {
      await api.Session.setSession(mockSession);
      const accessToken = await api.Session.getAccessToken();
      expect(accessToken).toBe(mockSession.access_token);
    });
    it('getIDToken - Session is not stored', async () => {
      const idToken = await api.Session.getIDToken();
      expect(idToken).toBe(undefined);
    });
    it('getIDToken - Session is stored', async () => {
      await api.Session.setSession(mockSession);
      const idToken = await api.Session.getIDToken();
      expect(idToken).toBe(mockSession.id_token);
    });
    it('getRefreshToken - Session is not stored', async () => {
      const refreshToken = await api.Session.getRefreshToken();
      expect(refreshToken).toBe(undefined);
    });
    it('getRefreshToken - Session is stored', async () => {
      await api.Session.setSession(mockSession);
      const refreshToken = await api.Session.getRefreshToken();
      expect(refreshToken).toBe(mockSession.refresh_token);
    });
    it('getMyID - Session is not stored', async () => {
      const myID = await api.Session.getMyID();
      expect(myID).toBe(undefined);
    });
    it('getMyID - Session is stored', async () => {
      await api.Session.setSession(mockSession);
      const myID = await api.Session.getMyID();
      expect(myID).toBe(mockSession._id);
    });
    it('verifyToken - Check access and id token', async () => {
      const fake_user = helper.getFakeUser();
      const session = await api.Auth.SignUp(fake_user.email, fake_user.phone_number, fake_user.username,
        fake_user.password, fake_user.first_name, fake_user.last_name);
      expect(await api.Session.verifyToken(session.access_token)).toBeTruthy();
      expect(await api.Session.verifyToken(session.id_token)).toBeTruthy();
    });
    it('verifyToken - Invalid token', async () => {
      const isVerifiedToken = await api.Session.verifyToken('invalid');
      expect(isVerifiedToken).toBeFalsy();
    });
  });
});
