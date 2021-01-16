/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable no-undef */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/unbound-method */

// Import the dependencies for testing
import api from 'api/api';
import validators from 'services/validators';
import { CollectionInfoType, CollectionListType } from 'api/collection';

describe('API Tests', () => {
  describe('Collection Tests', () => {
    let collectionId = ''; let organizationId = '';
    it('GetAll - Success', async () => {
      const collectionList = await api.Collection.GetAll();
      expect(collectionList.length).toEqual(1);
      validators.validateType(CollectionListType, collectionList);
      collectionId = collectionList[0]._id;
      organizationId = (await api.Organization.GetAll())[0]._id;
    });
    it('GetAll - Success', async () => {
      const collectionList = await api.Collection.GetAll();
      expect(collectionList.length).toEqual(1);
      validators.validateType(CollectionListType, collectionList);
    });
    it('GetAll - Query by organization, found (success)', async () => {
      const collectionList = await api.Collection.GetAll({ organization: organizationId });
      expect(collectionList.length).toEqual(1);
      validators.validateType(CollectionListType, collectionList);
    });
    it('GetAll - Query by organization, not found (success)', async () => {
      const collectionList = await api.Collection.GetAll({ organization: '600369870dbd14489bb5cf89' });
      expect(collectionList.length).toEqual(0);
      validators.validateType(CollectionListType, collectionList);
    });
    it('GetByID - Success', async () => {
      const collectionInfo = await api.Collection.GetByID(collectionId);
      validators.validateType(CollectionInfoType, collectionInfo);
    });
    it('GetByID - Not found (should fail)', async () => {
      await expect(api.Collection.GetByID('600369870dbd14489bb5cf89')).rejects.toBeTruthy();
    });
  });
});
