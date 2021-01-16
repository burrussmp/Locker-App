/* eslint-disable no-redeclare */
/**
 * @description Collection API
 * @author Matthew P. Burruss
 * @date 1/16/2021
 */
import utils from 'api/utils';
import { mediaType } from 'api/S3';
import * as T from 'io-ts';

/**
 * @desc The collection information
 */
export const CollectionInfoType = T.type({
  _id: T.string,
  name: T.string,
  organization: T.string,
  hero: mediaType,
  product_list: T.array(T.string),
  description: T.string,
  visible: T.boolean,
  tags: T.array(T.string),
  createdAt: T.string,
  updatedAt: T.string,
});
export type CollectionInfoType = T.TypeOf<typeof CollectionInfoType>;

/**
 * @desc Collection list type
 */
export const CollectionListType = T.array(
  T.type({
    _id: T.string,
    createdAt: T.string,
  }),
);
export type CollectionListType = T.TypeOf<typeof CollectionListType>;

const COLLECTION_URL = '/api/collections';

/**
 * @desc List all collections. Query a collection by organization by setting query={'organization': 'organizationId'}.
 * @param {Record<string, string> | undefined} query Optional query parameters
 * @return {Promise<CollectionListType>} A list of collections.
*/
const GetAll = async (query?: Record<string, string>): Promise<CollectionListType> => {
  const res = await utils.getRequest(COLLECTION_URL, query);
  return await res.json() as CollectionListType;
};

/**
 * @desc Get a specific collection by ID.
 * @param {string} collectionId The ID of the collection.
 * @param {Record<string, string> | undefined} query Optional query parameters
 * @return {Promise<CollectionInfoType>} The collection information.
*/
const GetByID = async (collectionId: string, query?: Record<string, string>): Promise<CollectionInfoType> => {
  const res = await utils.getRequest(`${COLLECTION_URL}/${collectionId}`, query);
  return await res.json() as CollectionInfoType;
};

export default {
  GetAll,
  GetByID,
};
