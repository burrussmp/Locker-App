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
import { PostType } from 'api/post';
import { OrganizationListType, OrganizationInfoType, ProductListType } from 'api/organization';

describe('API Tests', () => {
  describe('Organization Tests', () => {
    let user = {} as any;
    let organizationID = '';
    beforeAll(async () => {
      user = helper.getFakeUser();
      await api.Auth.SignUp(user.email, user.phone_number, user.username,
        user.password, user.first_name, user.last_name);
    });
    it('GetAll - Success', async () => {
      const organizationList = await api.Organization.GetAll();
      validators.validateType(OrganizationListType, organizationList);
      organizationID = organizationList[0]._id;
    });
    it('GetByID - Success', async () => {
      const organizationInfo = await api.Organization.GetByID(organizationID);
      validators.validateType(OrganizationInfoType, organizationInfo);
    });
    it('ListProducts - Success', async () => {
      const productList = await api.Organization.ListProducts(organizationID);
      validators.validateType(ProductListType, productList);
    });
    it('ListProducts - Use ID in list to retrieve post information', async () => {
      const productList = await api.Organization.ListProducts(organizationID);
      const productPostInfo = await api.Post.GetByProductID(productList[0]._id);
      validators.validateType(PostType, productPostInfo);
    });
    it('GetLogo - Success', async () => {
      const logo = await api.Organization.GetLogo(organizationID);
      expect(typeof logo).toEqual('string');
    });
  });
});
