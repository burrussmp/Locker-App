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
import fs from 'fs';
import helper from 'tests/helper';
import api from 'api/api';
import validators from 'services/validators';
import { LockerProductInfoType } from 'api/locker';
import { LockerCollectionInfoType, LockerCollectionCloneType } from 'api/locker.collection';

describe('API Tests', () => {
  describe('Locker Collection Tests', () => {
    let user = {} as any;
    let productId = '';
    let lockerId = '';
    let lockerProductId = '';
    let lockerCollectionId = '';
    beforeAll(async () => {
      user = helper.getFakeUser();
      const session = await api.Auth.SignUp(user.email, user.phone_number, user.username,
        user.password, user.first_name, user.last_name);
      const organizationList = await api.Organization.GetAll();
      productId = (await api.Organization.ListProducts(organizationList[0]._id))[0]._id;
      lockerId = (await api.Locker.GetAll(session._id))[0]._id;
    });
    it('GetAll - No collections added - Success', async () => {
      const collectionList = await api.LockerCollection.GetAll();
      validators.validateType(T.array(T.string), collectionList);
      expect(collectionList.length).toEqual(0);
    });
    it('Delete - Create collection (default) and delete - Success', async () => {
      const newLockerCollection = await api.LockerCollection.Create();
      let collectionList = await api.LockerCollection.GetAll();
      expect(collectionList.length).toEqual(1);
      await api.LockerCollection.Delete(newLockerCollection._id);
      collectionList = await api.LockerCollection.GetAll();
      expect(collectionList.length).toEqual(0);
    });
    it('Create - Include name, description, and hero image - Success', async () => {
      const stream = fs.createReadStream('./tests/assets/freepeople.jpg');
      const lockerCollection = await api.LockerCollection.Create('collection', 'description', stream as unknown as any);
      lockerCollectionId = lockerCollection._id;
    });
    it('Update - Change the name - Success', async () => {
      const lockerCollectionInfo = await api.LockerCollection.Update(lockerCollectionId, 'new name');
      validators.validateType(LockerCollectionInfoType, lockerCollectionInfo);
      expect(lockerCollectionInfo.name).toEqual('new name');
    });
    it('GetAll - Should have 1 collection - Success', async () => {
      const collectionList = await api.LockerCollection.GetAll();
      validators.validateType(T.array(T.string), collectionList);
      expect(collectionList.length).toEqual(1);
      expect(collectionList[0]).toEqual(lockerCollectionId);
    });
    it('GetByID - Get collection from your own locker - Success', async () => {
      const lockerCollection = await api.LockerCollection.GetByID(lockerCollectionId);
      validators.validateType(LockerCollectionInfoType, lockerCollection);
    });
    it('GetByID - Get collection and specify locker - Success', async () => {
      try {
        await api.LockerCollection.GetByID(lockerCollectionId, '12345');
      } catch (err) {
        expect(err.error.includes('not found')).toBeTruthy();
      }
    });
    it('Add Product - Success', async () => {
      const lockerInfo = await api.LockerCollection.AddProduct(lockerCollectionId, productId);
      lockerProductId = lockerInfo._id;
    });
    it('GetProducts - Success', async () => {
      const lockerProductList = await api.LockerCollection.GetProducts(lockerCollectionId);
      validators.validateType(T.array(LockerProductInfoType), lockerProductList);
      expect(lockerProductList[0]._id).toEqual(lockerProductId);
    });
    it('Clone a collection - Success', async () => {
      const clonedCollection = await api.LockerCollection.Clone(lockerCollectionId, lockerId);
      validators.validateType(LockerCollectionCloneType, clonedCollection);
      expect(clonedCollection._id).not.toEqual(lockerProductId);
      expect(clonedCollection.locker_products.length).toEqual(1);
      expect((await api.LockerCollection.GetAll()).length).toEqual(2);
    });
    it('Reference a collection - Success', async () => {
      const referencedCollection = await api.LockerCollection.Reference(lockerCollectionId, lockerId);
      expect(referencedCollection._id).toEqual(lockerCollectionId);
    });
    it('RemoveProduct - Success', async () => {
      const lockerProduct = await api.LockerCollection.RemoveProduct(lockerCollectionId, lockerProductId);
      expect(lockerProduct._id).toEqual(lockerProductId);
    });
  });
});
