'use strict';

import auth from './auth';
import session from './session';

type API = {
  session: typeof session;
  auth: typeof auth;
};

const api: API = {
  session: session,
  auth: auth,
};

export default api;
