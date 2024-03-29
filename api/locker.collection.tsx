/* eslint-disable no-redeclare */
/**
 * @description Locker Collection API
 * @author Matthew P. Burruss
 * @date 1/12/2021
 */
import utils from 'api/utils';
import * as T from 'io-ts';
import { mediaData, mediaType } from 'api/S3';
import { retrieveLocker, LockerProductInfoType } from 'api/locker';

export const ASYNC_STORAGE_LOCKER_ID_KEY = 'locker';

/**
 * @desc Locker collection details
 */
export const LockerCollectionInfoType = T.type({
  _id: T.string,
  name: T.string,
  user: T.string,
  hero: T.union([T.undefined, mediaType]),
  description: T.union([T.undefined, T.string]),
  createdAt: T.string,
  updatedAt: T.string,

});
export type LockerCollectionInfoType = T.TypeOf<typeof LockerCollectionInfoType>;

/**
 * @desc The API output when you clone a locker collection.
 */
export const LockerCollectionCloneType = T.type({
  _id: T.string,
  locker_products: T.array(T.string),
});
export type LockerCollectionCloneType = T.TypeOf<typeof LockerCollectionCloneType>;

const LOCKER_COLLECTION_URL = '/api/lockers/:lockerId/collections';

/**
 * @desc List collections in a locker.
 * @param {Record<string, string> | undefined} query Optional query parameters
 * @return {Promise<[string]>} A list of the locker collection IDs.
 */
const GetAll = async (lockerId?: string): Promise<[string]> => {
  const url = LOCKER_COLLECTION_URL.replace(':lockerId', lockerId || await retrieveLocker());
  const res = await utils.getRequest(`${url}`);
  return await res.json() as [string];
};

/**
 * @desc Get a specific locker collection by ID.
 * @param {string} collectionId The ID of the locker collection.
 * @param {string | undefined} lockerId The ID of the locker (default is user's locker)
 * @return {Promise<LockerCollectionInfoType>} The information of the locker collection.
 */
const GetByID = async (collectionId: string, lockerId?: string): Promise<LockerCollectionInfoType> => {
  const url = LOCKER_COLLECTION_URL.replace(':lockerId', lockerId || await retrieveLocker());
  const res = await utils.getRequest(`${url}/${collectionId}`);
  return await res.json() as LockerCollectionInfoType;
};

/**
 * @desc Create a new locker collection.
 * @param {string | undefined} name A new name for the locker.
 * @param {string | undefined} description A new description for the locker.
 * @param {mediaData | undefined} hero An object with a name, type, and uri attribute (see react-native-image-picker)
 * @return {Promise<{'_id': string}>} The ID of the newly created locker collection.
 */
const Create = async (name?: string, description?: string, hero?: mediaData): Promise<{'_id': string}> => {
  const form = new FormData();
  if (name) form.append('name', name);
  if (description) form.append('description', description);
  if (hero) form.append('hero', hero as unknown as Blob);
  const url = LOCKER_COLLECTION_URL.replace(':lockerId', await retrieveLocker());
  const res = await utils.postRequest(`${url}`, form);
  return await res.json() as {'_id': string};
};

/**
 * @desc Update your locker collection.
 * @param {string} collectionId The ID of the locker collection.
 * @param {string | undefined} name A new name for the locker.
 * @param {string | undefined} description A new description for the locker.
 * @param {mediaData | undefined} hero An object with a name, type, and uri attribute (see react-native-image-picker)
 * @return {Promise<LockerCollectionInfoType>} The updated locker collection.
 */
const Update = async (collectionId: string, name?: string, description?: string, hero?: mediaData): Promise<LockerCollectionInfoType> => {
  const form = new FormData();
  if (name) form.append('name', name);
  if (description) form.append('description', description);
  if (hero) form.append('hero', hero as unknown as Blob);
  const url = LOCKER_COLLECTION_URL.replace(':lockerId', await retrieveLocker());
  const updateBody = JSON.parse(JSON.stringify({ name, description })) as Record<string, string>;
  const res = await utils.putRequest(`${url}/${collectionId}`, updateBody);
  return await res.json() as LockerCollectionInfoType;
};

