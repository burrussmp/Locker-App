/**
 * @author Matthew P. Burruss
 * @date 1/30/2021
 * @desc A configuration
*/

type ConfigType = {
  server: string;
  defaultUser: {
    login: string;
    password: string;
  }
};

const devConfig: ConfigType = {
  server: 'http://192.168.1.169:8080',
  defaultUser: {
    login: 'paulasullivan',
    password: 'Pass@123',
  },
};

const testConfig: ConfigType = {
  server: 'http://localhost:3000',
  defaultUser: {
    login: 'paulasullivan',
    password: 'Pass@123',
  },
};

const getConfig = () => {
  if (process.env.NODE_ENV === 'development') {
    return devConfig;
  } if (process.env.NODE_ENV === 'test') {
    return testConfig;
  }
  throw new Error(`Invalid environment ${process.env.NODE_ENV || ''}`);
};

export default getConfig();
