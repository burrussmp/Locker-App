/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable no-undef */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/unbound-method */

// Import the dependencies for testing
import helper from 'tests/helper';
import api from 'api/api';
import validators from 'services/validators';
import { OrganizationSearchResultsType, UserSearchResultsType } from 'api/search';

describe('API Tests', () => {
  describe('Search Tests', () => {
    let user = {} as any;
    const organizationName = 'locker';
    beforeAll(async () => {
      user = helper.getFakeUser();
      await api.Auth.SignUp(user.email, user.phone_number, user.username,
        user.password, 'Matthias', user.last_name);
      user = helper.getFakeUser();
      await api.Auth.SignUp(user.email, user.phone_number, user.username,
        user.password, 'Matthew', user.last_name);
    });

    it('Users - Search succeeds when empty (no users returned)', async () => {
      const searchResults = await api.Search.Users('');
      expect(searchResults.length).toEqual(0);
    });
    it('Users - Search based on first name and validate type (possible that type \'UserSearchResultsType\' or API changed)', async () => {
      const searchResults = await api.Search.Users('Matthew');
      validators.validateType(UserSearchResultsType, searchResults);
      expect(searchResults.length).toBeGreaterThanOrEqual(1);
    });
    it('Users - Search based on last name and validate type (possible that type \'UserSearchResultsType\' or API changed)', async () => {
      const searchResults = await api.Search.Users(user.last_name);
      validators.validateType(UserSearchResultsType, searchResults);
      expect(searchResults.length).toBeGreaterThanOrEqual(1);
    });
    it('Users - Search based on username and validate type (possible that type \'UserSearchResultsType\' or API changed)', async () => {
      const searchResults = await api.Search.Users(user.username);
      validators.validateType(UserSearchResultsType, searchResults);
      expect(searchResults.length).toBeGreaterThanOrEqual(1);
    });
    it('Organizations - Search using organization name (possible that type \'OrganizationSearchResultsType\' or API changed)', async () => {
      const searchResults = await api.Search.Organizations(organizationName);
      validators.validateType(OrganizationSearchResultsType, searchResults);
      expect(searchResults.length).toBeGreaterThanOrEqual(1);
    });
    it('Organizations - Search succeeds when empty (no users returned)', async () => {
      const searchResults = await api.Search.Organizations('');
      expect(searchResults.length).toEqual(0);
    });
  });
});