/**
 * @desc Delete your locker collection
 * @param {string} collectionId The ID of the locker collection.
 * @return {Promise<LockerCollectionInfoType>} The deleted locker collection.
 */
const Delete = async (collectionId: string): Promise<LockerCollectionInfoType> => {
  const url = LOCKER_COLLECTION_URL.replace(':lockerId', await retrieveLocker());
  const res = await utils.deleteRequest(`${url}/${collectionId}`);
  return await res.json() as LockerCollectionInfoType;
};

/**
 * @desc Get all the products for a locker collection.
 * @param {string} collectionId The ID of the locker collection.
 * @param {string | undefined} lockerId A locker ID. If undefined, default to user's locker.
 * @return {Promise<[LockerProductInfoType]>} An array of locker products.
 */
const GetProducts = async (collectionId: string, lockerId?: string): Promise<[LockerProductInfoType]> => {
  const url = LOCKER_COLLECTION_URL.replace(':lockerId', lockerId || await retrieveLocker());
  const res = await utils.getRequest(`${url}/${collectionId}/products`);
  return await res.json() as [LockerProductInfoType];
};

/**
 * @desc Add a product to a locker collection. If the product is not there already, add to locker as well.
 * @param {string} collectionId The ID of the locker collection.
 * @param {string} productId An ID of a product.
 * @return {Promise<{'_id': string}>} The newly created locker_product ID.
 */
const AddProduct = async (collectionId: string, productId: string): Promise<{'_id': string}> => {
  const url = LOCKER_COLLECTION_URL.replace(':lockerId', await retrieveLocker());
  const res = await utils.postRequest(`${url}/${collectionId}/products`, { product: productId });
  return await res.json() as {'_id': string};
};

/**
 * @desc Remove a product from a locker collection (product remains in locker).
 * @param {string} collectionId The ID of the locker collection.
 * @param {string} lockerProductId The ID of the locker product.
 * @return {Promise<{'_id': string}>} The ID of the product that was removed from the collection.
 */
const RemoveProduct = async (collectionId: string, lockerProductId: string): Promise<{'_id': string}> => {
  const url = LOCKER_COLLECTION_URL.replace(':lockerId', await retrieveLocker());
  const res = await utils.deleteRequest(`${url}/${collectionId}/products/${lockerProductId}`);
  return await res.json() as {'_id': string};
};

/**
 * @desc Clone a locker collection by making a deep copy of someone's collection which includes their products.
 * @param {string} collectionId The ID of the locker collection.
 * @param {string | undefined} lockerId A locker ID. If undefined, default to user's locker.
 * @return {Promise<LockerCollectionCloneType>} The created collection and locker products.
 */
const Clone = async (collectionId: string, lockerId?: string): Promise<LockerCollectionCloneType> => {
  const url = LOCKER_COLLECTION_URL.replace(':lockerId', lockerId || await retrieveLocker());
  const res = await utils.postRequest(`${url}/${collectionId}/clone`);
  return await res.json() as LockerCollectionCloneType;
};

/**
 * @desc Reference someone's collection in your own locker.
 * @param {string} collectionId The ID of the locker collection.
 * @param {string} lockerId The ID of the locker.
 * @return {Promise<{'_id': string}>} The referenced collection
 */
const Reference = async (collectionId: string, lockerId: string): Promise<{'_id': string}> => {
  const url = LOCKER_COLLECTION_URL.replace(':lockerId', lockerId);
  const res = await utils.postRequest(`${url}/${collectionId}/reference`);
  return await res.json() as {'_id': string};
};

export default {
  Create,
  GetAll,
  GetByID,
  Update,
  Delete,
  GetProducts,
  AddProduct,
  RemoveProduct,
  Clone,
  Reference,
};
