const FormData = require('form-data');
const fetch = require('node-fetch');

global.FormData = FormData;
global.fetch = fetch;

global.URL.createObjectURL = jest.fn(() => 'details');

console.log('Done Setting Up');