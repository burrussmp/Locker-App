// Import the dependencies for testing
import mockServer from 'mockttp';
import api from 'api/api';

// Configure chai
describe('calculate', () => {
  it('add', () => {
    const result = 5 + 2;
    expect(result).toEqual(7);
  });
});