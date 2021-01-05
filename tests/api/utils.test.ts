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
import fs from 'fs';

import utils from 'api/utils';
import store from 'store/index';
import AuthActions from 'store/actions/auth.actions';
import fetch from 'node-fetch';

jest.mock('node-fetch');
const mockedFetch = fetch as any;
const { Response } = jest.requireActual('node-fetch');


describe('API Tests', () => {
  describe('Utils Tests', () => {
    const mockSession = {
      _id: 'id',
      access_token: 'access_token',
      id_token: 'id_token',
      refresh_token: 'refresh_token',
    };

    it('getIDAndAccessToken - Session not set', () => {
      const idAndAccessToken = utils.getIDAndAccessToken();
      expect(idAndAccessToken.access_token).toBe('');
      expect(idAndAccessToken.access_token).toBe('');
    });
    it('getIDAndAccessToken - Session set', () => {
      store.dispatch(AuthActions.SetSession(mockSession));
      const idAndAccessToken = utils.getIDAndAccessToken();
      expect(idAndAccessToken.access_token).toBe(mockSession.access_token);
      expect(idAndAccessToken._id).toBe(mockSession._id);
    });

    it('handleError - Show status and error', async () => {
      const response = new Response(JSON.stringify({ error: 'An error' }), { status: 200 });
      const errorRes = await utils.handleError(response);
      expect(errorRes.status).toEqual(200);
      expect(errorRes.error).toEqual('An error');
    });

    it('getHeaders - Sets Authorization header with access token', () => {
      store.dispatch(AuthActions.SetSession(mockSession));
      const headers = utils.getHeaders();
      expect(headers.Authorization).toEqual(`Bearer ${mockSession.access_token}`);
    });
    it('getHeaders - Optional headers set properly', () => {
      const headers = utils.getHeaders({ optional: 'optional' });
      expect(headers.optional).toEqual('optional');
    });

    it('createURI - Successfully creates a URI', async () => {
      const uri = await utils.createURI(new Response(fs.readFileSync('./tests/assets/freepeople.jpg')));
      expect(typeof uri).toEqual('string');
      expect(uri).toBeTruthy();
    });

    it('postRequest - Success no Body', async () => {
      mockedFetch.mockReturnValue(Promise.resolve(new Response('test')));
      const res = await utils.postRequest('/fakeurl');
      expect(await res.text()).toEqual('test');
      expect(mockedFetch).toHaveBeenCalledWith('http://localhost:3000/fakeurl?', { body: undefined, headers: { 'Content-Type': 'application/json', Authorization: 'Bearer access_token' }, method: 'POST' });
    });

    it('postRequest - Success with Body', async () => {
      mockedFetch.mockReturnValue(Promise.resolve(new Response('test')));
      await utils.postRequest('/fakeurl', { data: 'myData' });
      expect(mockedFetch).toHaveBeenCalledWith('http://localhost:3000/fakeurl?', { body: JSON.stringify({ data: 'myData' }), headers: { 'Content-Type': 'application/json', Authorization: 'Bearer access_token' }, method: 'POST' });
    });

    it('postRequest - Success with Query parameter', async () => {
      mockedFetch.mockReturnValue(Promise.resolve(new Response('test')));
      await utils.postRequest('/fakeurl', undefined, { test: 'test' });
      expect(mockedFetch).toHaveBeenCalledWith('http://localhost:3000/fakeurl?test=test', { body: undefined, headers: { 'Content-Type': 'application/json', Authorization: 'Bearer access_token' }, method: 'POST' });
    });

    it('postRequest - Throws error if not ok', async () => {
      mockedFetch.mockReturnValue(Promise.resolve(new Response(JSON.stringify({ error: 'An error' }), { status: 400 })));
      try {
        await utils.postRequest('/fakeurl');
      } catch (err) {
        expect(err.error).toEqual('An error');
        expect(err.status).toEqual(400);
      }
    });

    it('putRequest - Success no Body', async () => {
      mockedFetch.mockReturnValue(Promise.resolve(new Response('test')));
      const res = await utils.putRequest('/fakeurl');
      expect(await res.text()).toEqual('test');
      expect(mockedFetch).toHaveBeenCalledWith('http://localhost:3000/fakeurl?', { body: undefined, headers: { 'Content-Type': 'application/json', Authorization: 'Bearer access_token' }, method: 'PUT' });
    });

    it('putRequest - Success with Body', async () => {
      mockedFetch.mockReturnValue(Promise.resolve(new Response('test')));
      await utils.putRequest('/fakeurl', { data: 'myData' });
      expect(mockedFetch).toHaveBeenCalledWith('http://localhost:3000/fakeurl?', { body: JSON.stringify({ data: 'myData' }), headers: { 'Content-Type': 'application/json', Authorization: 'Bearer access_token' }, method: 'PUT' });
    });

    it('putRequest - Success with Query parameter', async () => {
      mockedFetch.mockReturnValue(Promise.resolve(new Response('test')));
      await utils.putRequest('/fakeurl', undefined, { test: 'test' });
      expect(mockedFetch).toHaveBeenCalledWith('http://localhost:3000/fakeurl?test=test', { body: undefined, headers: { 'Content-Type': 'application/json', Authorization: 'Bearer access_token' }, method: 'PUT' });
    });

    it('putRequest - Throws error if not ok', async () => {
      mockedFetch.mockReturnValue(Promise.resolve(new Response(JSON.stringify({ error: 'An error' }), { status: 400 })));
      try {
        await utils.putRequest('/fakeurl');
      } catch (err) {
        expect(err.error).toEqual('An error');
        expect(err.status).toEqual(400);
      }
    });

    it('getRequest - Success', async () => {
      mockedFetch.mockReturnValue(Promise.resolve(new Response('test')));
      const res = await utils.getRequest('/fakeurl');
      expect(await res.text()).toEqual('test');
      expect(mockedFetch).toHaveBeenCalledWith('http://localhost:3000/fakeurl?', { body: undefined, headers: { Authorization: 'Bearer access_token' }, method: 'GET' });
    });

    it('getRequest - Success with Query parameter', async () => {
      mockedFetch.mockReturnValue(Promise.resolve(new Response('test')));
      await utils.getRequest('/fakeurl', { test: 'test' });
      expect(mockedFetch).toHaveBeenCalledWith('http://localhost:3000/fakeurl?test=test', { body: undefined, headers: { Authorization: 'Bearer access_token' }, method: 'GET' });
    });

    it('getRequest - Throws error if not ok', async () => {
      mockedFetch.mockReturnValue(Promise.resolve(new Response(JSON.stringify({ error: 'An error' }), { status: 400 })));
      try {
        await utils.getRequest('/fakeurl');
      } catch (err) {
        expect(err.error).toEqual('An error');
        expect(err.status).toEqual(400);
      }
    });

    it('deleteRequest - Success', async () => {
      mockedFetch.mockReturnValue(Promise.resolve(new Response('test')));
      const res = await utils.deleteRequest('/fakeurl');
      expect(await res.text()).toEqual('test');
      expect(mockedFetch).toHaveBeenCalledWith('http://localhost:3000/fakeurl?', { body: undefined, headers: { Authorization: 'Bearer access_token' }, method: 'DELETE' });
    });

    it('deleteRequest - Success with Query parameter', async () => {
      mockedFetch.mockReturnValue(Promise.resolve(new Response('test')));
      await utils.deleteRequest('/fakeurl', { test: 'test' });
      expect(mockedFetch).toHaveBeenCalledWith('http://localhost:3000/fakeurl?test=test', { body: undefined, headers: { Authorization: 'Bearer access_token' }, method: 'DELETE' });
    });

    it('deleteRequest - Throws error if not ok', async () => {
      mockedFetch.mockReturnValue(Promise.resolve(new Response(JSON.stringify({ error: 'An error' }), { status: 400 })));
      try {
        await utils.deleteRequest('/fakeurl');
      } catch (err) {
        expect(err.error).toEqual('An error');
        expect(err.status).toEqual(400);
      }
    });
  });
});
