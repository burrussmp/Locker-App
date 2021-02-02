/* eslint-disable no-redeclare */
/**
 * @description Locker API
 * @author Matthew P. Burruss
 * @date 1/12/2021
 */
import AsyncStorage from '@react-native-async-storage/async-storage';
import utils from 'api/utils';
import * as T from 'io-ts';

export const ASYNC_STORAGE_LOCKER_ID_KEY = 'locker';

/**
 * @desc Locker details
 */
export const LockerInfoType = T.type({
  _id: T.string,
  name: T.string,
  user: T.string,
  locker_collections: T.array(T.string),
  createdAt: T.string,
  updatedAt: T.string,
});
export type LockerInfoType = T.TypeOf<typeof LockerInfoType>;

/**
 * @desc Locker product details
 */
export const LockerProductInfoType = T.type({
  _id: T.string,
  user: T.string,
  product: T.string,
  locker: T.string,
  locker_collections: T.array(T.string),
  timestamp_locked: T.string,
});
export type LockerProductInfoType = T.TypeOf<typeof LockerProductInfoType>;

/**
 * @desc Locker list type
 */
export const LockerListType = T.array(
  T.type({
    _id: T.string,
    createdAt: T.string,
  }),
);
export type LockerListType = T.TypeOf<typeof LockerListType>;

const LOCKER_URL = '/api/lockers';

/**
 * @desc List off the lockers
 * @param {string | undefined} userId Optionally query by user ID.
 * @return {Promise<LockerListType>} A list of the locker
 */
const GetAll = async (userId?: string): Promise<LockerListType> => {
  const query = JSON.parse(JSON.stringify({ user: userId })) as Record<string, string>;
  const res = await utils.getRequest(LOCKER_URL, query);
  return await res.json() as LockerListType;
};

/**
 * @desc Retrieve own locker and store in asynchronous storage if not already retrieved and return lockerId.
 * @return {Promise<string>} The Locker ID of the user.
 */
export const retrieveLocker = async (): Promise<string> => {
  let lockerId = await AsyncStorage.getItem(ASYNC_STORAGE_LOCKER_ID_KEY);
  if (!lockerId) {
    lockerId = (await GetAll(utils.getIDAndAccessToken()._id))[0]._id;
    await AsyncStorage.setItem(ASYNC_STORAGE_LOCKER_ID_KEY, lockerId);
  }
  return lockerId;
};

/**
 * @desc Get a specific locker by ID. If no locker ID, get own locker.
 * @param {string | undefined} lockerId The ID of the locker.
 * @return {Promise<LockerInfoType>} The information of the locker
 */
const GetByID = async (lockerId?: string): Promise<LockerInfoType> => {
  const res = await utils.getRequest(`${LOCKER_URL}/${lockerId || await retrieveLocker()}`);
  return await res.json() as LockerInfoType;
};

/**
 * @desc Update your locker.
 * @param {string | undefined} name A new name for the locker.
 * @return {Promise<LockerInfoType>} The updated locker.
 */
const Update = async (name?: string): Promise<LockerInfoType> => {
  const updateBody = JSON.parse(JSON.stringify({ name })) as Record<string, string>;
  const res = await utils.putRequest(`${LOCKER_URL}/${await retrieveLocker()}`, updateBody);
  return await res.json() as LockerInfoType;
};

/**
 * @desc Get all the products for a locker.
 * @param {string | undefined} lockerId A locker ID. If undefined, default to user's locker.
 * @param {Number | undefined} addedAfter A unix timestamp to query products locked after a certain time.
 * @param {Boolean | undefined} isOrphan A boolean to only get products that are not in a locker collection.
 * @return {Promise<[LockerProductInfoType]>} An array of locker products.
 */
const GetProducts = async (lockerId?: string, addedAfter?: number, isOrphan?: boolean): Promise<[LockerProductInfoType]> => {
  const query = JSON.parse(JSON.stringify({ orphan: isOrphan ? 'true' : undefined, added_after: addedAfter })) as Record<string, string>;
  const res = await utils.getRequest(`${LOCKER_URL}/${lockerId || await retrieveLocker()}/products`, query);
  return await res.json() as [LockerProductInfoType];
};

/**
 * @desc Add a product to a locker.
 * @param {string} productId An ID of a product to add to the locker.
 * @return {Promise<{'_id': string}>} The newly created locker_product ID.
 */
const AddProduct = async (productId: string): Promise<{'_id': string}> => {
  const res = await utils.postRequest(`${LOCKER_URL}/${await retrieveLocker()}/products`, { product: productId });
  return await res.json() as {'_id': string};
};

/**
 * @desc Remove a product from a locker (and as a result any collection that references the product).
 * @param {string} lockerProductId An ID of the locker product to remove.
 * @return {Promise<LockerProductInfoType>} The locker product that was removed from the locker and all collections.
 */
const RemoveProduct = async (lockerProductId: string): Promise<LockerProductInfoType> => {
  const res = await utils.deleteRequest(`${LOCKER_URL}/${await retrieveLocker()}/products/${lockerProductId}`);
  return await res.json() as LockerProductInfoType;
};

export default {
  GetAll,
  GetByID,
  Update,
  GetProducts,
  AddProduct,
  RemoveProduct,
};
