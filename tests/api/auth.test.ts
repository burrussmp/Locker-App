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
      await api.Auth.SignUp(user.email, user.phone_number, user.username, user.password, user.first_name, user.last_name);
    });

    it('SignUp - Session contains correct fields', async () => {
      const fake_user = helper.getFakeUser();
      const signUpSession = await api.Auth.SignUp(fake_user.email, fake_user.phone_number, fake_user.username,
        fake_user.password, fake_user.first_name, fake_user.last_name);
      expect(Boolean(signUpSession._id)).toBe(true);
      expect(Boolean(signUpSession.access_token)).toBe(true);
      expect(Boolean(signUpSession.refresh_token)).toBe(true);
      expect(Boolean(signUpSession.id_token)).toBe(true);
    });

    it('SignUp - Session saved to async storage', async () => {
      const fake_user = helper.getFakeUser();
      const session = await api.Auth.SignUp(fake_user.email, fake_user.phone_number, fake_user.username,
        fake_user.password, fake_user.first_name, fake_user.last_name);
      expect(apiSession.setSession).toBeCalledWith(session);
    });

    it('SignUp - Redux authorization called to store', async () => {
      const fake_user = helper.getFakeUser();
      const session = await api.Auth.SignUp(fake_user.email, fake_user.phone_number, fake_user.username,
        fake_user.password, fake_user.first_name, fake_user.last_name);
      expect(dispatchSpy).toBeCalledWith(AuthActions.SetSession(session));
    });

    it('SignUp - Failure (Bad password)', async () => {
      let fake_user = helper.getFakeUser();
      fake_user.password = 'tooshort';
      try {
        await api.Auth.SignUp(fake_user.email, fake_user.phone_number, fake_user.username,
          fake_user.password, fake_user.first_name, fake_user.last_name);
      } catch (err) {
        expect(err.status).toEqual(400);
        expect(err.error.toLowerCase().includes('password')).toBeTruthy();
      }
    });

    it('Login - Using email', async () => {
      const session = await api.Auth.Login(user.email, user.password);
      expect(Boolean(session._id)).toBe(true);
      expect(Boolean(session.access_token)).toBe(true);
      expect(Boolean(session.refresh_token)).toBe(true);
      expect(Boolean(session.id_token)).toBe(true);
    });
    it('Login - Using username', async () => {
      const session = await api.Auth.Login(user.username, user.password);
      expect(Boolean(session._id)).toBe(true);
      expect(Boolean(session.access_token)).toBe(true);
      expect(Boolean(session.refresh_token)).toBe(true);
      expect(Boolean(session.id_token)).toBe(true);
    });
    it('Login - Using phone_number', async () => {
      const session = await api.Auth.Login(user.phone_number, user.password);
      expect(Boolean(session._id)).toBe(true);
      expect(Boolean(session.access_token)).toBe(true);
      expect(Boolean(session.refresh_token)).toBe(true);
      expect(Boolean(session.id_token)).toBe(true);
    });
    it('Login - Session stored to async storage', async () => {
      const session = await api.Auth.Login(user.email, user.password);
      expect(apiSession.setSession).toBeCalledWith(session);
    });
    it('Login - Redux authorization called to store', async () => {
      const session = await api.Auth.Login(user.email, user.password);
      expect(dispatchSpy).toBeCalledWith(AuthActions.SetSession(session));
    });
    it('Login - Wrong login info', async () => {
      try {
        await api.Auth.Login('bad', user.password);
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
