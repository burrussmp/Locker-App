/* eslint-disable no-redeclare */
/**
 * @description Product Post API
 * @author Matthew P. Burruss
 * @date 12/24/2020
 */

// import utils from 'api/utils';
// import { mediaType } from 'api/S3';
// import * as T from 'io-ts';
// /**
//  * @desc The product post dat
//  */
// type ProductPostData = {
//   price: string;
//   caption: string;
//   tags: string;
// };

// /**
//  * @desc Create a product post and return the ID
//  * @param {ProductPostData} productPostData The product post data
//  * @param {media} productPostMedia An object with a name, type, and uri attribute (see react-native-image-picker)
//  * @return {Promise<{_id: string}>} The ID of the newly created product post
// */
// const Create = async (productPostData: ProductPostData, productPostMedia: mediaData): Promise<{_id: string}> => {
//   const data = new FormData();
//   data.append('media', productPostMedia as unknown as string);
//   data.append('price', productPostData.price);
//   data.append('caption', productPostData.caption);
//   data.append('tags', productPostData.tags);
//   const res = await utils.postRequest('/api/posts', data, { type: 'ProductPost' });
//   return await res.json() as {_id: string};
// };

// export default {
//   Create,
// };
