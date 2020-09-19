'use strict';

import auth from './auth';
import session from './session';
import user from './user';

type API = {
  session: typeof session;
  auth: typeof auth;
  user: typeof user;
};

const api: API = {
  session: session,
  auth: auth,
  user: user,
};

export default api;
