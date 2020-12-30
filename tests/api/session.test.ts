// Import the dependencies for testing
import AsyncStorage from '@react-native-async-storage/async-storage';
import { createMock } from 'ts-auto-mock';

import helper from 'tests/helper';
import api from 'api/api';
import { Session } from 'store/types/auth.types';
import { create } from 'lodash';


// Configure chai
describe('Session Tests', () => {
  it('setSession - Success', () => {
    const mockObject = createMock<Session>();
    console.log(mockObject);
    return true;
  });
});
