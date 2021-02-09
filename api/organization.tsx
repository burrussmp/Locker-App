/* eslint-disable no-redeclare */
/**
 * @description Organizations API
 * @author Matthew P. Burruss
 * @date 1/12/2021
 */

import utils from 'api/utils';
import * as T from 'io-ts';
import { mediaType } from 'api/S3';

/**
 * @desc Organization list type
 */
export const OrganizationListType = T.array(
  T.type({
    _id: T.string,
    updatedAt: T.string,
    createdAt: T.string,
    logo: mediaType,
  }),
);
export type OrganizationListType = T.TypeOf<typeof OrganizationListType>;

/**
 * @desc Organization details
 */
export const OrganizationInfoType = T.type({
  _id: T.string,
  name: T.string,
  logo: mediaType,
  url: T.string,
  description: T.string,
  createdAt: T.string,
  updatedAt: T.string,
});
export type OrganizationInfoType = T.TypeOf<typeof OrganizationInfoType>;

/**
 * @desc Product list type
 */
export const ProductListType = T.array(
  T.type({
    _id: T.string,
    createdAt: T.string,
  }),
);
export type ProductListType = T.TypeOf<typeof ProductListType>;

/**
 * @desc List all organizations
 * @return {Promise<OrganizationListType>} A list of all the users.
 */
const GetAll = async (): Promise<OrganizationListType> => {
  const res = await utils.getRequest('/api/organizations');
  return await res.json() as OrganizationListType;
};

/**
 * @desc Get specific organization's information.
 * @param {string} organizationId The ID of the organization.
 * @return {Promise<OrganizationInfoType>} The information of a user
 */
const GetByID = async (organizationId: string): Promise<OrganizationInfoType> => {
  const res = await utils.getRequest(`/api/organizations/${organizationId}`);
  return await res.json() as OrganizationInfoType;
};

/**
 * @desc Retrieve the logo of an organization.
 * @param {string} organizationId The ID of the organization.
 * @return {Promise<string>} The URI for the logo
 */
const GetLogo = async (organizationId: string): Promise<string> => {
  const res = await utils.getRequest(`/api/organizations/${organizationId}/logo`);
  return utils.createURI(res);
};

/**
 * @desc List all available products for an organization.
 * @param {string} organizationId The ID of the organization.
 * @return {Promise<ProductListType>} A list of product post IDs
 */
const ListProducts = async (organizationId: string): Promise<ProductListType> => {
  const query = { organization: organizationId };
  const res = await utils.getRequest('/api/products', query);
  return await res.json() as ProductListType;
};

export default {
  GetAll,
  GetByID,
  ListProducts,
  GetLogo,
};
