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

import apiSession from 'api/session';
import store from 'store/index';
import AuthActions from 'store/actions/auth.actions';

const dispatchSpy = jest.spyOn(store, 'dispatch');
jest.mock('api/session');


describe('API Tests', () => {
  describe('AUTH Tests', () => {

    let user = {} as any;

    beforeAll(async () => {
      user = helper.getFakeUser();
      await api.Auth.SignUp(user);
    });

    it('SignUp - Session contains correct fields', async () => {
      const signUpSession = await api.Auth.SignUp(helper.getFakeUser());
      expect(Boolean(signUpSession._id)).toBe(true);
      expect(Boolean(signUpSession.access_token)).toBe(true);
      expect(Boolean(signUpSession.refresh_token)).toBe(true);
      expect(Boolean(signUpSession.id_token)).toBe(true);
    });

    it('SignUp - Session saved to async storage', async () => {
      const session = await api.Auth.SignUp(helper.getFakeUser());
      expect(apiSession.setSession).toBeCalledWith(session);
    });

    it('SignUp - Redux authorization called to store', async () => {
      const session = await api.Auth.SignUp(helper.getFakeUser());
      expect(dispatchSpy).toBeCalledWith(AuthActions.SetSession(session));
    });

    it('SignUp - Failure (Bad password)', async () => {
      let userData = helper.getFakeUser();
      userData.password = 'tooshort';
      try {
        await api.Auth.SignUp(userData);
      } catch (err) {
        expect(err.status).toEqual(400);
        expect(err.error.toLowerCase().includes('password')).toBeTruthy();
      }
    });

    it('Login - Using email', async () => {
      const session = await api.Auth.Login({login: user.email, password: user.password});
      expect(Boolean(session._id)).toBe(true);
      expect(Boolean(session.access_token)).toBe(true);
      expect(Boolean(session.refresh_token)).toBe(true);
      expect(Boolean(session.id_token)).toBe(true);
    });
    it('Login - Using username', async () => {
      const session = await api.Auth.Login({login: user.username, password: user.password});
      expect(Boolean(session._id)).toBe(true);
      expect(Boolean(session.access_token)).toBe(true);
      expect(Boolean(session.refresh_token)).toBe(true);
      expect(Boolean(session.id_token)).toBe(true);
    });
    it('Login - Using phone_number', async () => {
      const session = await api.Auth.Login({login: user.phone_number, password: user.password});
      expect(Boolean(session._id)).toBe(true);
      expect(Boolean(session.access_token)).toBe(true);
      expect(Boolean(session.refresh_token)).toBe(true);
      expect(Boolean(session.id_token)).toBe(true);
    });
    it('Login - Session stored to async storage', async () => {
      const session = await api.Auth.Login({login: user.phone_number, password: user.password});
      expect(apiSession.setSession).toBeCalledWith(session);
    });
    it('Login - Redux authorization called to store', async () => {
      const session = await api.Auth.Login({login: user.phone_number, password: user.password});
      expect(dispatchSpy).toBeCalledWith(AuthActions.SetSession(session));
    });
    it('Login - Wrong login info', async () => {
      try {
        await api.Auth.Login({login: 'bad', password: user.password});
      } catch (err) {
        expect(err.status).toEqual(401);
      }
    });

    it('Logout - Session cleared', async () => {
      await api.Auth.Logout();
      expect(apiSession.setSession).toBeCalledWith();
    });
    it('Logout - Redux store dispatch action', async () => {
      await api.Auth.Logout();
      expect(dispatchSpy).toBeCalledWith(AuthActions.Logout());
    });

    it('Forgot Password - Get cognito username', async () => {
      const resBody = await api.Auth.ForgotPassword(user.email);
      expect(typeof resBody.cognito_username).toEqual('string');
    });

    it('Confirm Password - Incorrect code', async () => {
      const {cognito_username} = await api.Auth.ForgotPassword(user.email);
      try {
        await api.Auth.ConfirmForgotPassword(cognito_username, '34234', 'newPass123#');
      } catch (err) {
        expect(err.error.toLowerCase().includes('code')).toBeTruthy();
      }
    });
  });
});
