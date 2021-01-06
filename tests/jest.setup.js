/* eslint-disable @typescript-eslint/no-var-requires */
const FormData = require('form-data');
const fetch = require('node-fetch');

global.FormData = FormData;
global.fetch = fetch;

global.URL.createObjectURL = jest.fn(() => 'details');
