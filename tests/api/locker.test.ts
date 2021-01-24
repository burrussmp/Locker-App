/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable no-undef */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/unbound-method */

// Import the dependencies for testing
import * as T from 'io-ts';
import helper from 'tests/helper';
import api from 'api/api';
import validators from 'services/validators';
import { LockerInfoType, LockerProductInfoType, LockerListType } from 'api/locker';

describe('API Tests', () => {
  describe('Locker Tests', () => {
    let user = {} as any;
    let session = {} as any;
    let lockerId = '';
    let productId = '';
    let lockerProductId = '';
    beforeAll(async () => {
      user = helper.getFakeUser();
      session = await api.Auth.SignUp(user.email, user.phone_number, user.username,
        user.password, user.first_name, user.last_name);
      const organizationList = await api.Organization.GetAll();
      productId = (await api.Organization.ListProducts(organizationList[0]._id))[0]._id;
    });
    it('GetAll - Success', async () => {
      const lockerList = await api.Locker.GetAll();
      validators.validateType(LockerListType, lockerList);
      lockerId = lockerList[0]._id;
    });
    it('GetAll - With "user" query - Success', async () => {
      const lockerList = await api.Locker.GetAll(session._id);
      validators.validateType(LockerListType, lockerList);
      expect(lockerList.length).toEqual(1);
    });
    it('GetByID - Default is own locker - Success', async () => {
      const lockerInfo = await api.Locker.GetByID();
      validators.validateType(LockerInfoType, lockerInfo);
    });
    it('GetByID - Provider the lockerId - Success', async () => {
      const lockerInfo = await api.Locker.GetByID(lockerId);
      validators.validateType(LockerInfoType, lockerInfo);
    });
    it('Update - Change the name - Success', async () => {
      const lockerInfo = await api.Locker.Update('new name');
      validators.validateType(LockerInfoType, lockerInfo);
      expect(lockerInfo.name).toEqual('new name');
    });
    it('Add Product - Success', async () => {
      const lockerInfo = await api.Locker.AddProduct(productId);
      lockerProductId = lockerInfo._id;
    });
    it('Add Product - Try again - Fail', async () => {
      await expect(api.Locker.AddProduct(productId)).rejects.toBeTruthy();
    });
    it('GetProducts - Success', async () => {
      const lockerProductList = await api.Locker.GetProducts();
      validators.validateType(T.array(LockerProductInfoType), lockerProductList);
      expect(lockerProductList[0]._id).toEqual(lockerProductId);
    });
    it('RemoveProduct - Success', async () => {
      const lockerProduct = await api.Locker.RemoveProduct(lockerProductId);
      validators.validateType(LockerProductInfoType, lockerProduct);
    });
    it('GetProducts - Should be empty now - Success', async () => {
      const lockerProductList = await api.Locker.GetProducts();
      validators.validateType(LockerListType, lockerProductList);
      expect(lockerProductList.length).toEqual(0);
    });
  });
});
