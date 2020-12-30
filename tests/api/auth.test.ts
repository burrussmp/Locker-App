// Import the dependencies for testing

import helper from 'tests/helper';
import api from 'api/api';

// Configure chai
describe('AUTH Tests', () => {
  it('SignUp - Success', async () => {
    const registerData = helper.getFakeUser();
    const session = await api.Auth.SignUp(registerData);
    expect(Boolean(session.id)).toBe(true);
    expect(Boolean(session.access_token)).toBe(true);
    expect(Boolean(session.refresh_token)).toBe(true);
    expect(Boolean(session.id_token)).toBe(true);
  });
});
